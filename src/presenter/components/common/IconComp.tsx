import { Link } from "react-router-dom";
import { Home, KeyboardDoubleArrowDown, PartnerExchange, Search, Event, Dashboard, Ballot, Add, Person, CalendarAddOn, Flag2, ExitToApp, ExploreNearby, Visibility, ArrowCircleRight, Notifications, ArrowCircleRightFilled, ThumbUp, ThumbUpFilled, HomeFilled, PersonFilled, CircleNotifications, CircleNotificationsFilled, PersonEdit, PersonEditFilled, Diversity3, Diversity3Filled, TwoPager, TwoPagerFilled, AddCircleFilled, AddCircle, DoNotDisturbOnFilled, DoNotDisturbOn, ArrowForwardIos, ArrowBackIos, CalendarViewMonth, CalendarViewMonthFilled, SearchFilled, ArrowForwardIosFilled, ArrowBackIosFilled, NotificationsFilled, VisibilityFilled, ExploreNearbyFilled, ExitToAppFilled, Flag2Filled, CalendarAddOnFilled, AddFilled, BallotFilled, DashboardFilled, EventFilled, PartnerExchangeFilled, KeyboardDoubleArrowDownFilled, TollFilled, Toll, ArrowDropDownFilled, ArrowDropDown, CalendarMonth, CalendarMonthFilled, ListFilled, List, CancelFilled, Cancel, CheckCircleFilled, CheckCircle, SmartCardReaderFilled, SmartCardReader, SignalCellularAltFilled, SignalCellularAlt, DesignServicesFilled, DesignServices, CloseFilled, Close, ChevronRight, ChevronRightFilled, MoreUp, MoreUpFilled, ExpandContentFilled, ExpandContent, EditFilled, Edit, GroupsFilled, Groups, PersonCancelFilled, PersonCancel, AddAPhoto, AddAPhotoFilled, VisibilityOffFilled, VisibilityOff } from '@project-lary/react-material-symbols-300-rounded';


const iconMap = {
    add: { filled: AddFilled, default: Add },
    add_a_photo: { filled: AddAPhotoFilled, default: AddAPhoto },
    add_circle: { filled: AddCircleFilled, default: AddCircle },
    arrow_back_ios: { filled: ArrowBackIosFilled, default: ArrowBackIos },
    arrow_circle_right: { filled: ArrowCircleRightFilled, default: ArrowCircleRight },
    arrow_drop_down: { filled: ArrowDropDownFilled, default: ArrowDropDown },
    arrow_forward_ios: { filled: ArrowForwardIosFilled, default: ArrowForwardIos },
    ballot: { filled: BallotFilled, default: Ballot },
    calendar_add_on: { filled: CalendarAddOnFilled, default: CalendarAddOn },
    calendar_month: { filled: CalendarMonthFilled, default: CalendarMonth },
    calendar_view_month: { filled: CalendarViewMonthFilled, default: CalendarViewMonth },
    cancel: { filled: CancelFilled, default: Cancel },
    check_circle: { filled: CheckCircleFilled, default: CheckCircle },
    chevron_right: { filled: ChevronRightFilled, default: ChevronRight },
    circle_notifications: { filled: CircleNotificationsFilled, default: CircleNotifications },
    close: { filled: CloseFilled, default: Close },
    dashboard: { filled: DashboardFilled, default: Dashboard },
    design_services: { filled: DesignServicesFilled, default: DesignServices },
    diversity_3: { filled: Diversity3Filled, default: Diversity3 },
    do_not_disturb_on: { filled: DoNotDisturbOnFilled, default: DoNotDisturbOn },
    edit: { filled: EditFilled, default: Edit },
    event: { filled: EventFilled, default: Event },
    exit_to_app: { filled: ExitToAppFilled, default: ExitToApp },
    expand_content: { filled: ExpandContentFilled, default: ExpandContent },
    explore_nearby: { filled: ExploreNearbyFilled, default: ExploreNearby },
    flag_2: { filled: Flag2Filled, default: Flag2 },
    groups: { filled: GroupsFilled, default: Groups },
    home: { filled: HomeFilled, default: Home },
    keyboard_double_arrow_down: { filled: KeyboardDoubleArrowDownFilled, default: KeyboardDoubleArrowDown },
    list: { filled: ListFilled, default: List },
    more_up: { filled: MoreUpFilled, default: MoreUp },
    notifications: { filled: NotificationsFilled, default: Notifications },
    partner_exchange: { filled: PartnerExchangeFilled, default: PartnerExchange },
    person: { filled: PersonFilled, default: Person },
    person_cancel: { filled: PersonCancelFilled, default: PersonCancel },
    person_edit: { filled: PersonEditFilled, default: PersonEdit },
    search: { filled: SearchFilled, default: Search },
    signal_cellular_alt: { filled: SignalCellularAltFilled, default: SignalCellularAlt },
    smart_card_reader: { filled: SmartCardReaderFilled, default: SmartCardReader },
    thumb_up: { filled: ThumbUpFilled, default: ThumbUp },
    toll: { filled: TollFilled, default: Toll },
    two_pager: { filled: TwoPagerFilled, default: TwoPager },
    visibility: { filled: VisibilityFilled, default: Visibility },
    visibility_off: { filled: VisibilityOffFilled, default: VisibilityOff },
};

function searchIcon(icon: string, fill?: boolean): JSX.Element {
    const IconComponent = iconMap[icon as keyof typeof iconMap];
    if (!IconComponent) return <>{icon}</>;
    return fill ? <IconComponent.filled /> : <IconComponent.default />;
}

type IconProps = {
    icon: string,
    style?: string,
    fill?: boolean,
    size?: string,
    onClick?: () => void,
    color?: string,
    bg?: boolean,
    title?: string,
    link?: string,
    disabled?: boolean
}

export const Icon: React.FC<IconProps> = ({ title, disabled, onClick, icon, size = "2xl", style, link, fill, ...props }) => {

    const sizeMap: { [key: string]: string } = {
        'sm': '!text-[0.8rem]',
        'md': '!text-[1rem]',
        'lg': '!text-[1.2rem]',
        'xl': '!text-[1.2rem]',
        '2xl': '!text-[1.4rem]',
        '3xl': '!text-[1.6rem]',
        '4xl': '!text-[2.2rem]',
        '5xl': '!text-[2.8rem]',
    };

    size = sizeMap[size] || sizeMap['2xl'];
    const pad = props.bg ? 'px-[0.30em] pt-[0.26em] pb-[0.26rem]' : 'px-1 py-1'
    const color = props.color ?? 'gray'
    const textColor = props.color ? `text-${color}-700 hover:!saturate-[1.5] hover:!bg-${color}-500 hover:!bg-opacity-30` : "text-gray-800 hover:!bg-gray-200"
    const bg = props.bg ? (props.color ? `bg-${color}-500 bg-opacity-30` : "!bg-gray-300 ") : ''
    const classIcon = `!rounded-full flex items-center justify-center ${size} ${fill} ${style} ${textColor} ${bg} ${pad}`
    const classActive = ` hover:scale-[1.2] hover:!shadow hover:${pad}  transition-all duration-200 ease-in-out `

    if (onClick) {
        return (
            <button
                type="button"
                onClick={onClick}
                title={!disabled ? title : title + ' est desactivée'}
                className={`${classIcon} ${!disabled && classActive} `}
                disabled={disabled}>
                {searchIcon(icon, fill)}
            </button>)
    }
    if (link) {
        return <Link
            to={link}
            title={title}
            rel="noopener noreferrer"
            className={`${classIcon} ${classActive}  `}>
            {searchIcon(icon, fill)}
        </Link>
    }
    else {
        return <span
            title={title}
            className={`${classIcon} `}>
            {searchIcon(icon, fill)}
        </span>;
    }
}
