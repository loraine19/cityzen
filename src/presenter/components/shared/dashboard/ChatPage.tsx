import { useEffect, useState } from 'react';
import { Card, Typography, CardBody, List, ListItem, ListItemPrefix, Avatar } from '@material-tailwind/react';
import NavBarTop from '../../common/NavBarTop';
import SubHeader from '../../common/SubHeader';
import { Skeleton } from '../../common/Skeleton';
import DI from '../../../../di/ioc';
import { MessageView } from '../../../views/viewsEntities/messageViewEntity';
import Chat from './Chat';
import { User } from '../../../../domain/entities/User';
import { Icon } from '../../common/IconComp';
import { useSearchParams } from 'react-router-dom';
import { useNotificationStore } from '../../../../application/stores/notification.store';


export default function ChatPage() {

    //// PARAMS
    const [Params, setParams] = useSearchParams();
    const params = { with: Params.get("with"), text: Params.get("text") }
    const [userIdRec, setUserIdRec] = useState(parseInt(params.with || '0'));

    const [open, setOpen] = useState(params.with ? true : false);
    const [userRec, setUserRec] = useState<User>({} as User);

    //// VIEW MODEL
    const { conversations, countConv, isLoadingConv, refetchConv } = DI.resolve('conversationsViewModel')()
    const [notif, setNotif] = useState<string>('');
    const conversationViewModelFactory = DI.resolve('conversationViewModel')
    const { messages, isLoading, refetch, fetchNextPage, hasNextPage } = conversationViewModelFactory(userIdRec)
    const getUserById = async (id: number) => await DI.resolve('getUserByIdUseCase').execute(id);

    const nameSpace = 'chat';
    const [online, setOnline] = useState<number[]>([]);
    const [newConv, setNewConv] = useState<boolean>(false);
    const [connected, setConnected] = useState<boolean>(false);
    const socketService = DI.resolve('socketService');

    const connexion = () => {
        socketService.connect(nameSpace);
        socketService.onConnect(() => { setConnected(true) });
    }

    const { setUnReadMsgNotif, unReadMsgNotif } = useNotificationStore();
    const up = async () => await socketService.sendMessage({ message: 'connexion au chat' }, nameSpace);
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


    socketService.onNewMessage(async (newMessage: any) => {
        if (newMessage?.users) { setOnline(newMessage.users); return }
        refetchConv()
        if (newMessage.userIdRec === userRec.id || newMessage.userId === userRec.id) {
            await refetch()
            setUnReadMsgNotif(unReadMsgNotif + 1)
        }
    });


    useEffect(() => {
        if (params.with && params.with !== '0') {
            const convMap = conversations.filter((conv: MessageView) => conv?.isWith?.id === parseInt(params.with || '0'));
            if (conversations && convMap.length === 0) {
                newUserConv();
                setNewConv(true);
            }
        }
    }, [params.with])


    const newUserConv = async () => {
        const UserRec = await getUserById(parseInt(params.with || '0'));
        setUserRec(UserRec)
    }


    const [message, setMessage] = useState(params?.text ?? '');
    const handleSendMessage = async () => {
        !connected && connexion()
        if (message.trim() !== '') {
            const messageData = { userIdRec, message };
            const ret = await socketService.sendMessage(messageData, nameSpace);
            if (ret) {
                await refetch();
                setMessage('')
                setParams({ with: userIdRec.toString(), text: '' });
            }
            else {
                setMessage(message)
                setConnected(false);
                setNotif('Erreur de connexion à la conversation');
            }

        }
    }




    return (
        <div className="Body gray">
            <header className="px-4">
                <NavBarTop />
                <SubHeader
                    qty={open ? messages?.length : countConv}
                    type={open ? 'messages' : 'conversation'}
                    place={' avec ' + (userRec?.Profile?.firstName ?? 'des membres')}
                    closeBtn
                    link='/' />
                {notif}
                {!connected &&
                    <Icon
                        fill
                        color='red'
                        icon='sync_problem'
                        title='actualiser'
                        onClick={() => connexion()} />}
            </header>
            <main className='flex pb-4 pt-6'>
                {isLoadingConv ?
                    <Skeleton className=' m-auto !h-full !rounded-3xl' /> :
                    <Card className='FixCardNoImage !pb-0 !px-0 flex '>
                        <CardBody className='FixCardBody !p-0 !pt-2 !flex overflow-hidden'>
                            <div className='flex h-full  '>
                                <div className='flex-1 my-1 overflow-y-auto overflow-x-hidden'>
                                    <List className=' flex-1 '>
                                        {conversations &&
                                            conversations.map((message: MessageView, index: number) =>
                                                <div key={index + 'div'}>
                                                    <ListItem
                                                        key={index}
                                                        className={` p-1 ${(userIdRec === message?.isWith.id) ? '!bg-gray-200 border-white border-8 shadow-md hover:pointer-events-none -ml-2' : ''}`}
                                                        onClick={() => {
                                                            setOpen(true)
                                                            const userRec = message?.IWrite ? message?.UserRec : message?.User
                                                            setUserRec(userRec)
                                                            setUserIdRec(userRec.id)
                                                            setParams({ with: userRec.id.toString() })
                                                        }}
                                                    >
                                                        <ListItemPrefix className='relative flex min-w-max'>
                                                            <Avatar
                                                                onError={(e) => e.currentTarget.src = "/images/person.svg"}
                                                                className={`bg-user border-[3px] p-0.5
                                                                    ${(userIdRec === message?.isWith.id) && '!border-cyan-300' ||
                                                                    (message.read || message.IWrite) && 'border-white' || '!border-orange-500'}`}
                                                                variant="circular"
                                                                alt="avatar"
                                                                size='md'
                                                                src={message?.isWith?.Profile?.image as string || 'image/person.svg'} />
                                                            {(online.length > 0 &&
                                                                online.includes(message.isWith.id)) &&
                                                                <span className='absolute top-0 -right-2 bg-green-500 rounded-full
                                                                border-4  p-1.5 border-white'></span>
                                                            }
                                                        </ListItemPrefix>
                                                        <div className="font-normal w-full flex flex-col">
                                                            <div className='flex justify-between items-center flex-1 w-full'>
                                                                <Typography variant="h6" color="blue-gray">
                                                                    {message.isWith?.Profile?.firstName}
                                                                </Typography>
                                                                <span
                                                                    className='px-4 !text-xs text-blue-gray-300'>
                                                                    {message.formatedDate}
                                                                </span>
                                                            </div>
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal !line-clamp-1">
                                                                {message.IWrite &&
                                                                    <span className='text-blue-gray-500'>
                                                                        {message.read && '🗸'}
                                                                        {' vous : '}
                                                                    </span>}
                                                                {message?.message || '...'}
                                                            </Typography>
                                                        </div>
                                                    </ListItem>
                                                    <hr className='h-[0px] mx-4 bg-blue-gray-100'></hr>
                                                </div>
                                            )}
                                    </List>
                                </div>
                                {open &&
                                    <div className='relative !w-[calc(100%-4.5rem)]'>
                                        <Chat
                                            refetch={refetch}
                                            setNewConv={setNewConv}
                                            newConv={newConv}
                                            isLoading={isLoading}
                                            fetchNextPage={fetchNextPage}
                                            hasNextPage={hasNextPage}
                                            messages={messages}
                                            message={message}
                                            setMessage={setMessage}
                                            handleSendMessage={handleSendMessage}
                                            userRec={userRec}
                                        />
                                        <Icon
                                            style='absolute top-2 right-4'
                                            color='red'
                                            icon='close'
                                            title='fermer'
                                            onClick={() => {
                                                setParams({ with: '0' })
                                                setUserIdRec(0)
                                                setUserRec({} as User)
                                                setOpen(false)
                                            }}
                                        />
                                    </div>
                                }
                            </div>
                        </CardBody>
                    </Card>}
            </main>
        </div >
    )
}

