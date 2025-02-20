import { Chip } from "@material-tailwind/react";
import { dayMS } from "../../../domain/entities/frontEntities";

export function DateChip(props: { start: Date | string, end?: Date | string, ended?: boolean, prefix?: string }) {
    const { start, end, prefix, ended } = props
    const now = new Date();
    const endDate: string = end && new Date(end).toLocaleDateString('fr-FR') || ''
    const endDays: number = Math.ceil(((new Date(start).getTime()) - (now.getTime())) / dayMS)
    const dateClass = (() => {
        switch (true) {
            case endDays <= 4 && endDays > 0:
                return "RedChip";
            case endDays > 4 && endDays <= 15:
                return "OrangeChip";
            case endDays > 15:
                return "GreenChip";
            case endDays < 0 && end && !ended:
                return "RedChip";
            default:
                return "GrayChip";
        }
    })();
    const value = (() => {
        switch (true) {
            case prefix && !ended && !end:
                return `${prefix} ${new Date(start).toLocaleDateString('fr-FR')}`;
            case ended:
                return `finis le ${endDate}`;
            case endDays > 4:
                return `${prefix} ${endDays} jours`;
            case endDays > 0:
                return `il reste ${endDays} jours`;
            case endDays === 0:
                return `aujourd'hui`;
            case endDays < 0:
                return `en cours`;
            default:
                return `${prefix} ${new Date(start).toLocaleDateString('fr-FR')}`;
        }
    })();
    return (
        <Chip
            size="sm"
            value={value}
            className={`${dateClass} rounded-full w-max h-max lowercase shadow`}>
        </Chip>
    )
}