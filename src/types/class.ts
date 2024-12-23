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

enum TokenType {
    REFRESH,
    RESET,
    VERIFY
}

enum Role {
    MEMBER,
    GUEST
}

enum ServiceType {
    GET,
    DO
}

enum VoteTarget {
    SURVEY,
    POOL
}

enum VoteOpinion {
    OK,
    NO,
    WO
}

enum FlagTarget {
    EVENTP,
    POST,
    SURVEY
}

enum Share {
    EMAIL,
    PHONE,
    BOTH
}

enum ServiceStep {
    STEP_0,
    STEP_1,
    STEP_2,
    STEP_3,
    STEP_4
}

enum IssueStep {
    STEP_0,
    STEP_1
}

enum EventCategory {
    CATEGORY_1,
    CATEGORY_2,
    CATEGORY_3,
    CATEGORY_4,
    CATEGORY_5,
    CATEGORY_6
}

enum PostCategory {
    CATEGORY_1,
    CATEGORY_2,
    CATEGORY_3,
    CATEGORY_4,
    CATEGORY_5,
    CATEGORY_6
}

enum ServiceCategory {
    CATEGORY_1,
    CATEGORY_2,
    CATEGORY_3,
    CATEGORY_4,
    CATEGORY_5,
    CATEGORY_6
}

enum SurveyCategory {
    CATEGORY_1,
    CATEGORY_2,
    CATEGORY_3,
    CATEGORY_4,
    CATEGORY_5,
    CATEGORY_6
}

enum AssistanceLevel {
    LEVEL_0,
    LEVEL_1,
    LEVEL_2,
    LEVEL_3,
    LEVEL_4
}

enum SkillLevel {
    LEVEL_0,
    LEVEL_1,
    LEVEL_2,
    LEVEL_3,
    LEVEL_4
}

enum HardLevel {
    LEVEL_0,
    LEVEL_1,
    LEVEL_2,
    LEVEL_3,
    LEVEL_4
}
