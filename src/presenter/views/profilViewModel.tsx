import { Profile } from "../../domain/entities/Profile";


interface ProfileViewModel {
  fullName: string;
  address: string;
  city: string;
  skills: string;
  image: string;
}

class ProfileViewModel {
  constructor(data: Profile) {
    this.fullName = `${data.firstName} ${data.lastName}`;
    this.address = `${data.Address.address} ${data.Address.zipcode} ${data.Address.city}`;
    this.city = `${data.Address.city}, ${data.Address.zipcode}`;
    this.skills = data.skills.join(', ');
    this.image = data.image as string;
  }
}
export const getProfileViewModel = (data: Profile): ProfileViewModel => {
  return new ProfileViewModel(data);
}