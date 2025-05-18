import { Typography } from "@material-tailwind/react";

export function AuthHeader() {
    return (
        <>
            <header className=" flex flex-col items-center justify-center pb-2">
                <div className="flex items-center justify-center gap-4 p-4 mr-16">
                    <img
                        className="h-16 w-16 object-cover object-center"
                        src="../../../image/logo.svg"
                        alt="logo" />
                    <Typography
                        variant="h1"
                        color="blue-gray"
                        className="font-comfortaa  text-[2.8rem] font-bold">City'Do
                    </Typography>
                </div>
            </header>
        </>
    )
}