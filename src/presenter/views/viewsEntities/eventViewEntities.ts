import { Event, EventCategory } from "../../../domain/entities/Event";
import { Flag } from "../../../domain/entities/Flag";
import { dayMS } from "../../../domain/entities/frontEntities";

export class EventView extends Event {
    actif?: boolean;
    days?: Date[] | string[];
    Igo: boolean;
    label: string;
    pourcent: number;
    flagged: boolean;
    mine: boolean;
    isValidate: boolean;
    agendaLink: string;
    eventDateInfo: string;
    toogleParticipate?: () => Promise<EventView>;

    constructor(event: Event, userId: number) {
        super(event);
        this.days = this.getDays(event);
        this.Igo = event.Participants.some((p) => p.userId === userId) ? true : false;
        this.mine = event?.userId === userId;
        this.label = EventCategory[event.category as unknown as keyof typeof EventCategory];
        this.pourcent = Math.floor((event.Participants?.length || 0) / event.participantsMin * 100);
        this.flagged = event.Flags ? event?.Flags?.some((flag: Flag) => flag.userId === userId) : false;
        this.agendaLink = this.generateCalendarLink(event);
        this.eventDateInfo = this.eventdateInfo(event);
        this.isValidate = event.Participants.length >= event.participantsMin;

    }


    private eventdateInfo = (event: Event) => {
        return (
            'de ' + new Date(event.start).toLocaleDateString('fr-FR', { weekday: 'short', month: 'short', day: 'numeric', minute: 'numeric', hour: 'numeric' })
            + " à " +
            (new Date(event.start).toDateString() === new Date(event.end).toDateString() ?
                new Date(event?.end).toISOString().slice(11, 16) :
                new Date(event?.end).toLocaleDateString('fr-FR', { weekday: 'short', month: 'short', day: 'numeric', minute: 'numeric', hour: 'numeric' })))
    }

    private generateCalendarLink(event: Event): string {
        const start = new Date(event.start).toISOString().replace(/-|:|\.\d\d\d/g, "");
        const end = new Date(event.end).toISOString().replace(/-|:|\.\d\d\d/g, "");
        const title = encodeURIComponent(event.title);
        const location = encodeURIComponent(`${event.Address.address} , ${event.Address.zipcode} ${event.Address.city}` || "");
        const details = encodeURIComponent(event.description || "");
        return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}&target=_blank`;
    }

    private getDays(event: Event): Date[] {
        const start = new Date(event.start).getTime();
        const end = new Date(event.end).getTime();
        const days: Date[] = [];
        for (let time = start; time <= end; time += dayMS) {
            days.push(new Date(time));
        }
        return days;
    }
}
