//src/application/useCases/notif/getNotifs.usecase.ts

import { NotifRepositoryBase } from "../../domain/repositoriesBase/NotifRepositoryBase";



export class GetNotifUseCase {
    private notifRepository: NotifRepositoryBase;

    constructor({ notifRepository }: { notifRepository: NotifRepositoryBase }) {
        this.notifRepository = notifRepository;
    }
    public async execute(page?: number, filter?: string): Promise<any> {
        return this.notifRepository.getNotifs(page, filter);
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


