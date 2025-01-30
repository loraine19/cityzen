//src/application/useCases/notif/getNotifs.usecase.ts

import { NotifRepositoryBase } from "../../domain/repositoriesBase/NotifRepositoryBase";



export class GetNotifUseCase {
    private notifRepository: NotifRepositoryBase;

    constructor({ notifRepository }: { notifRepository: NotifRepositoryBase }) {
        this.notifRepository = notifRepository;
    }
    public async execute(): Promise<any> {
        return await this.notifRepository.getNotifs();
    }

}


