import { Checkbox, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Icon } from "./IconComp";
import { useNotificationStore } from "../../../application/stores/notification.store";

type checkCardProps = {
    categoriesArray: string[];
    setBoxSelected: (selected: string[]) => void;
    boxSelected: string[];
    color?: string;
};

export default function CheckCard(props: checkCardProps) {
    const { categoriesArray, boxSelected, setBoxSelected } = props;

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
    const { color } = useNotificationStore((state) => state);
    const colorShade = (color: string): string => `${color}-500 `;
    const colorShadeDark = (color: string): string => `${color}-700 `;

    return (
        <div className="flex w-full !p-0">
            <div className="w-full !m-0  !max-w-screen pl-2 overflow-auto  !flex items-center rounded-xl">
                <List className="flex-row flex w-full min-w-max justify-evenly items-center !p-0 overflow-auto">
                    {categoriesArray.map((category, index) => (
                        <ListItem className="!pt-0.5 px-0.5 !pb-1  min-w-max hover:!bg-transparent" key={index}>
                            <label htmlFor={category} className="flex flex-1">
                                <ListItemPrefix className={`!px-0 py-0.5 !m-0 w-full flex items-center justify-center rounded-2xl !shadow-sm  border-[1px] border-${colorShade(color)} shadow-sm ${checkedState[index] ?
                                    ` bg-${colorShade(color)} border-opacity-20  bg-opacity-30 text-${colorShade(color)}  w-full ` : `bg-transparent text-${colorShade(color)} !min-w-full border-opacity-40  `}`}>
                                    <Checkbox
                                        labelProps={{ className: `${checkedState[index] ? `text-${colorShadeDark(color)} w-full` : `text-${colorShade(color)} text-opacity-90`} whitespace-nowrap text-sm font-normal !min-w-max px-3 ` }}
                                        iconProps={{ className: "hidden" }}
                                        checked={checkedState[index]}
                                        label={category}
                                        id={category}
                                        value={category}
                                        ripple={false}
                                        containerProps={{ className: "hidden" }}
                                        onChange={(e: any) => handleCheckboxChange(index, e.target.checked)}
                                    />
                                </ListItemPrefix>

                            </label>
                        </ListItem>
                    ))}
                </List>
            </div>
            <div className="flex  opacity-95 items-center px-0.5 rounded-full">
                <Icon icon="cancel" size="lg" color="red" style="thin hover:!py-0" onClick={() => {
                    setBoxSelected([]);
                    setCheckedState(new Array(categoriesArray.length).fill(false));
                }}
                ></Icon>
                <Icon icon="check_circle" size="lg" color="green" style="thin hover:!py-0" onClick={() => {
                    setBoxSelected(categoriesArray);
                    setCheckedState(new Array(categoriesArray.length).fill(true));
                }} />
            </div>

        </div>
    );
}
