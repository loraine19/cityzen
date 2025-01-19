import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import Skeleton from 'react-loading-skeleton';
import { EventView } from '../../../../domain/entities/Event';
import { GenereMyActions } from '../../../../infrastructure/services/utilsService';
import CTAMines from '../../common/CTAMines';
import NavBarTop from '../../common/NavBarTop';
import SubHeader from '../../common/SubHeader';
import { EventDetailCard } from './eventComps/EventDetailCard';
import { Action } from '../../../../domain/entities/frontEntities';
import { EventApi } from '../../../../infrastructure/providers/http/eventApi';
import DI from '../../../../di/ioc';


export default function EventDetailPage() {
    const { id } = useParams();
    const idS = id ? parseInt(id) : 0;

    const eventIdViewModelFactory = DI.resolve('eventIdViewModel');
    const { event, loadingEvent } = eventIdViewModelFactory(idS);
    const [eventLoad, setEventLoad] = useState<EventView>({} as EventView);
    const { deleteEvent } = new EventApi();

    const myActions = event && GenereMyActions(event, "evenement", deleteEvent, () => { });

    const buttons: Action[] = [
        {
            icon: eventLoad.Igo ? 'Annuler votre participation' : '',
            title: `annuler votre participation a ${event?.title}`,
            body: `annuler votre participation a ${event?.title}`,
            function: async () => eventLoad.toogleParticipate && setEventLoad(await eventLoad.toogleParticipate())
        },
        {
            icon: eventLoad.Igo ? '' : `Participer a ${event?.title}`,
            title: `Participer a ${event?.title}`,
            body: `Participer a ${event?.title}`,
            function: async () => eventLoad.toogleParticipate && setEventLoad(await eventLoad.toogleParticipate())
        },

    ];
    useEffect(() => { console.log(event, loadingEvent); !loadingEvent && setEventLoad(event) }, [loadingEvent]);

    //    if (loadingEvent || !eventLoad) { return (<>cc</>) }
    return (
        <div className="Body cyan">
            <header className="px-4">
                <NavBarTop />
                <SubHeader type={`évenement ${eventLoad.label}`}
                    place={parse(`<br><div className="text-xl whitespace-nowrap text-ellipsis overflow-hidden ">${event?.Address?.address} ${event?.Address?.city}</div>`)} closeBtn />
            </header>
            <main>
                {!loadingEvent && eventLoad ?
                    <EventDetailCard EventLoad={eventLoad} setEventLoad={setEventLoad} /> :
                    <Skeleton count={1} height={800} />}
            </main>
            {eventLoad.mine && !loadingEvent ?
                <CTAMines actions={myActions}
                    disabled1={event?.Participants?.length > 0}
                    disabled2={eventLoad.isValidate} />
                :
                <CTAMines
                    disabled1={false}
                    disabled2={eventLoad.Igo}
                    actions={buttons} />
            }
        </div>
    );
}