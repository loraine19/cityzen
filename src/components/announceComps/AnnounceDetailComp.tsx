import { Card, CardHeader, Typography, CardBody, CardFooter, Chip, Avatar } from "@material-tailwind/react";
import { post } from '../../types/type';
import { Link } from "react-router-dom";
import { usersFaker } from "../../datas/fakers/usersFaker";



export default function AnnounceDetailComp(props: { post: post, mines?: boolean, change: (e: any) => void, handleLike: (post: post) => void, isFlaged?: boolean, isLiked?: boolean }) {
    const { post, change, handleLike, isFlaged, isLiked } = props
    const { id, title, description, image, category, created_at, users, user_id } = props.post
    const haveImage = post.image ? true : false
    const userOrga = usersFaker.find(user => user.id === user_id)


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
                        <Chip value={(new Date(created_at)).toLocaleDateString('fr-FR')} className={`rounded-full GrayChip h-max flex items-center gap-2 shadow font-medium `}>
                        </Chip>
                    </div>
                    {image &&

                        <img
                            src={image}
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
                            <span className={`${isFlaged && "fill !text-red-500"} material-symbols-outlined !text-[1.2rem] opacity-80`}>flag_2</span>
                        </Link>
                    </div>
                    <div className="CardOverFlow">
                        <Typography color="blue-gray" className="mb-2">
                            {description}
                        </Typography>
                    </div>
                </CardBody>

                <CardFooter className="CardFooter">
                    <div className="flex items-center px-0 gap-2">
                        <Avatar src={userOrga?.avatar} size="sm" alt="avatar" withBorder={true} />
                        <div className="flex flex-col">
                            <Typography variant="small" className="font-normal !p-0">{userOrga?.firstName} - {userOrga?.lastName}</Typography>
                            <Typography variant="small" color="gray" >
                                {userOrga?.skills?.join(', ')}
                            </Typography>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button onClick={() => handleLike(post)}>
                            <Chip value={`.   ${users.length}`} variant="ghost" className="px-3 rounded-full h-full flex items-center gap-5"
                                icon={<span className={`${isLiked && 'fill !text-cyan-500'} material-symbols-outlined  !text-[1.2rem] pl-1 `}>thumb_up    </span>}>
                            </Chip></button>
                        <Link to={`/annonce/${id}`} className="flex items-center gap-2" title={`voir les details de ${title}`}><span className="material-symbols-outlined fill !text-[3rem] text-gray-900  fillThin">
                            arrow_circle_right
                        </span>
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}