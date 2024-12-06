import { Card, CardHeader, Typography, CardBody, CardFooter, Chip, Avatar } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import ModifBtnStack from "../ModifBtnStack";
import { PostL, Profile } from "../../types/class";
import { useContext } from "react";
import DataContext from "../../contexts/data.context";
import UserContext from "../../contexts/user.context";

export default function AnnouncesComp(props:
    {
        post: PostL,
        mines?: boolean,
        change: (e: any) => void,
        handleClickDelete?: (index: number) => void,
        handleLike: (post: PostL) => void,
        isFlaged?: boolean
        isLiked?: boolean
    }) {
    const { data } = useContext(DataContext);
    const { user } = useContext(UserContext)
    const { post, mines, change, handleClickDelete, handleLike, isFlaged } = props
    const { id, title, description, image, category, created_at, users, user_id } = props.post
    const haveImage = post.image ? true : false
    const userOrga = data.profiles.find((user: Profile) => user.user_id === user_id)


    return (
        <>
            <Card className={`CardFix  ${haveImage ? "!h-full " : "!h-[calc(100%+1.5rem)] -mt-6"}`}>
                <CardHeader className={haveImage ? "FixCardHeader" : "FixCardHeader NoImage"}
                    floated={haveImage}>
                    <div className={` ${haveImage && "absolute p-2"} h-max w-full flex justify-between `}>
                        <button onClick={(e: any) => change(e)}>
                            <Chip value={`${category}`} className="rounded-full h-max text-ellipsis shadow " color="cyan">
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
                <CardBody className={` FixCardBody !flex-1`}>
                    <div className="flex sticky top-0 bg-white w-full items-center justify-between">
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {title}
                        </Typography>

                        <Link to={`/flag${isFlaged ? '/edit' : ''}/post${id}`} title={`signaler un problème sur ${title}`}>

                            <span className={`${isFlaged && "fill !text-red-500"} material-symbols-outlined !text-[1.2rem] opacity-80`}>flag_2</span>
                        </Link>

                    </div>
                    <div className="flex flex-col h-full">
                        <div className="CardOverFlow">

                            <Typography color="blue-gray" className="mb-2">
                                {description}...
                            </Typography></div>
                    </div>
                </CardBody>
                <CardFooter className="CardFooter">
                    {!mines ?
                        <div className="flex items-center px-0 gap-2">
                            <Avatar src={userOrga?.avatar} size="sm" alt="avatar" withBorder={true} />
                            <div className="hidden lg:flex lg:flex-col">
                                <Typography variant="small" className="font-normal !p-0">{userOrga?.firstName} - {userOrga?.lastName}</Typography>
                                <Typography variant="small" color="gray" >
                                    . {userOrga?.skills?.join(', ')}
                                </Typography>
                            </div>
                        </div> :
                        <ModifBtnStack id={id} handleClickDelete={handleClickDelete} />}
                    <div className="flex items-center gap-2">
                        <button onClick={() => handleLike(post)} className={mines ? `hidden md:flex` : `flex`}>
                            <Chip value={`${users?.length}`} variant="ghost" className="px-3 rounded-full h-full flex items-center gap-5"
                                icon={<span className={`${users?.find((userP: Profile) => userP.user_id === user.user_id) ? "fill !text-cyan-500" : "!text-gray-900 bg-blue-gray-200"} material-symbols-outlined !text-[1.2rem] pl-1 `}>thumb_up</span>}>


                            </Chip></button>

                        <Link to={`/annonce/${id}`} className="flex items-center gap-2" title={`voir les details de ${title}`}><span className="material-symbols-outlined fill !text-[3rem] text-gray-900  fillThin">
                            arrow_circle_right
                        </span>
                        </Link>
                    </div>
                </CardFooter>
            </Card >
        </>
    )
}