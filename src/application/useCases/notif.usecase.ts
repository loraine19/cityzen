import { Notif } from "../../domain/entities/Notif";
import { NotifRepositoryBase } from "../../domain/repositoriesBase/NotifRepositoryBase";


export class GetNotifUseCase {
    private notifRepository: NotifRepositoryBase;

    constructor({ notifRepository }: { notifRepository: NotifRepositoryBase }) {
        this.notifRepository = notifRepository;
    }
    public async execute(page?: number, filter?: string, map?: boolean): Promise<any> {
        return this.notifRepository.getNotifs(page, filter, map);
    }

}

export class ReadNotifUseCase {
    private notifRepository: NotifRepositoryBase;

    constructor({ notifRepository }: { notifRepository: NotifRepositoryBase }) {
        this.notifRepository = notifRepository;
    }
    public async execute(id: number): Promise<any> {
        return this.notifRepository.readNotif(id);
    }
}

export class ReadAllNotifUseCase {
    private notifRepository: NotifRepositoryBase;

    constructor({ notifRepository }: { notifRepository: NotifRepositoryBase }) {
        this.notifRepository = notifRepository;

    }
    public async execute(): Promise<Notif[]> {
        return this.notifRepository.readAllNotif();
    }
}



