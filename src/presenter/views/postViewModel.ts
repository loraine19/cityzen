import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import DI from '../../di/ioc';
import { PostView } from './viewsEntities/postViewEntities';

export const postViewModel = () => {
  return (filter?: string, category?: string, sort?: string, reverse?: boolean) => {
    console.log('eventViewModel called', { caller: (new Error()) });

    const { data: user, isLoading: userLoading } = useQuery({
      queryKey: ['user'],
      refetchOnWindowFocus: false,
      staleTime: 600000, // 10 minutes,
      queryFn: async () => await DI.resolve('getUserMeUseCase').execute(),
    })

    const getPosts = DI.resolve('getPostsUseCase')
    const { data, isLoading, error, fetchNextPage, hasNextPage, refetch }
      = useInfiniteQuery({
        queryKey: ['Posts', filter, category],
        refetchOnWindowFocus: false,
        staleTime: 600000, // 10 minutes,
        queryFn: async ({ pageParam = 1 }) => await getPosts.execute(pageParam, filter, category, sort, reverse) || { Posts: [], count: 0 },
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage.posts?.length ? pages.length + 1 : undefined
      })

    const count = isLoading || error ? 0 : (data?.pages[data?.pages.length - 1].count)
    const userId = user?.id || 0
    const flat = error || isLoading || !data ? [] : data?.pages.flat().map(page => page.posts).flat()
    const posts = (userLoading || isLoading || !flat || !data) ? [] : flat?.map(post => !post?.error && new PostView(post, userId))

    console.log('postsViewModel', { count, posts, isLoading, error, hasNextPage })
    return {
      count,
      posts,
      refetch,
      fetchNextPage,
      hasNextPage,
      isLoading,
      error
    }
  }
}


export const postIdViewModel = () => {
  return (id: number) => {


    const { data: user, isLoading: userLoading } = useQuery({
      queryKey: ['user'],
      staleTime: 600000,
      refetchOnWindowFocus: false,
      queryFn: async () => await DI.resolve('getUserMeUseCase').execute(),
    })
    const userId = user?.id

    const getPostById = DI.resolve('getPostByIdUseCase')
    let { data, isLoading, error, refetch } = useQuery({
      queryKey: ['PostById', id],
      staleTime: 600000,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      queryFn: async () => await getPostById.execute(id),
    })

    const post = (!data || userLoading || isLoading || error) ? {} as PostView : new PostView(data, userId)
    return { post, isLoading, error, refetch }
  }


}






