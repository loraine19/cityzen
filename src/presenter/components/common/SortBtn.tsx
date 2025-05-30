import { Menu, MenuHandler, MenuList } from "@material-tailwind/react";
import { Icon } from "./IconComp";
import { SortLabel } from "../../../domain/entities/frontEntities"

type SortButtonProps = {
    sortList: SortLabel[],
    color?: string,
    setSelectedSort: (value: string) => void,
    selectedSort: string
    reverse: boolean
    setReverse: (value: boolean) => void
}

export const SortButton = ({ sortList, color = 'cyan', setSelectedSort, selectedSort, reverse = false, setReverse }: SortButtonProps) => {


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
                            <div
                                key={index}
                                className="rounded-2xl pl-3 py-0 flex items-center font-normal justify-between gap-4 hover:!bg-white hover:!text-underline" >
                                {item.label}
                                <div className="flex items-center"> {(selectedSort === (item.key ?? item.label)) &&
                                    <Icon
                                        onClick={() => {
                                            item.action()
                                            setSelectedSort(item.key ?? item.label)
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
                                            setSelectedSort(item.key ?? item.label)
                                            setReverse(false)
                                        }}
                                        title={'Trier par ' + item.label}
                                        disabled={(selectedSort === (item.key ?? item.label))}
                                        color={selectedSort === (item.key ?? item.label) ? color : 'gray'}
                                        icon={item.icon} fill />
                                </div>
                            </div>
                        )}
                    </MenuList>
                </Menu>
            </div>

        </div >
    )
}