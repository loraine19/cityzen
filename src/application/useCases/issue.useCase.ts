import { Issue, IssuePage, IssueUpdate } from "../../domain/entities/Issue";
import { IssueRepositoryBase } from "../../domain/repositoriesBase/IssueRepositoryBase";
import { IssueDTO } from "../../infrastructure/DTOs/IssueDTO";

export class GetIssuesUseCase {
    private issueRepository: IssueRepositoryBase;
    constructor({ issueRepository }: { issueRepository: IssueRepositoryBase }) {
        this.issueRepository = issueRepository;
    }
    public async execute(page?: number, step?: string,): Promise<IssuePage> {
        return await this.issueRepository.getIssues(page, step);
    }
}

export class GetIssueByIdUseCase {
    private issueRepository: IssueRepositoryBase;

    constructor({ issueRepository }: { issueRepository: IssueRepositoryBase }) {
        this.issueRepository = issueRepository;
    }

    public async execute(IssueId: number): Promise<Issue> {
        return await this.issueRepository.getIssueById(IssueId);
    }
}

export class PostIssueUseCase {
    private issueRepository: IssueRepositoryBase;

    constructor({ issueRepository }: { issueRepository: IssueRepositoryBase }) {
        this.issueRepository = issueRepository;
    }

    public async execute(data: IssueDTO): Promise<Issue> {
        return await this.issueRepository.postIssue(data);
    }
}

export class UpdateIssueUseCase {
    private issueRepository: IssueRepositoryBase;

    constructor({ issueRepository }: { issueRepository: IssueRepositoryBase }) {
        this.issueRepository = issueRepository;
    }

    public async execute(id: number, data: IssueDTO): Promise<Issue> {
        return await this.issueRepository.updateIssue(id, data);
    }
}

export class UpdateIssueStepUseCase {
    private issueRepository: IssueRepositoryBase;

    constructor({ issueRepository }: { issueRepository: IssueRepositoryBase }) {
        this.issueRepository = issueRepository;
    }

    public async execute(id: number, update: IssueUpdate): Promise<Issue> {
        return await this.issueRepository.updateIssueStep(id, update);
    }
}


export class FinishIssueUseCase {
    private issueRepository: IssueRepositoryBase;

    constructor({ issueRepository }: { issueRepository: IssueRepositoryBase }) {
        this.issueRepository = issueRepository;
    }
    public async execute(id: number): Promise<Issue> {
        return await this.issueRepository.updateIssueStep(id, IssueUpdate.FINISH);
    }
}

export class DeleteIssueUseCase {
    private issueRepository: IssueRepositoryBase;

    constructor({ issueRepository }: { issueRepository: IssueRepositoryBase }) {
        this.issueRepository = issueRepository;
    }

    public async execute(id: number): Promise<void> {
        return await this.issueRepository.deleteIssue(id);
    }
}

