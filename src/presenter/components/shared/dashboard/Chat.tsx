import { useState, useEffect, useRef } from 'react';
import DI from '../../../../di/ioc';
import { Card, CardBody, CardFooter, CardHeader, List, ListItem, Typography } from '@material-tailwind/react';
import { MessageView } from '../../../views/viewsEntities/messageViewEntity';
import { User } from '../../../../domain/entities/User';
import { LoadMoreButton } from '../../common/LoadMoreBtn';
import { Icon } from '../../common/IconComp';
import { ProfileDiv } from '../../common/ProfilDiv';
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';
type ChatProps = {
    userRec: User,
    handleSendMessage: () => void,
    setMessage: any,
    message: string,
    messages: MessageView[], fetchNextPage: any, hasNextPage: boolean, isLoading: boolean,
    newConv?: boolean,
    setNewConv?: any
}

const Chat: React.FC<ChatProps> = ({ userRec = {} as User, handleSendMessage, message, setMessage, messages, fetchNextPage, hasNextPage, isLoading, newConv, setNewConv }) => {

    const [imTyping, setImTyping] = useState(false);
    console.log(imTyping)
    const readConversationUseCase = async (id: number) => DI.resolve('readConversationUseCase').execute(id);
    const [notif, setNotif] = useState<string>('Chargement...');

    useEffect(() => {
        setNotif(userRec?.Profile?.firstName ? `Conversation avec ${userRec?.Profile?.firstName}` : 'Chargement...');
        if (!newConv && userRec?.id && !messages[0]?.read && !isLoading) {
            const read = async () => await readConversationUseCase(userRec.id);
            read();
        }
    }, [userRec])


    const divRef = useRef<HTMLDivElement>(null);

    const [isBottom, setIsBottom] = useState(false);
    const handleScroll = () => {
        if (divRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = divRef.current;

            if ((scrollHeight + scrollTop) <= clientHeight + 4) {
                //      alert('bottom');
                setIsBottom(true);
                if (hasNextPage) {
                    fetchNextPage();
                }
            } else {
                setIsBottom(false);
            }
        }
    }

    const [openEmoji, setOpenEmoji] = useState(false);

    return (
        <div className=' pt-6 flex h-full flex-1 '>
            <Card className='FixCardNoImage flex bg-blue-gray-50  border-white border-8'>
                <CardHeader className='FixCardHeaderNoImage min-h-max !bg-transparent px-3 pt-2'
                    floated={false}>
                    {newConv ?
                        <ProfileDiv profile={userRec.Profile} /> :
                        <Typography
                            variant="h6">
                            {notif}
                        </Typography>}
                </CardHeader>
                <CardBody
                    ref={divRef}
                    onScroll={() => handleScroll()}
                    className='overflow-auto  flex flex-col-reverse pt-4'>
                    <List className='gap-3  justify-end items-end flex flex-col-reverse' >
                        {!isLoading && messages && messages.map((msg: MessageView, index: number) => (
                            <ListItem
                                className="flex p-0 items-start hover:!pointer-events-none "
                                key={index}>
                                <div
                                    className={`flex flex-1 flex-col px-5 shadow-sm pt-3 pb-5 justify-between  ${msg.IWrite ?
                                        'bg-cyan-100 !text-right justify-end rounded-s-[1.5rem] rounded-tr-[1.5rem] !ml-[25%] ' :
                                        'bg-orange-100 rounded-ss-[1.5rem] rounded-r-[1.5rem] !mr-[25%]'}`}>
                                    <div className='text-xs font-light  flex  flex-row-reverse'>
                                        {msg.formatedDate}
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
                    <div>
                        <Icon
                            onClick={() => setOpenEmoji(!openEmoji)}
                            style='relative'
                            color='blue-gray'
                            title='Emoji'
                            size='3xl'
                            icon='mood'
                        />


                        <div className='absolute flex overflow-auto items-end w-full  pr-3 -ml-3 z-50 mb-14 bottom-0 '>
                            <EmojiPicker

                                className='bg-cyan-600 !overflow-auto max-h-[85%] z-40 p-1 mr-2 flex flex-1'
                                previewConfig={{ showPreview: false }}
                                searchPlaceHolder='Rechercher un emoji'
                                skinTonesDisabled={true}
                                searchDisabled={false}
                                emojiStyle={EmojiStyle.GOOGLE}
                                open={openEmoji}
                                onEmojiClick={(emoji) => {
                                    setMessage(message + ' ' + emoji.emoji + ' ');
                                    setOpenEmoji(false)
                                }} />
                        </div>
                    </div>
                    <input
                        className='rounded-full w-full pl-4 focus:outline-none '
                        type="text"
                        value={message}
                        placeholder='Ecrivez un message...'
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && message.trim() !== '') {
                                handleSendMessage();
                                setNewConv(false);
                            }
                        }}
                        onChange={(e) => { setMessage(e.target.value); setImTyping(true) }}
                    />
                    <Icon
                        color='blue-gray'
                        title='Envoyer'
                        onClick={() => { handleSendMessage(); setNewConv(false); setImTyping(false) }}
                        icon='send'
                        size='3xl'
                    />
                </CardFooter>
            </Card >
        </div >
    );

};

export default Chat;