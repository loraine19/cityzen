import { useNavigate, useParams } from 'react-router-dom';
import NavBarTop from '../../components/NavBarTop';
import { EventDetailCard } from '../../components/eventComps/EventDetailCard';
import SubHeader from '../../components/SubHeader';
import parse from 'html-react-parser';
import CTA from '../../components/CTA';
import { useContext, useEffect, useState } from 'react';
import CTAMines from '../../components/CATMines';
import { beInElement, getAdress, getDays, getUsers } from '../../functions/GetDataFunctions';
import UserContext from '../../contexts/user.context';
import { Address, EventP, Profile } from '../../types/class';
import DataContext from '../../contexts/data.context';
export default function EventDetailPage() {
    const { id } = useParams()
    const { user } = useContext(UserContext);
    const { data, setDataInLocal } = useContext(DataContext)
    const { events, profiles } = data
    const navigate = useNavigate();
    const [participants, setParticipants] = useState<Profile[]>(data.participants)
    const [eventList, setEventList] = useState<EventP[]>(getDays(getUsers(events, participants as [], profiles as [], "event_id")))
    const [found] = useState<EventP | undefined>(eventList.find((EventP: EventP) => EventP.id == parseInt(id!)))


    const [selectedEvent] = useState<EventP>(found ? (found) : (eventList[0]))
    const address: Address = getAdress(selectedEvent.address_id, data.address) as Address
    const mines = found?.user_id === user.id ? true : false
    const igo = selectedEvent.users?.find((userE: Profile) => userE.user_id === user.user_id) ? true : false
    const disabledCTA = mines || igo ? true : false
    const disabledEditCTA = selectedEvent.users.length >= selectedEvent.participants_min ? true : false

    const handleGo = (elementLiked: EventP) => { beInElement(elementLiked, eventList, setEventList, participants, setParticipants, user, "event_id"), setDataInLocal({ ...data, events: eventList, participants: participants }) }

    useEffect(() => {
        if (!found) {
            navigate("/evenement-" + id)
        }
    }, [found])




    return (

        <div className="Body cyan">
            <header className="px-4">
                <NavBarTop />
                <SubHeader type={`évenement ${selectedEvent.category}`}
                    place={parse(`<br><div className="text-xl whitespace-nowrap text-ellipsis overflow-hidden ">${address.address}</div>`)} closeBtn />
            </header>
            <main >
                <EventDetailCard event={selectedEvent} address={address} avatarDatas={selectedEvent.users} mines={mines} />
            </main>

            {mines ?
                <CTAMines id={selectedEvent.id} disabled2={disabledEditCTA} />
                :
                <CTA addBtn={true} text={igo ? "Vous participer déjà" : `Participer a ${selectedEvent.title}`} disabled={disabledCTA} cancelBtn={igo} handleClick={(selectedEvent: EventP) => { handleGo(selectedEvent) }} element={selectedEvent} />
            }

        </div >
    )

} 