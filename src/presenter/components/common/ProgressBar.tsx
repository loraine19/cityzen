import { Typography, Progress, TypographyProps } from "@material-tailwind/react";
import { ProgressProps } from "@material-tailwind/react";
import { EventStatus } from "../../../domain/entities/Event";
import { PoolSurveyStatus } from "../../../domain/entities/PoolSurvey";

type ProgressBarProps = {
    value: number;
    label?: string;
    size?: ProgressProps['size'];
    needed: number;
    status?: string;
    isPast?: boolean;
}

export function ProgressBar({ value, label, needed, status, size = 'md' }: ProgressBarProps) {
    const textSize = size === "lg" ? 'h6' : size === "md" ? 'small' : 'body1';
    let color: string = 'gray'
    let labelTexte = ''
    switch (true) {
        case status === PoolSurveyStatus.REJECTED:
            color = 'bg-gray-300'
            labelTexte = 'vote cloturé, n\'a pas été approuvé'
            break;
        case (status === PoolSurveyStatus.VALIDATED):
            color = 'bg-green-500'
            labelTexte = 'vote cloturé et approuvé'
            break;
        case (status === PoolSurveyStatus.PENDING && value === 0):
            color = 'bg-gray-200'
            labelTexte = `Pas encore de ${label}`
            break;
        default:
            color = 'bg-orange-500'
            labelTexte = `il manque ${needed} ${label}`
    }

    return (
        < div className={`h-max w-full flex -m-1 flex-col px-2 pb-3 gap-2 ${size === "lg" && "mb-2"}`}>
            <div className=" flex  w-full items-center justify-between gap-2 px-1">
                <Typography
                    color={"blue-gray"}
                    variant={textSize as TypographyProps['variant']} >
                    {labelTexte}
                </Typography>
            </div>
            <Progress
                barProps={{ className: `!line-clamp-0  px-2 ${color}   ` }}
                value={value}
                size={size} />
        </div>)
}


export function ProgressBarBlur({ value, label, needed, status, size = 'md', isPast }: ProgressBarProps) {
    let color = 'bg-gray-600'
    let labelTexte = ''
    switch (true) {
        case (status === EventStatus.REJECTED && isPast):
            color = 'bg-gray-800/50'
            labelTexte = 'n\'a pas eu lieu manque de participants'
            break;
        case (status === EventStatus.REJECTED && !isPast):
            color = 'bg-gray-800/50'
            labelTexte = 'n\'aura pas lieu manque de participants'
            break;
        case (status === EventStatus.VALIDATED && !isPast):
            color = 'bg-green-600'
            labelTexte = 'a été validé'
            break;
        case (status === EventStatus.VALIDATED && isPast):
            color = 'bg-cyan-500'
            labelTexte = 'a eu lieu'
            break;
        case (status === EventStatus.PENDING && value === 0):
            color = 'bg-gray-500/70'
            labelTexte = `pas encore de ${label}`
            break;
    }


    return (
        <div className={` h-max w-full !rounded-full backdropBlur flex items-center gap-2 shadow p-2`}>
            {(value === 0 && status === EventStatus.PENDING || status === EventStatus.REJECTED || status === EventStatus.VALIDATED) &&
                (
                    <div className={`"flex flex-1 ${color} !line-clamp-1 px-2  rounded-full h-max items-center justify-center"`}>
                        <Typography
                            className="mb-0 text-white text-center text-xs font-medium">
                            {labelTexte}
                        </Typography>
                    </div>
                )}

            {status === EventStatus.PENDING && value !== 0 &&
                (
                    <Progress
                        barProps={{ className: `!min-w-[2.7rem] text-center !line-clamp-1 whitespace-nowrap truncate flex items-center ${size === "lg" ? 'py-0.5  px-3' : 'px-2'} !bg-orange-500 "` }}
                        value={(status === EventStatus.PENDING) ? value : 100}
                        size={size}
                        label={`, ${needed} ${label} manquant`} />)}
        </div>)
}