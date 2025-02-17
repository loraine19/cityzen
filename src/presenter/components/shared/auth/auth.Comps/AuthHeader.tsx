import { Typography } from "@material-tailwind/react";

export function AuthHeader() {
    return (
        <>
            <header className=" flex flex-col items-center justify-center pt-2">
                <div className="flex items-center justify-center gap-4 p-4 mr-8">
                    <img
                        className="h-16 w-16 object-cover object-center"
                        src="/logo.svg"
                        alt="logo" />
                    <Typography
                        variant="h1"
                        color="blue-gray"
                        className="font-comfortaa font-bold">Collect'if
                    </Typography>
                </div>
            </header>
        </>
    )
}