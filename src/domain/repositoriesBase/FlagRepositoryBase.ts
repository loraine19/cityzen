import { FlagDTO } from "../../infrastructure/DTOs/FlagDTO";
import { Flag, FlagTarget } from "../entities/Flag";



export abstract class FlagRepositoryBase {
    abstract getFlags(page?: number, target?: FlagTarget): Promise<Flag[]>;
    abstract getFlagById(id: number, target: FlagTarget): Promise<Flag>;
    abstract postFlag(flag: FlagDTO): Promise<Flag>;
    abstract deleteFlag(id: number, target: FlagTarget): Promise<Flag>;
}


