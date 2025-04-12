import { Button, Input, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { Label } from "../../../domain/entities/frontEntities";
import { Icon } from "./IconComp";

type selectSearchProps = {
    searchCat: Label;
    setSearchCat: any;
    category: Label[]
    search: (label: Label) => void
};
export default function SelectSearch(props: selectSearchProps) {
    const { searchCat, setSearchCat, category, search } = props
    return (
        <div className="flex m-auto !rounded-full h-7 md:w-[90%] items-center bg-white shadow !mb-1.5" >
            <Menu placement="bottom-start">
                <MenuHandler>
                    <Button
                        ripple={false}
                        variant="text"
                        color="blue-gray"
                        size="sm"
                        className="flex items-center bg-none rounded-full py-1 !px-4" >
                        <Icon
                            data-cy="select"
                            icon="arrow_drop_down"
                            size='2xl' />
                    </Button>
                </MenuHandler>
                <MenuList className="flex flex-col">
                    {category.map((label: any, index: number) => {
                        return (
                            <MenuItem
                                data-cy={label.value}
                                key={index}
                                value={label.value}
                                className="flex items-center gap-2 !text-md"
                                onClick={() => { setSearchCat(label); search(label) }} >
                                {label.label}
                            </MenuItem>
                        );
                    })}
                </MenuList>
            </Menu>
            <Input
                onClick={(e) => e.stopPropagation()}
                data-cy="input-search"
                type="search"
                placeholder="Rechercher"
                className="bg-none border-none"
                labelProps={{ className: "before:content-none after:content-none border-none" }}
                containerProps={{ className: "min-w-0 border-none ", }}
                key={searchCat.value}
                value={searchCat.label}
                onChange={(e) => setSearchCat({ label: e.target.value, value: null })}
                onKeyDown={(e) => e.key === 'Enter' && search(searchCat)}
            />
            <Button
                data-cy="btn-search"
                ripple={false}
                variant="text"
                color="blue-gray"
                size="sm"
                onClick={() => search(searchCat)}
                className="flex items-center  bg-none rounded-full py-1 !px-4"
            >
                <Icon icon="search" />
            </Button>

        </div>
    );
}
