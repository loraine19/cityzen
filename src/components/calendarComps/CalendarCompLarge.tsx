import { useContext, useEffect, useState } from 'react';
import { Button, Card, Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react';
import { EventCard } from '../eventComps/EventCard';
import { getUsersDetail, getWeeks, imIn, shortDateString } from '../../functions/GetDataFunctions';
import UserContext from '../../contexts/user.context';
import dataContext from '../../contexts/data.context';
import { EventP } from '../../types/class';

export default function CalendarCompLarge(props: { eventList: EventP[] }) {
    console.log(props.eventList)
    const { eventList } = props
    const { user } = useContext(UserContext)

    const { data } = useContext(dataContext)
    const { events, users, profiles, flags } = data
    const UsersProfile = (getUsersDetail(users, profiles))
    type day = { date: Date, events: EventP[], text: String }
    const dayInMilli = 24 * 60 * 60 * 1000
    const numberOfwweks = 2
    const [startDateBackup] = useState<Date>(new Date().getDay() > 0 ? new Date() : new Date(new Date().getTime() - 1 * dayInMilli));
    const [startDate, setStartDate] = useState<string>(startDateBackup.toDateString());
    const [weeks, setWeeks] = useState<day[][]>([])

    const isFlaged = (element: any) => { return imIn(element, flags, user.id) ? true : false };
    const isWithMe = (element: any): boolean => { return element.Participants.find((particpant: any) => particpant.userId === user.id) ? true : false };
    //const handleGo = (elementLiked: EventP) => { beInElement(elementLiked, eventList, setEventList, participants, setParticipants, user, "event_id") }
    const handleGo = (elementLiked: EventP) => { }

    /// NAVIGATE WEEK BTN
    const addWeek = () => { setStartDate((new Date(new Date(startDate).getTime() + 7 * dayInMilli)).toDateString()) }
    const removeWeek = () => { setStartDate((new Date(new Date(startDate).getTime() - 7 * dayInMilli)).toDateString()) }
    const resetWeek = () => { setStartDate(startDateBackup.toDateString()) }

    let num = 3
    const [col, setCol] = useState<number>(num)
    const addCol = () => { col < 4 ? (num = col + 1) : (num = 4), setCol(num) }
    const removeCol = () => { col > 1 ? (num = col - 1) : (num = 1), setCol(num) }
    const resetCol = () => { num = 2, setCol(num) }

    //// USE EFFECT
    useEffect(() => {
        setWeeks(getWeeks(startDate, eventList, numberOfwweks));
    }, [startDate, props])


    const dayNumber: number | any = (eventStart: Date, CalendarDay: Date): number | undefined => {
        return Math.round((new Date(CalendarDay).getTime() - eventStart.getTime()) / dayInMilli)
    }
    const firstDay = " text-left  rounded-full w-[calc(100%+0.5rem)] !z-20"
    const lastDay = "  rounded-full  !w-[calc(100%+0.5rem)]"
    const middleDay = "justify-center text-center w-[calc(100%+3.5rem)] !z-10"

    return (
        <Card className=" flex h-full bg-opacity-45 my-1 p-2 flex-col rounded-lg text-center text-sm overflow-x-auto">
            <div className='flex w-full justify-between'>
                <div className='flex gap-2 items-center lg:hidden'>
                    <button onClick={removeCol} disabled={col <= 1 ? true : false} ><span className='material-symbols-outlined !text-lg'>do_not_disturb_on</span></button>
                    <button onClick={resetCol}>{col}</button>
                    <button onClick={addCol} disabled={col >= 7 ? true : false}><span className='material-symbols-outlined !text-lg' >add_circle</span></button>
                </div>
                <div className='flex lg:flex-1 justify-around p-1'>
                    <button onClick={removeWeek}>
                        <span className='material-symbols-outlined !text-sm'>arrow_back_ios</span>
                    </button>
                    <button onClick={resetWeek}>
                        {shortDateString(new Date())}
                    </button>
                    <button onClick={addWeek}>
                        <span className='material-symbols-outlined !text-sm'>arrow_forward_ios</span>
                    </button>
                </div>
            </div>

            <div className='flex flex-col flex-1 w-full h-max gap-1 overflow-auto'>
                {weeks.map((week: any, key: number) => (
                    <div key={key} className={` ${col === 1 && 'grid-cols-1'} ${col === 2 && 'grid-cols-2'} ${col === 3 && 'grid-cols-3'} ${col === 4 && 'grid-cols-4'} ${col === 5 && 'grid-cols-5'}   grid min-h-max h-[100%] grid-cols-${col} rounded-lg  lg:grid-cols-7 `}>
                        {week.map((day: any, index1: number) =>
                            <div className='text-xs flex flex-col py-1 px-2 text-center h-full' key={index1}>
                                <div> {day.text} </div>
                                <Card className={`${new Date(day.date).toDateString() === new Date().toDateString() && 'orange100'}  pb-3 pt-2 gap-1 lg:gap-2 flex items-center flex-col h-full min-h-20`}>
                                    {day.events?.length < 1 ? <p className='opacity-40 text-xs p-0'>pas <br></br> d'événements</p> : <p className=' opacity-60'>{day.events?.length} événements</p>}
                                    {(day.events).map((event: any, index: number) =>
                                        <Popover key={index}>
                                            <PopoverHandler>
                                                <Button size="sm" key={index} color="cyan"
                                                    className={

                                                        `${((
                                                            (event.days.length > 1 && dayNumber(new Date(event.days[0]), new Date(day.date)) === 0)) || index1 === 0) && firstDay} 

                                                          ${((
                                                            (event.days.length > 1 && dayNumber(new Date(event.days[0]), new Date(day.date)) === event.days.length - 1) && event.days.length !== 2) || index1 === 6) && lastDay} 

                                                           ${(event.days.length > 1 &&
                                                            dayNumber(new Date(event.days[0]), new Date(day.date)) != 0 &&
                                                            dayNumber(new Date(event.days[0]), new Date(day.date)) != (event.days.length) && index1 !== 0 && index1 !== 6
                                                        ) &&

                                                        middleDay} ${event.days.length > 1 && event.days.length === 2 &&
                                                        dayNumber(new Date(event.days[0]), new Date(day.date)) != 0 && `rounded-l-none rounded-r-full !w-[calc(100%+1.7rem)] -ml-4`} 
                                                    
                                                    flex items-center justify-center  py-0.5 lg:py-1  truncate `}>
                                                    {dayNumber(new Date(event.days[0]), new Date(day.date)) !== 0 && index1 !== 0 ?
                                                        <span className='lowercase font-normal flex !text-2xs opacity-60  '> jour  {(dayNumber(new Date(event.days[0]), new Date(day.date))) + 1 + " "}
                                                            /{event.days.length}  </span>
                                                        :
                                                        <span className='capitalize font-normal flex text-ellipsis overflow-hidden'>
                                                            {event.category}
                                                            <span className='hidden lg:flex'>  &nbsp;- &nbsp; {event.title}</span>

                                                        </span>
                                                    }
                                                </Button>
                                            </PopoverHandler>
                                            <PopoverContent className='bg-transparent shadow-none z-50 border-none p-0'>
                                                <EventCard
                                                    event={event} avatarDatas={event.Participants} change={() => { }} index={index}
                                                    handleGo={(event: EventP) => handleGo(event)} isFlaged={isFlaged(event)} isWithMe={isWithMe(event)}
                                                    handleClickDelete={() => { }} />
                                            </PopoverContent>
                                        </Popover>
                                    )}
                                </Card>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </Card >)
}