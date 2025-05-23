import { PostView } from "../../../../views/viewsEntities/postViewEntities";
import PostCard from "./PostCard";

export default function AnnouncesGridComp(props: { line: PostView[], mines?: boolean, change: (e: any) => void, update?: () => void, view?: string, }) {
    const { line, mines, change, update } = props
    const short = "pt-8 row-span-5 h-full  !h-[48vh] ";
    const long = "pt-8 row-span-6 h-full  !h-[55vh] ";

    return (
        <>
            <div className={"grid grid-cols-[minmax(calc(50%-1rem),_1fr)_minmax(calc(50%-1rem),_1fr)] grid-rows-[(24*1fr)] gap-x-4 gap-y-2 pb-1"}>
                {line[0] &&
                    <div className={line[0].image ? short : short}>
                        <PostCard key={line[0].id} post={line[0]} mines={mines} change={change} update={update} />
                    </div>}

                {line[1] &&
                    <div className={line[1].image ? long : long}>
                        <PostCard key={line[1].id} post={line[1]} mines={mines} change={change} update={update} />
                    </div>}
                {line[2] &&
                    <div className={line[2].image ? long : long}>
                        <PostCard key={line[2].id} post={line[2]} mines={mines} change={change} update={update} />
                    </div>}

                {line[3] &&
                    <div className={line[2].image ? short : short}>
                        <PostCard key={line[3].id} post={line[3]} mines={mines} change={change} update={update} />
                    </div>}
            </div >


        </>
    )
}