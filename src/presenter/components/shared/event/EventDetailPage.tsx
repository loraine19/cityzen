import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import parse from 'html-react-parser';
import Skeleton from 'react-loading-skeleton';
import UserContext from '../../../../contexts/user.context';
import { EventP } from '../../../../domain/entities/Events';
import { Participant } from '../../../../domain/entities/Participant';
import { EventService } from '../../../../domain/repositories-ports/EventRepository';
import { GenereMyActions, getLabel, eventCategories, toggleParticipant } from '../../../../utils/GetDataFunctions';
import CTAMines from '../../common/CTAMines';
import NavBarTop from '../../common/NavBarTop';
import SubHeader from '../../common/SubHeader';
import { EventDetailCard } from './eventComps/EventDetailCard';
import { Action } from '../../../../domain/entities/frontEntities';


export default function EventDetailPage() {
    const { id } = useParams();
    const { userProfile } = useContext(UserContext)
    const userId = userProfile.userId;
    const [event, setEvent] = useState<EventP>({} as EventP);
    const [isMine, setIsMine] = useState<boolean>(true);
    const [Igo, setIgo] = useState<boolean>(false);
    const [isValidate, setIsValidate] = useState<boolean>(false)
    const { deleteEvent, getEventById } = new EventService();
    const myActions = GenereMyActions(event, "evenement", deleteEvent, () => { });
    const [loading, setLoading] = useState<boolean>(true);
    const [label, setLabel] = useState<string>('')
    const navigate = useNavigate();

    const fetchEvent = async () => {
        const idS = id ? parseInt(id) : 0;
        try {
            const event = await getEventById(idS);
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

    const buttons: Action[] = [
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
                {!loading ? <EventDetailCard Event={event} setEvent={setEvent} /> : <Skeleton count={1} height={800} />}
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