import { Typography } from "@material-tailwind/react";

export function AuthHeader() {
    return (
        <>
            <header className=" flex flex-col items-center justify-center">
                <div className="flex items-center justify-center gap-4 py-2 mr-16">
                    <img
                        className="h-20 w-20 object-cover object-center drop-shadow-[0_0_1px_rgba(0,0,0,0.2)]"
                        src="image/logo.svg"
                        alt="logo" />
                    <Typography
                        variant="h1"
                        color="blue-gray"
                        className="font-comfortaa  text-[3rem] font-bold">City'Do
                    </Typography>
                </div>
            </header>
        </>
    )
}