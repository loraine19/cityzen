//src/application/useCases/notif/getNotifs.usecase.ts

import { NotifRepositoryBase } from "../../domain/repositories-ports/NotifRepositoryBase";



export class NotifUseCase {
    private notifRepository: NotifRepositoryBase;

    constructor({ notifRepository }: { notifRepository: NotifRepositoryBase }) {
        this.notifRepository = notifRepository;
    }

    public async getNotifs(): Promise<any> {
        return await this.notifRepository.getNotifs();
    }

}

