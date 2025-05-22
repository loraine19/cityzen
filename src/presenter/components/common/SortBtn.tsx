import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { Icon } from "./IconComp";
import { SortLabel } from "../../../domain/entities/frontEntities";
import { useState } from "react";

export const SortButton = (props: { sortList: SortLabel[], color?: string }) => {
    const { sortList, color } = props
    const [selectedSort, setSelectedSort] = useState<String>(sortList[0].label)
    const [reverse, setReverse] = useState<boolean>(false)

    return (
        <div className="relative flex justify-between items-center ">
            <div className="flex items-center  gap-2">
                <Menu placement="bottom-end">
                    <MenuHandler className="relative h-max min-w-max z-50 flex items-center  cursor-pointer">
                        <div className="flex items-center relative">
                            <Icon
                                icon="sort"
                                size="3xl"
                            />
                        </div>
                    </MenuHandler>
                    <MenuList className="!rounded-2xl !shadow-l py-3 px-2">
                        {sortList.map((item: SortLabel, index: number) =>
                            <MenuItem
                                key={index}
                                className="rounded-2xl pl-3 py-0 flex items-center font-normal justify-between gap-4 hover:!bg-white hover:!text-underline" >
                                {item.label}
                                <div className="flex items-center"> {(selectedSort === item.label) &&
                                    <Icon
                                        onClick={() => {
                                            reverse ? item.action() : item.reverse();
                                            setSelectedSort(item.label)
                                            setReverse(!reverse)
                                        }}
                                        color={color}
                                        title={'Trier par inverse ' + item.label}
                                        style="!p-0 -mr-1"
                                        icon={reverse ? 'arrow_drop_up' : 'arrow_drop_down'} />}
                                    <Icon
                                        style={`!p-1 `}
                                        onClick={() => {
                                            item.action();
                                            setSelectedSort(item.label)
                                            setReverse(false)
                                        }}
                                        title={'Trier par ' + item.label}
                                        disabled={selectedSort === item.label}
                                        color={selectedSort === item.label ? color : 'gray'}
                                        icon={item.icon} fill />
                                </div>
                            </MenuItem>
                        )}
                    </MenuList>
                </Menu>
            </div>

        </div >
    )
}