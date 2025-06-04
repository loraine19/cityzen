import { Icon } from "./IconComp"

type LoadMoreButtonProps = { handleScroll: () => void, hasNextPage: boolean, isBottom: boolean, color?: string, size?: string, style?: string, revers?: boolean }
export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ handleScroll, hasNextPage, isBottom, color = "gray", size = "3xl", style = 'mb-2', revers = false }) => {
    return (
        <div className={`absolute !w-full flex items-center justify-center ${revers ? 'lg:top-6 top-4' : 'lg:bottom-4 bottom-4'} left-0 `}>
            <Icon
                color={color}
                fill
                icon={revers ? "keyboard_double_arrow_up" : "keyboard_double_arrow_down"}
                size={size}
                title="voir plus"
                style={(isBottom && hasNextPage) ? `${style} bounce` : "hidden"}
                onClick={handleScroll} />
        </div>

    )
}