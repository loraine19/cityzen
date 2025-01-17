import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Action } from '../../../../domain/entities/frontEntities';
import UserContext from '../../../../contexts/user.context';
import { Pool } from '../../../../domain/entities/Pool';
import { PoolService } from '../../../../domain/repositories-ports/PoolRepository';
import { GenereMyActions } from '../../../../utils/GetDataFunctions';
import CTAMines from '../../common/CTAMines';
import NavBarTop from '../../common/NavBarTop';
import SubHeader from '../../common/SubHeader';
import PoolDetailCard from './poolSurveyComp/PoolDetailCard';

export default function PoolDetailPage() {
    const { id } = useParams();
    const { userProfile } = useContext(UserContext);
    const userId: number = userProfile.userId;
    const [element, setElement] = useState<Pool>({} as Pool);
    const [isMine, setIsMine] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(!open);
    const { getPoolById, deletePool } = new PoolService();
    const myActions = GenereMyActions(element, "cagnotte", deletePool, handleOpen)


    const fetch = async () => {
        const idS = id ? parseInt(id) : 0;
        const result = await getPoolById(idS);
        setElement(result);
        setIsMine(result.userId === userId);
        setLoading(false);
    };

    useEffect(() => {
        fetch();
    }, []);

    //// ACTIONS
    const Actions: Action[] = [
        {
            icon: 'Sans avis',
            title: "Confirmer votre vote neutre ",
            body: `Pour la cagnotte ${element.title} `,
            function: () => { window.open(`tel:${element.User?.Profile.phone}`); handleOpen(); },
        },
        {
            icon: 'Voter contre',
            title: 'Confirmer votre vote contre',
            body: `Pour la cagnotte ${element.title} `,
            function: () => { window.open(`mailto:${element.User?.email}?subject=${element.title}`); handleOpen(); },
        },
        {
            icon: 'Voter Pour',
            title: 'Confirmer votre vote pour',
            body: `Pour la cagnotte ${element.title} `,
            function: () => { window.open(`mailto:${element.User?.email}?subject=${element.title}`); handleOpen(); },
        },
    ]

    return (
        <div className="Body orange">
            <header className="px-4">
                <NavBarTop />
                <SubHeader type={`Cagnotte `} link={`/sondage`} closeBtn />
            </header>
            <main>
                {loading ?
                    <div>Loading...</div> :
                    <div className="flex pt-6 pb-1 h-full">
                        <PoolDetailCard element={element} mines={isMine} change={() => { }} />
                    </div>}
            </main>

            {isMine ?
                <CTAMines actions={myActions} /> :
                <CTAMines actions={Actions} />}
        </div>
    );
}

