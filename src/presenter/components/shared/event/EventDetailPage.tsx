import { useParams } from 'react-router-dom';
//import parse from 'html-react-parser';
import CTAMines from '../../common/CTA';
import SubHeader from '../../common/SubHeader';
import { EventDetailCard } from './eventComps/EventDetailCard';
import { Action } from '../../../../domain/entities/frontEntities';
import DI from '../../../../di/ioc';
import { Skeleton } from '../../common/Skeleton';
import { GenereMyActions } from '../../../views/viewsEntities/utilsService';
import { useAlertStore } from '../../../../application/stores/alert.store';
import { EventStatus } from '../../../../domain/entities/Event';
import { EventView } from '../../../views/viewsEntities/eventViewEntities';
import { useEffect, useState } from 'react';
import NotifDiv from '../../common/NotifDiv';


export default function EventDetailPage() {
    //// PARAMS 
    const { id } = useParams();
    const idS = id ? parseInt(id) : 0;

    //// VIEW MODEL
    const eventIdViewModelFactory = DI.resolve('eventIdViewModel');
    const { event, isLoading, refetch, error } = eventIdViewModelFactory(idS);
    const deleteEvent = async (id: number) => await DI.resolve('deleteEventUseCase').execute(id);
    const myActions = event && GenereMyActions(event, "evenement", deleteEvent)
    const [eventInit, setEventInit] = useState<EventView>(event)

    //// HANDLE API ERROR
    const { setOpen, open } = useAlertStore(state => state);
    const handleOpen = () => setOpen(!open)
    const [notif, setNotif] = useState<string>('');
    const [notifAlert, setNotifAlert] = useState<string>('');


    useEffect(() => {
        if (!isLoading && event && !eventInit) {
            setEventInit(event);
        }
        if (error) {
            setNotif(error.message);
        }

    }, [isLoading, error, eventInit]);

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
                console.log(data);
                if (data) {
                    setNotifAlert(data.Igo ? 'Vous avez annulé votre participation à l\'événement' : 'Vous participez à l\'événement');
                    setTimeout(() => { setNotifAlert('') }, 5000);
                    setEventInit(data);
                    await refetch();
                    handleOpen();
                    console.log("event", notifAlert)
                }
                else {
                    setNotifAlert('Impossible de mettre à jour votre participation à l\'événement');
                }

            }
        }
    ];


    return (
        <> <main data-cy="event-details-page">
            <div className="sectionHader px-4">
                <SubHeader
                    type={`évenement ${event?.label ?? ''}`}
                    place={` ${event?.Address?.address ?? ''} ${event?.Address?.city ?? ''}`}
                    closeBtn />

            </div>
            <section>
                {!isLoading && event ?
                    <EventDetailCard
                        EventLoad={event}
                        refetch={refetch} /> :
                    <Skeleton />}
                {notif && <NotifDiv
                    isLoading={isLoading}
                    refetch={refetch}
                    notif={notif}
                />}
            </section>
        </main>
            <footer >
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
            </footer>
        </>
    );
}