import { useContext, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import UserContext from '../../../contexts/user.context';
import { Survey } from '../../../domain/entities/Survey';
import { SurveyService } from '../../../domain/repositories/SurveyRepository';
import { GenereMyActions, getLabel, surveyCategories } from '../../../utils/GetDataFunctions';
import CTAMines from '../../common/CTAMines';
import NavBarTop from '../../common/NavBarTop';
import SubHeader from '../../common/SubHeader';
import SurveyDetailCard from './poolSurveyComp/SurveyDetailCard';
import { Action } from '../../../domain/entities/frontEntities';


export default function SurveyDetailPage() {
    const { id } = useParams();
    const { userProfile } = useContext(UserContext);
    const userId: number = userProfile.userId;
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
                    <Skeleton height={400} className='!rounded-2xl flex pt-6 pb-1 h-full' /> :
                    <div className="flex pt-6 pb-1 h-full">
                        <SurveyDetailCard element={element} mines={isMine} change={() => { }} />
                    </div>}
            </main>

            {isMine ?
                <CTAMines actions={myActions} /> :
                <CTAMines actions={Actions} />}
        </div>
    );
}

