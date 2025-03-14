//src/infrastructure/repositoriesImpl/UserRespositoryImpl.tsx
import { Notif } from "../../domain/entities/Notif";
import { NotifRepositoryBase } from "../../domain/repositoriesBase/NotifRepositoryBase";
import { ApiServiceI } from "../providers/http/apiService";


interface IData extends NotifRepositoryBase {
    api: ApiServiceI;
    dataType: string;
}

export class NotifRepositoryImpl implements NotifRepositoryBase {
    private notifData: IData;
    constructor({ notifData }: { notifData: IData }) { this.notifData = notifData }

    public async getNotifs(page?: number, filter?: string): Promise<Notif[]> {
        return this.notifData.getNotifs(page, filter);
    }

    public async readNotif(id: number): Promise<Notif> {
        return this.notifData.readNotif(id);
    }


}
