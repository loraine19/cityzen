import Decimal from "decimal.js";


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
    image: string = '';
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    lastConnection: Date = new Date();
}

export class Profile {
    id: number = 0;
    user: User = new User();
    userId: number = 0;
    userIdSp: number = 0;
    addressId: number = 0;
    Address: Address = new Address();
    firstName: string = '';
    lastName: string = '';
    image: string = '';
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
    startAt: Date = new Date();
    endAt: Date = new Date();
    address: Address = new Address();
    addressId: number = 0;
    group: Group = new Group();
    groupId: number = 0;
    userId: number = 0;
    image: string = '';
    title: string = '';
    start: Date = new Date();
    end: Date = new Date();
    category: EventCategory = EventCategory.CATEGORY_1
    participantsMin: number = 0;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    Participants: Participant[] = [new Participant()];
}

export class Participant {
    id: number = 0;
    eventP: EventP = new EventP();
    eventPId: number = 0;
    User: User = new User();
    userId: number = 0;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}

export class Post {
    id: number = 0;
    content: string = '';
    author: User = new User();
    authorId: number = 0;
    group: Group = new Group();
    groupId: number = 0;
    userId: number = 0;
    image: string = '';
    title: string = '';
    description: string = '';
    category: PostCategory = PostCategory.CATEGORY_1;
    share: Share = Share.EMAIL;
    createdAt: Date = new Date();
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
    image: string = '';
    title: string = '';
    category: SurveyCategory = SurveyCategory.CATEGORY_1;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
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
    image: string = '';
    title: string = '';
    category: ServiceCategory = ServiceCategory.CATEGORY_1;
    userIdResp: number = 0;
    type: ServiceType = ServiceType.GET;
    skill: SkillLevel = SkillLevel.LEVEL_0;
    hard: HardLevel = HardLevel.LEVEL_0;
    status: ServiceStep = ServiceStep.STEP_0;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
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

export enum VoteTarget {
    SURVEY,
    POOL
}

export enum VoteOpinion {
    OK,
    NO,
    WO
}

export enum FlagTarget {
    EVENTP,
    POST,
    SURVEY
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

export enum IssueStep {
    STEP_0,
    STEP_1
}

export enum EventCategory {
    CATEGORY_1,
    CATEGORY_2,
    CATEGORY_3,
    CATEGORY_4,
    CATEGORY_5,
    CATEGORY_6
}

export enum PostCategory {
    CATEGORY_1,
    CATEGORY_2,
    CATEGORY_3,
    CATEGORY_4,
    CATEGORY_5,
    CATEGORY_6
}

export enum ServiceCategory {
    CATEGORY_1,
    CATEGORY_2,
    CATEGORY_3,
    CATEGORY_4,
    CATEGORY_5,
    CATEGORY_6
}

export enum SurveyCategory {
    CATEGORY_1,
    CATEGORY_2,
    CATEGORY_3,
    CATEGORY_4,
    CATEGORY_5,
    CATEGORY_6
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

// DTOs
export class AddressDTO implements Partial<Address> {
    address: string = '';
    zipcode: string = '';
    city: string = '';
    lat: number = 0;
    lng: number = 0;
}
export class AddressUpdateDTO implements Partial<AddressDTO> { }



// DTOs
export class UserUpdateDTO implements Partial<User> {
    Profile?: any;
    addressId?: any;
}
export class UserDTO implements Partial<User> {
    email: string = '';
    password: string = 'password';
    image: string = '';
    addressId: number = 0;
}





export class ProfileDTO implements Partial<Profile> {
    userIdSp: number = 0;
    addressId: number = 0;
    Profile?: ProfileDTO;
    firstName: string = '';
    lastName: string = '';
    image: string = '';
    addressShared: boolean = false;
    assistance: AssistanceLevel = AssistanceLevel.LEVEL_0;
    points?: number;
    skills?: string[];
}
export class ProfileUpdateDTO implements Partial<ProfileDTO> {
    skills: any;
}


export class GroupDTO implements Partial<Group> {
    name: string = '';
    description: string = '';
    addressId: number = 0
    area: number = 0
    rules: string = '';
}
export class GroupUpdateDTO implements Partial<GroupDTO> { }

export class EventPDTO implements Partial<EventP> {
    name: string = '';
    description: string = '';
    startAt: Date = new Date();
    endAt: Date = new Date();
    addressId: number = 0;
    groupId: number = 0;
    userId: number = 0;
    image: string = '';
    title: string = '';
    start: Date = new Date();
    end: Date = new Date();
    category: EventCategory = EventCategory.CATEGORY_1;
    participantsMin: number = 0;
}
export class EventPUpdateDTO implements Partial<EventPDTO> { }

export class ParticipantDTO {
    eventPId: number = 0;
    userId: number = 0;
}
export class ParticipantUpdateDTO implements Partial<ParticipantDTO> { }

export class PostDTO {
    id?: number;
    content?: string;
    author?: UserDTO;
    authorId?: number;
    group?: GroupDTO;
    groupId?: number;
    userId?: number;
    image?: string;
    title?: string;
    description?: string;
    category?: PostCategory;
    share?: Share;
    createdAt?: Date;
    updatedAt?: Date;
}

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
    image?: string;
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