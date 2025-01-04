import { service } from './service';
import { survey } from "./survey"
import { userProfile } from "./user"

//// type for post
export type postBase = {
    id: number,
    user_id: number,
    title: string,
    description: string,
    category: string,
    image: string,
    created_at: string,
    share: string[]
}

export interface post extends postBase {
    users: userProfile[],
    flags?: targetUser[],
}

//// type for event
export type addressGps = { lat: number, lng: number }

export type eventBase = {
    id: number,
    user_id: number,
    adress: string,
    start: string,
    end: string,
    title: string,
    description: string,
    category: string,
    image: any
    users: []
    days?: Date[]
    flags?: targetUser[]
    participants: number
    created_at?: string
}
export interface event extends eventBase {
    users: [],
    flags?: targetUser[],
}

export type avatarData = {
    id: number;
    name: string;
    avatar: string;
}


//// TYPE NOTIF 
export type notif = {
    user_id: number,
    relation: string,
    read: boolean
    target_id: number
    type: string,
    element: post | event | survey | pool | service,
    created_at: string,
    updated_at?: string
    flag?: targetUser[] | flag[] | null
}

export type all = {
    id: number,
    user_id: number,
    type: string,
    element: post | event | survey | pool | service,
    created_at: string,
    updated_at?: string
    flag?: targetUser[] | flag[] | null
}

///// TYPE FLAG 
export interface flag extends targetUser {
    element: post | event | survey | pool | service,
}


////TYPES SERVICE 
export interface service {
    id: number;
    user_id_get: number;
    user_id1_do: number;
    type: 'get' | 'do';
    title: string;
    description: string;
    category: 1 | 2 | 3;
    skill_level: 0 | 1 | 2 | 3;
    hard_level: 0 | 1 | 2 | 3;
    created_at: Date;
    updated_at: Date;
}




//// JOINTURES 
export type eventUser = { event_id: number, user_id: number }
export type postUser = { post_id: number, user_id: number }
export type targetUser = { target_id: number | string, user_id: number, type: string, reason: string, active: boolean, created_at: string, updated_at: string }



///// FOR FRONT ONLY 

const action = {

}