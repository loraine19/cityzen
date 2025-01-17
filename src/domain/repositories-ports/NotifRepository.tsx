import { useApi, handleApiCall } from "../../infrastructure/providers/http/useApi";

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

