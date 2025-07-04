import { Outlet } from "react-router"
import NavBarTop from "../../common/NavBarTop"

export const WithTopNavPages = (props: { addBtn?: boolean }) => {

    return (
        <>

            <NavBarTop addBtn={props.addBtn} />
            <Outlet />
        </>)
}

