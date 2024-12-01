import { useParams } from 'react-router-dom';
import NavBarTop from '../../components/NavBarTop';
import { eventsFaker } from "../../datas/fakers/eventsFaker";
import { EventDetailCard } from '../../components/eventComps/EventDetailCard';
import SubHeader from '../../components/SubHeader';
import parse from 'html-react-parser';
import CTA from '../../components/CTA';
import { event } from '../../types/type';
import { usersFaker } from '../../datas/fakers/usersFaker';
import eventUsersFaker from '../../datas/fakers/eventUsers';
import { useContext, useState } from 'react';
import CTAMines from '../../components/CATMines';
import { beInElement, getDays, getUsers } from '../../functions/GetDataFunctions';
import UserContext from '../../contexts/user.context';
import { userProfile } from '../../types/user';
export default function EventDetailPage() {
    const { id } = useParams()
    const [eventList, setEventList] = useState<event[]>(getDays(getUsers(eventsFaker, eventUsersFaker as [], usersFaker as [], 'event_id')))
    let found = (eventList.find((event: event) => event.id == parseInt(id!)))
    const [selectedEvent] = useState<event>(found ? (found) : (eventsFaker[0]))
    const { user } = useContext(UserContext);
    const mines = found?.user_id === user.id ? true : false
    const igo = found?.users.find((userE: userProfile) => userE.id === user.id) ? true : false
    const disabledCTA = mines || igo ? true : false
    const disabledEditCTA = selectedEvent.users.length >= selectedEvent.participants ? true : false
    const handleGo = (elementLiked: event) => { beInElement(elementLiked, eventList, setEventList, eventUsersFaker, user, "event_id") }

    return (
        <div className="Body cyan">
            <header className="px-4">
                <NavBarTop />
                <SubHeader type={`évenement ${selectedEvent.category}`}
                    place={parse(`<br><div className="text-xl whitespace-nowrap text-ellipsis overflow-hidden ">${selectedEvent.adress}</div>`)} closeBtn />
            </header>
            <main >
                <EventDetailCard event={selectedEvent} avatarDatas={selectedEvent.users} mines={mines} />
            </main>

            {mines ?
                <CTAMines id={selectedEvent.id} disabled2={disabledEditCTA} />
                :
                <CTA addBtn={true} text={igo ? "Vous participer déjà" : `Participer a ${selectedEvent.title}`} disabled={disabledCTA} cancelBtn={igo} handleClick={(selectedEvent: event) => { handleGo(selectedEvent) }} element={selectedEvent} />
            }

        </div >
    )
} 