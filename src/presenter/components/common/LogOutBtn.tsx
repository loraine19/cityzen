import { Icon } from "./IconComp";
import DI from "../../../di/ioc";

export const LogOutButton = () => {
    const logOut = () => DI.resolve('logOutUseCase').execute();
    return <Icon icon="exit_to_app" size="2xl" style="px-2.5 pt-1.5 pb-1" onClick={
        async () => {
            const { message } = await logOut();
            message && location.replace('/signin?msg=' + message)
        }} title="se déconnecter" />
}