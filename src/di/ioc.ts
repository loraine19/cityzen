//src/di/ioc.ts
import { asClass, asFunction, createContainer, BuildResolverOptions } from 'awilix';
import { UserUseCase } from '../application/useCases/user.usecase';
import { userViewModel, } from '../presenter/views/userViewModel';
import { UserRepositoryImpl } from '../infrastructure/repositoriesImpl/UserRespositoryImpl';
import { UserApi } from '../infrastructure/providers/http/userApi';
import { NotifRepositoryImpl } from '../infrastructure/repositoriesImpl/NotifRespositoryImpl';
import { NotifApi } from '../infrastructure/providers/http/notifApi';
import { notifGetViewModel, notifViewModel } from '../presenter/views/notifViewModel';
import { EventRepositoryImpl } from '../infrastructure/repositoriesImpl/EventRespositoryImpl';
import { EventApi } from '../infrastructure/providers/http/eventApi';
import { EventService } from '../infrastructure/services/eventService';
import { UserService } from '../infrastructure/services/userService';
import { ParticipantRepositoryImpl } from '../infrastructure/repositoriesImpl/ParticipantRespositoryImpl';
import { ParticipantApi } from '../infrastructure/providers/http/participantApi';
import { participantDeleteViewModel, participantPostViewModel, participantViewModel } from '../presenter/views/partcipantViewModel';
import { AuthApi } from '../infrastructure/providers/http/authApi';
import { AuthRepositoryImpl } from '../infrastructure/repositoriesImpl/AuthRespositoryImpl';
import { ResetPasswordApi } from '../infrastructure/providers/http/resetPassword.api';
import { ResetPasswordRepositoryImpl } from '../infrastructure/repositoriesImpl/ResetPasswordRespositoryImpl';
import { NotifService } from '../infrastructure/services/notifService';
import { AuthUseCase } from '../application/useCases/auth.useCase';
import { authSignInVerifyViewModel, authSignInViewModel, authSignUpViewModel } from '../presenter/views/authViewModel';
import { ProfileUseCase } from '../application/useCases/profile.useCase';
import { ProfileRepositoryImpl } from '../infrastructure/repositoriesImpl/ProfileRespositoryImpl';
import { postProfileViewModel, profileMeViewModel, updateProfileViewModel } from '../presenter/views/profileViewModel';
import { ProfileApi } from '../infrastructure/providers/http/profileApi';
import { ProfileService } from '../infrastructure/services/profileService';
import { EventUseCase } from '../application/useCases/event.usecase';
import { NotifUseCase } from '../application/useCases/notif.usecase';
import { ParticipantUseCase } from '../application/useCases/participants.useCase';
import { postAddressViewModel } from '../presenter/views/addressViewModel';
import { AddressUseCase } from '../application/useCases/address.useCase';
import { AddressRepositoryImpl } from '../infrastructure/repositoriesImpl/AddressRespositoryImpl';
import { AddressService } from '../infrastructure/services/addressService';
import { AddressApi } from '../infrastructure/providers/http/addressApi';
import { eventIdViewModel, eventViewModel } from '../presenter/views/eventViewModel';

// Extend the BuildResolverOptions type to include 'deps'
export interface ExtendedBuildResolverOptions<T> extends BuildResolverOptions<T> {
    deps?: string[];
}

const container = createContainer();
container.register({

    ////AUTH 
    authUseCase: asClass(AuthUseCase),
    authRepository: asClass(AuthRepositoryImpl),
    authSignInViewModel: asFunction(authSignInViewModel),
    authSignInVerifyViewModel: asFunction(authSignInVerifyViewModel),
    authSignUpViewModel: asFunction(authSignUpViewModel),
    authData: asClass(AuthApi),

    ////ADDRESS
    addressUseCase: asClass(AddressUseCase),
    addressRepository: asClass(AddressRepositoryImpl),
    addressViewModel: asFunction(authSignInViewModel),
    postAddressViewModel: asFunction(postAddressViewModel),
    addressService: asClass(AddressService),
    addressData: asClass(AddressApi),

    ////RESET PASSWORD
    ResetPasswordRespository: asClass(ResetPasswordRepositoryImpl),
    ResetPasswordData: asClass(ResetPasswordApi),

    ////USER
    userUseCase: asClass(UserUseCase),
    userRepository: asClass(UserRepositoryImpl),
    userViewModel: asFunction(userViewModel),
    userService: asClass(UserService),
    userData: asClass(UserApi),

    ////PROFILE
    profileUseCase: asClass(ProfileUseCase),
    profileRepository: asClass(ProfileRepositoryImpl),
    profileMeViewModel: asFunction(profileMeViewModel),
    postProfileViewModel: asFunction(postProfileViewModel),
    updateProfileViewModel: asFunction(updateProfileViewModel),
    profileService: asClass(ProfileService),
    profileData: asClass(ProfileApi),

    ////NOTIFS
    notifUseCase: asClass(NotifUseCase),
    notifRepository: asClass(NotifRepositoryImpl),
    notifViewModel: asFunction(notifViewModel),
    notifGetViewModel: asFunction(notifGetViewModel),
    notifService: asClass(NotifService),
    notifData: asClass(NotifApi),

    ////EVENTS
    eventUseCase: asClass(EventUseCase),
    eventRepository: asClass(EventRepositoryImpl),
    eventViewModel: asFunction(eventViewModel),
    eventIdViewModel: asFunction(eventIdViewModel),
    eventData: asClass(EventApi),
    eventService: asClass(EventService),

    ////PARTICIPANTS
    participantUseCase: asClass(ParticipantUseCase),
    participantRepository: asClass(ParticipantRepositoryImpl),
    participantViewModel: asFunction(participantViewModel),
    participantData: asClass(ParticipantApi),
    postParticipant: asFunction(participantPostViewModel),
    deleteParticipant: asFunction(participantDeleteViewModel)


});

export default container;