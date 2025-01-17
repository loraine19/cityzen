import { useEffect, useState } from 'react';
import { Card, Popover, PopoverContent, PopoverHandler, } from '@material-tailwind/react';
import { dayMS, getWeeksFull, shortDateString } from '../../../../../utils/GetDataFunctions'
import { EventP } from '../../../../../domain/entities/Events';
import { EventCard } from './EventCard';

export default function CalendarCompLarge(props: { eventList: EventP[] }) {
    const { eventList } = props
    interface EventPA { events: EventP & { actif: boolean }[] & { days: Date[] } }
    interface EventPA extends EventP {
        actif: boolean;
        days: Date[];
    }
    type day = { date: Date, events: EventPA[], text: String }
    const numberOfwweks = 2
    const [startDateBackup] = useState<Date>(new Date().getDay() > 0 ? new Date() : new Date(new Date().getTime() - 1 * dayMS));
    const [startDate, setStartDate] = useState<string>(startDateBackup.toDateString());
    const [weeks, setWeeks] = useState<day[][]>([])

    /// NAVIGATE WEEK BTN
    const addWeek = () => { setStartDate((new Date(new Date(startDate).getTime() + 7 * dayMS)).toDateString()) }
    const removeWeek = () => { setStartDate((new Date(new Date(startDate).getTime() - 7 * dayMS)).toDateString()) }
    const resetWeek = () => { setStartDate(startDateBackup.toDateString()) }

    let num = 3
    const [col, setCol] = useState<number>(num)
    const addCol = () => { col < 4 ? (num = col + 1) : (num = 4), setCol(num) }
    const removeCol = () => { col > 1 ? (num = col - 1) : (num = 1), setCol(num) }
    const resetCol = () => { num = 2, setCol(num) }

    //// USE EFFECT
    useEffect(() => {
        setWeeks(getWeeksFull(startDate, eventList, numberOfwweks));
    }, [startDate, props])


    return (
        <Card className="relative overflow-auto flex h-[calc(100%-1rem)] bg-opacity-45 mt-2 px-2 flex-col rounded-lg text-center text-sm">
            <div className='z-50 flex w-full justify-between sticky top-0  p-1'>
                <div className='flex gap-2 items-center bg-white rounded-2xl px-1 lg:hidden'>
                    <button onClick={removeCol} disabled={col <= 1 ? true : false} ><span className='material-symbols-outlined !text-lg'>do_not_disturb_on</span></button>
                    <button onClick={resetCol}>{col}</button>
                    <button onClick={addCol} disabled={col >= 7 ? true : false}><span className='material-symbols-outlined !text-lg' >add_circle</span></button>
                </div>
                <div className='flex lg:flex-1 bg-white rounded-2xl p-1 justify-around'>
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
            <div className=' flex flex-col flex-1 w-full  '>
                {weeks.map((week: any, indexWeek: number) => (
                    <div key={indexWeek} className={` 
                     ${col === 1 && 'grid-cols-1'}
                     ${col === 2 && 'grid-cols-2'}
                     ${col === 3 && 'grid-cols-3'} 
                     ${col === 4 && 'grid-cols-4'} 
                     ${col === 5 && 'grid-cols-5'}  
                      grid  grid-cols-${col} rounded-lg  lg:grid-cols-7 h-full`}>
                        {week.map((day: any, indexDay: number) => (
                            <div className=' text-xs  h-[calc(50vh-9.5rem)]  flex flex-col py-1 px-2 text-center ' key={indexDay}>

                                <Card className={` ${new Date(day.date).toDateString() === new Date().toDateString()
                                    && 'orange100'}  gap-1 lg:gap-2 flex items-center z-10 h-full`}>
                                    <div className='flex overflow-auto h-full flex-col z-50 max-h-52 w-[calc(100%+1.5rem)] gap-2 '>
                                        <p className='sticky top-0 z-50 bg-white rounded-xl mx-5 py-0.5'> {day.text} </p>
                                        {
                                            day.events.sort((a: any, b: any) => a.id - b.id).map((event: EventPA, indexEvent: number) => {

                                                const eventDays = event.days.map((d: any) => new Date(d).toDateString());
                                                const currentDay = new Date(new Date(day.date).getTime()).toDateString();
                                                const blob = week[indexDay + 1]?.events.filter((event: EventPA) => !event.actif && eventDays.includes(currentDay))
                                                const finis = blob ? blob.some((e: EventPA) => e.id === event.id) : false;
                                                const activeEventsCount = day.events.filter((event: EventPA) => event.actif).length;
                                                return (
                                                    <div key={indexEvent} className='w-full rounded-xl  '>
                                                        {indexEvent === 0 &&
                                                            <p className='text-[0.7rem] pr-4  opacity-75 -mt-2.5'> {` ${activeEventsCount === 1 ? activeEventsCount + ' événement' : activeEventsCount + ' événements'}`}</p>}
                                                        <Popover key={event.id}>
                                                            <PopoverHandler>
                                                                <div className=
                                                                    {`${event?.actif ? 'bg-cyan-500' : 'invisible'} shadow-lg p-1 text-xs text-white h-8 truncate flex items-center justify-center  z-50
                                                        ${(eventDays[0] === currentDay || new Date(day.date).getDay() === 1) && 'rounded-l-2xl !justify-start z-50 pl-4'}
                                                        ${(eventDays[eventDays.length - 1] === currentDay)
                                                                        || (new Date(day.date).getDay() === 0)
                                                                        && ' !rounded-r-2xl '}
                                                        ${finis && ' !rounded-r-2xl'}
                                                    `}>
                                                                    {(eventDays[0] === currentDay || new Date(day.date).getDay() === 1) ? event?.title + '...' :
                                                                        `Jour ${eventDays.indexOf(currentDay) + 1} / ${event?.days.length}`}
                                                                </div>
                                                            </PopoverHandler>
                                                            <PopoverContent className='bg-transparent shadow-none z-50 border-none p-0'>
                                                                <div className="fixed top-[16rem] left-1/2 transform -translate-x-1/2 max-h-[calc(100vh-19rem)] w-[calc(100vw-2rem)] 
                                                    flex justify-center items-center ">
                                                                    <EventCard event={event} change={() => { }} />
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                )
                                            })}
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                ))
                }
            </div >
            <div className='absolute top-[2rem] flex flex-col flex-1 w-[calc(100%-1rem)] h-[calc(100%-2rem)]  gap-1 overflow-auto'>

            </div>
        </Card >)
}


