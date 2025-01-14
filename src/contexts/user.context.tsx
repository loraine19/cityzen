import { ReactNode, useState, useEffect, createContext } from "react";
import { Notif } from "../domain/entities/Notif";
import { Profile } from "../domain/entities/Profile";
import { User } from "../domain/entities/User"
import { dayMS } from "../utils/GetDataFunctions";
import { NotifService } from "../data/repositories/NotifReposotory";
import { UserService } from "../data/repositories/UserRepository";


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
    const [userProfile, setUserProfile] = useState<Profile>({} as Profile);
    const [notifList, setNotifList] = useState<Notif[]>([]);
    const [userNotif, setUserNotif] = useState<number>(0);
    const [userEmail, setUserEmail] = useState<string>('example@me.com');


    const updateNotifs = async () => {
        const fifteenDaysAgo = new Date().getTime() - 15 * dayMS;
        const localNotif = JSON.parse(localStorage.getItem('notifList') || '[]').filter((notif: Notif) => {
            return new Date(notif.updatedAt).getTime() > fifteenDaysAgo;
        });
        const { getNotifs } = new NotifService();


        const fetchedNotif = await getNotifs();
        const updatedNotifList = new Set([...localNotif, ...fetchedNotif]);
        const sortedNotifList = Array.from(updatedNotifList).reduce((acc, current) => {
            const existing = acc.find((item: Notif) => item.id === current.id);
            if (existing) {
                if (new Date(current.updatedAt) > new Date(existing.updatedAt) ||
                    (new Date(current.updatedAt).getTime() === new Date(existing.updatedAt).getTime() && current.read)) {
                    return acc.map((item: Notif) => item.id === current.id ? current : item);
                }
                return acc;
            }
            return [...acc, current];
        }, []);
        localStorage.setItem('notifList', JSON.stringify(sortedNotifList));
        setNotifList(sortedNotifList);
        setUserNotif(sortedNotifList.filter((notif: Notif) => !notif.read).length || 0);
        return sortedNotifList;
    };

    useEffect(() => {
        const fetchData = async () => {
            const { getUserMe } = new UserService();
            const fetchedUser: User = await getUserMe();
            const localUser = JSON.parse(localStorage.getItem('user') || '{}');
            if (!localUser) {
                localStorage.setItem('user', JSON.stringify(fetchedUser.Profile));
            }
            setUserProfile(fetchedUser.Profile);
            setUserEmail(fetchedUser.email);
            const notifs = await updateNotifs();
            setNotifList(notifs);
            setUserNotif(notifs.filter((notif: Notif) => !notif.read).length || 0);
        };
        fetchData();
    }, []);

    return <UserContext.Provider value={{ userProfile, setUserProfile, userNotif, setUserNotif, notifList, setNotifList, updateNotifs, userEmail }}>{children}</UserContext.Provider>;
}

export default UserContext;
