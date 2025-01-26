//src/infrastructure/repositoriesImpl/UserRespositoryImpl.tsx
import { Notif } from "../../domain/entities/Notif";
import { NotifRepositoryBase } from "../../domain/repositoriesBase/NotifRepositoryBase";

export interface IData {
    api: any;
    dataType: any;
    getNotifs(): Promise<Notif[]>;
}

export class NotifRepositoryImpl implements NotifRepositoryBase {
    private notifData: IData;
    constructor({ notifData }: { notifData: IData }) { this.notifData = notifData }

    public async getNotifs(): Promise<Notif[]> {
        return this.notifData.getNotifs();
    }
}
