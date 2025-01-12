import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBarTop from '../../components/UIX/NavBarTop';
import SubHeader from '../../components/UIX/SubHeader';
import CTAMines from '../../components/UIX/CTAMines';
import AnnounceDetailComp from '../../components/announceComps/PostDetailCard';
import UserContext from '../../contexts/user.context';
import { action, Post } from '../../types/class';
import { deletePost, getPostById } from '../../functions/API/postsApi';
import { GenereMyActions, getLabel, postCategories } from '../../functions/GetDataFunctions';

export default function AnnounceDetailPage() {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const userId = user.userId;
    const [post, setPost] = useState<Post>({} as Post);
    const [isMine, setIsMine] = useState<boolean>(false);
    const [share, setShare] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
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
    const ContactActions: action[] = [
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

            {isMine ?
                <CTAMines actions={myActions} /> :
                <CTAMines actions={ContactActions}
                    disabled1={share.find((s: string) => s === "PHONE") ? false : true}
                    disabled2={share.find((s: string) => s === "EMAIL") ? false : true} />}
        </div>
    );
}

