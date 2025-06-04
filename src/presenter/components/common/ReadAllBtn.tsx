import { Icon } from "./IconComp";
import DI from "../../../di/ioc";
import { useNotificationStore } from "../../../application/stores/notification.store";

export const ReadAllButton = ({ update }: { update?: any }) => {
    const { fetchNotif, setUnReadNotif } = useNotificationStore();
    const readAll = () => DI.resolve('readAllNotifUseCase').execute();
    return <Icon
        bg
        color='red'
        icon="delete"
        size="sm"
        style="absolute !shadow-md right-1 top-1 z-30 bg-opacity-90 !bg-red-100 hover:!bg-red-200 hover:!bg-opacity-90"
        onClick={
            async () => {
                const notifs = await readAll();
                if (notifs) {
                    //// TODO verifier 
                    fetchNotif();
                    update();
                }
                setUnReadNotif(0);
            }} title="marquer tout comme lu , vous ne verrez plus de notifications" />
}