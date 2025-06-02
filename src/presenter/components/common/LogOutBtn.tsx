import { Icon } from "./IconComp";
import DI from "../../../di/ioc";

export const LogOutButton = () => {
    const logOut = () => DI.resolve('logOutUseCase').execute();
    return <Icon

        icon="exit_to_app"
        size="md"
        style=" z-30 hover:!bg-red-100 hover:!text-red-700"
        onClick={
            async () => {
                const { message } = await logOut();
                message && location.replace('/signin?msg=' + message)
            }} title="se déconnecter" />
}