import { Typography } from "@material-tailwind/react";

export function AuthHeader() {
    return (
        <header className="flex-1 flex py-4 flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-4 py-2 mr-16">
                <img
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://citydo.fr/image/logo.svg' }}
                    className="h-20 w-20 object-cover object-center "
                    src="image/logo.svg"
                    alt="logo" />
                <Typography
                    variant="h1"
                    color="blue-gray"
                    className="font-comfortaa  text-[3rem] font-bold">City'Do
                </Typography>
            </div>
        </header>
    )
}