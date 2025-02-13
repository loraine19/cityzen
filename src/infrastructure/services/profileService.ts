//src/infrastructure/services/notifService.ts
import { Profile } from '../../domain/entities/Profile';
import { ProfileView } from '../../presenter/views/viewsEntities/profileViewEntity';

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
