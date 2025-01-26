import { Card, CardHeader, Typography, CardBody, CardFooter, Chip } from "@material-tailwind/react";
import { DateChip, Icon, ProfileDiv, Title } from "../../../common/SmallComps";
import { useState, } from "react";
import { Flag } from "../../../../../domain/entities/Flag";
import { Like } from "../../../../../domain/entities/Like";
import { Post } from "../../../../../domain/entities/Post";
import { Profile } from "../../../../../domain/entities/Profile";
import { getLabel, postCategories, toggleLike } from "../../../../../infrastructure/services/utilsService";
import { useUserStore } from "../../../../../application/stores/user.store";



export default function AnnounceDetailComp(props: { post: Post, mines?: boolean, change: (e: any) => void }) {
    const [post, setPost] = useState<Post>(props.post)
    const { id, title, description, image, category, createdAt, Likes } = post
    const { user } = useUserStore()
    const userId: number = user.id
    const haveImage: boolean = post.image ? true : false
    const Author: Profile = post?.User?.Profile
    const flagged: boolean = post.Flags?.find((flag: Flag) => flag.userId === userId) ? true : false
    const ILike: boolean = post.Likes?.find((like: Like) => like.userId === userId) ? true : false


    return (
        <>
            <Card className="FixCard w-respLarge" >
                <CardHeader className={haveImage ? "FixCardHeader" : "FixCardHeaderNoImage"}
                    floated={haveImage}>
                    <div className={haveImage ? "ChipDiv" : "ChipDivNoImage"}>
                        <Chip value={getLabel(category, postCategories)} className={'CyanChip'}>
                        </Chip>
                        <DateChip start={createdAt} prefix="publié le " />
                    </div>
                    {image && <img src={image as any} alt={title} className="h-full w-full object-cover" />}
                </CardHeader>
                <CardBody className="FixCardBody">
                    <Title title={title} flagged={flagged} id={id} />
                    <div className="CardOverFlow">
                        <Typography color="blue-gray" className="mb-2">
                            {description}
                        </Typography>
                    </div>
                </CardBody>
                <CardFooter className="CardFooter mb-2">
                    <ProfileDiv profile={Author} />
                    <div className="flex items-center gap-2 ">
                        <button onClick={() => toggleLike(post.id, userId, setPost)}>
                            <Chip value={`${Likes?.length}`} variant="ghost"
                                className="!h-max pr-3 pl-6  rounded-full  flex items-center "
                                icon={
                                    <Icon icon="thumb_up"
                                        size="2xl"
                                        fill={ILike}
                                        color={ILike ? "cyan" : "gray"}
                                        style="-mt-2 pl-4 pt-0 hover:text-cyan-800 "
                                        title={ILike ? "Je n'aime plus" : "j'aime ce post"} />}>
                            </Chip>
                        </button>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}



