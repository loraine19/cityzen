import { ReactNode, useState, useEffect, createContext } from "react";
import { Notif } from "../domain/entities/Notif";
import { Profile } from "../domain/entities/Profile";
import { dayMS } from "../utils/GetDataFunctions";
import { useUser } from "../domain/usecases/useUser";
import { useNotification } from "../domain/usecases/useNotif";
import { UserService } from "../domain/repositories/UserRepository";

interface UserContextType {
    userProfile: Profile;
    setUserProfile: (profile: Profile) => void;
    userNotif: number;
    setUserNotif: (userNotifs: number) => void;
    notifList: any[];
    setNotifList: (notifList: Notif[]) => void;
    updateNotifs: () => void;
    userEmail: string;
}

interface UserProviderType {
    children: ReactNode;
}

const UserContext = createContext<UserContextType>({
    userProfile: {} as Profile,
    setUserProfile: () => { },
    userNotif: 0,
    setUserNotif: () => { },
    setNotifList: () => { },
    updateNotifs: () => { },
    notifList: [] as Notif[],
    userEmail: 'example@me.com'
});

export function UserProvider({ children }: UserProviderType) {
    const { user, loadingUser, errorUser, getUserMe } = useUser();
    const [notifList, setNotifList] = useState<Notif[]>([]);
    const [userNotif, setUserNotif] = useState<number>(0);
    const [userEmail, setUserEmail] = useState<string>('example@me.com');
    const { getNotifs, notifs } = useNotification();
    const [userProfile, setUserProfile] = useState<Profile>({} as Profile);

    useEffect(() => {
        const load = async () => {
            console.log(user)
            if (!user) {
                await getUserMe();
                if (user) {
                    setUserProfile(user.Profile as Profile);
                }
            } else {
                setUserProfile(user.Profile as Profile);
            }
        }
        load();
        console.log('setting user from context', user)
        // console.log('after load2', user, loadingUser, errorUser);
    }, [user]);




    // const updateNotifs = () => {
    //     const fifteenDaysAgo = new Date().getTime() - 15 * dayMS;
    //     const localNotif = JSON.parse(localStorage.getItem('notifList') || '[]').filter((notif: Notif) => {
    //         return new Date(notif.updatedAt).getTime() > fifteenDaysAgo;
    //     });
    //     const updatedNotifList = new Set([...localNotif, ...notifs]);
    //     const sortedNotifList = Array.from(updatedNotifList).reduce((acc, current) => {
    //         const existing = acc.find((item: Notif) => item.id === current.id);
    //         if (existing) {
    //             if (new Date(current.updatedAt) > new Date(existing.updatedAt) ||
    //                 (new Date(current.updatedAt).getTime() === new Date(existing.updatedAt).getTime() && current.read)) {
    //                 return acc.map((item: Notif) => item.id === current.id ? current : item);
    //             }
    //             return acc;
    //         }
    //         return [...acc, current];
    //     }, [user]);
    //     localStorage.setItem('notifList', JSON.stringify(sortedNotifList));
    //     setNotifList(sortedNotifList);
    //     setUserNotif(sortedNotifList.filter((notif: Notif) => !notif.read).length || 0);
    //     return sortedNotifList;
    // };

    useEffect(() => {
        if (user) {
            const localUser = JSON.parse(localStorage.getItem('user') || '{}');
            if (!localUser) {
                localStorage.setItem('user', JSON.stringify(user.Profile));
            }
            user && setUserProfile(userProfile);
            user && setUserEmail(user.email);
        }
    }, []);

    // useEffect(() => {
    //     getNotifs();
    //     const notifs = updateNotifs();
    //     setNotifList(notifs);
    //     setUserNotif(notifs.filter((notif: Notif) => !notif.read).length || 0);
    // }, [getNotifs]);

    const updateNotifs = () => { return notifList; };
    return <UserContext.Provider
        value={{
            userProfile,
            setUserProfile,
            userNotif,
            setUserNotif,
            notifList,
            setNotifList,
            updateNotifs,
            userEmail
        }}>{children}
    </UserContext.Provider>;
}

export default UserContext;
