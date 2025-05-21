import { Typography, Progress, TypographyProps } from "@material-tailwind/react";

import { ProgressProps } from "@material-tailwind/react";

export function ProgressBar(props: { value: number, label?: string, size?: ProgressProps['size'], needed: number, status?: string }) {
    const { value, label, needed, status } = props
    const size = props.size ? props.size : "md"
    const textSize = size === "lg" ? 'h6' : size === "md" ? 'small' : 'body1';
    const label2 = ` ${value > 0 ? value + '%' : ''}`
    const label3 = needed > 0 && value > 0 ? ` il manque ${needed} ${label}` : ''
    const color = (value >= 100 || needed === 0 || status === 'VALIDATED') ? status === 'REJECTED' ? "red" : "green" : "gray"
    const labelTexte = ((needed <= 0 && value < 100) || status === 'VALIDATED') ? status === 'REJECTED' ? 'n\'à pas été validé' : 'à été validé' : value > 0 ? `Validé à ` : `Pas encore de ${label}`

    return (
        < div className={`h-max w-full flex -m-1 flex-col px-2 pb-3 gap-2 ${size === "lg" && "mb-2"}`}>
            <div className=" flex  w-full items-center justify-between gap-2 px-1">
                <Typography
                    color={value < 1 ? "red" : "blue-gray"}
                    variant={textSize as TypographyProps['variant']} >
                    {labelTexte}
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
                value={needed === 0 ? 100 : value}
                color={color}
                size={size} />
        </div>)
}

export function ProgressLargebar(props: { value: number, float?: boolean, label?: string }) {
    const { value, float, label } = props
    const style = float ? "h-max w-full !rounded-full  backdrop-blur flex items-center gap-2 shadow p-2" :
        "!rounded-full bg-cyan-200 backdrop-blur flex items-center gap-2 shadow p-2"

    return (
        <div className={style}>
            {value > 0 ? <Progress
                value={value}
                color={value >= 100 ? "green" : "gray"}
                size="md"
                label={value >= 100 ? " Validé" : ' '} /> :
                <div className="flex flex-1 bg-white/70 rounded-full h-max items-center justify-center">
                    <Typography
                        className="mb-0 text-xs font-medium">
                        pas encore de {label}
                    </Typography>
                </div>}
        </div>)
}