import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import { TabLabel } from "../../../domain/entities/frontEntities";



export default function TabsMenu(props: { labels: TabLabel[] }) {
    const { labels } = props

    return (
        <Tabs value={labels[0].value} className="w-full max-width-100vh overflow-auto">
            <TabsHeader
                className="w-full !gap-2 !px-0 my-2 bg-transparent "
                indicatorProps={{ className: "bg-gray-800 rounded-full" }}>
                {labels.map(({ label, value, result }, index: number) => (
                    <Tab key={index}
                        value={value}
                        activeClassName="text-white"
                        className="text-sm whitespace-nowrap bg-white rounded-full shadow" onClick={result}>
                        {label}
                    </Tab>
                ))}
            </TabsHeader>
        </Tabs>
    );
}
