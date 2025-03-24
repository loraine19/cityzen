import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import CTAMines from '../../common/CTAMines';
import NavBarTop from '../../common/NavBarTop';
import SubHeader from '../../common/SubHeader';
import { EventDetailCard } from './eventComps/EventDetailCard';
import { Action } from '../../../../domain/entities/frontEntities';
import DI from '../../../../di/ioc';
import { Skeleton } from '../../common/Skeleton';
import { GenereMyActions } from '../../../views/viewsEntities/utilsService';


export default function EventDetailPage() {
    const { id } = useParams();
    const idS = id ? parseInt(id) : 0;
    const eventIdViewModelFactory = DI.resolve('eventIdViewModel');
    const { event, isLoading, refetch } = eventIdViewModelFactory(idS);
    const deleteEvent = async (id: number) => await DI.resolve('deleteEventUseCase').execute(id);
    const disabledDelete = new Date(event?.start).getTime() < Date.now();
    const disabledEdit = new Date(event?.start).getTime() < Date.now();
    const myActions = event && GenereMyActions(event, "evenement", deleteEvent, () => { });


    const buttons: Action[] = [
        {
            icon: event?.Igo ? 'Annuler votre participation' : '',
            title: `annuler votre participation a ${event?.title}`,
            body: `annuler votre participation a ${event?.title}`,
            function: async () => {
                await event?.toogleParticipate();
                refetch()
            }
        },
        {
            icon: event?.Igo ? '' : `Participer a ${event?.title}`,
            title: `Participer a ${event?.title}`,
            body: `Participer a ${event?.title}`,
            function: async () => {
                await event?.toogleParticipate();
                refetch()
            }
        },

    ];


    return (
        <div className="Body cyan">
            <header className="px-4">
                <NavBarTop />
                <SubHeader
                    type={`évenement ${event?.label || ''}`}
                    place={parse(`<br><div className="text-xl whitespace-nowrap text-ellipsis overflow-hidden ">${event?.Address?.address || ''} ${event?.Address?.city || ''}</div>`)}
                    closeBtn />
            </header>
            <main>
                {!isLoading && event ?
                    <EventDetailCard
                        EventLoad={event}
                        refetch={refetch} /> :
                    <Skeleton />}
            </main>
            <footer>
                {event?.mine && !isLoading ?
                    <CTAMines
                        actions={myActions}
                        disabled1={disabledDelete}
                        disabled2={disabledEdit} />
                    :
                    <CTAMines
                        disabled1={false}
                        disabled2={event?.Igo}
                        actions={buttons} />
                }
            </footer>
        </div>
    );
}