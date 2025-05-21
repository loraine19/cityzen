import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CTAMines from '../../common/CTAMines';
import NavBarTop from '../../common/NavBarTop';
import SubHeader from '../../common/SubHeader';
import SurveyDetailCard from './voteCards/SurveyDetailCard';
import { Action } from '../../../../domain/entities/frontEntities';
import { Skeleton } from '../../common/Skeleton';
import { GenereMyActions, } from '../../../views/viewsEntities/utilsService';
import DI from '../../../../di/ioc';
import { VoteCard } from './voteCards/VoteCard';
import { Button } from '@material-tailwind/react';
import { Icon } from '../../common/IconComp';
import { useAlertStore } from '../../../../application/stores/alert.store';
import { PoolSurveyStatus } from '../../../../domain/entities/PoolSurvey';


export default function SurveyDetailPage() {
    const { id } = useParams();
    const idS = id ? parseInt(id) : 0
    const surveyIdViewModelFactory = DI.resolve('surveyIdViewModel');
    const { survey, isLoading, refetch, error } = surveyIdViewModelFactory(idS);
    const deleteSurvey = async (id: number) => await DI.resolve('deleteSurveyUseCase').execute(id)
    const myActions: Action[] = GenereMyActions(survey, "vote/sondage", deleteSurvey)
    const [openVote, setOpenVote] = useState(false);
    const { handleApiError } = useAlertStore()
    const navigate = useNavigate();
    useEffect(() => { if (error) handleApiError(error, () => navigate('/vote/sondage')) }, [isLoading]);

    return (
        <>
            {
                <VoteCard
                    open={openVote}
                    close={() => setOpenVote(false)}
                    vote={survey}
                    refetch={refetch} />
            }
            <div className="Body orange">
                <header className="px-4">
                    <NavBarTop />
                    <SubHeader
                        type={`sondage ${survey?.categoryS}`}
                        link='/vote'
                        closeBtn />
                </header>
                <main>
                    {isLoading || error ?
                        <Skeleton
                            className='!rounded-2xl flex pt-6 pb-1 h-full' /> :
                        <SurveyDetailCard
                            setOpen={setOpenVote}
                            survey={survey} />
                    }
                </main>
                {survey?.mine ?
                    <CTAMines actions={myActions} />
                    :
                    <footer className={`CTA `}>
                        <Button
                            disabled={survey?.status !== PoolSurveyStatus.PENDING}
                            size='lg'
                            color='orange'
                            className='lgBtn w-respLarge min-h-max'
                            onClick={() => setOpenVote(true)}
                        >
                            {<Icon fill color='white' icon={survey.IVoted ? 'edit' : 'smart_card_reader'} />}
                            {survey.IVoted ? survey.status !== PoolSurveyStatus.PENDING ? 'Modifier mon vote' : 'Voter' : 'Ce sondage est terminé'}
                        </Button>
                    </footer>
                }
            </div>
        </>

    );
}

