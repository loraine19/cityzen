import { Group } from "../../domain/entities/Group";
import { GroupRepositoryBase } from "../../domain/repositoriesBase/GroupRepositoryBase";

interface IData extends GroupRepositoryBase {
    api: any;
    dataType: any;
}

export class GroupRepositoryImpl implements GroupRepositoryBase {
    private groupData: IData;
    constructor({ groupData }: { groupData: IData }) { this.groupData = groupData }

    public async getNearestGroups(): Promise<Group[]> {
        return this.groupData.getNearestGroups();
    }
}
