import { Card, CardHeader, Typography, CardBody, CardFooter, Chip, Avatar } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Flag, Like, Post } from "../../types/class";
import UserContext from "../../contexts/user.context";
import { useContext, useEffect, useState } from "react";
import { getFlagsPost } from "../../functions/API/flagsApi";
import { isFlaged, toggleLike } from "../../functions/GetDataFunctions";


export default function AnnounceDetailComp(props: { post: Post, mines?: boolean, change: (e: any) => void }) {
    const [post, setPost] = useState<Post>(props.post)
    const { change } = props
    const { id, title, description, image, category, createdAt, Likes } = post
    console.log(props)
    const user = useContext(UserContext)
    const userId = user.user.userId
    const haveImage = post.image ? true : false
    const userOrga = post?.User?.Profile
    const [flags, setFlags] = useState<Flag[]>([])
    1 > 2 && console.log(flags)
    const [flagged, setFlagged] = useState<boolean>(false)
    const ILike: boolean = post.Likes?.find((like: Like) => like.userId === userId) ? true : false

    useEffect(() => {
        const onload = async () => {
            const flags = await getFlagsPost()
            setFlags(flags)
            setFlagged(isFlaged(post, userId, flags))
        }
        onload()
    }, [post])

    return (
        <>
            <Card className="FixCard w-respLarge" >
                <CardHeader className={haveImage ? "FixCardHeader min-h-[28vh]" : "FixCardHeader NoImage"}
                    floated={haveImage}>
                    <div className={`${!haveImage ? "relative" : "absolute"}  top-0 p-2 justify-between w-full flex items-end `}>
                        <button onClick={(e: any) => change(e)}>
                            <Chip value={category} className="rounded-full h-max text-ellipsis shadow" color="cyan">
                            </Chip>
                        </button>
                        <Chip value={(new Date(createdAt)).toLocaleDateString('fr-FR')} className={`rounded-full GrayChip h-max flex items-center gap-2 shadow font-medium `}>
                        </Chip>
                    </div>
                    {image &&

                        <img
                            src={image as any}
                            alt={title}
                            className="h-full w-full object-cover"
                        />
                    }
                </CardHeader>
                <CardBody className="FixCardBody">
                    <div className="flex w-full items-center justify-between">
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {title}
                        </Typography>

                        <Link to={`/flag/post${id}`} title={`signaler un problème sur ${title}`}>
                            <span className={`${flagged && "fill !text-red-500"} material-symbols-outlined !text-[1.2rem] opacity-80`}>flag_2</span>
                        </Link>
                    </div>
                    <div className="CardOverFlow">
                        <Typography color="blue-gray" className="mb-2">
                            {description}
                        </Typography>
                    </div>
                </CardBody>

                <CardFooter className="CardFooter mb-2">
                    <div className="flex items-center px-0 gap-2">
                        <Avatar src={userOrga?.image} size="sm" alt="avatar" withBorder={true} />
                        <div className="flex flex-col">
                            <Typography variant="small" className="font-normal !p-0">{userOrga?.firstName} - {userOrga?.lastName}</Typography>
                            <Typography variant="small" color="gray" >
                                {userOrga?.skills}
                            </Typography>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 ">
                        <button onClick={() => toggleLike(post.id, userId, setPost)}>
                            <Chip value={`${Likes?.length}`} variant="ghost" className="pr-3 pl-6 pt-2 rounded-full h-full flex items-center "
                                icon={<span className={`${ILike && 'fill !text-cyan-500'} material-symbols-outlined  !text-[1.2rem] pl-2 pt-0.5`}>thumb_up    </span>}>
                            </Chip></button>

                    </div>
                </CardFooter>
            </Card>
        </>
    )
}



