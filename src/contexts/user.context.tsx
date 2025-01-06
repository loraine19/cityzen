import { createContext, useState, ReactNode, useContext } from "react";
import { getNotifications, getUsersDetail } from "../functions/GetDataFunctions";
import { User, Post, Survey, Pool, Service, Profile, } from "../types/class";
import DataContext from "./data.context";



interface UserContextType {
    user: Profile;
    setUserCont: (user: Profile) => void;
    userNotif: number;
    setUserNotif: (userNotifs: number) => void;
}

interface UserProviderType {
    children: ReactNode;
}

const UserContext = createContext<UserContextType>({
    user: {} as Profile,
    setUserCont: () => { },
    userNotif: 0,
    setUserNotif: () => { },
});

export function UserProvider({ children }: UserProviderType) {
    const { data } = useContext(DataContext)
    const users: User[] = data.users
    const posts: Post[] = data.posts
    const events: Event[] = data.events
    const surveys: Survey[] = data.surveys
    const pools: Pool[] = data.pools
    const services: Service[] = data.services
    const profiles: Profile[] = data.profiles
    const UsersProfile = (getUsersDetail(users, profiles))
    const localUser = localStorage.getItem('user')
    !localUser && localStorage.setItem('user', JSON.stringify(UsersProfile[0] as Profile))

    const [user, setUserCont] = useState<Profile>(localUser ? JSON.parse(localUser) : UsersProfile[0] as Profile);
    const notificationList = getNotifications(posts, events, surveys, pools, services, user.userId ? user.userId : 0);
    const [userNotif, setUserNotif] = useState<number>(notificationList ? notificationList.length : 0);
    return <UserContext.Provider value={{ user, setUserCont, userNotif, setUserNotif }}>{children}</UserContext.Provider>;
}

export default UserContext;
