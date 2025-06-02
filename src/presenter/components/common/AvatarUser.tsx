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
    const colors = ['cyan', 'red', 'green', 'amber', 'purple', 'pink', 'orange', 'teal', 'indigo', 'yellow'];
    const userColor = colors[Math.floor(((10 / (Profile?.userId) * 100)) / 10)] || colors[Math.floor(Math.random() * colors.length)];

    const iconSize = () => {
        switch (avatarSize) {
            case 'xl':
                return '4xl';
            case 'lg':
                return '3xl';
            case 'md':
                return '2xl';
            case 'sm':
                return 'lg';
            default:
                return 'md';
        }
    }

    return (
        <>
            {Profile?.image ?
                <Avatar
                    onError={(e) => e.currentTarget.src = '/image/person.svg'}
                    referrerPolicy="unsafe-url"
                    size={avatarSize as any ?? 'sm'}
                    className={` !flex !shadow cursor-pointer  hover:!shadow-lg hover:!scale-[1.02] hover:!saturate-[1.1] transition-all duration-200 ease-in-out" ${avatarStyle}`}
                    variant="circular"
                    alt={Profile?.firstName || 'user'}
                    src={Profile?.image as string}
                /> :

                <Icon
                    bg
                    fill
                    style={`${avatarStyle} font-comfortaa font-bold ${style}  `}
                    color={userColor}
                    size={iconSize()}
                    icon={Profile?.firstName?.charAt(0).toUpperCase() || 'U'}
                />}
        </>
    );
};
