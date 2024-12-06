import { useContext } from 'react';
import { imIn } from '../../functions/GetDataFunctions';
import { PostL } from '../../types/class';
import AnnouncesComp from "./AnnouncesComp";
import DataContext from '../../contexts/data.context';


export default function AnnouncesGridComp(props: { line: PostL[], mines?: boolean, change: (e: any) => void, view?: string, user: any, handleClickDelete?: (id: number) => void, handleLike: (post: PostL) => void }) {
    const { data } = useContext(DataContext);
    const { flags } = data
    const { line, mines, change, user, handleLike } = props
    const short = "pt-8 row-span-5 h-full  !h-[38vh] ";
    const long = "pt-8 row-span-6 h-full  !h-[52vh] ";
    const isFlaged = (element: any) => { return imIn(element, flags, user) ? true : false };

    return (
        <>
            <div className={"grid grid-cols-[1fr_1fr] grid-rows-[(24*1fr)] gap-x-4 gap-y-2"}>
                {line[0] &&
                    <div className={line[0].image ? short : short}>
                        <AnnouncesComp post={line[0]} mines={mines} change={change} isFlaged={isFlaged(line[0])} handleClickDelete={props.handleClickDelete} handleLike={handleLike} />
                    </div>}

                {line[1] &&
                    <div className={line[1].image ? long : long}>
                        <AnnouncesComp post={line[1]} mines={mines} change={change} isFlaged={isFlaged(line[1])} handleClickDelete={props.handleClickDelete} handleLike={handleLike} />
                    </div>}
                {line[2] &&
                    <div className={line[2].image ? long : long}>
                        <AnnouncesComp post={line[2]} mines={mines} change={change} isFlaged={isFlaged(line[2])}
                            handleClickDelete={props.handleClickDelete} handleLike={handleLike} />
                    </div>}

                {line[3] &&
                    <div className={line[2].image ? short : short}>
                        <AnnouncesComp post={line[3]} mines={mines} change={change} isFlaged={isFlaged(line[3])}
                            handleClickDelete={props.handleClickDelete} handleLike={handleLike} />
                    </div>}
            </div >


        </>
    )
}