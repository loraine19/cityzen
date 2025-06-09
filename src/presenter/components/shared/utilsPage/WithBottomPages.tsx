import { Outlet } from "react-router"
import NavBarBottom from "../../common/NavBarBottom"
import { useUxStore } from "../../../../application/stores/ux.store"

export const WithBottomPages = (props: { addBtn?: boolean }) => {
    const { navBottom } = useUxStore((state) => state)

    if (!navBottom)
        return (
            <>
                <NavBarBottom addBtn={props.addBtn} />
                <Outlet />
            </>)

    return (
        <>
            <Outlet />
            <NavBarBottom addBtn={props.addBtn} />

        </>)
}

