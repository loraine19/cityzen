import { Button, Input, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { Label } from "../../../domain/entities/frontEntities";
import { Icon } from "./IconComp";
import { useUxStore } from "../../../application/stores/ux.store";

type selectSearchProps = {
    searchCat: Label;
    setSearchCat: any;
    category: Label[]
    search: (label: Label) => void
};

export default function SelectSearch(props: selectSearchProps) {
    const { color } = useUxStore((state) => state);
    const { searchCat, setSearchCat, category, search } = props
    return (
        <div className="px-4 w-full py-1" >
            <div className="flex !rounded-full h-7  w-full items-center bg-white shadow " >
                <Menu placement="bottom-start">
                    <MenuHandler>
                        <div className="flex  pl-2 ">
                            <Icon
                                color={color ?? 'blue-gray'}
                                data-cy="select"
                                icon="arrow_drop_down"
                                size='2xl' />
                        </div>
                    </MenuHandler>
                    <MenuList className="flex  flex-col">
                        {category.map((label: any, index: number) => {
                            return (
                                <MenuItem
                                    data-cy={label.value}
                                    key={index}
                                    value={label.value}
                                    className="flex items-center gap-2 !capitalize font-medium hover:bg-blue-gray-50 px-4 "
                                    onClick={() => {
                                        setSearchCat(label);
                                        search(label)
                                    }} >
                                    {label.label}
                                </MenuItem>
                            );
                        })}
                    </MenuList>
                </Menu>
                <Input
                    onClick={(e) => {
                        e.stopPropagation();
                        setSearchCat({ label: '', value: null })
                    }}
                    data-cy="input-search"
                    type="search"
                    placeholder="Rechercher"
                    className="bg-none border-none"
                    labelProps={{ className: "before:content-none after:content-none border-none" }}
                    containerProps={{ className: "min-w-0 border-none ", }}
                    key={searchCat.value}
                    value={searchCat.label}
                    onChange={(e) => {
                        setSearchCat({ label: e.target.value, value: null })


                    }}
                    onKeyDown={(e) => e.key === 'Enter' && search(searchCat)}
                    autoComplete="on"
                    crossOrigin={undefined}

                />
                <Button
                    data-cy="btn-search"
                    ripple={false}
                    variant="text"
                    color="blue-gray"
                    size="sm"
                    onClick={() => search(searchCat)}
                    className="flex items-center  bg-none rounded-full py-1 !px-3"
                >
                    <Icon
                        size="lg"
                        icon="search" />
                </Button>

            </div>
        </div>
    );
}
