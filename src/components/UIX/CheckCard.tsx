import { Button, Checkbox, List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react";
import { useState } from "react";

type chechCardProps = {
    categoriesArray: string[];
    setBoxSelected: any
    change: (e: any) => void;
};
export default function CheckCard(props: chechCardProps,) {
    const { categoriesArray, change, setBoxSelected } = props
    const boxs = document.querySelectorAll(`[name="boxs"]`)
    const [check] = useState(true)
    return (

        <div className="w-full !m-0 !flex justify-center items-center rounded-full">

            <List className="flex-row flex w-full justify-evenly items-center gap-4 py-1 overflow-auto
         ">
                {categoriesArray.map((category, index) => (
                    <ListItem className="min-w-max pr-4 py-0.5 pl-1 rounded-full !m-0 bg-white shadow" key={index}>
                        <label
                            htmlFor={category}
                            className="flex w-max cursor-pointer items-center    "
                        >
                            <ListItemPrefix>
                                <Checkbox
                                    name="boxs"
                                    defaultChecked={check}
                                    id={category}
                                    value={category}
                                    color="cyan"
                                    ripple={false}
                                    className="h-6 w-6 rounded-full border-none bg-cyan-500/30 transition-all  hover:before:opacity-0 opacity-90"
                                    containerProps={{
                                        className: "!p-0",
                                    }}
                                    onChange={(e) => { change(e); console.log(e) }}

                                />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className=" text-sm whitespace-nowrap">
                                {category}
                            </Typography>
                        </label>
                    </ListItem>))}

            </List>
            <div className="flex gap-3 opacity-85 items-center px-1 rounded-full">
                <Button
                    color="red"
                    className="rounded-full border-none flex h-max w-max p-0.5 "
                    onClick={() => { boxs.forEach((box: any) => { box.checked = false }); setBoxSelected([]) }}><span className="material-symbols-outlined !text-[1.2rem] pt-[1px]">close</span></Button>
                <Button
                    color="green"
                    className="rounded-full border-none flex h-max w-max p-0.5"

                    onClick={() => { boxs.forEach((box: any) => { box.checked = true }); setBoxSelected(categoriesArray) }}><span className="material-symbols-outlined !text-[1.2rem] pt-[1px]" >check</span>
                </Button>
            </div>
        </div >
    );
}
