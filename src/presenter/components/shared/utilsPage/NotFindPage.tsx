import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Button } from "@material-tailwind/react";
import { AuthHeader } from "../auth/auth.Comps/AuthHeader";
import NavBarBottom from "../../common/NavBarBottom";



export default function NotFindPage() {
    const navigate = useNavigate();
    const url: string = (new URLSearchParams(useLocation().pathname.split("/").join(""))).toString().replace("=", '')

    return (
        <div className="Body gray">
            <div className="h-[7rem] flex-col flex items-center justify-center pt-6 relative">
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