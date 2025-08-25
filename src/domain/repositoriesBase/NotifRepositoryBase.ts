// src/data/repositories/UserRepository.tsx
import { Notif, NotifPage } from "../entities/Notif";

export abstract class NotifRepositoryBase {
    abstract getNotifs(page?: number, filter?: string, map?: boolean): Promise<NotifPage>;
    abstract readNotif(id: number): Promise<Notif>;
    abstract readAllNotif(): Promise<Notif[]>;
}