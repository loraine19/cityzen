import { Group, GroupPage } from "../../domain/entities/Group";
import { GroupUser } from "../../domain/entities/GroupUser";
import { GroupRepositoryBase } from "../../domain/repositoriesBase/GroupRepositoryBase";
import { MessageBack } from "../../infrastructure/DTOs/frontEntities";
import { GroupUserDTO } from "../../infrastructure/DTOs/GroupUserDTO";



export class GetNearestGroupsUseCase {
    private groupRepository: GroupRepositoryBase;

    constructor({ groupRepository }: { groupRepository: GroupRepositoryBase }) {
        this.groupRepository = groupRepository;
    }
    public async execute(page?: number, filter?: string, category?: string): Promise<GroupPage> {
        return this.groupRepository.getNearestGroups(page, filter, category);
    }

}

export class GetGroupByIdUseCase {
    private groupRepository: GroupRepositoryBase;

    constructor({ groupRepository }: { groupRepository: GroupRepositoryBase }) {
        this.groupRepository = groupRepository;
    }

    public async execute(id: number): Promise<Group> {
        return this.groupRepository.getGroupById(id);
    }
}

export class PostGroupUserUseCase {
    private groupRepository: GroupRepositoryBase;

    constructor({ groupRepository }: { groupRepository: GroupRepositoryBase }) {
        this.groupRepository = groupRepository;
    }

    public async execute(dataDTO: GroupUserDTO): Promise<GroupUser> {
        return this.groupRepository.postGroupUser(dataDTO);
    }
}

export class UpdateGroupUserUseCase {
    private groupRepository: GroupRepositoryBase;

    constructor({ groupRepository }: { groupRepository: GroupRepositoryBase }) {
        this.groupRepository = groupRepository;
    }

    public async execute(dataDTO: GroupUserDTO): Promise<GroupUser> {
        return this.groupRepository.updateGroupUser(dataDTO);
    }
}

export class DeleteGroupUserUseCase {
    private groupRepository: GroupRepositoryBase;

    constructor({ groupRepository }: { groupRepository: GroupRepositoryBase }) {
        this.groupRepository = groupRepository;
    }

    public async execute(groupId: number): Promise<MessageBack> {
        return this.groupRepository.deleteGroupUser(groupId);
    }
}