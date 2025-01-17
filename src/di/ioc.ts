import { createContainer, asClass, asFunction } from 'awilix';
import { GetUserMeUseCase } from '../application/user/getUserMe.usecase';
import { UserRepositoryImpl } from '../infrastructure/repositoriesImpl/UserRespositoryImpl';
import { UserApi } from '../infrastructure/providers/http/userApi';
import { UserViewModel } from '../presenter/views/userViewModel';

const container = createContainer();

container.register({

    // UseCases
    getUserMeUseCase: asClass(GetUserMeUseCase),


    //Repositories
    userRepository: asClass(UserRepositoryImpl),

    // Data Source
    //  todoData: asClass(TodoApi),

    // Providers
    userApi: asClass(UserApi),


    // ViewModels
    userViewModel: asFunction(UserViewModel),


});

export default container;