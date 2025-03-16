import { Icon } from "./IconComp"

type LoadMoreButtonProps = { handleScroll: () => void, hasNextPage: boolean, isBottom: boolean, color?: string, size?: string, style?: string }
export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ handleScroll, hasNextPage, isBottom, color = "cyan", size = "4xl", style = 'mb-12' }) => {
    return (
        <div className={`absolute !w-full flex items-center justify-center bottom-8 left-0 `}>
            <Icon
                color={color}
                fill
                icon="keyboard_double_arrow_down"
                size={size}
                title="voir plus"
                style={(isBottom && hasNextPage) ? style : "hidden"}
                onClick={handleScroll} />
        </div>

    )
}