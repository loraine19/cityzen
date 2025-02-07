import { Profile, ProfileDTO } from "../../domain/entities/Profile";
import { ProfileRepositoryBase } from "../../domain/repositoriesBase/ProfileRepositoryBase";

export class GetProfileMeUseCase {
    private profileRepository: ProfileRepositoryBase;

    constructor({ profileRepository }: { profileRepository: ProfileRepositoryBase }) {
        this.profileRepository = profileRepository;
    }

    public async execute(): Promise<Profile> {
        return this.profileRepository.getProfileMe();
    }
}

export class PostProfileUseCase {
    private profileRepository: ProfileRepositoryBase;

    constructor({ profileRepository }: { profileRepository: ProfileRepositoryBase }) {
        this.profileRepository = profileRepository;
    }

    public async execute(data: ProfileDTO): Promise<Profile> {
        return this.profileRepository.postProfile(data);
    }
}

export class UpdateProfileUseCase {
    private profileRepository: ProfileRepositoryBase;

    constructor({ profileRepository }: { profileRepository: ProfileRepositoryBase }) {
        this.profileRepository = profileRepository;
    }

    public async execute(data: ProfileDTO): Promise<Profile> {
        return this.profileRepository.updateProfile(data);
    }
}

export const profileUsesCases = {
    GetProfileMeUseCase,
    PostProfileUseCase,
    UpdateProfileUseCase
}