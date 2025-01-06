
export class Address {
    id: number = 0;
    address: string = '';
    zipcode: string = '';
    city: string = '';
    // lat: Decimal = new Decimal(0); // or string if needed
    // lng: Decimal = new Decimal(0); // or string if needed
    lat: number = 0; // or string if needed
    lng: number = 0; // or string if needed
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}

export class User {
    id: number = 0;
    email: string = '';
    password: string = '';
    Profile: Profile = new Profile();
    image: string | File = '';
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    lastConnection: Date = new Date();
}

export class Profile {
    user: User = new User();
    userId: number = 0;
    userIdSp: number = 0;
    addressId: number = 0;
    Address: Address = new Address();
    firstName: string = '';
    lastName: string = '';
    image: string | File = '';
    phone: string = '';
    addressShared: boolean = false;
    assistance: AssistanceLevel = AssistanceLevel.LEVEL_0;
    points: number = 0;
    skills: string[] = [''];
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}

export class Group {
    id: number = 0;
    name: string = '';
    description: string = '';
    address: Address = new Address();
    addressId: number = 0;
    area: number = 0;
    rules: string = '';
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}

export class EventP {
    id: number = 0;
    name: string = '';
    description: string = '';
    Address: Address = new Address();
    addressId: number = 0;
    group: Group = new Group();
    groupId: number = 0;
    userId: number = 0;
    User: User = new User();
    image: string | File = '';
    title: string = '';
    start: Date | string = new Date();
    end: Date | string = new Date();
    category: EventCategory | string = EventCategory.CATEGORY_1
    participantsMin: number = 0;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    Participants: Participant[] = [new Participant()];
}

export class Participant {
    id: number = 0;
    event: EventP = new EventP();
    eventId: number = 0;
    User: User = new User();
    userId: number = 0;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}

export class Post {
    id: number = 0;
    content: string = '';
    User: User = new User();
    userId: number = 0;
    group: Group = new Group();
    groupId: number = 0;
    image: string | File = '';
    title: string = '';
    description: string = '';
    Likes: any = [new Like()];
    category: PostCategory = PostCategory.CATEGORY_1;
    share: Share = Share.EMAIL;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}

export class Like {
    postId: number = 0;
    userId: number = 0;
    updatedAt: Date = new Date();
}

export class Pool {
    id: number = 0;
    name: string = '';
    description: string = '';
    group: Group = new Group();
    groupId: number = 0;
    userId: number = 0;
    title: string = '';
    userIdBenef: number = 0;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    User?: User = new User();
}

export class Vote {
    id: number = 0;
    pool: Pool = new Pool();
    poolId: number = 0;
    user: User = new User();
    userId: number = 0;
    targetId: number = 0;
    target: VoteTarget = VoteTarget.POOL;
    opinion: VoteOpinion = VoteOpinion.OK;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}

export class Survey {
    id: number = 0;
    name: string = '';
    description: string = '';
    group: Group = new Group();
    groupId: number = 0;
    userId: number = 0;
    image: string | File = '';
    title: string = '';
    category: SurveyCategory = SurveyCategory.CATEGORY_1;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    User?: User = new User();
}

export class GroupUser {
    id: number = 0;
    group: Group = new Group();
    groupId: number = 0;
    user: User = new User();
    userId: number = 0;
    role: Role = Role.MEMBER;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}

export class Service {
    id: number = 0;
    name: string = '';
    description: string = '';
    address: Address = new Address();
    addressId: number = 0;
    userId: number = 0;
    User: User = new User();
    image: string | File = '';
    title: string = '';
    category: ServiceCategory = ServiceCategory.CATEGORY_1;
    userIdResp: number = 0;
    UserResp: User = new User();
    type: ServiceType = ServiceType.GET;
    skill: SkillLevel = SkillLevel.LEVEL_0;
    hard: HardLevel = HardLevel.LEVEL_0;
    status: ServiceStep = ServiceStep.STEP_0;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}

export class Issue {
    id: number = 0;
    serviceId: number = 0;
    Service: Service = new Service();
    userId: number = 0;
    User: User = new User();
    UserModo: User = new User();
    userIdModo: number = 0;
    UserModo2: User = new User();
    userIdModo2: number = 0;
    description: string = '';
    image: string | File = '';
    date: Date | string = new Date();
    status: IssueStep | string = IssueStep.STEP_0;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}

export class Flag {
    user: User = new User();
    userId: number = 0;
    targetId: number = 0;
    target: FlagTarget = FlagTarget.EVENT;
    reason: FlagReason = FlagReason.REASON_1;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    Service?: Service = new Service();
    Post?: Post = new Post();
    Event?: EventP = new EventP();
    Survey?: Survey = new Survey();
}

export class Token {
    userId: number = 0;
    token: string = '';
    type: TokenType = TokenType.REFRESH;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    expiredAt: Date = new Date();
}

export class Auth {
    accessToken: string = '';
    refreshToken: string = '';
}

export enum TokenType {
    REFRESH,
    RESET,
    VERIFY
}

export enum Role {
    MEMBER,
    GUEST
}

export enum ServiceType {
    GET,
    DO
}
export const serviceType = Object.values(ServiceType).filter(type => typeof type === 'string');

export enum VoteTarget {
    SURVEY,
    POOL
}

export enum VoteOpinion {
    OK,
    NO,
    WO
}


export enum Share {
    EMAIL,
    PHONE,
    BOTH
}

export enum ServiceStep {
    STEP_0,
    STEP_1,
    STEP_2,
    STEP_3,
    STEP_4
}
export const serviceStep = Object.values(ServiceStep).filter(step => typeof step === 'string');

export enum IssueStep {
    STEP_0,
    STEP_1,
    STEP_2
}
export const issueStep = Object.values(IssueStep).filter(step => typeof step === 'string');

export enum EventCategory {
    CATEGORY_1,
    CATEGORY_2,
    CATEGORY_3,
    CATEGORY_4,
    CATEGORY_5
}
export const eventCategory = Object.values(EventCategory).filter(category => typeof category === 'string');


export enum PostCategory {
    CATEGORY_1,
    CATEGORY_2,
    CATEGORY_3,
    CATEGORY_4,
    CATEGORY_5
}
export const postCategory = Object.values(PostCategory).filter(category => typeof category === 'string');

export enum ServiceCategory {
    CATEGORY_1,
    CATEGORY_2,
    CATEGORY_3,
    CATEGORY_4,
    CATEGORY_5
}
export const serviceCategory = Object.values(ServiceCategory).filter(category => typeof category === 'string');

export enum SurveyCategory {
    CATEGORY_1,
    CATEGORY_2,
    CATEGORY_3,
    CATEGORY_4,
    CATEGORY_5
}

export enum AssistanceLevel {
    LEVEL_0,
    LEVEL_1,
    LEVEL_2,
    LEVEL_3,
    LEVEL_4
}
export const assistanceLevel = Object.values(AssistanceLevel).map(level => level);

export enum SkillLevel {
    LEVEL_0,
    LEVEL_1,
    LEVEL_2,
    LEVEL_3,
    LEVEL_4
}

export enum HardLevel {
    LEVEL_0,
    LEVEL_1,
    LEVEL_2,
    LEVEL_3,
    LEVEL_4
}

export enum FlagReason {
    REASON_1,
    REASON_2,
    REASON_3,
    REASON_4,
    REASON_5
}
export const flagReason = Object.values(FlagReason).filter(reason => typeof reason === 'string');

export enum FlagTarget {
    EVENT,
    POST,
    SURVEY,
    SERVICE
}
export const flagTarget = Object.values(FlagTarget).filter(target => typeof target === 'string');

// DTOs
export class AddressDTO implements Partial<Address> {
    id?: number;
    address: string = '';
    zipcode: string = '';
    city: string = '';
    lat: number = 0;
    lng: number = 0;
}
export class AddressUpdateDTO implements Partial<AddressDTO> { }


// DTOs
export class UserUpdateDTO implements Partial<User> { }
export class UserDTO implements Partial<User> {
    email: string = '';
    password: string = 'password';
    image: string | File = '';
    addressId: number = 0;
    Profile?: any
}

export class ProfileDTO implements Partial<Profile> {
    userIdSp: number = 0;
    addressId: number = 0;
    Profile?: ProfileDTO;
    firstName: string = '';
    lastName: string = '';
    image: string | File = '';
    addressShared: boolean = false;
    assistance: AssistanceLevel = AssistanceLevel.LEVEL_0;
    phone?: string;
    points?: number;
    skills?: string[];
}

export class ProfileUpdateDTO implements Partial<ProfileDTO> {
    skills?: any;
    assistance?: AssistanceLevel | undefined;
    addressId?: number | undefined;
}

export class GroupDTO implements Partial<Group> {
    name: string = '';
    description: string = '';
    addressId: number = 0
    area: number = 0
    rules: string = '';
}
export class GroupUpdateDTO implements Partial<GroupDTO> { }

export class EventDTO implements Partial<EventP> {
    name: string = '';
    description: string = '';
    addressId: number = 0;
    groupId: number = 0;
    userId: number = 0;
    image: string | File = '';
    title: string = '';
    start: Date | string = new Date();
    end: Date | string = new Date();
    category: EventCategory | string = EventCategory.CATEGORY_1;
    participantsMin: number = 0;
}
export class EventPUpdateDTO implements Partial<EventDTO> { }

export class ParticipantDTO {
    eventId: number = 0;
    userId?: number = 0;
}
export class ParticipantUpdateDTO implements Partial<ParticipantDTO> { }

export class PostDTO implements Partial<Post> {
    userId?: number;
    image?: string;
    title?: string;
    description?: string;
    category?: PostCategory;
    share?: Share;
    updatedAt?: Date;
}
export class PostUpdateDTO implements Partial<PostDTO> { }

export class LikeDTO implements Partial<Like> {
    postId: number = 0;
    userId?: number = 0;
}
export class LikeUpdateDTO implements Partial<LikeDTO> { }


export class PoolDTO {
    id?: number;
    name?: string;
    description?: string;
    group?: GroupDTO;
    groupId?: number;
    userId?: number;
    title?: string;
    userIdBenef?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export class VoteDTO {
    id?: number;
    pool?: PoolDTO;
    poolId?: number;
    user?: UserDTO;
    userId?: number;
    targetId?: number;
    target?: VoteTarget;
    opinion?: VoteOpinion;
    createdAt?: Date;
    updatedAt?: Date;
}

export class SurveyDTO {
    id?: number;
    name?: string;
    description?: string;
    group?: GroupDTO;
    groupId?: number;
    userId?: number;
    image?: string;
    title?: string;
    category?: SurveyCategory;
    createdAt?: Date;
    updatedAt?: Date;
}

export class GroupUserDTO {
    id?: number;
    group?: GroupDTO;
    groupId?: number;
    user?: UserDTO;
    userId?: number;
    role?: Role;
    createdAt?: Date;
    updatedAt?: Date;
}

export class ServiceDTO {
    id?: number;
    name?: string;
    description?: string;
    address?: AddressDTO;
    addressId?: number;
    userId?: number;
    image?: string | File;
    title?: string;
    category?: ServiceCategory;
    userIdResp?: number;
    type?: ServiceType;
    skill?: SkillLevel;
    hard?: HardLevel;
    status?: ServiceStep;
    createdAt?: Date;
    updatedAt?: Date;
}

export class IssueDTO {
    serviceId?: number;
    userId?: number;
    description?: string;
    image?: string | File;
    status?: IssueStep | string;
    userIdModo?: number;
    userIdModo2?: number;
    date?: Date | string;
}

export class FlagDTO {
    user?: UserDTO;
    userId?: number;
    targetId?: number;
    target?: FlagTarget;
    reason?: FlagReason;
}

export class TokenDTO {
    userId?: number;
    token?: string;
    type?: TokenType;
    createdAt?: Date;
    updatedAt?: Date;
    expiredAt?: Date;
}

export class AuthDTO {
    accessToken?: string;
    refreshToken?: string;
}

//// for front only 
export class action {
    icon?: string;
    title?: string;
    body?: string | Element | JSX.Element | Element[] | JSX.Element[];
    function?: any;
}
export class Label {
    label: string = '';
    value: string | any = '';
}

export class ModalValues {
    confirm: () => any = () => { };
    title: string = '';
    element: string = ''
}