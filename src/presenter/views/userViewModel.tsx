import { useEffect, useState } from 'react'
import { User } from '../../domain/entities/User';
import { GetUserUseCase } from '../../application/user/getUserMe.usecase'
import { handleError } from '../../application/useCases/useCaseUtils'


interface UserViewModelProps { getUserUseCase: GetUserUseCase }

export const userViewModel = ({ getUserUseCase }: UserViewModelProps) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        const res = await getUserUseCase.execute();
        setUser(res)
      } catch (error) {
        handleError(error, 'Error fetching user', setError)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])
  return { user, loading, error }
}