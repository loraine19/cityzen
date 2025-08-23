import { Card, CardHeader, Typography, CardBody, CardFooter, Chip } from "@material-tailwind/react";
import { Icon } from "../../../common/IconComp";
import { useState, } from "react";
import { Flag } from "../../../../../domain/entities/Flag";
import { Like } from "../../../../../domain/entities/Like";
import { useUserStore } from "../../../../../application/stores/user.store";
import { DateChip } from "../../../common/ChipDate";
import { PostView } from "../../../../views/viewsEntities/postViewEntities";
import { Title } from "../../../common/CardTitle";
import { ProfileDiv } from "../../../common/ProfilDiv";
import { User } from "../../../../../domain/entities/User";

export default function PostDetailCard(props: { post: PostView, mines?: boolean, change: (e: any) => void }) {
    const [post, setPost] = useState<PostView>(props.post)
    const { id, title, description, image, categoryS, createdAt, Likes, toogleLike } = post
    const { user } = useUserStore()
    const userId: number = user.id
    const haveImage: boolean = post?.image ? true : false
    const Author: User = post?.User
    const flagged: boolean = post?.Flags?.find((flag: Flag) => flag.userId === userId) ? true : false
    const ILike: boolean = post?.Likes?.find((like: Like) => like.userId === userId) ? true : false

    return (
        <div className="DetailCardDiv">
            <Card className="FixCard w-respLarge" >
                <CardHeader
                    className={haveImage ? "FixCardHeader" : "FixCardHeaderNoImage"}
                    floated={haveImage}>
                    <div className={haveImage ? "ChipDiv" : "ChipDivNoImage"}>
                        <Chip
                            size='sm'
                            value={categoryS}
                            className={'CyanChip'}>
                        </Chip>
                        <DateChip
                            start={createdAt}
                            prefix="publié le " />
                    </div>
                    {image &&
                        <img
                            onError={(e) => e.currentTarget.src = "/image/placeholder.jpg"}
                            src={image as any}
                            alt={title}
                            className="h-full w-full object-cover" />}
                </CardHeader>
                <CardBody className="FixCardBody">
                    <Title
                        title={title}
                        flagged={flagged}
                        id={id}
                        type="annonce"
                        group={post.Group}
                    />
                    <div className="CardOverFlow">
                        <Typography
                            color="blue-gray"
                            className="mb-2">
                            {description}
                        </Typography>
                    </div>
                </CardBody>
                <CardFooter className="CardFooter flex gap-4 mb-2">
                    <ProfileDiv profile={Author} />
                    <div className="flex items-center gap-2 ">
                        <button
                            onClick={async () => {
                                const data = await toogleLike()
                                data && setPost(data)
                            }}>
                            <Chip
                                value={`${Likes?.length}`}
                                variant="ghost"
                                className="!h-max !px-4 rounded-full GrayChip flex items-center "
                                icon={
                                    <Icon
                                        icon="thumb_up"
                                        size="md"
                                        fill={ILike}
                                        color={ILike ? "rose" : "gray"}
                                        style=" hover:text-cyan-800 "
                                        title={ILike ? "Je n'aime plus" : "J'aime ce post"} />}>
                            </Chip>
                        </button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}



