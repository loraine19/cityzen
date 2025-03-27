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
import { Icon } from '../../common/IconComp';


export default function SurveyDetailPage() {
    const { id } = useParams();
    const idS = id ? parseInt(id) : 0
    const surveyIdViewModelFactory = DI.resolve('surveyIdViewModel');
    const { survey, isLoading, refetch, error } = surveyIdViewModelFactory(idS);
    const handleOpen = () => setOpen(!open);
    const deleteSurvey = async (id: number) => await DI.resolve('deleteSurveyUseCase').execute(id)
    const myActions: Action[] = GenereMyActions(survey, "vote/sondage", deleteSurvey, handleOpen)
    const [open, setOpen] = useState(false);

    return (
        <>
            {

                <VoteCard
                    open={open}
                    close={() => setOpen(false)}
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
                            setOpen={setOpen}
                            survey={survey} />
                    }
                </main>

                {survey?.mine ?

                    <CTAMines actions={myActions} />
                    :
                    <footer className={`flex gap-2 gap-x-4 w-respLarge justify-around pt-2 pb-4 h-max overflow-y-auto `}>
                        <Button
                            size='lg'
                            color='orange'
                            className='lgBtn w-respLarge min-h-max'
                            onClick={() => setOpen(true)}
                        >
                            {<Icon fill color='white' icon={survey.IVoted ? 'edit' : 'smart_card_reader'} />}
                            {survey.IVoted ? 'Modifier mon vote' : 'Voter'}
                        </Button>
                    </footer>
                }
            </div>
        </>

    );
}

