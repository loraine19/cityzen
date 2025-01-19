import { Card, CardHeader, Typography, CardBody, CardFooter, Chip } from "@material-tailwind/react";
import { useContext, useState } from "react";
import UserContext from "../../../../../contexts/user.context";
import { Flag } from "../../../../../domain/entities/Flag";
import { Like } from "../../../../../domain/entities/Like";
import { Post } from "../../../../../domain/entities/Post";
import { Profile } from "../../../../../domain/entities/Profile";
import { PostService } from "../../../../../domain/repositories-ports/PostRepository";
import { getLabel, postCategories, GenereMyActions, toggleLike } from "../../../../../infrastructure/services/utilsService";
import ModifBtnStack from "../../../common/ModifBtnStack";
import { DateChip, Title, ProfileDiv, Icon } from "../../../common/SmallComps";
import { Action } from "../../../../../domain/entities/frontEntities";



export default function AnnouncesComp(props: { post: Post, mines?: boolean, change: (e: any) => void, update?: () => void }) {
    const { userProfile } = useContext(UserContext)
    const userId: number = userProfile.userId
    const { mines, change, update } = props
    const [post, setPost] = useState<Post>(props.post)
    const { id, title, description, image, category, createdAt, Likes, User } = post
    const flagged: boolean = post.Flags?.find((flag: Flag) => flag.userId === userId) ? true : false
    const haveImage: boolean = post.image ? true : false
    const Author: Profile = User.Profile
    const ILike: boolean = post.Likes.find((like: Like) => like.userId === userId) ? true : false
    const label: string = getLabel(category, postCategories)
    const { deletePost } = new PostService()
    const myActions: Action[] = GenereMyActions(post, "annonce", deletePost)

    return (
        <>
            <Card className={`CardFix  ${haveImage ? "!h-full " : "!h-[calc(100%+1.5rem)] -mt-6"}`}>
                <CardHeader className={haveImage ? "FixCardHeader" : "FixCardHeader NoImage"}
                    floated={haveImage}>
                    <div className={` ${haveImage && "absolute p-2"} h-max w-full flex justify-between `}>
                        <button onClick={(e: any) => change(e)}>
                            <Chip size="sm" value={`${label}`} className="rounded-full h-max text-ellipsis shadow " color="cyan">
                            </Chip>
                        </button>
                        <DateChip start={createdAt} prefix="publié le " />
                    </div>
                    {image &&
                        <img
                            src={image as any}
                            alt={title}
                            className="h-full w-full object-cover"
                        />}
                </CardHeader>
                <CardBody className={` FixCardBody !flex-1`}>
                    <Title title={title} flagged={flagged} id={id} />
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
                        <ProfileDiv profile={Author} /> :
                        <ModifBtnStack actions={myActions} update={update} />}
                    <div className="flex items-center gap-2">
                        <button onClick={() => { toggleLike(post.id, userId, setPost); update && update() }} className={mines ? `hidden md:flex` : `flex`}>
                            <Chip size="md" value={`${Likes?.length}`} variant="ghost"
                                className="pl-5  rounded-full h-full flex items-center"
                                icon={<Icon icon="thumb_up" size="xl" fill={ILike} color={ILike ? "cyan" : "gray"} style=" -mt-1.5 !pl-1.5" />}>
                            </Chip></button>
                        <Icon icon="arrow_circle_right" link={`/service/${id}`} title={`voir les details de service  ${title}`} size="4xl px-1" fill />
                    </div>
                </CardFooter>
            </Card >
        </>
    )
}