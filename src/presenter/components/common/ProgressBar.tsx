import { Typography, Progress, TypographyProps } from "@material-tailwind/react";

import { ProgressProps } from "@material-tailwind/react";

export function ProgressBar(props: { value: number, label?: string, size?: ProgressProps['size'], needed: number }) {
    const { value, label, needed } = props
    const size = props.size ? props.size : "md"
    const textSize = size === "lg" ? 'h6' : size === "md" ? 'small' : 'body1';
    const label2 = ` ${value > 0 ? value + '%' : ''}`
    const label3 = needed > 0 && value > 0 ? ` il manque ${needed} ${label}` : ''

    return (
        < div className={`h-max w-full flex -m-1 flex-col px-2 pb-3 gap-2 ${size === "lg" && "mb-2"}`}>
            <div className=" flex  w-full items-center justify-between gap-2 px-1">
                <Typography
                    color={value < 1 ? "red" : "blue-gray"}
                    variant={textSize as TypographyProps['variant']} >
                    {value > 0 ? `Validé à ` : `Pas encore de ${label}`}
                </Typography>
                <Typography
                    color='blue-gray'
                    variant={textSize as TypographyProps['variant']}>
                    {label2}
                </Typography>
                <Typography
                    color="blue-gray"
                    variant={textSize as TypographyProps['variant']}
                    className={`flex-1 text-right ${label3 === '' && 'hidden'}`}>
                    {label3}
                </Typography>
            </div>
            <Progress
                value={value}
                color={value > 100 ? "green" : "gray"}
                size={size} />
        </div>)
}