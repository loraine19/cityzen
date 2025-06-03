import { useEffect, useState } from "react";
import { useNotificationStore } from "../../../application/stores/notification.store";
import { Icon } from "../common/IconComp";

type NotifDivProps = {
    notif: string;
    isLoading: boolean;
    refetch: () => void;
}
const NotifDiv: React.FC<NotifDivProps> = ({ notif, isLoading, refetch }) => {
    const { color } = useNotificationStore((state) => state);
    const [attempt, setAttempt] = useState<number>(0);

    useEffect(() => {
        setTimeout(() => {
            notif && refetch()
        }, 1000);
    }, [notif]);

    return (
        <div className={`notif `}>
            {notif}
            <span
                style={{ display: 'inline-block', transition: 'transform 0.5s' }}
                className={''}
                onClick={e => {
                    e.stopPropagation();
                    const el = e.currentTarget;
                    el.classList.add('spin');
                    setAttempt(attempt + 1);
                    setTimeout(() => { el.classList.remove('spin'); refetch() }, 700);
                }}
            >
                <Icon
                    style={attempt > 1 ? '!hidden' : ''}
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