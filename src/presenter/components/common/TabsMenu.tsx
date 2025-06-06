import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import { SortLabel, TabLabel } from "../../../domain/entities/frontEntities";
import { useEffect, useState } from "react";
import { SortButton } from "./SortBtn";
import { useNotificationStore } from "../../../application/stores/notification.store";

type TabProps = {
    labels: TabLabel[];
    defaultTab?: string;
    sortList?: SortLabel[];
    color?: string;
    setSelectedSort?: any
    selectedSort?: string;
    reverse?: boolean;
    setReverse?: (value: boolean) => void;
    action?: () => void;
}

export default function TabsMenu({ labels, defaultTab, sortList, setSelectedSort, selectedSort, reverse, setReverse, action }: TabProps) {
    useEffect(() => {
        const tab = document.querySelector(`[data-value="${defaultTab as string}"]`) as HTMLElement
        tab && tab.click()
    }, [])

    const { color } = useNotificationStore((state) => state);
    const [indexSelected, setIndex] = useState<number>(0);
    return (
        <div className="flex relative items-center justify-between gap-x-1" style={{ zIndex: 0 }}>
            <Tabs value={defaultTab as string || labels[0].value}
                className="!z-10 w-full max-w-100vh  overflow-auto">
                <TabsHeader
                    className="w-full flex flex-1 !gap-4 !px-0 mb-1 bg-transparent"
                    indicatorProps={{ className: `rounded-full bg-${color ?? 'gray'}-600` }}>
                    {labels.map(({ label, value, result }, index: number) => (
                        <Tab
                            key={index}
                            value={value}
                            activeClassName="text-white"
                            className={`text-[0.9rem] whitespace-nowrap rounded-full shadow !px-3 ${index !== indexSelected ? `bg-white text-${color}-800 ` : ` !text-white bg-${color}-500 animSlide`} `}
                            onClick={() => { setIndex(index); result() }}>
                            {label}
                        </Tab>
                    ))}
                </TabsHeader>
            </Tabs>
            {sortList &&
                <SortButton
                    action={action ?? (() => { })}
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
