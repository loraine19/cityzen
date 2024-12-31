import { Card, CardHeader, Typography, CardBody, CardFooter, Chip, Avatar } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import ModifBtnStack from "../UIX/ModifBtnStack";
import { Flag, Like, Post } from "../../types/class";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/user.context";
import { toggleLike, isFlaged, GenereMyActions, postCategories, getLabel } from "../../functions/GetDataFunctions";
import { getFlagsPost } from "../../functions/API/flagsApi";
import { deletePost } from "../../functions/API/postsApi";

export default function AnnouncesComp(props: { post: Post, mines?: boolean, change: (e: any) => void, update?: () => void }) {
    const { user } = useContext(UserContext)
    const userId = user.userId
    const [flags, setFlags] = useState<Flag[]>([])
    1 > 2 && console.log(flags)
    const [flagged, setFlagged] = useState<boolean>(false)
    const { mines, change, update } = props
    const [post, setPost] = useState<Post>(props.post)
    const { id, title, description, image, category, createdAt, Likes, User } = post
    const haveImage = post.image ? true : false
    const userOrga = User.Profile
    const ILike: boolean = post.Likes.find((like: Like) => like.userId === userId) ? true : false
    const label = getLabel(category, postCategories)
    // console.log(label, category)
    const myActions = GenereMyActions(post, "annonce", deletePost)

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
            <Card className={`CardFix  ${haveImage ? "!h-full " : "!h-[calc(100%+1.5rem)] -mt-6"}`}>
                <CardHeader className={haveImage ? "FixCardHeader" : "FixCardHeader NoImage"}
                    floated={haveImage}>
                    <div className={` ${haveImage && "absolute p-2"} h-max w-full flex justify-between `}>
                        <button onClick={(e: any) => change(e)}>
                            <Chip value={`${label}`} className="rounded-full h-max text-ellipsis shadow " color="cyan">
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
                        />}
                </CardHeader>
                <CardBody className={` FixCardBody !flex-1`}>
                    <div className="flex sticky top-0 bg-white w-full items-center justify-between">
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {title}
                        </Typography>
                        <Link to={`/flag${flagged ? '/edit' : ''}/post${id}`} title={`signaler un problème sur ${title}`}>
                            <span className={`${flagged && "fill !text-red-500"} 
                                material-symbols-outlined !text-[1.2rem] opacity-80`}>
                                flag_2
                            </span>
                        </Link>

                    </div>
                    <div className="flex flex-col h-full">
                        <div className="CardOverFlow">
                            <Typography color="blue-gray" className="mb-2">
                                {description}...
                            </Typography>
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="CardFooter">
                    {!mines ?
                        <div className="flex items-center px-0 gap-2">
                            <Avatar src={userOrga?.image} size="sm" alt="avatar" withBorder={true} />
                            <div className="hidden lg:flex lg:flex-col">
                                <Typography variant="small" className="font-normal !p-0">{userOrga?.firstName} - {userOrga?.lastName}</Typography>
                                <Typography variant="small" color="gray" >
                                    . {userOrga?.skills?.toString()}
                                </Typography>
                            </div>
                        </div> :
                        <ModifBtnStack actions={myActions} update={update} />}
                    <div className="flex items-center gap-2">
                        <button onClick={() => { toggleLike(post.id, userId, setPost); update && update() }} className={mines ? `hidden md:flex` : `flex`}>
                            <Chip value={`${Likes?.length}`} variant="ghost"
                                className="pl-4 rounded-full h-full flex items-center gap-5"
                                icon={<span className={`${ILike ? "fill !text-cyan-500" : "!text-gray-900 "} material-symbols-outlined !text-[1.2rem] ml-1 `}>thumb_up</span>}>
                            </Chip></button>
                        <Link to={`/annonce/${id}`} className="flex items-center gap-2" title={`voir les details de ${title}`}>
                            <span className="material-symbols-outlined fill !text-[3rem] text-gray-900  fillThin">
                                arrow_circle_right
                            </span>
                        </Link>
                    </div>
                </CardFooter>
            </Card >
        </>
    )
}