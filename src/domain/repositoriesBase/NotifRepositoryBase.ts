// src/data/repositories/UserRepository.tsx
import { Notif } from "../entities/Notif";

export abstract class NotifRepositoryBase {
    abstract getNotifs(page?: number, filter?: string, map?: boolean): Promise<Notif[]>;
    abstract readNotif(id: number): Promise<Notif>;
    abstract readAllNotif(): Promise<Notif[]>;
}