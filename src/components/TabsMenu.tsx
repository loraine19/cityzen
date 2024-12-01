import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import { label } from "../types/label";

interface TabsMenuProps {
    labels: label[];
    subMenu?: boolean;
}

export default function TabsMenu(props: TabsMenuProps) {
    const { labels } = props;
    const subMenu = props;

    /// Nerver used comment to avoid compile error
    ///// Class creat in index CSS => CyanChipOutlined 

    // let navColor: string = "#424242";
    // if (subMenu.subMenu === false) {
    //     navColor = "#424242";
    // } else {
    //     navColor = "#3AB1CB";
    // }

    return (
        <Tabs value={labels[0].value} className="w-full max-width-100vh overflow-auto">
            {subMenu.subMenu === false && (
                <>
                    <TabsHeader
                        className="w-full !gap-2 !px-0 my-2 bg-transparent "
                        indicatorProps={{
                            className: "bg-gray-800 rounded-full",
                        }}>
                        {labels.map(({ label, value, result }, index: number) => (
                            <Tab key={index} value={value} activeClassName="text-white" className="text-sm whitespace-nowrap bg-white rounded-full shadow" onClick={result}>
                                {label}
                            </Tab>
                        ))}
                    </TabsHeader>
                </>
            )}

            {subMenu.subMenu === true && (
                <>
                    <TabsHeader
                        className="w-full !gap-2 !px-0 my-[-2px] bg-transparent "
                        indicatorProps={{
                            className: "bg-[#3AB1CB] rounded-full",
                        }}>
                        {labels.map(({ label, value, result }, index: number) => (
                            <Tab key={index} value={value} activeClassName="!text-white" className="text-sm bg-transparent border-[#3AB1CB] border-[1px] rounded-full text-[#3AB1CB]" onClick={result}>
                                {label}
                            </Tab>



                        ))}
                    </TabsHeader>
                </>
            )}
        </Tabs>
    );
}
