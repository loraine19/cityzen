import { Icon } from "./SmallComps"

export const LoadMoreButton = (props: { handleScroll: () => void, hasNextPage: boolean, isBottom: boolean }) => {
    const { handleScroll, hasNextPage, isBottom } = props
    return (
        <div className="absolute bottom-8 left-0 !w-full flex items-center justify-center ">
            <Icon
                color='cyan'
                fill
                icon="keyboard_double_arrow_down"
                size="4xl" title="voir plus"
                style={(isBottom && hasNextPage) ? "mb-10" : "hidden"}
                onClick={handleScroll} />
        </div>
    )
}