import { Button, Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react';

type popUpProps = {
    variant: any, text: string, content: any, classNames: any
}
export default function PopUp(props: popUpProps) {
    const { variant, text, content, classNames }: popUpProps = props

    return (
        <>
            <Popover offset={10}>
                <PopoverHandler>
                    <Button variant={variant} className={classNames} >{text}</Button>
                </PopoverHandler>
                <PopoverContent className="w-resp max-h-[50%] m-auto overflow-auto p-4">
                    <div> {content}</div>
                </PopoverContent>
            </Popover>
        </>
    )
}