// src/data/repositories/UserRepository.tsx
import { Notif } from "../entities/Notif";

export abstract class NotifRepositoryBase {
    abstract getNotifs(): Promise<Notif[]>;
}