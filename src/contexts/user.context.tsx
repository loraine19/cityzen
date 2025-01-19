import { ReactNode, useState, useEffect, createContext } from "react";
import DI from "../di/ioc"; // Adjust the import path as necessary
import { NotifView } from "../domain/entities/Notif";
import { Profile } from "../domain/entities/Profile"
import { dayMS } from "../infrastructure/services/utilsService";
import { User } from "../domain/entities/User";

interface UserContextType {
    user: User;
    userProfile: Profile;
    setUserProfile: (profile: Profile) => void;
    userNotif: number;
    setUserNotif: (userNotifs: number) => void;
    notifList: NotifView[];
    setNotifList: (notifList: NotifView[]) => void;
    updateNotifs: () => void;
    userEmail: string;
}

interface UserProviderType {
    children: ReactNode;
}

const UserContext = createContext<UserContextType>({
    user: {} as User,
    userProfile: {} as Profile,
    setUserProfile: () => { },
    userNotif: 0,
    setUserNotif: () => { },
    setNotifList: () => { },
    updateNotifs: () => { },
    notifList: [] as NotifView[],
    userEmail: 'example@me.com'
});

export function UserProvider({ children }: UserProviderType) {
    const { user, loadingUser } = DI.resolve('userViewModel')
    const { notifs, loadingNotifs } = DI.resolve('notifsViewModel');
    const [notifList, setNotifList] = useState<NotifView[]>(notifs ? notifs : []);
    const [userNotif, setUserNotif] = useState<number>(0);
    const [userEmail] = useState<string>('example@me.com');
    const [userProfile, setUserProfile] = useState<Profile>(user ? user.Profile : {} as Profile);

    useEffect(() => {
        const load = async () => {
            setNotifList(notifs ? notifs : []);
            setUserNotif(notifs.filter((notif: NotifView) => !notif.read).length || 0);
        }
        load();
    }, [loadingNotifs, loadingUser]);




    const updateNotifs = () => {
        const fifteenDaysAgo = new Date().getTime() - 15 * dayMS;
        const localNotif = JSON.parse(localStorage.getItem('notifList') || '[]').filter((notif: NotifView) => {
            return new Date(notif.updatedAt).getTime() > fifteenDaysAgo;
        });
        const updatedNotifList = new Set([...localNotif, ...notifs]);
        const sortedNotifList = Array.from(updatedNotifList).reduce((acc, current) => {
            const existing = acc.find((item: NotifView) => item.id === current.id);
            if (existing) {
                if (new Date(current.updatedAt) > new Date(existing.updatedAt) ||
                    (new Date(current.updatedAt).getTime() === new Date(existing.updatedAt).getTime() && current.read)) {
                    return acc.map((item: NotifView) => item.id === current.id ? current : item);
                }
                return acc;
            }
            return [...acc, current];
        }, [user]);
        localStorage.setItem('notifList', JSON.stringify(sortedNotifList));
        setNotifList(sortedNotifList);
        setUserNotif(sortedNotifList.filter((notif: NotifView) => !notif.read).length || 0);
        return sortedNotifList;
    };

    // useEffect(() => {
    //     if (user) {
    //         const localUser = JSON.parse(localStorage.getItem('user') || '{}');
    //         if (!localUser) {
    //             localStorage.setItem('user', JSON.stringify(user.Profile));
    //         }
    //         user && setUserProfile(userProfile);
    //         user && setUserEmail(user.email);
    //     }
    // }, []);



    return <UserContext.Provider
        value={{
            user,
            userProfile,
            setUserProfile,
            userNotif,
            setUserNotif,
            notifList,
            setNotifList,
            updateNotifs,
            userEmail
        }}>
        {children}
    </UserContext.Provider>;
}

export default UserContext;
