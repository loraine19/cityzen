import { useNavigate, useParams } from 'react-router-dom';
import CTAMines from '../../common/CTA';
import NavBarTop from '../../common/NavBarTop';
import SubHeader from '../../common/SubHeader';
import PostDetailCard from './PostComps/PostDetailCard';
import { Action } from '../../../../domain/entities/frontEntities';
import { GenereMyActions, } from '../../../views/viewsEntities/utilsService';
import DI from '../../../../di/ioc';
import { Skeleton } from '../../common/Skeleton';
import { useAlertStore } from '../../../../application/stores/alert.store';
import { useEffect } from 'react';

export default function PostDetailPage() {
    const { id } = useParams();
    const idS = id ? parseInt(id) : 0;
    const postIdViewModelFactory = DI.resolve('postIdViewModel');
    const { post, isLoading, error } = postIdViewModelFactory(idS);
    const deletePost = async (id: number) => await DI.resolve('deletePostUseCase').execute(id);
    const { setOpen, open, handleApiError } = useAlertStore(state => state);
    const handleOpen = () => setOpen(!open)
    const myActions = post && GenereMyActions(post, "annonce", deletePost)
    const navigate = useNavigate();
    useEffect(() => { if (error) handleApiError(error, () => navigate('/annonce')) }, [isLoading]);

    //// CONTACT ACTIONS
    const ContactActions: Action[] = !post ? [] : [
        {
            iconImage: 'call',
            icon: 'Appel',
            title: "Confirmer mon appel à " + post?.User?.Profile?.firstName,
            body: `<a href="tel:${post?.User?.Profile?.phone}" target="_blank" rel="noopener noreferrer" class="text-orange-500 font-medium underline">Confirmer mon appel ${post?.User?.Profile?.phone}</a>`,
            function: () => { window.open(`tel:${post?.User?.Profile?.phone}`); handleOpen(); },
        },
        {
            iconImage: 'mail',
            icon: 'Email',
            title: "Envoyer un email à " + post?.User?.Profile?.firstName,
            body: `<a href="mailto:${post?.User?.email}?subject=${post?.title} target="_blank" rel="noopener noreferrer" class="text-orange-500 font-medium underline">Envoyer un email à ${post?.User?.Profile?.firstName}</a>`,
            function: () => { window.open(`mailto:${post?.User?.email}?subject=${post?.title}`); handleOpen(); },
        },
        {
            iconImage: 'forum',
            icon: 'Chat',
            title: "Envoyer un message à " + post?.User?.Profile?.firstName,
            body: `<a href="/chat?with=${post?.User?.Profile?.userId ?? 0}" class="text-orange-500 font-medium underline">Envoyer un message à ${post?.User?.Profile?.firstName}</a>`,
            function: () => { navigate(`/chat?with=${post?.User?.Profile?.userId ?? 0}`); handleOpen(); }
        },
    ]

    return (
        <div className="Body orange">
            <header className="px-4">
                <NavBarTop />
                <SubHeader type={`annonce ${post?.categoryS ?? ""}`} closeBtn />
            </header>
            <main>
                {!isLoading && !error && post ?
                    <PostDetailCard
                        post={post}
                        mines={post?.isMine}
                        change={() => { }} /> :
                    <Skeleton />}
            </main>
            {(!isLoading && !error && post) ?
                <>
                    {post?.isMine ?
                        <CTAMines
                            actions={myActions} /> :
                        <CTAMines
                            actions={ContactActions}
                            disabled1={post?.shareA?.find((s: string) => s === "PHONE") ?
                                false : true}
                            disabled2={post?.shareA?.find((s: string) => s === "EMAIL") ?
                                false : true} />
                    }
                </> :
                <footer className={`CTA`}> </footer>}
        </div>
    )
}

