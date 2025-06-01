import { Outlet } from "react-router"
import NavBarTop from "../../common/NavBarTop"

export const WithTopNavPages = () => {

    return (
        <>
            <NavBarTop />
            <Outlet />
        </>)
}

