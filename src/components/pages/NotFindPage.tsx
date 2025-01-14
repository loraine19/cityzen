import { AuthHeader } from "../authComps/AuthHeader";
import NavBarBottom from "../UIX/NavBarBottom";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Button } from "@material-tailwind/react";



export default function DashboardPage() {
    const navigate = useNavigate();

    const url: string = (new URLSearchParams(useLocation().pathname.split("/").join(""))).toString().replace("=", '')



    return (
        <div className="Body gray">
            <div className="h-[7rem] flex-col flex items-center justify-center pt-6 relative">
                <div className="flex items-center justify-center gap-2">

                </div>
                <AuthHeader />

            </div>
            <main className="flex items-center justify-evenly h-full py-10">
                <Typography variant="lead" color="blue-gray" className="flex items-center justify-center mt-2">
                    {`élements ${url} non trouvés désolé`}
                </Typography>
                <Button onClick={() => navigate('/')} className="rounded-full w-max p-5 text-sm !font-light">retour à l' acceuil</Button>
            </main>
            <NavBarBottom addBtn={false} />
        </div>
    );
}