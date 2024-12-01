
import flagsFaker from '../../datas/fakers/flagsFaker';
import likesFaker from '../../datas/fakers/likesFaker';
import { imIn } from '../../functions/GetDataFunctions';
import { post } from '../../types/type';
import AnnouncesComp from "./AnnouncesComp";


export default function AnnouncesGridComp(props: { line: post[], mines?: boolean, change: (e: any) => void, view?: string, user: any, handleClickDelete?: (id: number) => void, handleLike: (post: post) => void }) {
    const { line, mines, change, user, handleLike } = props
    const short = "pt-10 row-span-5 h-full  !h-[38vh] ";
    const long = "pt-10 row-span-6 h-full  !h-[52vh]";
    const isFlaged = (element: any) => { return imIn(element, flagsFaker, user) ? true : false };
    const isLiked = (element: any) => { return imIn(element, likesFaker, user, "post_id") ? true : false };

    return (
        <>
            <div className={"grid grid-cols-[1fr_1fr] grid-rows-[(24*1fr)] gap-x-4"}>
                {line[0] &&
                    <div className={line[0].image ? short : short}>
                        <AnnouncesComp post={line[0]} mines={mines} change={change} isFlaged={isFlaged(line[0])} isLiked={isLiked(line[0])} handleClickDelete={props.handleClickDelete} handleLike={handleLike} />
                    </div>}

                {line[1] &&
                    <div className={line[1].image ? long : long}>
                        <AnnouncesComp post={line[1]} mines={mines} change={change} isFlaged={isFlaged(line[1])} isLiked={isLiked(line[1])} handleClickDelete={props.handleClickDelete} handleLike={handleLike} />
                    </div>}
                {line[2] &&
                    <div className={line[2].image ? long : short}>
                        <AnnouncesComp post={line[2]} mines={mines} change={change} isFlaged={isFlaged(line[2])} isLiked={isLiked(line[2])}
                            handleClickDelete={props.handleClickDelete} handleLike={handleLike} />
                    </div>}

                {line[3] &&
                    <div className={line[2].image ? short : long}>
                        <AnnouncesComp post={line[3]} mines={mines} change={change} isFlaged={isFlaged(line[3])} isLiked={isLiked(line[3])}
                            handleClickDelete={props.handleClickDelete} handleLike={handleLike} />
                    </div>}
            </div >


        </>
    )
}