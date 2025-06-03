import { MutableRefObject } from "react";

export interface HandleScrollParams {
    divRef: MutableRefObject<any>;
    hasNextPage: boolean;
    fetchNextPage: () => any;
    setIsBottom: (isBottom: boolean) => void;
}

interface UtilsInterface {
    handleScroll: (params: HandleScrollParams) => Promise<void>;
}

export class UtilsUseCase implements UtilsInterface {
    async handleScroll({
        divRef,
        fetchNextPage,
        setIsBottom,
        hasNextPage,
    }: HandleScrollParams) {
        if (divRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = divRef.current;
            const callNeeded = (scrollTop + clientHeight + 2 >= scrollHeight);
            if (!callNeeded) {
                setIsBottom(false);
                return;
            } else if (callNeeded) {
                if (hasNextPage) {
                    setIsBottom(true);
                    await fetchNextPage();
                }
            }
        }
    }
}
