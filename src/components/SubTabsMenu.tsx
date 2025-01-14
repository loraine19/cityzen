import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import { useEffect, useState } from "react";

type subLabel = any
interface SubTabsMenuProps {
    subLabels: subLabel[];
    subTabSelected: string;
    color: string;
}

export default function SubTabsMenu(props: SubTabsMenuProps) {
    const { subLabels } = props;
    const subTabSelected = props.subTabSelected;
    const color = props.color;

    const [defaultValue] = useState(subTabSelected);


    useEffect(() => { }, []);

    return (
        <Tabs value={defaultValue}>
            <TabsHeader
                className="w-full !gap-2 !px-8 my-4 bg-transparent flex items-center justify-center"
                indicatorProps={{
                    className:
                        `bg-` + `${color}` + `-500 rounded-full text-white`,
                }}
            >
                {subLabels.map(({ label, value, result }, index: number) => (
                    <Tab
                        key={index}
                        value={value}
                        activeClassName="!text-white"
                        className={
                            `text-sm bg-transparent rounded-full border border-` +
                            `${color}` +
                            `-500 text-` +
                            `${color}` +
                            `-500`
                        }
                        onClick={result}
                    >
                        {label}
                    </Tab>
                ))}
            </TabsHeader>
        </Tabs>
    );
}
