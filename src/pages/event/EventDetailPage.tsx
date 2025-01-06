import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import parse from 'html-react-parser';
import NavBarTop from '../../components/UIX/NavBarTop';
import SubHeader from '../../components/UIX/SubHeader';
import CTAMines from '../../components/UIX/CTAMines';
import { EventDetailCard } from '../../components/eventComps/EventDetailCard';
import UserContext from '../../contexts/user.context';
import { eventCategories, GenereMyActions, getLabel, toggleParticipant, isFlaged } from '../../functions/GetDataFunctions';
import { deleteEvent, getEventById } from '../../functions/API/eventsApi';
import { action, EventP, Participant } from '../../types/class'
import Skeleton from 'react-loading-skeleton';
import { getFlagsEvent } from '../../functions/API/flagsApi';

export default function EventDetailPage() {
    const { id } = useParams();
    const { user } = useContext(UserContext)
    const userId = user.userId;
    const [event, setEvent] = useState<EventP>({} as EventP);
    const [isMine, setIsMine] = useState<boolean>(true);
    const [Igo, setIgo] = useState<boolean>(false);
    const [isValidate, setIsValidate] = useState<boolean>(false)
    const [flagged, setFlagged] = useState<boolean>(false)
    const myActions = GenereMyActions(event, "evenement", deleteEvent, () => { });
    const [loading, setLoading] = useState<boolean>(true);
    const [label, setLabel] = useState<string>('')
    const navigate = useNavigate();

    const fetchEvent = async () => {
        const idS = id ? parseInt(id) : 0;
        const flags = await getFlagsEvent();;
        try {
            const event = await getEventById(idS);
            const flagged = isFlaged(event, userId, flags)
            setFlagged(flagged);
            setEvent(event);
            setLabel(getLabel(event.category.toString(), eventCategories));
            setIsMine(event.userId === userId);
            setIsValidate(event.Participants.length > event.participantsMin);
            setIgo(event.Participants.find((participant: Participant) => participant.userId === userId) ? true : false);

        } catch (error) {
            navigate('/evenement-' + id)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchEvent() }, []);

    const { title, Address } = event;

    const buttons: action[] = [
        {
            icon: Igo ? 'Annuler votre participation' : '',
            title: `annuler votre participation a ${title}`,
            body: `annuler votre participation a ${title}`,
            function: () => { toggleParticipant(event.id, userId, setEvent); fetchEvent() }
        },
        {
            icon: Igo ? '' : `Participer a ${title}`,
            title: `Participer a ${title}`,
            body: `Participer a ${title}`,
            function: () => { toggleParticipant(event.id, userId, setEvent); fetchEvent() }
        },

    ];


    return (
        <div className="Body cyan">
            <header className="px-4">
                <NavBarTop />
                <SubHeader type={`évenement ${label}`}
                    place={parse(`<br><div className="text-xl whitespace-nowrap text-ellipsis overflow-hidden ">${Address?.address} ${Address?.city}</div>`)} closeBtn />
            </header>
            <main>
                {!loading ? <EventDetailCard Event={event} setEvent={setEvent} flagged={flagged} /> : <Skeleton count={1} height={800} />}
            </main>
            {isMine ?
                <CTAMines actions={myActions}
                    disabled1={event.Participants?.length > 0}
                    disabled2={isValidate} />
                :
                <CTAMines
                    disabled1={false}
                    disabled2={Igo}
                    actions={buttons} />
            }
        </div>
    );
}