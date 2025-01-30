//src/infrastructure/services/eventService.ts
import { EventView, Event, EventCategory } from "../../../domain/entities/Event";
import { Flag } from "../../../domain/entities/Flag";
import { dayMS, defaultEventImage } from "../../../domain/entities/frontEntities";
import { Participant } from "../../../domain/entities/Participant";
import { shortDateString } from "../../../infrastructure/services/utilsService";
import { ToogleParticipantUseCase } from '../../../application/useCases/participants.useCase';
import DI from "../../../di/ioc"

interface EventServiceI {
    getInfosInEvents(events: Event[], userId: number): EventView[];
    getInfosInEvent(event: Event, userId: number): EventView;
}
export class EventService implements EventServiceI {

    private toogleParticipantUseCase: ToogleParticipantUseCase;

    constructor() {
        this.toogleParticipantUseCase = DI.resolve('toogleParticipantUseCase')
    }

    //// UTILS
    getWeeksFull = (startDate: any, eventList: EventView[], numberOfWeeks: number): { date: Date, events: EventView[], text: string }[][] => {
        const weeks: { date: Date, events: EventView[], text: string }[][] = [];
        let date = new Date(startDate);
        for (let weekIndex = 0; weekIndex < numberOfWeeks; weekIndex++) {
            const week: { date: Date, events: EventView[], text: string }[] = [];
            const weekDay = date.getDay();
            const monday = date.getTime() - ((weekDay - 1) * dayMS);
            for (let i = 0; i < 7; i++) {
                const nextDay = new Date(monday + (i * dayMS));
                week.push({ date: nextDay, events: [], text: shortDateString(nextDay) });
            }
            for (const event of eventList) {
                if (event.days) {
                    for (const day of event.days) {
                        const dayString = new Date(day).toLocaleDateString();
                        const weekDay = week.find(w => new Date(w.date).toLocaleDateString() === dayString);
                        if (weekDay) {
                            const isEventInWeek = weekDay.events.some(e => e.id === event.id);
                            if (!isEventInWeek) {
                                week.forEach((w) => {
                                    const isActive = new Date(w.date).toLocaleDateString() === dayString;
                                    w.events.push({ ...event, actif: isActive });
                                });
                            } else {
                                weekDay.events.forEach(e => {
                                    if (e.days.some(d => new Date(d).toLocaleDateString() === dayString)) {
                                        e.actif = true;
                                    }
                                });
                            }
                            weekDay.events.sort((a, b) => a.id - b.id);
                        }
                    }
                }
            }
            weeks.push(week);
            date = new Date(monday + 7 * dayMS);
        }
        return weeks;
    }

    eventdateInfo = (event: Event) => {
        return (
            'de ' + new Date(event.start).toLocaleDateString('fr-FR', { weekday: 'short', month: 'short', day: 'numeric', minute: 'numeric', hour: 'numeric' })
            + " à " +
            (new Date(event.start).toDateString() === new Date(event.end).toDateString() ?
                new Date(event?.end).toISOString().slice(11, 16) :
                new Date(event?.end).toLocaleDateString('fr-FR', { weekday: 'short', month: 'short', day: 'numeric', minute: 'numeric', hour: 'numeric' })))
    }


    ////PRIVATE


    generateCalendarLink(event: Event): string {
        const start = new Date(event.start).toISOString().replace(/-|:|\.\d\d\d/g, "");
        const end = new Date(event.end).toISOString().replace(/-|:|\.\d\d\d/g, "");
        const title = encodeURIComponent(event.title);
        const location = encodeURIComponent(`${event.Address.address} , ${event.Address.zipcode} ${event.Address.city}` || "");
        const details = encodeURIComponent(event.description || "");
        return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}&target=_blank`;
    }

    private getImageForCategory(category: string): string {
        return defaultEventImage.find(categoryD => categoryD.type === category?.toString())?.image || defaultEventImage[0].image;
    }
    private getDays(event: Event): Date[] {
        const start = new Date(event.start).getTime();
        const end = new Date(event.end).getTime();
        const days = [];
        for (let time = start; time <= end; time += dayMS) {
            days.push(new Date(time));
        }
        return days;
    }

    private mapEventToEventView(event: Event, userId: number): EventView {
        if (!event) return {} as EventView;
        return {
            ...event,
            image: event.image ? event.image : this.getImageForCategory(event?.category?.toString()),
            days: this.getDays(event),
            label: EventCategory[event.category as unknown as keyof typeof EventCategory],
            Igo: event.Participants ? event.Participants.some((participant: Participant) => participant.userId === userId) : false,
            flagged: event.Flags ? event?.Flags?.some((flag: Flag) => flag.userId === userId) : false,
            mine: event.userId === userId,
            pourcent: Math.floor((event.Participants?.length || 0) / event.participantsMin * 100),
            agendaLink: this.generateCalendarLink(event),
            eventDateInfo: this.eventdateInfo(event),
            isValidate: event.Participants.length >= event.participantsMin,
            toogleParticipate: async () => {
                await this.toogleParticipantUseCase.execute(event, event.id, userId);
                const newEvent = await DI.resolve('getEventByIdUseCase').execute(event.id);
                return this.getInfosInEvent(newEvent, userId);
            }
        };
    }

    //// FOR VIEW
    getInfosInEvents(events: Event[] | Event[][] | undefined, userId: number): EventView[] {
        if (!events) return [];
        if (Array.isArray(events[0])) {
            const eventArray = (events as Event[][]).map(eventArray => eventArray.map(event => this.mapEventToEventView(event, userId)));
            return eventArray.flat();
        }
        return (events as Event[]).map(event => this.mapEventToEventView(event, userId));
    }

    getInfosInEvent(event: Event, userId: number): EventView {
        if (!event) return {} as EventView;
        return this.mapEventToEventView(event, userId);
    }
}
