import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Survey } from '../../../../domain/entities/Survey';
import { SurveyService } from '../../../../domain/repositoriesBase/SurveyRepository';
import CTAMines from '../../common/CTAMines';
import NavBarTop from '../../common/NavBarTop';
import SubHeader from '../../common/SubHeader';
import SurveyDetailCard from './poolSurveyCards/SurveyDetailCard';
import { Action } from '../../../../domain/entities/frontEntities';
import { useUserStore } from '../../../../application/stores/user.store';
import { Skeleton } from '../../common/Skeleton';
import { GenereMyActions, getLabel, surveyCategories } from '../../../views/viewsEntities/utilsService';


export default function SurveyDetailPage() {
    const { id } = useParams();
    const { user } = useUserStore()
    const userId: number = user.id
    const [element, setElement] = useState<Survey>({} as Survey);
    const [isMine, setIsMine] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const { getSurveyById, deleteSurvey } = new SurveyService();
    const myActions: Action[] = GenereMyActions(element, "sondage", deleteSurvey, handleOpen)
    const category: string = getLabel(element.category, surveyCategories)

    const fetch = async () => {
        const idS = id ? parseInt(id) : 0;
        const result = await getSurveyById(idS);
        setElement(result);
        setIsMine(result.userId === userId);
        setLoading(false);
    };
    useEffect(() => { fetch() }, []);

    const Actions: Action[] = [
        {
            icon: 'Sans avis',
            title: "Confirmer mon appel à " + element.User?.Profile.firstName,
            body: `<a href="tel:${element.User?.Profile.phone}" target="_blank" rel="noopener noreferrer" class="text-orange-500 font-medium underline">Confirmer mon appel ${element.User?.Profile.phone}</a>`,
            function: () => { window.open(`tel:${element.User?.Profile.phone}`); handleOpen(); },
        },
        {
            icon: 'Voter contre',
            title: "Envoyer un email à " + element.User?.Profile.firstName,
            body: `<a href="mailto:${element.User?.email}?subject=${element.title} target="_blank" rel="noopener noreferrer" class="text-orange-500 font-medium underline">Envoyer un email à ${element.User?.Profile.firstName}</a>`,
            function: () => { window.open(`mailto:${element.User?.email}?subject=${element.title}`); handleOpen(); },
        },
        {
            icon: 'Voter Pour',
            title: "Envoyer un email à " + element.User?.Profile.firstName,
            body: `<a href="mailto:${element.User?.email}?subject=${element.title} target="_blank" rel="noopener noreferrer" class="text-orange-500 font-medium underline">Envoyer un email à ${element.User?.Profile.firstName}</a>`,
            function: () => { window.open(`mailto:${element.User?.email}?subject=${element.title}`); handleOpen(); },
        },
    ]

    return (
        <div className="Body orange">
            <header className="px-4">
                <NavBarTop />
                <SubHeader type={`sondage ${category}`} closeBtn />
            </header>
            <main>
                {loading ?
                    <Skeleton className='!rounded-2xl flex pt-6 pb-1 h-full' /> :
                    <div className="flex pt-6 pb-1 h-full">
                        <SurveyDetailCard element={element} mines={isMine} change={() => { }} />
                    </div>}
            </main>
            <footer>
                {isMine ?
                    <CTAMines actions={myActions} /> :
                    <CTAMines actions={Actions} />}
            </footer>
        </div>

    );
}

