import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import parse from 'html-react-parser';
import NavBarTop from '../../components/UIX/NavBarTop';
import SubHeader from '../../components/UIX/SubHeader';
import CTAMines from '../../components/UIX/CTAMines';
import { EventDetailCard } from '../../components/eventComps/EventDetailCard';
import UserContext from '../../contexts/user.context';
import { eventCategories, GenereMyActions, getLabel, toggleParticipant } from '../../functions/GetDataFunctions';
import { deleteEvent, getEventById } from '../../functions/API/eventsApi';
import { action, EventP, Participant } from '../../types/class'

export default function EventDetailPage() {
    const { id } = useParams();
    const user = useContext(UserContext)
    const userId = user.user.userId
    const [event, setEvent] = useState<EventP>({} as EventP);
    const [isMine, setIsMine] = useState<boolean>(true);
    const [Igo, setIgo] = useState<boolean>(false);
    const [isValidate, setIsValidate] = useState<boolean>(false);
    const disabledCTA = isMine || Igo;
    const disabledEditCTA = isValidate;
    const myActions = GenereMyActions(event, "evenement", deleteEvent);
    const [loading, setLoading] = useState<boolean>(true);
    const [label, setLabel] = useState<string>('');
    console.log("EventDetailPage")

    const fetchEvent = async () => {
        const idS = id ? parseInt(id) : 0;
        const event = await getEventById(idS)
        event && setLoading(false);
        setEvent(event);
        setLabel(getLabel(event.category.toString(), eventCategories));
        setIsMine(event.userId === userId);
        setIsValidate(event.Participants.length > event.participantsMin);
        setIgo(event.Participants.find((participant: Participant) => participant.userId === userId) ? true : false)
    }

    useEffect(() => { fetchEvent() }, []);

    const { title, Address } = event;

    const buttons: action[] = [
        {
            icon: Igo ? 'Annuler' : '',
            title: `annuler votre participation a ${title}`,
            body: `annuler votre participation a ${title}`,
            function: () => { toggleParticipant(event.id, userId, setEvent) }
        },
        {
            icon: Igo ? "Vous participer déjà" : `Participer a ${title}`,
            title: `Participer a ${title}`,
            body: `Participer a ${title}`,
            function: () => { toggleParticipant(event.id, userId, setEvent) }
        },

    ];

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="Body cyan">
            <header className="px-4">
                <NavBarTop />
                <SubHeader type={`évenement ${label}`}
                    place={parse(`<br><div className="text-xl whitespace-nowrap text-ellipsis overflow-hidden ">${Address.address} ${Address.city}</div>`)} closeBtn />
            </header>
            <main>
                <EventDetailCard Event={event} setEvent={setEvent} />
            </main>
            {isMine ?
                <CTAMines actions={myActions} disabled2={disabledEditCTA} />
                :
                <CTAMines
                    disabled1={disabledCTA}
                    disabled2={Igo}
                    actions={buttons} />
            }
        </div>
    );
}