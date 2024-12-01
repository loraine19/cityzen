import { createContext, useState, ReactNode } from "react";
import { userProfile } from "../types/user";
import { usersFaker } from "../datas/fakers/usersFaker";
import { getNotifications } from "../functions/GetDataFunctions";
import eventsFaker from "../datas/fakers/eventsFaker";
import postsFaker from "../datas/fakers/postsFaker";
import { poolsFaker, surveysFaker } from "../datas/fakers/surveyFaker";
import { servicesFaker } from "../datas/fakers/servicesFaker";
interface UserContextType {
    user: userProfile;
    setUserCont: (user: userProfile) => void;
    userNotif: number;
    setUserNotif: (userNotifs: number) => void;
}

interface UserProviderType {
    children: ReactNode;
}
const UserContext = createContext<UserContextType>({
    user: {} as userProfile,
    setUserCont: () => { },
    userNotif: 0,
    setUserNotif: () => { },
});

export function UserProvider({ children }: UserProviderType) {
    const [user, setUserCont] = useState<userProfile>(usersFaker[1] as userProfile);
    const notificationList = getNotifications(postsFaker, eventsFaker, surveysFaker, poolsFaker, servicesFaker, user.id ? user.id : 0);
    const [userNotif, setUserNotif] = useState<number>(notificationList ? notificationList.length : 0);
    return <UserContext.Provider value={{ user, setUserCont, userNotif, setUserNotif }}>{children}</UserContext.Provider>;
}

export default UserContext;
