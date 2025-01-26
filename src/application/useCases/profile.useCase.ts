import { Profile, ProfileDTO } from "../../domain/entities/Profile";
import { ProfileRepositoryBase } from "../../domain/repositoriesBase/ProfileRepositoryBase";

export class ProfileUseCase {
    private profileRepository: ProfileRepositoryBase;

    constructor({ profileRepository }: { profileRepository: ProfileRepositoryBase }) {
        this.profileRepository = profileRepository;
    }

    public async getProfileMe(): Promise<Profile> {
        return this.profileRepository.getProfileMe();
    }

    public async postProfile(data: ProfileDTO): Promise<Profile> {
        return this.profileRepository.postProfile(data);
    }

    public async updateProfile(data: ProfileDTO): Promise<Profile> {
        return this.profileRepository.updateProfile(data);
    }
}