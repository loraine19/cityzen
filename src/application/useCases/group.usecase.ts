import { Group } from "../../domain/entities/Group";
import { GroupRepositoryBase } from "../../domain/repositoriesBase/GroupRepositoryBase";



export class GetNearestGroupsUseCase {
    private groupRepository: GroupRepositoryBase;

    constructor({ groupRepository }: { groupRepository: GroupRepositoryBase }) {
        this.groupRepository = groupRepository;
    }
    public async execute(): Promise<Group[]> {
        return this.groupRepository.getNearestGroups()
    }

}
