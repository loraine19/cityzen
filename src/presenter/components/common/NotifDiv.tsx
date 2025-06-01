import { useNotificationStore } from "../../../application/stores/notification.store";
import { Icon } from "../common/IconComp";

type NotifDivProps = {
    notif: string;
    isLoading: boolean;
    refetch: () => void;
}
const NotifDiv: React.FC<NotifDivProps> = ({ notif, isLoading, refetch }) => {
    const { color } = useNotificationStore((state) => state);
    return (
        <div className={'notif'}>
            {notif}
            <Icon
                color={color}
                size='3xl'
                title="Recharger la liste"
                bg={!isLoading}
                icon={isLoading ? '...' : 'refresh'}
                onClick={() => refetch()} />
        </div>
    )
}
export default NotifDiv