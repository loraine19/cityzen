import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CTAMines from '../../common/CTAMines';
import NavBarTop from '../../common/NavBarTop';
import SubHeader from '../../common/SubHeader';
import PostDetailCard from './announceComps/PostDetailCard';
import { Action } from '../../../../domain/entities/frontEntities';
import { GenereMyActions, } from '../../../views/viewsEntities/utilsService';
import DI from '../../../../di/ioc';
import { Skeleton } from '../../common/Skeleton';

export default function AnnounceDetailPage() {
    const { id } = useParams();
    const idS = id ? parseInt(id) : 0;
    const postIdViewModelFactory = DI.resolve('postIdViewModel');
    const { post, isLoading, error } = postIdViewModelFactory(idS);

    const deletePost = async (id: number) => await DI.resolve('deletePostUseCase').execute(id);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open)
    const myActions = post && GenereMyActions(post, "annonce", deletePost, handleOpen)

    //// CONTACT ACTIONS
    const ContactActions: Action[] = [
        {
            icon: 'Appel',
            title: "Confirmer mon appel à " + post?.User?.Profile.firstName,
            body: `<a href="tel:${post?.User?.Profile.phone}" target="_blank" rel="noopener noreferrer" class="text-orange-500 font-medium underline">Confirmer mon appel ${post?.User?.Profile.phone}</a>`,
            function: () => { window.open(`tel:${post?.User?.Profile.phone}`); handleOpen(); },
        },
        {
            icon: 'Email',
            title: "Envoyer un email à " + post?.User?.Profile.firstName,
            body: `<a href="mailto:${post?.User?.email}?subject=${post?.title} target="_blank" rel="noopener noreferrer" class="text-orange-500 font-medium underline">Envoyer un email à ${post?.User?.Profile.firstName}</a>`,
            function: () => { window.open(`mailto:${post?.User?.email}?subject=${post?.title}`); handleOpen(); },
        },
    ]

    if (!isLoading) return (
        <div className="Body orange">
            <header className="px-4">
                <NavBarTop />
                <SubHeader type={`annonce ${post?.categoryS}`} closeBtn />
            </header>
            <main>
                {isLoading || error || !post ?
                    <Skeleton /> :
                    <div className="flex pt-6 pb-1 h-full">
                        <PostDetailCard
                            post={post}
                            mines={post?.isMine}
                            change={() => { }} />
                    </div>}
            </main>
            <footer>
                {post?.isMine ?
                    <CTAMines
                        actions={myActions} /> :
                    <CTAMines
                        actions={ContactActions}
                        disabled1={post?.shareA.find((s: string) => s === "PHONE") ? false : true}
                        disabled2={post?.shareA.find((s: string) => s === "EMAIL") ? false : true} />}
            </footer>
        </div>
    )
    else return <Skeleton />;
}

