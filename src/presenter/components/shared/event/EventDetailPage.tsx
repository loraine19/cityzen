import { useParams } from 'react-router-dom';
//import parse from 'html-react-parser';
import CTAMines from '../../common/CTA';
import NavBarTop from '../../common/NavBarTop';
import SubHeader from '../../common/SubHeader';
import { EventDetailCard } from './eventComps/EventDetailCard';
import { Action } from '../../../../domain/entities/frontEntities';
import DI from '../../../../di/ioc';
import { Skeleton } from '../../common/Skeleton';
import { GenereMyActions } from '../../../views/viewsEntities/utilsService';
import { useAlertStore } from '../../../../application/stores/alert.store';
import { EventStatus } from '../../../../domain/entities/Event';


export default function EventDetailPage() {
    //// PARAMS 
    const { id } = useParams();
    const idS = id ? parseInt(id) : 0;

    //// VIEW MODEL
    const eventIdViewModelFactory = DI.resolve('eventIdViewModel');
    const { event, isLoading, refetch, error } = eventIdViewModelFactory(idS);
    const deleteEvent = async (id: number) => await DI.resolve('deleteEventUseCase').execute(id);
    const myActions = event && GenereMyActions(event, "evenement", deleteEvent)

    //// HANDLE API ERROR
    const { setOpen, open, } = useAlertStore(state => state);
    const handleOpen = () => setOpen(!open)

    const buttons: Action[] = [
        {
            color: event.Igo ? 'red' : 'cyan',
            iconImage: event?.Igo ? 'cancel' : 'person',
            icon: event?.Igo ? 'Annuler votre participation' : 'Participer',
            title: event?.Igo ? `Annuler votre participation ` : `Participer à l'évenement`,
            body: event?.Igo ? `Voulez-vous vraiment annuler votre participation à ${event?.title}` :
                `Confirmer votre participation à ${event?.title}`,
            function: async () => {
                const data = await event?.toogleParticipate();
                data && await refetch() && handleOpen()
            }
        }
    ];


    return (
        <div
            data-cy="event-details-page"
            className="Body cyan ">
            <header className="px-4">
                <NavBarTop />
                <SubHeader
                    type={`évenement ${event?.label ?? ''}`}
                    place={` ${event?.Address?.address ?? ''} ${event?.Address?.city ?? ''}`}
                    closeBtn />
            </header>
            <main>
                {!isLoading && event ?
                    <EventDetailCard
                        EventLoad={event}
                        refetch={refetch} /> :
                    <Skeleton />}
            </main>
            {(!isLoading && event && !error) && <>
                {event?.mine && !isLoading ?
                    <CTAMines
                        actions={myActions}
                        disabled1={event?.status !== EventStatus.PENDING}
                        disabled2={event?.status !== EventStatus.PENDING} />
                    :
                    <CTAMines
                        disabled1={false}
                        disabled2={event?.Igo}
                        actions={buttons} />
                }
            </>}

        </div>
    );
}