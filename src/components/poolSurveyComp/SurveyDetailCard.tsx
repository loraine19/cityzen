import { Card, CardHeader, Typography, CardBody, CardFooter, Chip, Avatar } from "@material-tailwind/react";
import { Flag, Survey, Vote } from "../../types/class";
import UserContext from "../../contexts/user.context";
import { useContext, useState } from "react";
import { toggleLike } from "../../functions/GetDataFunctions";
import { DateChip, FlagIcon } from "../UIX/SmallComps";


export default function SurveyDetailCard(props: { element: Survey, mines?: boolean, change: (e: any) => void }) {
    const [element, setElement] = useState<Survey>(props.element)
    const { change } = props
    const { id, title, description, image, category, createdAt, Votes, Flags } = element
    const user = useContext(UserContext)
    const userId = user.user.userId
    const haveImage = element.image ? true : false
    const author = element?.User?.Profile
    const flagged: boolean = Flags?.find((flag: Flag) => flag.userId === userId) ? true : false
    const ILike: boolean = Votes?.find((vote: Vote) => vote.userId === userId) ? true : false


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
                        <DateChip createdAt={createdAt} />
                    </div>
                    {image &&
                        <img
                            src={image as any}
                            alt={title}
                            className="h-full w-full object-cover" />}
                </CardHeader>
                <CardBody className="FixCardBody">
                    <div className="flex w-full items-center justify-between">
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {title}
                        </Typography>

                        <FlagIcon flagged={flagged} id={id} type="survey" />
                    </div>
                    <div className="CardOverFlow">
                        <Typography color="blue-gray" className="mb-2">
                            {description}
                        </Typography>
                    </div>
                </CardBody>

                <CardFooter className="CardFooter mb-2">
                    <div className="flex items-center px-0 gap-2">
                        <Avatar src={author?.image as string} size="sm" alt="avatar" withBorder={true} />
                        <div className="flex flex-col">
                            <Typography variant="small" className="font-normal !p-0">{author?.firstName} - {author?.lastName}</Typography>
                            <Typography variant="small" color="gray" >
                                {author?.skills}
                            </Typography>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 ">
                        <button onClick={() => toggleLike(element.id, userId, setElement)}>
                            <Chip value={`${Votes?.length}`} variant="ghost" className="pr-3 pl-6 pt-2 rounded-full h-full flex items-center "
                                icon={<span className={`${ILike && 'fill !text-cyan-500'} material-symbols-outlined  !text-[1.2rem] pl-2 pt-0.5`}>thumb_up    </span>}>
                            </Chip></button>

                    </div>
                </CardFooter>
            </Card>
        </>
    )
}



