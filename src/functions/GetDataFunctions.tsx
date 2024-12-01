import { eventUser, postUser, userProfile } from '../types/user';
import { all, event, flag, notif, post, targetUser } from "../types/type";
import { pool, survey } from "../types/survey";
import { service } from "../types/service";

///// CALL BACK ADD DATA IN EVENTS
export const getDays = (array: any) => {
    array.map((event: any) => {
        let start = new Date(event.start).getTime();
        let end = new Date(event.end).getTime();
        let dif = Math.ceil(Math.abs((end - start) / (1000 * 60 * 60 * 24)))
        let days = []
        for (let i = 0; i < dif; i++) { days.push(new Date(start + i * 24 * 60 * 60 * 1000)) }
        event.days = days
    })
    return array
}

///// BLOB FUNCTION 
export const getImageBlob = (event: any, setImgBlob: any, formik: any) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        setImgBlob(reader.result as string)
        formik.values.image = file.name
    }
}


//// JOINS TABLE FUNCTIONS
//// get users in events or post by id 
export const getUsers = (array: post[] | event[], arrayOfJoin: any[], initialArray: [], lookingID: keyof eventUser | keyof postUser): post[] | event[] => {
    array.map((element: post | event) => {
        let users: any = []
        arrayOfJoin.filter((row: any) => row[lookingID] === element.id).map((row: any) => {
            initialArray.map((user: userProfile) => (user.id === row.user_id) && users.push(user));
            element.users = users
        })
    })
    return array
}

// array events, join ( user+ eventId,), iniUser, lookin(key)
export const getFlagsInElement = (array: any[], arrayOfJoin: any[]): any => {
    return array.map((element: any) => {
        let flags: any = [];
        flags = (arrayOfJoin.filter((tag: any) => tag.type === 'event' && tag.target_id === element.id))
        element.flags = flags;
        return element
    })
}


//// get flags 
export const getFlags = (posts: post[], events: event[], surveys: survey[], pools: pool[], services: service[], arrayOfJoin: any[]): any[] => {
    let array = getCommuns(posts, events, surveys, pools, services)
    let arrayWithFlags = array.map((element: all) => {
        element.flag = arrayOfJoin.filter((flagRow: targetUser) => (element.id + element.type) === (flagRow.target_id + flagRow.type))
        return element
    })
    return arrayWithFlags
}

///
// const eventsFlagsByUser = getFlagsInElement(eventsWithUsers, flagsFaker as []).filter((element: any) => element.flags.length > 0 && element.flags.find((flag: any) => flag.user_id === user.id))


//// avoir tout les flags d'un user ( return flag[])
export const getFlagsUser = (posts: post[], events: event[], surveys: survey[], pools: pool[], services: service[], arrayOfJoin: any[], idS: number) => {
    let all = getCommuns(posts, events, surveys, pools, services)
    return (arrayOfJoin.filter((flagRow: targetUser) => (flagRow.user_id === idS))).map((element1: flag) => {
        for (let i = 0; i < all.length; i++) {
            (all[i].id + all[i].type) === (element1.target_id + element1.type) && (element1.element = all[i].element);
        }
        return element1
    })
}


///// flag
export const getAll = (posts: post[], events: event[], surveys: survey[], pools: pool[], services: service[]) => {
    let allElments = [...posts.map((post: post) => { return { ...post, type: "post" } }),
    ...events.map((event: event) => { return { ...event, type: "event" } }),
    ...surveys.map((survey: survey) => { return { ...survey, type: "survey" } }),
    ...pools.map((pool: pool) => { return { ...pool, type: "pool" } }),
    ...services.map((service: service) => { return { ...service, type: "service" } })]
    return (allElments as [])
}

//// GETS COMMUNS KEYS OF ALL ELEMENT IN AN ARRAY 
export const getCommuns = (posts: post[], events: event[], surveys: survey[], pools: pool[], services: service[]) => {
    let elements: all[] = [];
    let all = getAll(posts, events, surveys, pools, services)
    let newElement: all
    all.map((element: any) => {
        const findId = element.user_id ? element.user_id : element.type === "Demande" ? element.user_id_get : element.user_id_do;
        (findId) && (
            newElement = {
                id: element.id,
                user_id: findId,
                type: element.type,
                element: element,
                created_at: element.created_at
            },
            elements.push(newElement)
        )
    })
    return (elements)
}

//// NOTIFICATION 
export const getNotifications = (posts: post[], events: event[], surveys: survey[], pools: pool[], services: service[], userId: number) => {
    let notifications: notif[] = [];
    let notif: notif = {} as notif
    let all = getAll(posts, events, surveys, pools, services)
    all.map((element: any) => {
        const findId = element.user_id === userId || element.user_id_get === userId || element.user_id_do === userId || element.userId === userId;
        (findId || element.users?.find((user: userProfile) => user.id === userId)) && (
            notif = {
                target_id: element.id,
                user_id: element.user_id,
                relation: findId ? "mines" : "ImIn",
                type: element.type,
                element: element,
                read: false,
                created_at: element.created_at
            },
            notifications.push(notif)
        )
    })
    notifications.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    return (notifications)
}

export const GetPathElement = (type: string) => type === "post" ? "annonce" : type === "event" ? "evenement" : type === "survey" ? "sonadge" : type === "pool" ? "sondage" : type === "service" ? "service" : ""


//// CALENDAR FUNCTIONS 
const dayInMilli = 24 * 60 * 60 * 1000
export const getWeek = (date: any, eventList: event[]) => {
    let week = [];
    date = new Date(date);
    const weekDay = date.getDay();
    const lundi = date.getTime() - ((weekDay - 1) * dayInMilli)
    while (week.length < 7) {
        for (let i = 0; i < 7; i++) {
            const nextDay = (new Date((lundi) + (i * dayInMilli)))
            let dateInfos = { date: (nextDay), events: [], text: shortDateString(nextDay) }
            week.push(dateInfos);
        }
    }
    for (const eventT of eventList) {
        for (let i = 0; i < week.length; i++) {
            if (eventT.days) {
                if ((eventT.days).find((day: Date) =>
                    (new Date(day)).toLocaleDateString() === (new Date(week[i].date)).toLocaleDateString())) {
                    week[i].events.push(eventT as never)
                    week[i].events.sort((a: any, b: any) => new Date(b.days.length).getTime() - new Date(a.days.length).getTime())
                }
            }
        }
    }
    return week
}


///// Convert Date 
export const shortDateString = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { weekday: 'short', month: 'short', day: 'numeric' })
}


export const eventdateInfo = (event: event) => {
    return (
        'de ' + new Date(event.start).toLocaleDateString('fr-FR', { weekday: 'short', month: 'short', day: 'numeric', minute: 'numeric', hour: 'numeric' })
        + " à " +
        (new Date(event.start).toDateString() === new Date(event.end).toDateString() ?
            new Date(event.end).toISOString().slice(11, 16) :
            new Date(event.end).toLocaleDateString('fr-FR', { weekday: 'short', month: 'short', day: 'numeric', minute: 'numeric', hour: 'numeric' })))
}

export const getWeeks = (day: any, eventList: event[], numberOfwweks: number) => {
    const weeks: any[] = [];
    if (weeks.length < numberOfwweks) {
        for (let i = 0; i < numberOfwweks; i++) {
            weeks.push(getWeek(day, eventList))
            day = new Date(new Date(day).getTime() + 1 * 7 * dayInMilli)
        }
    }
    return weeks
}

///// DELET ELEMENT NOTIF / FLAG 
export const deleteElement = (id: number, array: any[], setArray: any,) => {
    let index = array.findIndex((element: any) => element.id === id);
    array.splice(index, 1); setArray([...array])
}

export const deleteElementJoin = (elementJoin: any, array: any[], setArray: any) => {
    let index = array.findIndex((element: any) => (element.user_id + element.type + element.target_id) === (elementJoin.user_id + elementJoin.type + elementJoin.target_id));
    confirm(" voulez vous supprimer " + array[index].element.title + " ?") && array.splice(index, 1); setArray([...array])
}


//// LIKE UNLICK // QUICK PARTIPATE
export const beInElement = (elementLiked: post | event, array: any[], setArray: any, arrayJoin: any, userProfile: userProfile | undefined, keyOf?: string) => {
    keyOf ? keyOf = keyOf : keyOf = 'target_id'
    let index = array.findIndex((element: any) => element.id === elementLiked.id);
    console.log(elementLiked.users, userProfile)
    elementLiked.users.find((user: userProfile) => user === userProfile) ?
        array[index].users.splice(array[index].users.findIndex((user: userProfile) => user === userProfile), 1)
        && arrayJoin.find((element: any) => element[keyOf] === elementLiked.id && element.user_id === userProfile?.id) && arrayJoin.splice(arrayJoin.findIndex((element: any) => element[keyOf] === elementLiked.id && element.user_id === userProfile?.id), 1)
        :
        array[index].users.push(userProfile) && arrayJoin.push({ user_id: userProfile?.id, [keyOf]: elementLiked.id }) && console.log(arrayJoin);
    setArray([...array]);
}


export const imIn = (elementCheck: any, arrayJoin: any, userId: number | undefined, keyOf?: string) => {
    keyOf ? keyOf = keyOf : keyOf = 'target_id'
    return arrayJoin.find((element: any) => element[keyOf] === elementCheck.id && element.user_id === userId) ? true : false
}

