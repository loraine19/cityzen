import { useApi, handleApiCall } from "../../infrastructure/api/useApi";

const api = useApi();
const dataType = "notifs";

//NOTIF
export interface INotifRepository {
    getNotifs(): Promise<any>;
}

export class NotifService implements INotifRepository {
    async getNotifs(): Promise<any> {
        return handleApiCall(() => api.get(dataType));
    }
}

