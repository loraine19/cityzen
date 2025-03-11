import { Icon } from "./IconComp";
import DI from "../../../di/ioc";

export const LogOutButton = () => {
    const logOut = () => DI.resolve('logOutUseCase').execute();
    return <Icon
        icon="exit_to_app"
        size="2xl"
        style="!p-2 !hover:!bg-red-300 hover:!text-red-700"
        onClick={
            async () => {
                const { message } = await logOut();
                message && location.replace('/signin?msg=' + message)
            }} title="se déconnecter" />
}