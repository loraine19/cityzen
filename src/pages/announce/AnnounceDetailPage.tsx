import { useNavigate, useParams } from 'react-router-dom';
import NavBarTop from '../../components/NavBarTop';
import SubHeader from '../../components/SubHeader';
import { useContext, useEffect, useState } from 'react';
import CTAMines from '../../components/CATMines';
import { post } from '../../types/type';
import AnnounceDetailComp from '../../components/announceComps/AnnounceDetailComp';
import UserContext from '../../contexts/user.context';
import { beInElement, imIn } from '../../functions/GetDataFunctions';
import DataContext from '../../contexts/data.context';
import { Post, PostL, PostUser } from '../../types/class';
export default function AnnounceDetailPage() {
    const { id } = useParams()
    const { user } = useContext(UserContext);
    const { data } = useContext(DataContext)
    const { flags, } = data
    const navigate = useNavigate();
    let found = (data.posts.find((post: Post) => post.id == parseInt(id!)))
    useEffect(() => {
        if (!found) {
            navigate("/annonce-" + id)
        }
    }, [found])
    const [selectedPost] = useState<PostL>(found ? (found) : (data.posts[0]))
    const [announceList, setAnnounceList] = useState<post[]>(data.posts);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    //////CTAVALUES
    const CTAValues = [


        {
            icon: 'Appel',
            title: "Confirmer mon appel " + selectedPost.user_id,
            body: "Confirmer mon appel " + selectedPost.user_id,
            function: () => { handleOpen },
        },
        {
            icon: 'Email',
            function: () => { alert(`email  user ${selectedPost.user_id} ?`) },
            title: "Envoyer un email" + selectedPost.user_id,
            body: "Envoyer un email" + selectedPost.user_id
        },

    ]


    const isFlaged = (element: any) => { return imIn(element, flags, user.id) ? true : false };
    const isLiked = (element: any) => { return imIn(element, likes, user.id, "post_id") ? true : false };
    const [likes, setLikes] = useState<PostUser[]>(data.likes);
    const handleLike = (elementLiked: PostL) => { beInElement(elementLiked, announceList, setAnnounceList, likes, setLikes, user, "post_id"); };


    const mines = found?.user_id === user.id ? true : false
    const share = selectedPost.share

    return (
        <div className="Body orange">
            <header className="px-4">
                <NavBarTop />
                <SubHeader type={`annonce ${selectedPost.category}`}
                    closeBtn />
            </header>
            <main>
                <div className="flex  pt-6 pb-1 h-full">
                    <AnnounceDetailComp post={selectedPost} mines={mines} change={() => { }} handleLike={(post: PostL) => handleLike(post)} isFlaged={isFlaged(selectedPost)} isLiked={isLiked(selectedPost)} /></div>
            </main>

            {mines ?
                <CTAMines id={selectedPost.id} />
                :
                <CTAMines id={selectedPost.id} values={CTAValues} disabled1={share.find((s: string) => s === "phone") ? false : true} disabled2={share.find((s: string) => s === "email") ? false : true} />
            }

        </div >
    )
} 