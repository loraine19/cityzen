import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SurveyService } from '../../../../domain/repositoriesBase/SurveyRepository';
import CTAMines from '../../common/CTAMines';
import NavBarTop from '../../common/NavBarTop';
import SubHeader from '../../common/SubHeader';
import SurveyDetailCard from './poolSurveyCards/SurveyDetailCard';
import { Action } from '../../../../domain/entities/frontEntities';
import { Skeleton } from '../../common/Skeleton';
import { GenereMyActions, } from '../../../views/viewsEntities/utilsService';
import DI from '../../../../di/ioc';


export default function SurveyDetailPage() {
    const { id } = useParams();
    const idS = id ? parseInt(id) : 0
    const surveyIdViewModelFactory = DI.resolve('surveyIdViewModel');
    const { survey, isLoading, } = surveyIdViewModelFactory(idS);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const { deleteSurvey } = new SurveyService();
    const myActions: Action[] = GenereMyActions(survey, "sondage", deleteSurvey, handleOpen)


    const Actions: Action[] = [
        {
            icon: 'Sans avis',
            title: "Confirmer mon appel à " + survey?.User?.Profile.firstName,
            body: `<a href="tel:${survey?.User?.Profile.phone}" target="_blank" rel="noopener noreferrer" class="text-orange-500 font-medium underline">Confirmer mon appel ${survey?.User?.Profile.phone}</a>`,
            function: () => { window.open(`tel:${survey?.User?.Profile.phone}`); handleOpen(); },
        },
        {
            icon: 'Voter contre',
            title: "Envoyer un email à " + survey?.User?.Profile.firstName,
            body: `<a href="mailto:${survey?.User?.email}?subject=${survey?.title} target="_blank" rel="noopener noreferrer" class="text-orange-500 font-medium underline">Envoyer un email à ${survey?.User?.Profile.firstName}</a>`,
            function: () => { window.open(`mailto:${survey?.User?.email}?subject=${survey?.title}`); handleOpen(); },
        },
        {
            icon: 'Voter Pour',
            title: "Envoyer un email à " + survey?.User?.Profile.firstName,
            body: `<a href="mailto:${survey?.User?.email}?subject=${survey?.title} target="_blank" rel="noopener noreferrer" class="text-orange-500 font-medium underline">Envoyer un email à ${survey?.User?.Profile.firstName}</a>`,
            function: () => { window.open(`mailto:${survey?.User?.email}?subject=${survey?.title}`); handleOpen(); },
        },
    ]

    return (
        <div className="Body orange">
            <header className="px-4">
                <NavBarTop />
                <SubHeader
                    type={`sondage ${survey?.categoryS}`}
                    closeBtn />
            </header>
            <main>
                {isLoading ?
                    <Skeleton className='!rounded-2xl flex pt-6 pb-1 h-full' /> :
                    <div className="flex pt-6 pb-1 h-full">
                        <SurveyDetailCard
                            survey={survey} />
                    </div>}
            </main>
            <footer>
                {survey?.mine ?
                    <CTAMines actions={myActions} /> :
                    <CTAMines actions={Actions} />}
            </footer>
        </div>

    );
}

