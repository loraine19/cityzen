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
import SocketService from '../../../../infrastructure/providers/http/socketService';
import { useSearchParams } from 'react-router-dom';
import { Message } from '../../../../domain/entities/Message';


export default function ChatPage() {
    const [Params, setParams] = useSearchParams();
    const params = { with: Params.get("with") }
    const [userIdRec, setUserIdRec] = useState(parseInt(params.with || '0'));
    const [open, setOpen] = useState(params.with ? true : false);
    const [userRec, setUserRec] = useState<User>({} as User);
    const { conversations, countConv, isLoadingConv, refetchConv } = DI.resolve('conversationsViewModel')()
    const socketService: SocketService = DI.resolve('socketService')
    const [notif, setNotif] = useState<string>('... en attente de connexion');
    const [connected, setConnected] = useState<boolean>(false);
    const conversationViewModelFactory = DI.resolve('conversationViewModel')
    const { messages, isLoading, refetch, fetchNextPage, hasNextPage } = conversationViewModelFactory(userIdRec)
    const nameSpace = 'chat';


    const connexion = () => {
        socketService.connect(nameSpace);
        socketService.onConnect(() => {
            setNotif(``);
            setConnected(true);
            // Cleanup
            //  return () => socketService.disconnect();
        });
    }
    useEffect(() => {
        connexion();
        const messageData = { message: 'connexion' };
        const up = async () => await socketService.sendMessage(messageData, nameSpace);
        up();
    }, [])




    const [message, setMessage] = useState('');
    const handleSendMessage = async () => {
        if (message.trim() !== '') {
            const messageData = { userIdRec, message };
            const ret = await socketService.sendMessage(messageData, nameSpace);
            if (ret) {
                setMessage('');
                refetch();
            }

        }
    }

    socketService.onConnectError((error) => {
        setNotif('Erreur de connexion à la conversation');
        console.log("Connection Error:", error);
    });

    socketService.onNewMessage(async (newMessage: Message) => {
        console.log('newMessage', newMessage);
        refetchConv()
        if (newMessage.userIdRec === userRec.id || newMessage.userId === userRec.id)
            refetch()
        setNotif('Nouveau message' + newMessage.User.Profile.firstName);
    });

    return (
        <div className="Body gray">
            <header className="px-4">
                <NavBarTop />
                <SubHeader
                    qty={countConv}
                    type={`Conversations `}
                    place={' avec des membres'}
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
                    <Skeleton
                        className='w-respLarge m-auto !h-full !rounded-3xl' /> :
                    <Card className='FixCardNoImage !pb-0 !px-0 flex w-respLarge'>
                        <CardBody className='FixCardBody !p-0 !pt-2 !flex overflow-hidden'>
                            <div className='flex h-full  '>
                                <div className='flex-1 my-1 overflow-y-auto overflow-x-hidden'>
                                    <List
                                        className=' flex-1 '>
                                        {conversations &&
                                            conversations.map((message: MessageView) =>
                                                <>
                                                    <ListItem
                                                        className={`p-1 ${(userIdRec === message?.userIdRec || userIdRec === message?.userId) ? '!bg-gray-200 border-white border-4 shadow-md hover:pointer-events-none' : ''}`}
                                                        onClick={() => {
                                                            setOpen(true)
                                                            const userRec = message?.IWrite ? message?.UserRec : message?.User
                                                            setUserRec(userRec)
                                                            setUserIdRec(userRec.id)
                                                            setParams({ with: userRec.id.toString() })
                                                        }}
                                                        key={message.id}
                                                    >
                                                        <ListItemPrefix className='flex min-w-max'>

                                                            <Avatar
                                                                className={`bg-user border-[3px] p-0.5
                                                                    ${(userIdRec === message?.userIdRec || userIdRec === message?.userId) && '!border-cyan-300' ||
                                                                    (message.read || message.IWrite) && 'border-white' || '!border-orange-500'}`}
                                                                variant="circular"
                                                                alt="avatar"
                                                                size='md'
                                                                src={message?.IWrite ? message?.UserRec.Profile.image as string : message?.User?.Profile?.image as string || 'image/person.svg'} />
                                                        </ListItemPrefix>
                                                        <div className="font-normal flex flex-col">
                                                            <Typography variant="h6" color="blue-gray">
                                                                {message?.IWrite ? message?.UserRec.Profile.firstName : message?.User?.Profile?.firstName}
                                                            </Typography>
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
                                                    <hr className='h-[0px] mx-4 bg-blue-gray-100'></hr></>
                                            )}
                                    </List>
                                </div>
                                {open &&
                                    <div className='relative !w-[calc(100%-4.5rem)]'>
                                        <Chat
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
                                            icon='cancel'
                                            title='fermer'
                                            onClick={() => {
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

