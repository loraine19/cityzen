import { Outlet } from "react-router"
import NavBarTop from "../../common/NavBarTop"

export const WithTopNavPages = ({ addBtn, navIcons }: { addBtn?: boolean, navIcons?: boolean }) => {

    return (
        <>

            <NavBarTop addBtn={addBtn} navIcons={navIcons} />
            <Outlet />
        </>)
}

