import { createContext, ReactNode, useEffect, useState } from 'react';
import DI from '../di/ioc';
import { NotifView } from '../domain/entities/Notif';
import { Profile } from '../domain/entities/Profile';
import { User } from '../domain/entities/User';
import { useNotificationStore } from '../application/stores/notificationStore';

interface UserContextType {
    user: User;
    userProfile: Profile;
    setUserProfile: (profile: Profile) => void;
    userNotif: number;
    userEmail: string;
    notifList: NotifView[];
    setNotifList: (newNotifList: NotifView[]) => void;
    removeNotif: (notifId: number) => void;
    updateNotifs: () => void;
}

interface UserProviderType { children: ReactNode }

const UserContext = createContext<UserContextType>({
    user: {} as User,
    userProfile: {} as Profile,
    setUserProfile: () => { },
    userNotif: 0,
    userEmail: 'example@me.com',
    notifList: [],
    setNotifList: () => { },
    removeNotif: () => { },
    updateNotifs: () => { }
});

export function UserProvider({ children }: UserProviderType) {
    const { user } = DI.resolve('userViewModel')
    const notifList = useNotificationStore((state) => state.notifList);
    const removeNotif = useNotificationStore((state) => state.removeNotif);
    const setNotifList = useNotificationStore((state) => state.setNotifList);
    const updateNotif = useNotificationStore((state) => state.updateNotif);
    const userNotif = useNotificationStore((state) => state.notifList?.filter((notif) => !notif.read).length);
    const userEmail = user ? user.email : '';
    const [userProfile, setUserProfile] = useState<Profile>(user ? user.Profile : {} as Profile);

    const updateNotifs = () => updateNotif(notifList)
    useEffect(() => { updateNotifs() }, [])


    // const updateNotifs = () => {
    //     const fifteenDaysAgo = new Date().getTime() - 15 * dayMS;
    //     const localNotif = JSON.parse(localStorage.getItem('notifList') || '[]').filter((notif: NotifView) => {
    //         return new Date(notif.updatedAt).getTime() > fifteenDaysAgo;
    //     });
    //     const updatedNotifList = new Set([...localNotif, ...notifList]);
    //     const sortedNotifList = Array.from(updatedNotifList).reduce((acc, current) => {
    //         const existing = acc.find((item: NotifView) => item.id === current.id);
    //         if (existing) {
    //             if (new Date(current.updatedAt) > new Date(existing.updatedAt) ||
    //                 (new Date(current.updatedAt).getTime() === new Date(existing.updatedAt).getTime() && current.read)) {
    //                 return acc.map((item: NotifView) => item.id === current.id ? current : item);
    //             }
    //             return acc;
    //         }
    //         return [...acc, current];
    //     }, [user]);
    //     localStorage.setItem('notifList', JSON.stringify(sortedNotifList));
    //     useNotificationStore.setState({ notifList: sortedNotifList });
    //     return sortedNotifList;
    // };


    return <UserContext.Provider
        value={{
            user,
            userProfile,
            setUserProfile,
            userNotif,
            userEmail,
            notifList,
            setNotifList,
            removeNotif,
            updateNotifs
        }}>
        {children}
    </UserContext.Provider>;
}

export default UserContext;