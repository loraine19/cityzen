import { Popover, PopoverHandler, PopoverContent, Typography } from "@material-tailwind/react"
import { Group } from "../../../domain/entities/Group"

type ProfileDivProps = { group: Group }
export const GroupLink: React.FC<ProfileDivProps> = ({ group }) => {

    console.log(group)

    return (
        <>
            <div className={`flex  items-center  p-0 `}>
                <Popover placement="bottom-start">
                    <PopoverHandler>
                        <Typography
                            variant="small"
                            className={'italic text-gray-500'}>
                            ⌖ {group?.name}
                        </Typography>
                    </PopoverHandler>
                    <PopoverContent className=" w-72 z-50 ">
                        <div className=" flex flex-col gap-6 border-b border-blue-gray-50  pb-2 ">
                            <p>groupe {group?.name}</p>
                            <p> {group?.Address?.address}, {group?.Address?.city}</p>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </>

    )
}