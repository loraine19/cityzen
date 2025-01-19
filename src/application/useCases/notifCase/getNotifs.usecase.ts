//src/application/useCases/notif/getNotifs.usecase.ts
import { NotifRepositoryBase } from "../../../domain/repositories-ports/NotifRepositoryBase";


export class GetNotifsUseCase {
    private notifRepository: NotifRepositoryBase;

    constructor({ notifRepository }: { notifRepository: NotifRepositoryBase }) {
        this.notifRepository = notifRepository;
    }

    public async execute(): Promise<any> {
        const result = await this.notifRepository.getNotifs();
        return result
    }

}

