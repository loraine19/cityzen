import { useNotificationStore } from "../../../application/stores/notification.store";
import { useUxStore } from "../../../application/stores/ux.store";
import { NavBarSection } from "./NavBar";

interface NavBarBottomProps {
    handleClick?: () => void;
    addBtn?: boolean;
    color?: string;
}

export const NavBarBottom: React.FC<NavBarBottomProps> = ({ addBtn }) => {
    const { } = useNotificationStore((state) => state);
    const { setNavBottom, navBottom, hideNavBottom, color } = useUxStore((state) => state);


    if (navBottom && !hideNavBottom) return (
        <footer>
            <div onDoubleClick={() => setNavBottom(!navBottom)}
                onDoubleClickCapture={(e) => {
                    e.stopPropagation(); e.preventDefault()
                    setNavBottom(!navBottom)
                }}

                className={
                    (hideNavBottom ?
                        'transform-y-[-100%] hidden opacity-0 anim z-0 ' :
                        `anim ${color}BG backdropBlur w-respXl justify-center flex pb-2`)
                }>

                <NavBarSection addBtn={addBtn} />

            </div >
            {/* <div className={`
            ${navBottom ? 'bottom-[65px]' : 'top-[60px]'}
                   h-[calc(100vh-65px)] max-h-[calc(100vh-65px)] w-full backdropBlur absolute`}>
                </div> */}
        </footer>
    );


};
