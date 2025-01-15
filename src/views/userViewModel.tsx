import { Role } from '../domain/entities/GroupUser';
import { User, UserStatus } from '../domain/entities/User';

interface UserViewModel {
  id: number;
  fullName: string;
  email: string;
  isModo: boolean;
  isActivated: boolean;
}

class UserViewModel {
  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.isModo = user.GroupUser.role === Role.MODO;
    this.isActivated = user.status === UserStatus.ACTIVE;
  }
}
export const getUserViewModel = (user: User): UserViewModel => {
  return new UserViewModel(user);
}