import { Button } from "@material-tailwind/react";

interface BtnBottomProps {
    label: string;
    dark?: boolean;
    onClick?: () => void;
    type: any;
    blue?: boolean;
}

export default function BtnBottom(props: BtnBottomProps) {
    const { label, dark, onClick, type, blue } = props;

    return (
        <div className="py-4 w-full">
            {dark === true && (
                <Button type={type} className="rounded-full lowercase first-letter:capitalize text-md font-thin bg-gray-800 text-white w-full" onClick={onClick}>
                    {label}
                </Button>
            )}

            {dark === false && (
                <Button type={type} className="rounded-full lowercase first-letter:capitalize text-md font-thin bg-white text-gray-800 w-full" onClick={onClick}>
                    {label}
                </Button>
            )}
            {blue === true && (
                <Button type={type} className="rounded-full lowercase first-letter:capitalize text-md font-thin border-[#3AB1CB] bg-transparent border-[1px] text-[#3AB1CB] w-full" onClick={onClick}>
                    {label}
                </Button>
            )}
        </div>
    );
}
