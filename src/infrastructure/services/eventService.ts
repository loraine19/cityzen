//src/infrastructure/services/eventService.ts
import { EventView, Event } from "../../domain/entities/Event";
import { Flag } from "../../domain/entities/Flag";
import { dayMS, defaultEventImage } from "../../domain/entities/frontEntities";
import { Participant } from "../../domain/entities/Participant";
import { ParticipantService } from "../../domain/repositories-ports/ParticipantRepository";
import { EventApi } from "../providers/http/eventApi";
import { eventCategories, getLabel, shortDateString } from "./utilsService";

interface EventServiceI {
    getInfosInEvents(events: Event[], userId: number): EventView[];
    getInfosInEvent(event: Event, userId: number): EventView;
}

export class EventService implements EventServiceI {
    constructor() { }

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

    toggleParticipant = async (event: Event, userId: number) => {
        const { postParticipant, deleteParticipant } = new ParticipantService();
        const isParticipant = event.Participants.find((participant: any) => participant.userId === userId) ? true : false;
        isParticipant ? await deleteParticipant(event.id) : await postParticipant({ userId: userId, eventId: event.id });
    }

    generateCalendarLink(event: Event): string {
        const start = new Date(event.start).toISOString().replace(/-|:|\.\d\d\d/g, "");
        const end = new Date(event.end).toISOString().replace(/-|:|\.\d\d\d/g, "");
        const title = encodeURIComponent(event.title);
        const location = encodeURIComponent(`${event.Address.address} , ${event.Address.zipcode} ${event.Address.city}` || "");
        const details = encodeURIComponent(event.description || "");
        return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}&target=_blank`;
    }


    ////PRIVATE
    private getImageForCategory(category: string): string {
        return defaultEventImage.find(categoryD => categoryD.type === category.toString())?.image || defaultEventImage[0].image;
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
        return {
            ...event,
            image: event.image ? event.image : this.getImageForCategory(event.category.toString()),
            days: this.getDays(event),
            label: getLabel(event.category, eventCategories),
            Igo: event.Participants.some((participant: Participant) => participant.userId === userId),
            flagged: event.Flags ? event.Flags.some((flag: Flag) => flag.userId === userId) : false,
            mine: event.userId === userId,
            pourcent: Math.floor((event.Participants?.length || 0) / event.participantsMin * 100),
            agendaLink: this.generateCalendarLink(event),
            toogleParticipate: async () => {
                await this.toggleParticipant(event, userId);
                const updatedEvent = await new EventApi().getEventById(event.id);
                return this.mapEventToEventView(updatedEvent, userId);
            },
        };
    }

    //// FOR VIEW
    getInfosInEvents(events: Event[], userId: number): EventView[] {
        if (!events) return [];
        return events.map(event => this.mapEventToEventView(event, userId));
    }

    getInfosInEvent(event: Event, userId: number): EventView {
        if (!event) return {} as EventView;
        return this.mapEventToEventView(event, userId);
    }
}
