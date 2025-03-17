import { useState } from 'react';
import { useParams } from 'react-router-dom';
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


export default function SurveyDetailPage() {
    const { id } = useParams();
    const idS = id ? parseInt(id) : 0
    const surveyIdViewModelFactory = DI.resolve('surveyIdViewModel');
    const { survey, isLoading, refetch, error } = surveyIdViewModelFactory(idS);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const deleteSurvey = async (id: number) => await DI.resolve('deleteSurveyUseCase').execute(id)
    const myActions: Action[] = GenereMyActions(survey, "vote/sondage", deleteSurvey, handleOpen)
    const [openVote, setOpenVote] = useState(false);

    return (
        <>
            {
                openVote &&
                <VoteCard
                    open={openVote}
                    setOpen={setOpenVote}
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
                    <footer> <CTAMines actions={myActions} /></footer>
                    :
                    <footer className={`flex gap-2 gap-x-4 w-respLarge justify-around py-2 min-h-max overflow-y-auto `}>
                        <Button
                            className='lgBtn w-respLarge min-h-max'
                            onClick={() => setOpenVote(true)}
                        >
                            {survey.IVoted ? 'Modifier mon vote' : 'Voter'}
                        </Button>
                    </footer>
                }
            </div>
        </>

    );
}

