import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import { SortLabel, TabLabel } from "../../../domain/entities/frontEntities";
import { useEffect } from "react";
import { SortButton } from "./SortBtn";

type TabProps = {
    labels: TabLabel[];
    defaultTab?: string;
    sortList?: SortLabel[];
    color?: string;
    setSelectedSort?: any
    selectedSort?: string;
    reverse?: boolean;
    setReverse?: (value: boolean) => void;

}

export default function TabsMenu({ labels, defaultTab, sortList, setSelectedSort, selectedSort, reverse, setReverse, color }: TabProps) {
    useEffect(() => {
        const tab = document.querySelector(`[data-value="${defaultTab as string}"]`) as HTMLElement
        tab && tab.click()
    }, [])

    return (
        <div className="flex items-center justify-between lg:px-4 gap-x-1">
            <Tabs value={defaultTab as string || labels[0].value}
                className=" w-full max-w-100vh overflow-auto">
                <TabsHeader
                    className="w-full flex flex-1 !gap-2 !px-0 my-2 bg-transparent"
                    indicatorProps={{ className: "bg-gray-900 rounded-full" }}>
                    {labels.map(({ label, value, result }, index: number) => (
                        <Tab
                            key={index}
                            value={value}
                            activeClassName="text-white"
                            className="text-sm whitespace-nowrap bg-white rounded-full shadow !px-3"
                            onClick={() => { result() }}>
                            {label}
                        </Tab>
                    ))}
                </TabsHeader>
            </Tabs>
            {sortList &&
                <SortButton
                    sortList={sortList}
                    color={color}
                    setSelectedSort={setSelectedSort}
                    selectedSort={selectedSort ?? ''}
                    reverse={reverse ?? false}
                    setReverse={setReverse ?? (value => value)}
                />
            }
        </div>
    );
}
