import { Menu, MenuHandler, MenuList } from "@material-tailwind/react";
import { Icon } from "./IconComp";
import { SortLabel } from "../../../domain/entities/frontEntities"

type SortButtonProps = {
    sortList: SortLabel[],
    action: () => void,
    color?: string,
    setSelectedSort: (value: string) => void,
    selectedSort: string
    reverse: boolean
    setReverse: (value: boolean) => void
}

export const SortButton = ({ sortList, color = 'cyan', setSelectedSort, selectedSort, reverse = false, setReverse, action }: SortButtonProps) => {


    return (
        <div className="relative flex justify-between items-center  ">
            <div className="flex items-center w-full h-full  gap-2">
                <Menu
                    placement="bottom-end">
                    <MenuHandler className="relative z-auto h-max min-w-max flex items-center  cursor-pointer">
                        <div className="flex items-center relative">
                            <Icon
                                icon="sort"
                                size="lg"
                            />
                        </div>
                    </MenuHandler>
                    <MenuList className="backdropBlur overflow-hidden bg-transparent m-auto !border-none shadow-none  flex rounded-2xl justify-end h-[calc(100%-110px)] w-respXl ">
                        <div className="p-4 h-max bg-white shadow-lg rounded-2xl border relative right-0 flex flex-col justify-start">
                            {sortList.map((item: SortLabel, index: number) =>
                                <div
                                    key={index}
                                    className="rounded-2xl pl-3 py-0 flex items-center font-normal justify-between gap-4 hover:!bg-white hover:!text-underline" >
                                    {item.label}
                                    <div className="flex items-center">
                                        {(selectedSort === (item.key ?? item.label)) &&
                                            <Icon
                                                onClick={() => {
                                                    action()
                                                    setSelectedSort(item.key ?? item.label)
                                                    setReverse(!reverse)
                                                }}
                                                color={color}
                                                title={'Trier par inverse ' + item.label}
                                                style="!p-0 -mr-1"
                                                icon={reverse ? 'arrow_drop_up' : 'arrow_drop_down'} />}
                                        <Icon
                                            size={'lg'}
                                            style={`!p-1 `}
                                            onClick={() => {
                                                action();
                                                setSelectedSort(item.key ?? item.label)
                                                setReverse(!reverse)
                                            }}
                                            title={'Trier par ' + item.label}
                                            disabled={(selectedSort === (item.key ?? item.label))}
                                            color={selectedSort === (item.key ?? item.label) ? color : 'gray'}
                                            icon={item.icon} fill />
                                    </div>
                                </div>
                            )}
                        </div>
                    </MenuList>
                </Menu>
            </div>

        </div >
    )
}