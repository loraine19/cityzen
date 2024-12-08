
// GROUP
export class Group {
    id: number;
    address_id: number;
    area: number;
    rules: string;
    name: string;
    created_at: Date;
    updated_at: Date;

    constructor(
        id: number,
        address_id: number,
        area: number,
        rules: string,
        name: string,
        created_at: Date,
        updated_at: Date
    ) {
        this.id = id;
        this.address_id = address_id;
        this.area = area;
        this.rules = rules;
        this.name = name;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}


//// USER
export class User {
    id: number;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    lastConnection: Date;

    constructor(
        id: number,
        email: string,
        password: string,
        created_at: Date,
        updated_at: Date,
        lastConnection: Date
    ) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.lastConnection = lastConnection;
    }
}

///// PROFILE
export class Profile {
    id: number;
    user_id: number;
    user_id_sp: number;
    address_id: number;
    firstName: string;
    lastName: string;
    addressShared: boolean;
    assistance: 0 | 1 | 2 | 3;
    points: number;
    skills: string[]
    created_at: Date;
    updated_at: Date;
    avatar?: Blob |string;
    phone?: string;

    constructor(
        id: number,
        user_id: number,
        user_id_sp: number,
        address_id: number = 1,
        firstName: string,
        lastName: string,
        addressShared: boolean = false,
        assistance: 0 | 1 | 2 | 3,
        points: number = 0,
        skills: string[] = [],
        created_at: Date = new Date(),
        updated_at: Date = new Date(),
        avatar?: Blob |string,
        phone?: string,
    ) {
        this.id = id;
        this.user_id = user_id;
        this.user_id_sp = user_id_sp;
        this.address_id = address_id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.addressShared = addressShared;
        this.assistance = assistance;
        this.points = points;
        this.skills = skills;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.avatar = avatar;
        this.phone = phone;
    }
}


// ADRESS
export class Address {
    id: number;
    zipcode: string;
    city: string;
    country?: string;
    address: string;
    lat: number;
    lng: number;
    created_at: number;
    updated_at: number;

    constructor(
        id: number,
        zipcode: string,
        city: string,
        country: string,
        address: string,
        lat: number,
        lng: number,
        created_at: number,
        updated_at: number
    ) {
        this.id = id;
        this.zipcode = zipcode;
        this.city = city;
        this.country = country;
        this.address = address;
        this.lat = lat;
        this.lng = lng;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

// EVENT 
export class Event {
    id: number;
    user_id: number;
    address_id: number;
    start: Date;
    end: Date;
    title: string;
    description: string;
    category: string;
    participants_min: number;
    created_at: Date;
    updated_at: Date;
    image?: Blob |string;

    constructor(
        id: number,
        user_id: number,
        address_id: number,
        start: Date,
        end: Date,
        title: string,
        description: string,
        category: string,
        participants_min: number,
        created_at: Date,
        updated_at: Date,
        image?: Blob |string 
    ) {
        this.id = id;
        this.user_id = user_id;
        this.address_id = address_id;
        this.start = start;
        this.end = end;
        this.title = title;
        this.description = description;
        this.category = category;
        this.participants_min = participants_min;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.image = image;
    }
}

///// SERVICES
export class Service {
    id: number;
    user_id: number;
    user_id_resp: number;
    type: 'get' | 'do';
    title: string;
    description: string;
    category: 1 | 2 | 3 | 4;
    skill: 1 | 2 | 3 | 0;
    hard: 1 | 2 | 3 | 0;
    status: 0 | 1 | 2 | 3 | 4
    created_at: Date;
    updated_at: Date;
    image?: Blob;
    finished_at?: Date;


    constructor(
        id: number,
        user_id: number,
        user_id_resp: number,
        type: 'get' | 'do',
        title: string,
        description: string,
        category:  1 | 2 | 3 | 4,
        skill: 1 | 2 | 3 | 0,
        hard: 1 | 2 | 3 | 0,
        status: 0 | 1 | 2 | 3 | 4,
        created_at: Date,
        updated_at: Date,
        image?: Blob,
        finished_at?: Date,

    ) {
        this.id = id;
        this.user_id = user_id;
        this.user_id_resp = user_id_resp;
        this.type = type;
        this.title = title;
        this.description = description;
        this.category = category;
        this.skill = skill;
        this.hard = hard;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.image = image;
        this.finished_at = finished_at;

    }
}



//// ISSUE
export class Issue {
    id: number;
    user_id_Mget: number;
    user_id_Mdo: number;
    servicesid: number;
    description: string;
    date: Date;
    status: "solved" | "pending";
    created_at: Date;
    updated_at: Date;
    image?: Blob;

    constructor(
        id: number,
        user_id_Mget: number,
        user_id_Mdo: number,
        servicesid: number,
        description: string,
        date: Date,
        status: "solved" | "pending",
        created_at: Date,
        updated_at: Date,
        image?: Blob
    ) {
        this.id = id;
        this.user_id_Mget = user_id_Mget;
        this.user_id_Mdo = user_id_Mdo;
        this.servicesid = servicesid;
        this.description = description;
        this.date = date;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.image = image;
    }
}



////// SURVEY 
export class Survey {
    id: number;
    user_id: number;
    title: string;
    description: string;
    category: string;
    created_at: Date;
    updated_at: Date;
    image?: Blob;

    constructor(
        id: number,
        user_id: number,
        title: string,
        description: string,
        category: string,
        created_at: Date,
        updated_at: Date,
        image?: Blob
    ) {
        this.id = id;
        this.user_id = user_id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.image = image;
    }
}

////POOL
export class Pool {
    id: number;
    user_idCreat: number;
    user_idBenef: number;
    title: string;
    description: string;
    created_at: Date;
    updated_at: Date;

    constructor(
        id: number,
        user_idCreat: number,
        user_idBenef: number,
        title: string,
        description: string,
        created_at: Date,
        updated_at: Date
    ) {
        this.id = id;
        this.user_idCreat = user_idCreat;
        this.user_idBenef = user_idBenef;
        this.title = title;
        this.description = description;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

//// POST 
export class Post {
    id: number;
    user_id: number;
    title: string;
    description: string;
    category: string;
    share : ["phone"]|["email"]|["phone","email"];
    created_at: Date;
    updated_at: Date;
    image?: Blob | string;
    constructor(
        id: number,
        user_id: number,
        title: string,
        description: string,
        category: string,
        share : ["phone"]|["email"]|["phone","email"],
        created_at: Date,
        updated_at: Date,
        image?: Blob | string,
    ) {
        this.id = id;
        this.user_id = user_id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.share = share;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.image = image;
    }
}






////// JOINCTION 


//// GOUPUSERS
export class GroupUser {
    groupid: number;
    userid: number;
    role: string;
    created_at: Date;
    updated_at: Date;

    constructor(
        groupid: number,
        userid: number,
        role: string,
        created_at: Date,
        updated_at: Date
    ) {
        this.groupid = groupid;
        this.userid = userid;
        this.role = role;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

//// LIKES 
export class PostUser {
    user_id: number;
    postid: number;
    created_at: Date;
    updated_at: Date;

    constructor(user_id: number, postid: number, created_at: Date, updated_at: Date) {
        this.user_id = user_id;
        this.postid = postid;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

//// PARTICPANTS EVENT 
export class UserEvent {
    user_id: number;
    eventid: number;
    created_at: Date;
    updated_at: Date;

    constructor(
        user_id: number,
        eventid: number,
        created_at: Date,
        updated_at: Date,
    ) {
        this.user_id = user_id;
        this.eventid = eventid;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}


//// VOTES
export class Vote {
    user_id: number;
    targetid: number;
    target: 'survey' | 'pool';
    opinion: 'ok' | 'no' | 'wo';

    constructor(
        user_id: number,
        targetid: number,
        target: 'survey' | 'pool',
        opinion: 'ok' | 'no' | 'wo'
    ) {
        this.user_id = user_id;
        this.targetid = targetid;
        this.target = target;
        this.opinion = opinion;
    }
}



//// FLAG
export class Flag {
    target_id: number;
    user_id: number;
    target: string;
    created_at: Date;
    updated_at: Date;

    constructor(
        target_id: number,
        user_id: number,
        target: string,
        created_at: Date,
        updated_at: Date
    ) {
        this.target_id = target_id;
        this.user_id = user_id;
        this.target = target;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}





export interface UserProfile extends User, Profile{ }
export interface EventP extends Event{
    days: []
    users: Profile[]
}

export interface PostL extends Post{
    users?: []
}





export type action = { icon: string, function: () => void, title: string, body: any }