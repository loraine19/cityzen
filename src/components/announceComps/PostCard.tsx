import { Card, CardHeader, Typography, CardBody, CardFooter, Chip } from "@material-tailwind/react";
import ModifBtnStack from "../UIX/ModifBtnStack";
import { Flag, Like, Post } from "../../types/class";
import { useContext, useState } from "react";
import UserContext from "../../contexts/user.context";
import { toggleLike, GenereMyActions, postCategories, getLabel } from "../../functions/GetDataFunctions";
import { deletePost } from "../../functions/API/postsApi";
import { AuthorDiv, DateChip, FlagIcon, Icon } from "../UIX/SmallComps";

export default function AnnouncesComp(props: { post: Post, mines?: boolean, change: (e: any) => void, update?: () => void }) {
    const { user } = useContext(UserContext)
    const userId = user.userId
    const { mines, change, update } = props
    const [post, setPost] = useState<Post>(props.post)
    const { id, title, description, image, category, createdAt, Likes, User } = post
    const flagged: boolean = post.Flags?.find((flag: Flag) => flag.userId === userId) ? true : false
    const haveImage = post.image ? true : false
    const Author = User.Profile
    const ILike: boolean = post.Likes.find((like: Like) => like.userId === userId) ? true : false
    const label = getLabel(category, postCategories)
    const myActions = GenereMyActions(post, "annonce", deletePost)

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
                        <DateChip createdAt={createdAt} prefix="publié le " />
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
                        <FlagIcon flagged={flagged} id={id} type="post" />

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
                        <AuthorDiv profile={Author} /> :
                        <ModifBtnStack actions={myActions} update={update} />}
                    <div className="flex items-center gap-2">
                        <button onClick={() => { toggleLike(post.id, userId, setPost); update && update() }} className={mines ? `hidden md:flex` : `flex`}>
                            <Chip value={`${Likes?.length}`} variant="ghost"
                                className="pl-4 rounded-full h-full flex items-center gap-5"
                                icon={<Icon icon="thumb_up" size="xl" fill={ILike} color={ILike ? "cyan" : "gray"} style="-mt-1 pl-1" />}>
                            </Chip></button>

                        <Icon icon="arrow_circle_right" link={`/annonce/${id}`} title={`voir les details de ${title}`} size="4xl" fill />
                    </div>
                </CardFooter>
            </Card >
        </>
    )
}