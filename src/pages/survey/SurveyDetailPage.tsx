import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBarTop from '../../components/UIX/NavBarTop';
import SubHeader from '../../components/UIX/SubHeader';
import CTAMines from '../../components/UIX/CTAMines';
import UserContext from '../../contexts/user.context';
import { action, Survey } from '../../types/class';
import { GenereMyActions } from '../../functions/GetDataFunctions';
import { deleteSurvey, getSurveyById } from '../../functions/API/surveyApi';
import SurveyDetailCard from '../../components/poolSurveyComp/SurveyDetailCard';

export default function SurveyDetailPage() {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const userId = user.userId;
    const [element, setElement] = useState<Survey>({} as Survey);
    const [isMine, setIsMine] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const myActions = GenereMyActions(element, "sondage", deleteSurvey, handleOpen)

    const fetch = async () => {
        const idS = id ? parseInt(id) : 0;
        const result = await getSurveyById(idS);
        console.log(result)
        setElement(result);
        setIsMine(result.userId === userId);
        setLoading(false);
    };

    useEffect(() => {
        fetch();
    }, []);

    //// CONTACT ACTIONS
    const ContactActions: action[] = [
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
                <SubHeader type={`annonce ${element.category?.toString().toLowerCase()}`} closeBtn />
            </header>
            <main>
                {loading ?
                    <div>Loading...</div> :
                    <div className="flex pt-6 pb-1 h-full">
                        <SurveyDetailCard element={element} mines={isMine} change={() => { }} />
                    </div>}
            </main>

            {isMine ?
                <CTAMines actions={myActions} /> :
                <CTAMines actions={ContactActions} />}
        </div>
    );
}

