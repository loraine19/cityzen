//src/di/ioc.ts
import { createContainer, asClass, asFunction } from 'awilix';
import { GetUserUseCase } from '../application/useCases/userCase/getUserMe.usecase';
import { userViewModel, } from '../presenter/views/userViewModel';
import { UserRepositoryImpl } from '../infrastructure/repositoriesImpl/UserRespositoryImpl';
import { UserApi } from '../infrastructure/providers/http/userApi';
import { GetNotifsUseCase } from '../application/useCases/notifCase/getNotifs.usecase';
import { NotifRepositoryImpl } from '../infrastructure/repositoriesImpl/NotifRespositoryImpl';
import { NotifApi } from '../infrastructure/providers/http/notifApi';
import { notifsViewModel } from '../presenter/views/notifsViewModel';
import { EventRepositoryImpl } from '../infrastructure/repositoriesImpl/EventRespositoryImpl';
import { EventApi } from '../infrastructure/providers/http/eventApi';
import { GetEventsUseCase } from '../application/useCases/eventCase/getEvents.usecase';
import { eventViewModel } from '../presenter/views/eventViewModel';
import { eventIdViewModel } from '../presenter/views/eventIdViewModel';
import { EventService } from '../infrastructure/services/eventService';
import { UserService } from '../infrastructure/services/userService';

const container = createContainer();
container.register({

    ////USER
    getUserUseCase: asClass(GetUserUseCase),
    userRepository: asClass(UserRepositoryImpl),
    userViewModel: asFunction(userViewModel),
    userService: asClass(UserService),
    userData: asClass(UserApi),

    ////NOTIFS
    getNotifsUseCase: asClass(GetNotifsUseCase),
    notifRepository: asClass(NotifRepositoryImpl),
    notifsViewModel: asFunction(notifsViewModel),
    notifData: asClass(NotifApi),

    ////EVENTS
    getEventsUseCase: asClass(GetEventsUseCase),
    eventRepository: asClass(EventRepositoryImpl),
    eventViewModel: asFunction(eventViewModel),
    eventIdViewModel: asFunction(eventIdViewModel),
    eventData: asClass(EventApi),
    eventService: asClass(EventService)

});

export default container;