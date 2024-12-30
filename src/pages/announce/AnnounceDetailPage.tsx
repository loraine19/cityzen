import { useParams } from 'react-router-dom';
import NavBarTop from '../../components/UIX/NavBarTop';
import SubHeader from '../../components/UIX/SubHeader';
import { useContext, useEffect, useState } from 'react';
import CTAMines from '../../components/UIX/CATMines';
import UserContext from '../../contexts/user.context'
import { action, Post } from '../../types/class';
import { deletePost, getPostById } from '../../functions/API/postsApi';
import parse from 'html-react-parser';
import AnnounceDetailComp from '../../components/announceComps/AnnounceDetailComp';
import { GenereMyActions } from '../../functions/GetDataFunctions';

export default function AnnounceDetailPage() {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const userId = user.userId;
    const [post, setPost] = useState<Post>({} as Post);
    const [isMine, setIsMine] = useState<boolean>(false);
    const [share, setShare] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetch = async () => {
        const idS = id ? parseInt(id) : 0;
        const result = await getPostById(idS);
        setPost(result);
        setIsMine(result.userId === userId);
        const share = result.share.toString().split(', ');
        setShare(share);
        setLoading(false);
    };

    useEffect(() => {
        fetch();
    }, []);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    //////CTAVALUES
    const ContactActions: action[] = [
        {
            icon: 'Appel',
            title: "Confirmer mon appel à " + post.User?.Profile.firstName,
            body: parse(`<a href="tel:${post.User?.Profile.phone}" class="text-orange-500 font-medium underline">Confirmer mon appel ${post.User?.Profile.phone}</a>`),
            function: () => { window.location.href = `tel:${post.User?.Profile.phone}`; handleOpen(); },
        },
        {
            icon: 'Email',
            title: "Envoyer un email à " + post.User?.Profile.firstName,
            body: parse(`<a href="mailto:${post.User?.email}" class="text-orange-500 font-medium underline">Envoyer un email à ${post.User?.Profile.firstName}</a>`),
            function: () => { window.location.href = `mailto:${post.User?.email}`; handleOpen(); },
        },
    ]

    return (
        <div className="Body orange">
            <header className="px-4">
                <NavBarTop />
                <SubHeader type={`annonce ${post.category?.toString().toLowerCase()}`} closeBtn />
            </header>
            <main>
                {loading ?
                    <div>Loading...</div> :

                    <div className="flex pt-6 pb-1 h-full">
                        <AnnounceDetailComp post={post} mines={isMine} change={() => { }} />
                    </div>}
            </main>

            {isMine ?
                <CTAMines id={post.id} values={GenereMyActions(post, "annonce", deletePost, handleOpen)} />
                :
                <CTAMines id={post.id} values={ContactActions} disabled1={share.find((s: string) => s === "PHONE") ? false : true} disabled2={share.find((s: string) => s === "EMAIL") ? false : true} />
            }
        </div>
    );
}

