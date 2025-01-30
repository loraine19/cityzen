//src/infrastructure/services/notifService.ts
import { Profile, ProfileView } from '../../domain/entities/Profile';

interface ProfilServiceI {
    profilForProfilView(profil: Profile): ProfileView;
}

export class ProfileService implements ProfilServiceI {
    constructor() { }

    profilForProfilView(profile: Profile): ProfileView {

        const newProfile: ProfileView = {
            ...profile,
            fullName: profile.firstName + ' ' + profile.lastName,
            addressString: `${profile.Address.address} ${profile.Address.zipcode} ${profile.Address.city}`
        }
        return newProfile;
    }
}
