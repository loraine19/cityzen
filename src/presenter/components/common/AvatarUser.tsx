import { Avatar } from '@material-tailwind/react';
import { Icon } from './IconComp';
import { Profile } from '../../../domain/entities/Profile';

interface AvatarUserProps {
    Profile: Profile;
    avatarSize?: string;
    avatarStyle?: string;
    style?: string;
}

export const AvatarUser = ({ Profile, avatarSize = '', avatarStyle = '', style = '' }: AvatarUserProps) => {
    const colors = ['cyan', 'red', 'green', 'amber', 'purple', 'pink', 'orange', 'teal', 'indigo', 'emerald', 'sky'];
    const userColor = colors[Math.floor(
        Math.abs(
            (Profile?.userId ?? '').toString()
                .split('')
                .reduce((acc, char) => acc + char.charCodeAt(0), 0)
        ) % colors.length
    )]

    const iconSize = () => {
        switch (avatarSize) {
            case 'xl':
                return '4xl';
            case 'lg':
                return '3xl';
            case 'md':
                return '2xl';
            case 'sm':
                return 'md';
            default:
                return 'md';
        }
    }
    const classicStyle = '!flex !shadow cursor-pointer min-w-max hover:!shadow-lg hover:!scale-[1.02] hover:!saturate-[1.1] transition-all duration-200 ease-in-out'

    return (
        <>
            {Profile?.image ?
                <Avatar
                    onError={(e) => e.currentTarget.src = '/image/person.svg'}
                    referrerPolicy="unsafe-url"
                    size={avatarSize as any ?? 'sm'}
                    className={`${classicStyle} ${avatarStyle}`}
                    variant="circular"
                    alt={Profile?.firstName || 'user'}
                    src={Profile?.image as string}
                /> :

                <div className='bg-white rounded-full relative w-max h-max flex items-end justify-end'>
                    <Icon
                        bg
                        fill
                        style={`${avatarStyle} ${classicStyle} ${style} pt-0.5 flex z-auto  font-comfortaa font-bold `}
                        color={userColor}
                        size={iconSize()}
                        icon={Profile?.firstName?.charAt(0).toUpperCase() || 'U'}
                    />
                </div>}
        </>
    );
};
