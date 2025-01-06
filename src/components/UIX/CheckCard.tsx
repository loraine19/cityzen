import { Button, Checkbox, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { useState } from "react";

type checkCardProps = {
    categoriesArray: string[];
    setBoxSelected: any
    change?: (e: any) => void;
};
export default function CheckCard(props: checkCardProps) {
    const { categoriesArray, change, setBoxSelected } = props;
    const boxs = document.querySelectorAll(`[name="boxs"]`);
    const [checkedState, setCheckedState] = useState(new Array(categoriesArray.length).fill(true));
    return (
        <div className="w-full !m-0 !flex justify-center items-center rounded-full ">
            <List className="flex-row flex w-full justify-evenly items-center !p-0 overflow-auto">
                {categoriesArray.map((category, index) => (
                    <ListItem className="!p-0.5 !pb-1 rounded-full hover:!bg-transparent " key={index}>
                        <label htmlFor={category} className="flex flex-1 ">
                            <ListItemPrefix className={`!px-4 py-0.5 !m-0 w-full flex items-center justify-center rounded-2xl shadow ${checkedState[index] ? 'bg-cyan-500 text-white' : 'bg-white'}`}>
                                <Checkbox
                                    labelProps={{ className: `${checkedState[index] ? 'text-white' : ''} whitespace-nowrap text-sm font-normal` }}
                                    iconProps={{ className: "hidden" }}
                                    checked={checkedState[index]}
                                    label={category}
                                    id={category}
                                    value={category}
                                    color="gray"
                                    ripple={false}
                                    containerProps={{ className: "hidden" }}
                                    onChange={(e) => {
                                        if (change) change(e);
                                        const updatedCheckedState = checkedState.map((item, idx) =>
                                            idx === index ? e.target.checked : item
                                        );
                                        setCheckedState(updatedCheckedState);
                                    }}
                                />
                            </ListItemPrefix>
                        </label>
                    </ListItem>))}
            </List>
            <div className="flex gap-1 opacity-95 items-center px-1 rounded-full">
                <Button
                    color="red"
                    className="rounded-full border-none flex h-max w-max p-0.5 "
                    onClick={() => { boxs.forEach((box: any) => { box.checked = false }); setBoxSelected([]); setCheckedState(new Array(categoriesArray.length).fill(false)); }}><span className="material-symbols-outlined !text-[1.2rem] pt-[1px]">close</span></Button>
                <Button
                    color="green"
                    className="rounded-full border-none flex h-max w-max p-0.5"
                    onClick={() => { boxs.forEach((box: any) => { box.checked = true }); setBoxSelected(categoriesArray); setCheckedState(new Array(categoriesArray.length).fill(true)); }}><span className="material-symbols-outlined !text-[1.2rem] pt-[1px]" >check</span>
                </Button>
            </div>
        </div >
    );
}
