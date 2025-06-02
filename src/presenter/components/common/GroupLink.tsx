import { Popover, PopoverHandler, PopoverContent, Typography, Chip } from "@material-tailwind/react"
import { Icon } from "./IconComp"
import { GroupView } from "../../views/viewsEntities/GroupViewEntity"
import { groupCategories } from "../../constants"
import { Group } from "../../../domain/entities/Group"

type GroupDivProps = { group: GroupView | Group }
export const GroupLink: React.FC<GroupDivProps> = ({ group }) => {
    const category: string = groupCategories.find(cat => cat.value === group?.category)?.label ?? 'Autre'

    return (
        <>
            <div className={`flex items-center  pb-0.5`}>
                <Popover placement="bottom-start">
                    <PopoverHandler>
                        <Typography
                            variant="small"
                            className={'italic text-gray-600 !line-clamp-1'}>
                            ⌖ {group?.name}
                        </Typography>
                    </PopoverHandler>
                    <PopoverContent className=" w-72 z-50 flex gap-2 flex-col ">
                        <div className=" flex justify-between items-center border-b border-blue-gray-50  ">
                            <p>groupe {group?.name}</p>
                            <Icon
                                bg clear
                                fill
                                link={`/groupe/${group?.id}`}
                                icon="arrow_circle_right" />
                        </div>
                        <div className="flex items-center gap-2 justify-between text-gray-500">
                            <p className="text-xs italic ">
                                {group?.Address?.address}, {group?.Address?.zipcode} {group?.Address?.city}
                            </p>
                            <Chip
                                size='sm'
                                value={category}
                                className="GrayChip text-ellipsis scale-[0.8] " >
                            </Chip></div>
                    </PopoverContent>
                </Popover>
            </div>
        </>

    )
}