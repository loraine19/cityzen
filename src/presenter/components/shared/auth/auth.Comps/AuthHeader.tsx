import { Typography } from "@material-tailwind/react";

export function AuthHeader() {
    return (
        <header className="!min-h-[6rem] py-[1.5%] flex gap-4 items-center justify-center">
            <img
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://citydo.fr/image/logo.svg' }}
                className="h-[5rem] w-[5rem] object-cover object-center "
                src="image/logo.svg"
                alt="logo" />
            <Typography
                variant="h1"
                color="blue-gray"
                className="font-comfortaa  text-[3rem] font-bold">
                City'Do
            </Typography>
        </header>
    )
}