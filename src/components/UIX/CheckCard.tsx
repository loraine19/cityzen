import { Checkbox, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Icon } from "./SmallComps";

type checkCardProps = {
    categoriesArray: string[];
    setBoxSelected: (selected: string[]) => void;
    boxSelected: string[];
    color?: string;
};

export default function CheckCard(props: checkCardProps) {
    const { categoriesArray, boxSelected, setBoxSelected } = props;
    const color = props.color || "cyan-500";

    useEffect(() => {
        setCheckedState(categoriesArray.map(category => boxSelected.includes(category)));
    }, [boxSelected, categoriesArray]);

    const [checkedState, setCheckedState] = useState<boolean[]>(categoriesArray.map(category => boxSelected.includes(category)));

    const handleCheckboxChange = (index: number, checked: boolean) => {
        const updatedCheckedState = checkedState.map((item, idx) => (idx === index ? checked : item));
        setCheckedState(updatedCheckedState);

        const updatedBoxSelected = categoriesArray.filter((_, idx) => updatedCheckedState[idx]);
        setBoxSelected(updatedBoxSelected);
    };

    return (
        <div className="w-full !m-0 !flex justify-center items-center rounded-full">
            <List className="flex-row flex w-full min-w-max justify-evenly items-center !p-0 overflow-auto">
                {categoriesArray.map((category, index) => (
                    <ListItem className="!pt-0.5 px-0.5 !pb-1 overflow-auto min-w-max hover:!bg-transparent" key={index}>
                        <label htmlFor={category} className="flex flex-1">
                            <ListItemPrefix className={`!px-0 py-0.5 !m-0 w-full flex items-center justify-center rounded-2xl  border-[1px] border-${color}  ${checkedState[index] ?
                                `bg-${color} text-white w-full` : `bg-transparent !text-${color} !min-w-full `}`}>
                                <Checkbox
                                    labelProps={{ className: `${checkedState[index] ? 'text-white w-full' : `text-${color}`} whitespace-nowrap text-sm font-normal !min-w-max px-3 ` }}
                                    iconProps={{ className: "hidden" }}
                                    checked={checkedState[index]}
                                    label={category}
                                    id={category}
                                    value={category}
                                    ripple={false}
                                    containerProps={{ className: "hidden" }}
                                    onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                                />
                            </ListItemPrefix>
                        </label>
                    </ListItem>
                ))}
            </List>
            <div className="flex gap-1 opacity-95 items-center px-1 rounded-full">

                <Icon icon="cancel" size="3xl" color="red" style="thin hover:!p-0" onClick={() => {
                    setBoxSelected([]);
                    setCheckedState(new Array(categoriesArray.length).fill(false));
                }}
                ></Icon>
                <Icon icon="check_circle" size="3xl" color="green" style="thin !p-0 hover:!p-0" onClick={() => {
                    setBoxSelected(categoriesArray);
                    setCheckedState(new Array(categoriesArray.length).fill(true));
                }} />
            </div>
        </div>
    );
}
