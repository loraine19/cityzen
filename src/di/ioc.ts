//src/di/ioc.ts
import { asClass, asFunction, createContainer, BuildResolverOptions } from 'awilix';
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
import { ParticipantUseCase } from '../application/useCases/participantCase.ts/participants.useCase';
import { ParticipantRepositoryImpl } from '../infrastructure/repositoriesImpl/ParticipantRespositoryImpl';
import { ParticipantApi } from '../infrastructure/providers/http/participantApi';
import { participantViewModel } from '../presenter/views/partcipantViewModel';

// Extend the BuildResolverOptions type to include 'deps'
export interface ExtendedBuildResolverOptions<T> extends BuildResolverOptions<T> {
    deps?: string[];
}


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
    eventService: asClass(EventService).classic().inject(() => ({
        deps: ['participantRepository', 'eventRepository']
    })),

    ////PARTICIPANTS
    participantUseCase: asClass(ParticipantUseCase),
    participantRepository: asClass(ParticipantRepositoryImpl),
    participantViewModel: asFunction(participantViewModel),
    participantData: asClass(ParticipantApi)


});

export default container;