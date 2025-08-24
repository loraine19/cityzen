import { Card, } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { connectedUsersStore } from "../../../application/stores/connectedUsers.store";
import { useNotificationStore } from "../../../application/stores/notification.store";
import { Notif } from "../../../domain/entities/Notif";
import DI from "../../../di/ioc";
import { Icon } from "./IconComp";

export const AlertNotif = () => {

    const notifViewModelFactory = DI.resolve('notifViewModel');
    const { isLoading, refetch, count, notifsMsg, notifsOther } = notifViewModelFactory()
    const nameSpace = 'notifs';
    const [notif, setNotif] = useState<string | null>('null');
    const [connected, setConnected] = useState(false);
    const socketService = DI.resolve('socketService');

    const { setConnectedUsers } = connectedUsersStore();
    const { setUnReadMsgNotif, setUnReadNotMessages } = useNotificationStore();

    //// SOCKET CONNECTION
    const connexion = () => {
        socketService.connect(nameSpace);
        socketService.onConnect(() => { setConnected(true) });
    }

    const up = async () => await socketService.sendMessage({ message: 'connexion au notif' }, nameSpace);

    useEffect(() => {
        console.warn('mounted CHAT')
        if (!connected) {
            connexion();
            up();
        }
        socketService.onConnectError((error: Error) => {
            console.error("Connection Error:", error);
        })

        return () => {
            console.warn('unmounted CHAT')
            socketService.disconnect(nameSpace);
        }
    }, [])



    useEffect(() => {
        const handleNewMessage = async (newMessage: any) => {
            console.log('new message in AlertNotif', newMessage)
            socketService.onNewMessage(async (newMessage: Notif | { users: number[] }) => {
                if (newMessage && typeof newMessage === 'object' && 'description' in newMessage) {
                    const notifMessage = newMessage as Notif;
                    setNotif(notifMessage.description);
                    // setTimeout(() => { setNotif('') }, 5000);
                    if (notifMessage.type === 'MESSAGE') {
                        await refetch();
                        setUnReadMsgNotif(notifsMsg.length ?? 0);
                    } else {
                        await refetch();
                        setUnReadNotMessages(notifsOther.length ?? 0);
                    }
                } else if (newMessage && typeof newMessage === 'object' && 'users' in newMessage) {
                    setConnectedUsers((newMessage as { users: number[] }).users);
                }
            })
            setUnReadMsgNotif(notifsMsg.length ?? 0);
            setUnReadNotMessages(notifsOther.length ?? 0);
        }
        socketService.onNewMessage(handleNewMessage);
    }, [refetch, setUnReadMsgNotif, socketService]);

    //// COUNTER
    useEffect(() => {
        setUnReadMsgNotif(notifsMsg.length ?? 0);
        setUnReadNotMessages(notifsOther.length ?? 0);
    }, [isLoading, count])

    return (
        <div className={`h-max w-full z-[1000] absolute left-0 top-0 flex justify-center `}>
            <div className="relative z-50 w-[90%] max-w-[600px] mx-auto justify-center items-center">
                <Card className={`w-full rounded-2xl h-max px-4 py-3 shadow-lg transition-all duration-1000 ease-in-out transform bg-opacity-85 
                 ${notif ?
                        'scale-100 opacity-100 top-3 slide absolutme' :
                        'scale-80 opacity-0 top-0'} `}>
                    {notif}
                    <Icon
                        bg
                        style='absolute right-2 top-1 opacity-70'
                        icon='close'
                        size='sm'
                        onClick={() => setNotif(null)}
                    />
                </Card>
            </div>
        </div>
    );
}
