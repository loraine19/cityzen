import { useParams } from 'react-router-dom';
import NavBarTop from '../../components/NavBarTop';
import SubHeader from '../../components/SubHeader';
import postsFaker from '../../datas/fakers/postsFaker';
import { useContext, useState } from 'react';
import CTAMines from '../../components/CATMines';
import { post } from '../../types/type';
import AnnounceDetailComp from '../../components/announceComps/AnnounceDetailComp';
import UserContext from '../../contexts/user.context';
import { beInElement, imIn } from '../../functions/GetDataFunctions';
import flagsFaker from '../../datas/fakers/flagsFaker';
import likesFaker from '../../datas/fakers/likesFaker';
export default function AnnounceDetailPage() {
    const { id } = useParams()
    let found = (postsFaker.find(post => post.id == parseInt(id!)))
    const { user } = useContext(UserContext);
    const [selectedPost] = useState<post>(found ? (found) : (postsFaker[0]))
    const [announceList, setAnnounceList] = useState<post[]>(postsFaker);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    //////CTAVALUES
    const CTAValues = [
        { icon: 'Appel', function: () => { handleOpen }, title: "Confirmer mon appel " + selectedPost.user_id },
        { icon: 'Email', function: () => { alert(`email  user ${selectedPost.user_id} ?`) }, title: "Envoyer un email" + selectedPost.user_id },
        { icon: 'messagerie', function: () => { alert(`messagerie ?`) }, title: "pas la fonction" }
    ]
    const isFlaged = (element: any) => { return imIn(element, flagsFaker, user.id) ? true : false };
    const isLiked = (element: any) => { return imIn(element, likesFaker, user.id, "post_id") ? true : false };
    const handleLike = (elementLiked: post) => { beInElement(elementLiked, announceList, setAnnounceList, likesFaker, user, "post_id"); };


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
                    <AnnounceDetailComp post={selectedPost} mines={mines} change={() => { }} handleLike={(post: post) => handleLike(post)} isFlaged={isFlaged(selectedPost)} isLiked={isLiked(selectedPost)} /></div>
            </main>

            {mines ?
                <CTAMines id={selectedPost.id} />
                :
                <CTAMines id={selectedPost.id} values={CTAValues} disabled1={share.includes("phone") ? false : true} disabled2={share.includes("email") ? false : true} />
            }

        </div >
    )
} 