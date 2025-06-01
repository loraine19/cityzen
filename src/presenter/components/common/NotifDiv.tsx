import { useNotificationStore } from "../../../application/stores/notification.store";
import { Icon } from "../common/IconComp";

type NotifDivProps = {
    notif: string;
    isLoading: boolean;
    refetch: () => void;
}
const NotifDiv: React.FC<NotifDivProps> = ({ notif, isLoading, refetch }) => {
    const { color } = useNotificationStore((state) => state);

    setTimeout(() => { notif && setTimeout(() => refetch(), 2000) }, 1000);

    return (
        <div className={'notif'}>
            {notif}
            <span
                style={{ display: 'inline-block', transition: 'transform 0.5s' }}
                className={''}
                onClick={e => {
                    e.stopPropagation();
                    const el = e.currentTarget;
                    el.classList.add('spin');
                    setTimeout(() => { el.classList.remove('spin'); refetch() }, 700);
                }}
            >
                <Icon
                    color={color}
                    size='3xl'
                    title="Recharger la liste"
                    bg={!isLoading}
                    icon={'refresh'}
                />
            </span>

        </div>
    )
}
export default NotifDiv