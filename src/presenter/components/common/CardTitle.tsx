import { useState } from "react";
import parse from "html-react-parser";
import { Icon } from "./IconComp";
import { Typography } from "@material-tailwind/react";
import { GroupLink } from "./GroupLink";
import { Group } from "../../../domain/entities/Group";

/// Button to flag usable in any component
export function FlagIcon(props: { flagged: boolean, id: number, type: string }) {
    const { flagged, id, type } = props;
    const to = `/flag${flagged ? '/edit' : ''}/${type}/${id}`
    return (
        <Icon
            icon="flag_2"
            link={to}
            color={flagged ? 'red' : 'gray'}
            fill={flagged} size="xl"
            title={"signaler " + type}
            style="hover:!bg-red-500/30 hover:text-red-700 pb-1 pt-1" />
    )
}
export function Title(props: { title: string, flagged?: boolean, id?: number, CreatedAt?: string | Date, subTitle?: string, type?: string, group?: Group }) {
    const { flagged, id, CreatedAt, subTitle, type, group } = props
    const titleElement = document.getElementById(props.title);
    const maxLength = titleElement && titleElement.scrollWidth > titleElement.clientWidth ? 90 : 42;
    const [title, setTitle] = useState<string>(props.title?.length > maxLength ? props.title.slice(0, maxLength - 3) + '...' + (parse('&nbsp;').toString()).repeat(props.title?.length - maxLength) : props.title)
    return (
        <div className="min-h-max">
            <div className="flex items-center w-full  justify-between  gap-2">
                <div className="flex items-center gap-4 !max-w-[calc(100%-1.5rem)] w-full">
                    <Typography
                        onScroll={() => { setTitle(props.title) }}
                        id={props.title} variant="h6" color="blue-gray"
                        className="w-full flex whitespace-nowrap overflow-x-auto "
                        title={props.title}>
                        {title}
                    </Typography>
                    {CreatedAt && <span className="text-xs">{new Date(CreatedAt).toLocaleDateString('fr-FR')}</span>}
                </div>
                {id &&
                    <FlagIcon
                        flagged={flagged ? true : false}
                        id={id}
                        type={type || ''} />
                }
            </div>
            {subTitle &&
                <div className="flex items-center justify-between pr-1">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="truncate font-normal">
                        {subTitle}
                    </Typography>
                    {group &&
                        <GroupLink group={group ?? {} as Group} />}
                </div>}
            {group && !subTitle &&

                <GroupLink group={group ?? {} as Group} />}
        </div>)
}