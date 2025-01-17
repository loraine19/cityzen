//src/di/ioc.ts
import { createContainer, asClass, asFunction } from 'awilix';
import { GetUserUseCase } from '../application/user/getUserMe.usecase';
import { userViewModel, } from '../presenter/views/userViewModel';
import { UserRepositoryImpl } from '../infrastructure/repositoriesImpl/UserRespositoryImpl';
import { UserApi } from '../infrastructure/providers/http/userApi';

const container = createContainer();
container.register({

    // UseCases
    getUserUseCase: asClass(GetUserUseCase),

    //Repositories
    userRepository: asClass(UserRepositoryImpl),

    // Data Source
    userData: asClass(UserApi),
    //todoData: asClass(TodoLocastorage),

    // ViewModels
    userViewModel: asFunction(userViewModel),

});

export default container;