import { Button, Input, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { useEffect, } from "react";

type selectSearchProps = {
    cat: string;
    setCat: any;
    category: string[]
    search: (value: string) => void
};
export function SelectSearch(props: selectSearchProps) {
    const { cat, setCat, category, search } = props
    useEffect(() => {
        setCat(cat)
    }, [cat])
    return (
        <div className="flex m-auto !rounded-full h-7 w-[90%] items-center bg-white shadow !mb-1.5" >
            <Menu placement="bottom-start">
                <MenuHandler>
                    <Button
                        ripple={false}
                        variant="text"
                        color="blue-gray"
                        size="sm"
                        className="flex items-center  bg-none rounded-full py-1 !px-4"
                    >
                        <span className="material-symbols-outlined">arrow_drop_down</span>
                    </Button>
                </MenuHandler>
                <MenuList className="flex flex-col">
                    {category.map((name: string, index: number) => {
                        return (
                            <MenuItem
                                key={index}
                                value={name}
                                className="flex items-center gap-2 !text-md"
                                onClick={() => setCat(name)}
                            >
                                {name}
                            </MenuItem>
                        );
                    })}
                </MenuList>
            </Menu>
            <Input
                type="search"
                placeholder="Rechercher"
                className="bg-none border-none"
                labelProps={{
                    className: "before:content-none after:content-none border-none",
                }}
                containerProps={{
                    className: "min-w-0 border-none ",
                }}
                value={cat}
                onChange={(e) => { setCat(e.target.value); console.log(cat) }}
                onSubmit={() => search(cat)}

            />
            <Button
                ripple={false}
                variant="text"
                color="blue-gray"
                size="sm"
                onClick={() => search(cat)}
                className="flex items-center  bg-none rounded-full py-1 !px-4"
            >
                <span className="material-symbols-outlined">search</span>
            </Button>

        </div>
    );
}
