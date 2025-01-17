// import { createContainer, asClass, asFunction } from 'awilix';

// import { TodoRepository } from '../infrastructure/repositories/TodoRepository';
// import { TodoApi } from '../infrastructure/providers/http/todo.api';
// //import { TodoLocastorage } from '../infrastructure/providers/localstorage/todo.localstorage';
// import { todoListViewModel } from '../presenter/pages/TodoList.viewModel';
// import { GetTodosUseCase } from '../application/useCases/GetTodosUseCase';
// import { SigninViewModel } from '../presenter/pages/Auth/Signin.viewmodel';
// import { SigninUsecase } from '../application/useCases/auth/Signin.usecase';
// import { AuthRepository } from '../infrastructure/repositories/AuthRepository';
// import { AuthApi } from '../infrastructure/providers/http/auth.api';

// const container = createContainer();

// container.register({

//   // UseCases
//   getTodosUseCase: asClass(GetTodosUseCase),
//   signinUseCase: asClass(SigninUsecase),

//   //Repositories
//   todoRepository: asClass(TodoRepository),
//   authRepository: asClass(AuthRepository),

//   // Data Source
//   todoData: asClass(TodoApi),
//   //todoData: asClass(TodoLocastorage),

//   authApi: asClass(AuthApi),
 

//   // ViewModels
//   todoListViewModel: asFunction(todoListViewModel),
//   SigninViewModel: asFunction(SigninViewModel),


// });

// export default container;