import { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverHandler, Typography } from '@material-tailwind/react';
import { EventCard } from '../eventComps/EventCard';
import { Link } from 'react-router-dom';
import { dayMS, getDays, getWeeks } from '../../functions/GetDataFunctions'
import { EventP } from '../../types/class'

export default function CalendarCompLarge(props: { eventList: EventP[]; }) {
    type day = { date: Date, events: EventP[], text: String }
    let numberOfwweks = 2
    const [startDateBackup] = useState<Date>(new Date().getDay() > 0 ? new Date() : new Date(new Date().getTime() - 1 * dayMS));
    const [startDate, setStartDate] = useState<string>(startDateBackup.toDateString())
    const [eventList, setEventList] = useState<EventP[]>(getDays(props.eventList))
    const [weeks, setWeeks] = useState<day[][]>([])
    window.addEventListener('resize', () => {
        if (window.innerWidth < 900) { numberOfwweks = 1 } else { numberOfwweks = 2 }
    })

    //// NAVIGATE WEEK BTN 
    const addWeek = () => { setStartDate((new Date(new Date(startDate).getTime() + 7 * dayMS)).toDateString()) }
    const removeWeek = () => { setStartDate((new Date(new Date(startDate).getTime() - 7 * dayMS)).toDateString()) }
    const resetWeek = () => { setStartDate(startDateBackup.toDateString()) }
    let num = 3
    const [col, setCol] = useState<number>(num)
    const addCol = () => { col < 5 ? (num = col + 1) : (num = 5), setCol(num) }
    const removeCol = () => { col > 1 ? (num = col - 1) : (num = 1), setCol(num) }
    const resetCol = () => { num = 2, setCol(num) }

    //// USE EFFECT 

    useEffect(() => {
        setEventList(props.eventList)
        setWeeks(getWeeks(startDate, eventList, numberOfwweks));
    }, [startDate, props])


    return (
        <div className='flex flex-col flex-1'>
            <div className="flex  justify-between  gap-1 items-center p-0">
                <div className='flex gap-2 items-center'>
                    <Link to="/service"><span className="material-symbols-rounded fill text-gray-800 !text-4xl" >supervised_user_circle</span>
                    </Link>
                    <div>
                        <Typography color="blue-gray" className="hidden lg:flex">
                            Évenements
                        </Typography>
                    </div>
                </div>
                <div className='flex  w-full justify-between items-center flex-row-reverse'>
                    <div className='flex gap-1 items-center'>
                        <button onClick={removeWeek}><span className='material-symbols-outlined !text-sm'>arrow_back_ios</span></button>
                        <button onClick={resetWeek}>{(new Date().toLocaleDateString('fr-FR', { weekday: 'short', month: 'numeric', day: 'numeric' }))}</button>
                        <button onClick={addWeek}><span className='material-symbols-outlined !text-sm'>arrow_forward_ios</span></button>
                    </div>
                    <div className='flex gap-2 items-center lg:hidden'>
                        <button onClick={removeCol}><span className='material-symbols-outlined !text-lg'>do_not_disturb_on</span></button>
                        <button onClick={resetCol}>{col}</button>
                        <button onClick={addCol}><span className='material-symbols-outlined !text-lg'>add_circle</span></button>
                    </div>
                </div>
            </div>
            <div className='relative h-full w-full flex flex-1'>
                <div className=' absolute flex flex-col flex-1 h-full gap-4 overflow-auto w-full rounded-lg '>
                    {weeks.map((week: any, key: number) => (
                        <div key={key} className={` ${col === 1 && 'grid-cols-1'} ${col === 2 && 'grid-cols-2'}
                             ${col === 3 && 'grid-cols-3'} ${col === 4 && 'grid-cols-4'} 
                             ${col === 5 && 'grid-cols-5'} grid rounded-lg lg:grid-cols-7 gap-y-3`}>
                            {week.map((day: any, index: number) =>
                                <div className={`${new Date(day.date).toDateString() === new Date().toDateString() && 'text-orange-700 text-font-bold'} text-xs flex flex-col text-center h-full`} key={index}>
                                    <div> {day.date.toLocaleDateString('fr-FR', { weekday: 'narrow', month: 'numeric', day: 'numeric' })}
                                    </div>
                                    <div className='flex flex-col h-full w-full' key={index}>
                                        {day.events.length < 1 &&
                                            <span className='GrayChip m-0.5 py-0.5 lg:py-2 rounded-full' >-</span>}
                                        {(day.events).map((event: any, index: number) =>
                                            <Popover key={index}>
                                                <PopoverHandler>
                                                    <p key={index} className={'CyanChip display flex px-2 m-0.5 py-0.5 lg:py-1.5 rounded-full lg:truncate line-clamp-1'}>
                                                        {event.category}
                                                    </p>
                                                </PopoverHandler>
                                                <PopoverContent className='bg-transparent shadow-none z-50 border-none p-0'>
                                                    <EventCard event={event} change={() => { }} />
                                                </PopoverContent>
                                            </Popover>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div >
        </div>
    )
}
