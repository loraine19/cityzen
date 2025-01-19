import { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverHandler, Typography } from '@material-tailwind/react';
import { EventCard } from '../event/eventComps/EventCard';
import { dayMS, getLabel, eventCategories } from '../../../../infrastructure/services/utilsService';
import { Icon } from '../../common/SmallComps';
import DI from '../../../../di/ioc'
import { EventService } from '../../../../infrastructure/services/eventService';
import { day } from '../../../../domain/entities/frontEntities';


export default function CalendarCompLarge(props: { logo?: boolean }) {
    const { logo } = props
    const { events, loadingEvents, errorEvents } = DI.resolve('eventViewModel');
    const eventService = DI.resolve<EventService>('eventService');
    const [numberOfwweks, setNumberOfwweks] = useState<number>(2)
    const [startDateBackup] = useState<Date>(new Date().getDay() > 0 ? new Date() : new Date(new Date().getTime() - 1 * dayMS));
    const [startDate, setStartDate] = useState<string>(startDateBackup.toDateString())
    const [weeks, setWeeks] = useState<day[][]>([])
    const [open, setOpen] = useState<boolean>(false)
    const [popId, setPopId] = useState<string>('')

    //// NAVIGATE WEEK BTN 
    const addWeek = () => { setStartDate((new Date(new Date(startDate).getTime() + 7 * dayMS)).toDateString()) }
    const removeWeek = () => { setStartDate((new Date(new Date(startDate).getTime() - 7 * dayMS)).toDateString()) }
    const resetWeek = () => { setStartDate(startDateBackup.toDateString()) }
    let num = 3
    const [col, setCol] = useState<number>(num)
    const addCol = () => { col < 7 ? (num = col + 1) : (num = 7), setCol(num) }
    const removeCol = () => { col > 1 ? (num = col - 1) : (num = 1), setCol(num) }
    const resetCol = () => { num = 2, setCol(num) }

    //// USE EFFECT 
    window.addEventListener('resize', () => {
        if (window.innerWidth < 900) { setNumberOfwweks(1) } else { setNumberOfwweks(2) }
    })
    useEffect(() => { if (window.innerWidth < 900) { setNumberOfwweks(1); } else { setNumberOfwweks(2) } }, [])

    useEffect(() => {
        setWeeks(eventService.getWeeksFull(startDate, events, numberOfwweks));
    }, [startDate, numberOfwweks])


    return (
        <div className='flex flex-col flex-1 '>
            <div className="flex  justify-between  gap-1 items-center p-0">
                {logo && <div className='flex gap-2 items-center'>
                    <Icon fill icon="supervised_user_circle" link="/evenements" size="4xl"
                        title='Voir tous les événements' />
                    <div>
                        <Typography color="blue-gray" className="hidden lg:flex">
                            Évenements
                        </Typography>
                    </div>
                </div>}
                <div className='flex  w-full justify-between items-center flex-row-reverse'>
                    <div className='flex gap-1 items-center'>
                        <button onClick={removeWeek}><span className='icon notranslate !text-sm'>arrow_back_ios</span></button>
                        <button onClick={resetWeek}>{(new Date().toLocaleDateString('fr-FR', { weekday: 'short', month: 'numeric', day: 'numeric' }))}</button>
                        <button onClick={addWeek}><span className='icon notranslate !text-sm'>arrow_forward_ios</span></button>
                    </div>
                    <div className='flex gap-5 items-center px-4'>  <div className={`flex gap-2 items-center `}>
                        jours
                        <button onClick={removeCol}><span className='material-symbols-rounded notranslate !text-lg'>do_not_disturb_on</span></button>
                        <button onClick={resetCol}>{col}</button>
                        <button onClick={addCol}><span className='material-symbols-rounded notranslate !text-lg'>add_circle</span></button>
                    </div>
                        {!logo &&
                            <div className='flex gap-2 px-2 items-center'>
                                semaine
                                <button onClick={() => setNumberOfwweks(numberOfwweks > 1 ? numberOfwweks - 1 : 1)}><span className='material-symbols-rounded notranslate !text-lg'>remove_circle</span></button>
                                <button onClick={() => setNumberOfwweks(2)}>{numberOfwweks}</button>
                                <button onClick={() => setNumberOfwweks(numberOfwweks < 4 ? numberOfwweks + 1 : 4)}><span className='material-symbols-rounded notranslate !text-lg'>add_circle</span></button>
                            </div>}
                    </div></div>
            </div>
            <div className='relative max-h-full w-full flex flex-1 '>
                {loadingEvents || errorEvents ? (
                    <div className='absolute flex flex-col flex-1 h-full p-2 gap-2 w-full rounded-2xl bg-white shadow'>
                        <div className='grid rounded-lg lg:grid-cols-7 h-full overflow-auto pb-3 bg-blue-gray-50 divide-x divide-cyan-500 divide-opacity-20'>
                            {[...Array(7)].map((_, index) => (
                                <div key={index} className='text-xs flex flex-col text-center h-full'>
                                    <p className='w-full sticky top-0 pt-1 text-center bg-blue-gray-50'>
                                        &nbsp;
                                    </p>
                                    <div className='flex flex-col h-full w-full items-center gap-3'>
                                        {[...Array(3)].map((_, eventIndex) => (
                                            <div key={eventIndex} className='w-full rounded-xl bg-gray-300 h-7 animate-pulse'></div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (<div className=' absolute flex flex-col flex-1 h-full p-2 gap-2  w-full rounded-2xl bg-white shadow '>
                    {weeks.map((week: any, key: number) => (
                        <div key={key} className={` grid rounded-lg  h-full overflow-auto  pb-3 bg-blue-gray-50 divide-x divide-cyan-500 divide-opacity-20
                            ${col === 1 && 'grid-cols-1'} 
                            ${col === 2 && 'grid-cols-2'}
                            ${col === 3 && 'grid-cols-3'}
                            ${col === 4 && 'grid-cols-4'} 
                            ${col === 5 && 'grid-cols-5'}
                            ${col === 6 && 'grid-cols-6'}
                            ${col === 7 && 'grid-cols-7'}`}>
                            {week.map((day: any, index: number) =>
                                <div className={`${new Date(day.date).toDateString() === new Date().toDateString() && 'text-orange-700 text-font-bold'} text-xs flex flex-col text-center h-full    `} key={index}>
                                    <p className='w-full sticky top-0 pt-1 text-center bg-blue-gray-50  '>
                                        {day.date.toLocaleDateString('fr-FR', { weekday: 'narrow', month: 'numeric', day: 'numeric' })}
                                    </p>
                                    <div className='flex flex-col h-full w-full items-center gap-3' key={index}>
                                        {
                                            day.events.sort((a: any, b: any) => a.id - b.id).map((event: any, indexEvent: number) => {
                                                const eventDays = event.days.map((d: any) => new Date(d).toDateString());
                                                const currentDay = new Date(new Date(day.date).getTime()).toDateString();
                                                return (
                                                    <div key={indexEvent} className=' w-full  rounded-xl  '>
                                                        <Popover open={open && popId === event.id + day.date} >
                                                            <button title={'Voir événement' + ' ' + event.title} className=' w-full rounded-xl' onClick={() => { setOpen(true); setPopId(event.id + day.date) }}>
                                                                <PopoverHandler>
                                                                    <div className=
                                                                        {`${!event.actif && 'invisible'} bg-cyan-500 shadow-md  p-[0.4rem]  text-white h-7 truncate flex items-center justify-center font-normal z-50
                                                        ${(eventDays[0] === currentDay || new Date(day.date).getDay() === 1) && 'rounded-l-2xl !justify-start !z-50 pl-4 !font-medium'}
                                                        ${(eventDays[eventDays.length - 1] === currentDay || new Date(day.date).getDay() === 0) && 'rounded-r-2xl '}
                                                    `}>
                                                                        {(eventDays[0] === currentDay || new Date(day.date).getDay() === 1) ? getLabel(event.category, eventCategories) + '...' : `Jour ${eventDays.indexOf(currentDay) + 1}`}
                                                                    </div>

                                                                </PopoverHandler>
                                                            </button>
                                                            <PopoverContent className='bg-transparent shadow-none z-50 border-none p-0'>
                                                                <div className="fixed top-[16rem] left-1/2 transform -translate-x-1/2 max-h-[calc(100vh-19rem)] w-[calc(100vw-2rem)] 
                                                    flex justify-center items-center ">
                                                                    <EventCard event={event} change={() => { }} />
                                                                    <Icon bg fill icon="cancel" size="2xl" onClick={() => setOpen(false)} style='absolute -top-12' />
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                )
                                            })}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>)
                }
            </div>
        </div>
    )
}
