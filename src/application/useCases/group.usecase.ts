import { GroupPage } from "../../domain/entities/Group";
import { GroupRepositoryBase } from "../../domain/repositoriesBase/GroupRepositoryBase";



export class GetNearestGroupsUseCase {
    private groupRepository: GroupRepositoryBase;

    constructor({ groupRepository }: { groupRepository: GroupRepositoryBase }) {
        this.groupRepository = groupRepository;
    }
    public async execute(page?: number, filter?: string, category?: string): Promise<GroupPage> {
        return this.groupRepository.getNearestGroups(page, filter, category);
    }

}
