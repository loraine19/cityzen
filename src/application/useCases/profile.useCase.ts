import { AddressDTO } from "../../domain/entities/Address";
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

    public async execute(data: ProfileDTO, address: AddressDTO): Promise<Profile> {
        return this.profileRepository.postProfile(data, address);
    }
}

export class UpdateProfileUseCase {
    private profileRepository: ProfileRepositoryBase;

    constructor({ profileRepository }: { profileRepository: ProfileRepositoryBase }) {
        this.profileRepository = profileRepository;
    }

    public async execute(data: ProfileDTO, address: AddressDTO): Promise<Profile> {
        return this.profileRepository.updateProfile(data, address);
    }
}

export const profileUsesCases = {
    GetProfileMeUseCase,
    PostProfileUseCase,
    UpdateProfileUseCase
}