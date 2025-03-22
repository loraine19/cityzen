import { useState, useEffect, useRef } from 'react';
import DI from '../../../../di/ioc';
import { Card, CardBody, CardFooter, CardHeader, List, ListItem, Typography } from '@material-tailwind/react';
import { MessageView } from '../../../views/viewsEntities/messageViewEntity';
import { User } from '../../../../domain/entities/User';
import { LoadMoreButton } from '../../common/LoadMoreBtn';
import { Icon } from '../../common/IconComp';

type ChatProps = {
    userRec: User,
    handleSendMessage: () => void,
    setMessage: any,
    message: string,
    messages: MessageView[], fetchNextPage: any, hasNextPage: boolean, isLoading: boolean
}

const Chat: React.FC<ChatProps> = ({ userRec = {} as User, handleSendMessage, message, setMessage, messages, fetchNextPage, hasNextPage, isLoading }) => {

    const [imTyping, setImTyping] = useState(false);
    const readConversationUseCase = async (id: number) => DI.resolve('readConversationUseCase').execute(id);
    const [notif] = useState<string>(isLoading ? 'Chargement...' : `Conversation avec ${userRec?.Profile.firstName}`);

    useEffect(() => {
        if (userRec?.id && !messages[0]?.read) {
            const read = async () => await readConversationUseCase(userRec.id);
            read();
        }
    }, [userRec])


    const divRef = useRef<HTMLDivElement>(null);

    const [isBottom, setIsBottom] = useState(false);
    const handleScroll = () => {
        if (divRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = divRef.current;
            if (scrollTop + clientHeight + 2 >= scrollHeight) {
                setIsBottom(true);
                if (hasNextPage) {
                    fetchNextPage();
                }
            } else {
                setIsBottom(false);
            }
        }
    }

    return (
        <div className='pb-1 pt-6 flex h-full flex-1 pr-2'>
            <Card className='FixCardNoImage flex bg-blue-gray-50  border-white border-8'>
                <CardHeader className='FixCardHeaderNoImage min-h-max !bg-transparent px-3 pt-2'
                    floated={false}>
                    <Typography
                        variant="h6">
                        {notif}
                    </Typography>
                </CardHeader>
                <CardBody
                    ref={divRef}
                    onScroll={() => handleScroll()}
                    className='overflow-auto h-full flex flex-col-reverse pt-4'>
                    <List className='gap-3 justify-end items-end flex flex-col-reverse' >
                        {!isLoading && messages.map((msg: MessageView, index: number) => (
                            <ListItem
                                className="flex p-0 items-start hover:!pointer-events-none "
                                key={index}>
                                <div
                                    className={`flex flex-1 flex-col px-5 shadow-sm pt-2 pb-2 justify-between  ${msg.IWrite ?
                                        'bg-cyan-100 !text-right justify-end rounded-s-[1.5rem] rounded-tr-[1.5rem] !ml-[25%] ' :
                                        'bg-orange-100 rounded-ss-[1.5rem] rounded-r-[1.5rem] !mr-[25%]'}`}>
                                    <div className='text-xs font-light  flex  flex-row-reverse'>
                                        {new Date(msg?.createdAt).toLocaleDateString() === new Date().toLocaleDateString()
                                            ?
                                            new Date(msg?.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) :
                                            `${new Date(msg?.createdAt).toLocaleDateString()} ${new Date(msg?.createdAt).toLocaleTimeString()}`}
                                    </div>
                                    {msg.message}
                                </div>
                            </ListItem>
                        ))}

                    </List>
                    <LoadMoreButton
                        revers
                        isBottom={isBottom}
                        hasNextPage={hasNextPage}
                        handleScroll={handleScroll} />
                </CardBody >
                <CardFooter
                    className='flex justify-between rounded-full bg-white p-2 m-2'>
                    <input
                        className='rounded-full w-full px-2 focus:outline-none '
                        type="text"
                        value={message}
                        placeholder='Ecrivez un message...'
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && message.trim() !== '') {
                                handleSendMessage();
                            }
                        }}
                        onChange={(e) => { setMessage(e.target.value); setImTyping(true) }}
                    />
                    <Icon
                        title='Envoyer'
                        disabled={!imTyping || message.trim() === ''}
                        onClick={() => handleSendMessage()}
                        icon='send'
                        size='3xl'
                        color='green'
                    />
                </CardFooter>
            </Card >
        </div >
    );

};

export default Chat;