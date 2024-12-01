
export type user = {
    id? : number,
    email: string,
    password: string,
    acceptTerms: boolean
    stayConnected?: boolean
}

export type profileDetail = {
    firstName: string,
    lastName: string,
    avatar: string,
    phone?: string,
    adress_shared: boolean,
    assistant: number,
    points: number,
    adress: string
    skills?: string[]
}

export interface userProfile extends user, profileDetail { }
export type eventUser = { event_id: number, user_id: number }
export type postUser ={ post_id: number, user_id: number }