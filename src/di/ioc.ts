import { createContainer, asClass, asFunction } from 'awilix';
import { GetUserMeCase } from '../application/user/getUserMe.usecase';
import { UserViewModel } from '../presenter/views/userViewModel';

const container = createContainer();
container.register({
    // ... autres enregistrements

    getUserMeCase: asClass(GetUserMeCase),

    // ... autres enregistrements
    UserViewModel: asFunction(UserViewModel)
});

export default container;