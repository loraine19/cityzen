import { eventUser, postUser, userProfile } from '../types/user';
import { all, flag, notif, targetUser } from "../types/type";
import { Address, EventP, Pool, Post, PostL, Profile, Service, Survey, User, } from '../types/class';
import { GetAdressGps, GetAdressString } from './GeoMapFunction';



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
        formik.values.image = (reader.result as string)
    }
}

export const getImageBlob2 = (event: any, setImgBlob: any, formik: any) => {
    let file = event.target.files[0];
    formik.values.image = file
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        setImgBlob(reader.result as string)
    }
}

//// JOINS TABLE FUNCTIONS
//// GET user profil 
export const getUsersDetail = (arrayUser: User[], arraySearch: Profile[]) => {
    return arraySearch.map((user: any) => { return { ...user, ...arrayUser.find((element: any) => element.id === user.id) } })
}
export const getAdress = (id: number, arraySearch: Address[]): Address | undefined => {
    return arraySearch.filter((element: any) => element.id === id)[0]
}
export const getUserDetail = (id: number, arraySearch: Profile[]): Profile | undefined => {
    return arraySearch.filter((element: Profile) => element.userId as number === id)[0]
}


//// get users in events or post by id 
export const getUsers = (array: Post[] | EventP[], arrayOfJoin: any[], initialArray: [], lookingID: keyof eventUser | keyof postUser): PostL[] | EventP[] => {
    array.map((element: PostL | EventP) => {
        let users: Profile[] = [];
        element.users = [];
        arrayOfJoin.filter((row: any) => row[lookingID] === element.id).map((row: any) => {
            initialArray.map((user: Profile) => (user.id === row.userId) && users.push(user));
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
export const getFlags = (posts: PostL[], events: Event[], surveys: Survey[], pools: Pool[], services: Service[], arrayOfJoin: any[]): any[] => {
    let array = getCommuns(posts, events, surveys, pools, services)
    let arrayWithFlags = array.map((element: all) => {
        element.flag = arrayOfJoin.filter((flagRow: targetUser) => (element.id + element.type) === (flagRow.target_id + flagRow.type))
        return element
    })
    return arrayWithFlags
}

//// avoir tout les flags d'un user ( return flag[])
export const getFlagsUser = (posts: Post[], events: Event[], surveys: Survey[], pools: Pool[], services: Service[], arrayOfJoin: any[], idS: number) => {
    let all = getCommuns(posts, events, surveys, pools, services)
    return (arrayOfJoin.filter((flagRow: targetUser) => (flagRow.userId === idS))).map((element1: flag) => {
        for (let i = 0; i < all.length; i++) {
            (all[i].id + all[i].type) === (element1.target_id + element1.type) && (element1.element = all[i].element);
        }
        return element1
    })
}


///// flag
export const getAll = (posts: Post[], events: Event[], surveys: Survey[], pools: Pool[], services: Service[]) => {
    let allElments = [...posts.map((post: Post) => { return { ...post, type: "post" } }),
    ...events.map((event: Event) => { return { ...event, type: "event" } }),
    ...surveys.map((survey: Survey) => { return { ...survey, type: "survey" } }),
    ...pools.map((pool: Pool) => { return { ...pool, type: "pool" } }),
    ...services.map((service: Service) => { return { ...service, type: "service" } })]
    return (allElments as [])
}

//// GETS COMMUNS KEYS OF ALL ELEMENT IN AN ARRAY 
export const getCommuns = (posts: Post[], events: Event[], surveys: Survey[], pools: Pool[], services: Service[]) => {
    let elements: all[] = [];
    let all = getAll(posts, events, surveys, pools, services)
    let newElement: all
    all.map((element: any) => {
        const findId = element.userId ? element.userId : element.type === "Demande" ? element.userId_get : element.userId_do;
        (findId) && (
            newElement = {
                id: element.id,
                userId: findId,
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
export const getNotifications = (posts: Post[], events: Event[], surveys: Survey[], pools: Pool[], services: Service[], userId: number) => {
    let notifications: notif[] = [];
    let notif: notif = {} as notif
    let all = getAll(posts, events, surveys, pools, services)
    all.map((element: any) => {
        const findId = element.userId === userId || element.userId_get === userId || element.userId_do === userId || element.userId === userId;
        (findId || element.users?.find((user: userProfile) => user.id === userId)) && (
            notif = {
                target_id: element.id,
                userId: element.userId,
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

export const GetPathElement = (type: string) => type === "post" ? "annonce" : type === "event" ? "evenement" : type === "survey" ? "sondage" : type === "pool" ? "cagnotte" : type === "service" ? "service" : ""
export const GetArrayElement = (type: string) => type === "annonce" ? "posts" : type === "evenement" ? "events" : type === "sondage" ? "surveys" : type === "cagnotte" ? "pools" : type === "service" ? "services" : type === "litige" ? "issues" : ""


//// CALENDAR FUNCTIONS 
const dayInMilli = 24 * 60 * 60 * 1000
export const getWeek = (date: any, eventList: EventP[]) => {
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


export const eventdateInfo = (event: EventP) => {
    return (
        'de ' + new Date(event.start).toLocaleDateString('fr-FR', { weekday: 'short', month: 'short', day: 'numeric', minute: 'numeric', hour: 'numeric' })
        + " à " +
        (new Date(event.start).toDateString() === new Date(event.end).toDateString() ?
            new Date(event.end).toISOString().slice(11, 16) :
            new Date(event.end).toLocaleDateString('fr-FR', { weekday: 'short', month: 'short', day: 'numeric', minute: 'numeric', hour: 'numeric' })))
}

export const getWeeks = (day: any, eventList: EventP[], numberOfwweks: number) => {
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
    setArray([...array.filter((element: any) => element.id !== id)]);

}

export const deleteElementJoin = (elementJoin: any, array: any[], setArray: any) => {
    let index = array.findIndex((element: any) => (element.userId + element.type + element.target_id) === (elementJoin.userId + elementJoin.type + elementJoin.target_id));
    confirm(" voulez vous supprimer " + array[index].element.title + " ?") && array.splice(index, 1); setArray([...array])

}


//// LIKE UNLICK // QUICK PARTIPATE
export const beInElement = (elementLiked: PostL | EventP, array: any[], setArray: any, arrayJoin: any, setArrayJoin: any, userProfile: Profile, keyOf?: string) => {

    keyOf ? keyOf = keyOf : keyOf = 'target_id'
    let index = array.findIndex((element: any) => element.id === elementLiked.id);
    let users = []

    if (elementLiked.users?.find((user: any) => user.userId === userProfile?.userId)) {
        users = elementLiked.users.filter((user: any) => user.userId !== userProfile?.id);
        let filter = arrayJoin.find((element: any) => element[keyOf] === elementLiked.id && element.userId === userProfile?.userId)
        arrayJoin.splice(arrayJoin.indexOf(filter), 1)

    } else {
        users.push(userProfile);
        arrayJoin.push({ userId: userProfile?.userId, [keyOf]: elementLiked.id })
        array[index].users.push(userProfile)
    }
    setArrayJoin([...arrayJoin]);
    setArray([...array]);
    elementLiked.users = [...users]
}


export const imIn = (elementCheck: any, arrayJoin: any, userId: number | undefined, keyOf?: string) => {
    keyOf ? keyOf = keyOf : keyOf = 'target_id'
    return arrayJoin.find((element: any) => element[keyOf] === elementCheck.id && element.userId === userId) ? true : false
}


///// GET ADRESS FROM FORM 
export const FindAdressData = async (addressSaisie: string, array: Address[], data: any, formik: { values: any }) => {
    const gps = await GetAdressGps(addressSaisie);
    const addressFull = await GetAdressString(gps?.lat!, gps?.lng!)
    const findAdress = array.find((element: Address) => (element.city === addressFull?.city) && (element.address === addressFull?.address) && (element.zipcode === addressFull?.zipcode));
    if (!findAdress) {
        data.address.push({ id: data.address.length + 1, ...addressFull })
        formik.values.address_id = data.address.length;
        formik.values.address = addressFull?.address
        return data.address[data.address.length - 1]
    }
    else return findAdress
}

//// GET CATEGORI SERVICE 
export const GetCategory = (service: Service, categories: string[]): string => {
    return service.category <= categories.length ? categories[(service.category) - 1] : "autre"
}

export const GetPoints = (service: Service, userAuthor: Profile, userResp?: Profile): number[] => {
    const base = Number(((service.hard / 2 + service.skill / 2) + 1).toFixed(1))
    return userResp ? [base + userResp.assistance / 2] : service.type === "do" ? [base + userAuthor.assistance / 2] : [base, (base + 1.5)]

}

export const isLate = (date: Date, days: number) => new Date(date) < new Date((new Date().getTime() - days * 24 * 60 * 60 * 1000))

export const AcceptUserResp = (id: number, array: Service[], setArray: any, step: 0 | 1 | 2 | 3) => {
    let index = array.findIndex((element: Service) => element.id === id);
    array[index].status = step
    step === 3 && (array[index].finished_at = new Date())
    setArray([...array]);
}

export const takeElement = (id: number, array: Service[], setArray: any, userProfile: Profile) => {
    let index = array.findIndex((element: Service) => element.id === id);
    if (array[index].userIdResp === userProfile?.userId) {
        array[index].userIdResp = 0;
        array[index].status = 0;
    }
    else {
        array[index].userIdResp = userProfile?.userId;
        array[index].status = 1;
    }
    setArray([...array]);
}