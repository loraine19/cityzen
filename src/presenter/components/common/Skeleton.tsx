import { Card } from "@material-tailwind/react";

export function Skeleton(props: { className?: string }) {
    const { className } = props;
    const style = ` ${className} animate-pulse flex items-center justify-center !w-full !h-full`;
    return (
        <Card className={style}> &nbsp;</Card>
    );
};

export function SkeletonGrid(props: { count: number, small?: boolean }) {
    const { count, small } = props;
    return (
        <div className={`grid grid-rows-auto px-2 gap-4 w-full h-max pt-3`} style={{ gridAutoRows: `${small ? '25vh' : '46vh'}` }}>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="w-full FixCard flex items-center justify-center">
                    <Skeleton className={'FixCard'} key={index + 'S'} />
                </div>
            ))}
        </div>
    )
}

