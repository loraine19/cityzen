import { MutableRefObject } from "react";

export interface HandleScrollParams {
    divRef: MutableRefObject<any>;
    hasNextPage: boolean;
    fetchNextPage: () => any;
    setIsBottom: (isBottom: boolean) => void;
}
export interface HandleHideParams {
    divRef: MutableRefObject<any>,
    setHide: (hide: boolean) => void,
}


interface UtilsInterface {
    handleScroll: (params: HandleScrollParams) => Promise<void>;
    handleHide: (params: HandleHideParams) => void;
}

export class UtilsUseCase implements UtilsInterface {

    //// Handle scroll
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


    //// handle hide 
    private init = 0
    handleHide = (params: HandleHideParams) => {
        let { divRef, setHide } = params;

        if (!divRef.current) return;
        if (divRef.current && (divRef.current as HTMLElement).scrollTop >= 10) {
            const { scrollTop, scrollHeight, clientHeight } = divRef.current;
            if (scrollTop + clientHeight + 8 >= scrollHeight) return
            console.log('scrollTop', scrollTop, this.init, 'scrollHeight', scrollHeight, 'clientHeight', clientHeight);
            let shouldHide = (scrollTop >= 50 && (this.init <= scrollTop));
            this.init = scrollTop
            setTimeout(() => setHide(shouldHide), 500)
        }
    }

}
