import { Card, CardHeader, Typography, CardBody, CardFooter, Chip } from "@material-tailwind/react";
import { useState } from "react";
import { Flag } from "../../../../../domain/entities/Flag";
import { Like } from "../../../../../domain/entities/Like";
import { Post } from "../../../../../domain/entities/Post";
import { Profile } from "../../../../../domain/entities/Profile";
import { PostService } from "../../../../../domain/repositoriesBase/PostRepository";
import ModifBtnStack from "../../../common/ModifBtnStack";
import { DateChip, Title, ProfileDiv, Icon } from "../../../common/SmallComps";
import { Action } from "../../../../../domain/entities/frontEntities";
import { useUserStore } from "../../../../../application/stores/user.store";
import { GenereMyActions, getLabel, postCategories, toggleLike } from "../../../../views/viewsEntities/utilsService";



export default function AnnouncesComp(props: { post: Post, mines?: boolean, change: (e: any) => void, update?: () => void }) {
    const { user } = useUserStore()
    const userId: number = user.id
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
            <Card className={haveImage ? "FixCard " : "FixCardNoImage  "}>
                <CardHeader className={haveImage ? "FixCardHeader" : "FixCardHeaderNoImage"}
                    floated={haveImage}>
                    <div className={haveImage ? "ChipDiv" : "ChipDivNoImage"}>
                        <button onClick={(e: any) => change(e)}>
                            <Chip size="sm" value={`${label}`} className={'CyanChip'}>
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
                <CardBody className={` FixCardBody`}>
                    <Title title={title} flagged={flagged} id={id} type="annonce" />
                    <div className="flex flex-col h-full">
                        <div className="CardOverFlow">
                            <Typography color="blue-gray" className="mb-2">
                                {description}
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
                                className="pl-4  rounded-full h-full flex items-center"
                                icon={<Icon icon="thumb_up" size="lg" fill={ILike} color={ILike ? "cyan" : "gray"} style=" -mt-1.5 !pl-2" />}>
                            </Chip></button>
                        <Icon icon="arrow_circle_right" link={`/annonce/${id}`} title={`voir les details de l'annonce  ${title}`} size="4xl px-1" fill />
                    </div>
                </CardFooter>
            </Card >
        </>
    )
}