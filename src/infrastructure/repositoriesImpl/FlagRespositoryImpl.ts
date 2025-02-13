import { ApiServiceI } from "../providers/http/apiService";
import { FlagRepositoryBase } from "../../domain/repositoriesBase/FlagRepositoryBase";
import { Flag, FlagTarget } from "../../domain/entities/Flag";
import { FlagDTO } from "../DTOs/FlagDTO";

interface IData extends FlagRepositoryBase {
    api: ApiServiceI;
    dataType: string;
}

export class FlagRepositoryImpl implements FlagRepositoryBase {
    private flagData: IData;
    constructor({ flagData }: { flagData: IData }) { this.flagData = flagData }


    public async getFlags(page: number, filter: FlagTarget): Promise<Flag[]> {
        return this.flagData.getFlags(page, filter)
    }

    public async getFlagById(id: number, target: FlagTarget): Promise<Flag> {
        return this.flagData.getFlagById(id, target)
    }

    public async postFlag(data: FlagDTO): Promise<Flag> {
        return this.flagData.postFlag(data)
    }

    public async deleteFlag(id: number, target: FlagTarget): Promise<Flag> {
        return this.flagData.deleteFlag(id, target)
    }
}

