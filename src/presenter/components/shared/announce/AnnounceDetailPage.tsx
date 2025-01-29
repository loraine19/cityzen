import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { PostService } from '../../../../domain/repositoriesBase/PostRepository';
import { Post } from '../../../../domain/entities/Post';
import { GenereMyActions, getLabel, postCategories } from '../../../../infrastructure/services/utilsService';
import CTAMines from '../../common/CTAMines';
import NavBarTop from '../../common/NavBarTop';
import SubHeader from '../../common/SubHeader';
import AnnounceDetailComp from './announceComps/PostDetailCard';
import { Action } from '../../../../domain/entities/frontEntities';
import { useUserStore } from '../../../../application/stores/user.store';

export default function AnnounceDetailPage() {
    const { id } = useParams();
    const { user } = useUserStore()
    const userId = user.id
    const [post, setPost] = useState<Post>({} as Post);
    const [isMine, setIsMine] = useState<boolean>(false);
    const [share, setShare] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const { deletePost, getPostById } = new PostService();
    const myActions = GenereMyActions(post, "annonce", deletePost, handleOpen)
    const label = getLabel(post.category, postCategories);

    const fetch = async () => {
        const idS = id ? parseInt(id) : 0;
        const result = await getPostById(idS);
        console.log(result)
        setPost(result);
        setIsMine(result.userId === userId);
        const share = result.share.toString().split(', ');
        setShare(share);
        setLoading(false);
    };

    useEffect(() => {
        fetch();
    }, []);

    //// CONTACT ACTIONS
    const ContactActions: Action[] = [
        {
            icon: 'Appel',
            title: "Confirmer mon appel à " + post.User?.Profile.firstName,
            body: `<a href="tel:${post.User?.Profile.phone}" target="_blank" rel="noopener noreferrer" class="text-orange-500 font-medium underline">Confirmer mon appel ${post.User?.Profile.phone}</a>`,
            function: () => { window.open(`tel:${post.User?.Profile.phone}`); handleOpen(); },
        },
        {
            icon: 'Email',
            title: "Envoyer un email à " + post.User?.Profile.firstName,
            body: `<a href="mailto:${post.User?.email}?subject=${post.title} target="_blank" rel="noopener noreferrer" class="text-orange-500 font-medium underline">Envoyer un email à ${post.User?.Profile.firstName}</a>`,
            function: () => { window.open(`mailto:${post.User?.email}?subject=${post.title}`); handleOpen(); },
        },
    ]

    return (
        <div className="Body orange">
            <header className="px-4">
                <NavBarTop />
                <SubHeader type={`annonce ${label}`} closeBtn />
            </header>
            <main>
                {loading ?
                    <div>Loading...</div> :
                    <div className="flex pt-6 pb-1 h-full">
                        <AnnounceDetailComp post={post} mines={isMine} change={() => { }} />
                    </div>}
            </main>
            <footer>
                {isMine ?
                    <CTAMines actions={myActions} /> :
                    <CTAMines actions={ContactActions}
                        disabled1={share.find((s: string) => s === "PHONE") ? false : true}
                        disabled2={share.find((s: string) => s === "EMAIL") ? false : true} />}
            </footer>
        </div>
    );
}

