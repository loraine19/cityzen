import { eventUser, postUser, userProfile } from '../types/user';
import { all, flag, notif, targetUser } from "../types/type";
import { action, Address, eventCategory, EventP, Flag, Label, Pool, Post, postCategory, Profile, Service, Survey, User, serviceType, serviceCategory, HardLevel, SkillLevel, AssistanceLevel, serviceStep } from '../types/class';
import { GetAdressGps, GetAdressString } from './GeoMapFunction';
import { deleteParticipant, postParticipant } from './API/partcipantsApi';
import { getEventById } from './API/eventsApi';
import { getAddresses, postAddress } from './API/addressApi';
import { defaultEventImage } from '../datas/enumsCategories';
import { getPostById } from './API/postsApi';
import { deleteLike, postLike } from './API/likeApi';
import { useNavigate } from 'react-router';
import { getServiceById, putService, putServiceValidation } from './API/servicesApi';



export const dayMS = 24 * 60 * 60 * 1000
///// CALL BACK ADD DATA IN EVENTS
export const getDays = (array: any) => {
    array.map((event: any) => {
        let start = new Date(event.start).getTime();
        let end = new Date(event.end).getTime();
        let dif = Math.ceil(Math.abs((end - start) / dayMS))
        let days = []
        for (let i = 0; i < dif; i++) { days.push(new Date(start + i * dayMS)) }
        event.days = days
    })
    return array
}

///// BLOB FUNCTION 
export const getImageBlob2 = (event: any, setImgBlob: any, formik: any) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        setImgBlob(reader.result as string)
        formik.values.image = (reader.result as string)
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
export const getUsers = (array: Post[] | EventP[], arrayOfJoin: any[], initialArray: [], lookingID: keyof eventUser | keyof postUser): Post[] | EventP[] => {
    array.map((element: Post | EventP) => {
        let users: Profile[] = [];
        element.Likes = [];
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
export const getFlags = (posts: Post[], events: Event[], surveys: Survey[], pools: Pool[], services: Service[], arrayOfJoin: any[]): any[] => {
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
export const getWeek = (date: any, eventList: EventP[]) => {
    let week = [];
    date = new Date(date);
    const weekDay = date.getDay();
    const lundi = date.getTime() - ((weekDay - 1) * dayMS)
    while (week.length < 7) {
        for (let i = 0; i < 7; i++) {
            const nextDay = (new Date((lundi) + (i * dayMS)))
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
            day = new Date(new Date(day).getTime() + 1 * 7 * dayMS)
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
export const beInElement = (elementLiked: Post | EventP, array: any[], setArray: any, arrayJoin: any, setArrayJoin: any, userProfile: Profile, keyOf?: string) => {

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
export const GetCategory = (service: Service, categories: Label[]): string => {
    return service.category <= categories.length ? categories[(service.category) - 1].value : "autre"
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


//// NEW FUNCTIONS

export const toggleParticipant = async (eventId: number, userId: number, setEvent: any) => {
    const response = await getEventById(eventId);
    const isParticipant = response.Participants.find((participant: any) => participant.userId === userId) ? true : false;
    isParticipant ? await deleteParticipant(eventId) : await postParticipant({ userId: userId, eventId: eventId });
    setEvent(await getEventById(eventId));
};

export const toggleLike = async (postId: number, userId: number, setPost: any) => {
    const response = await getPostById(postId);
    const isLiked = response.Likes.find((like: any) => like.userId === userId) ? true : false;
    isLiked ? await deleteLike(postId) : await postLike({ userId: userId, postId: postId });
    setPost(await getPostById(postId));
};

export const toggleResp = async (serviceId: number, userId: number, setService: any) => {
    const response = await getServiceById(serviceId);
    const isResp = response.userIdResp === userId ? true : false;
    isResp ? await putService(serviceId, 0) : await putService(serviceId, userId);
    setService(await getServiceById(serviceId));
};
export const toggleValidResp = async (serviceId: number, userId: number, setService: any) => {
    await putServiceValidation(serviceId, userId)
    setService(await getServiceById(serviceId));
};


export const isFlaged = (element: Post | EventP | Service | Survey, userId: number, flags: Flag[]): boolean => {
    const flagged = flags.find((flag: Flag) => flag.targetId === element.id && flag.userId === userId) ? true : false
    return flagged ? flagged : false;
};

export const Igo = (element: EventP, userId: number): boolean => { return element.Participants.find((particpant: any) => particpant.userId === userId) ? true : false };

export async function addressIn(formik: any, newElement: EventP | Profile) {
    const AdressToSearch = formik.values.Address
    const addressList = await getAddresses()
    const addressFind = addressList.find((address) => address.address === AdressToSearch.address && address.city === AdressToSearch.city)
    if (!addressFind) {
        const post = await postAddress(AdressToSearch)
        post ? (formik.values.Address = post) : (formik.values.Address = '')
    }
    else {
        addressFind?.id !== newElement.addressId && (formik.values.Address = addressFind);
    }
    formik.values.addressId = formik.values.Address.id
}

export const getImageBlob = (event: any, setImgBlob: any, formik: any) => {
    let file = event.target.files[0];
    formik.values.image = file
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        setImgBlob(reader.result as string)
    }
}

//
export const GenereMyActions = (element: Post | EventP | Service | Survey, type: string, deleteRoute: (id: number) => Promise<any>, handleOpen?: () => void, icon3?: boolean): action[] => {
    const navigate = useNavigate()
    const actions = [
        {
            icon: handleOpen ? 'Supprimer' : 'close',
            title: "Confirmer la suppression",
            body: "Confirmer la suppression de " + element.title,
            function: async () => { await deleteRoute(element.id); handleOpen && handleOpen(); },
        },
        {
            icon: handleOpen ? 'Modifier' : 'edit',
            title: "Confirmer la modification",
            body: "Confirmer la modification de " + element.title,
            function: () => { navigate(`/${type}/edit/${element.id}`); handleOpen && handleOpen(); },
        },

    ];
    icon3 && actions.length < 3 && actions.push({
        icon: handleOpen ? 'Relancer' : 'groups',
        title: "Relancer " + element.title,
        body: "Relancer " + element.title,
        function: () => { console.log(`Voulez-vous relancer ${element.title}?`) }
    })
    return actions
}

//// GENERE LABELS 
const generateLabels = (categories: string[], labels: string[]) => {
    return categories.map((category, index) => ({ value: category, label: labels[index] }));
};
const labelsEvents = ['sport', 'social', 'culturelle', 'blob', 'autre'];
export const eventCategories = generateLabels(eventCategory, labelsEvents);

const labelsPost = ["perdu-trouvé", "animaux", "à vendre", "blob", "autre"];
export const postCategories = generateLabels(postCategory, labelsPost);

const typesService = ["demande", "offre"];
export const serviceTypes = generateLabels(serviceType, typesService);

const labelsServices = ["bricolage", "cours", "animaux", "blob", "autre"];
export const serviceCategories = generateLabels(serviceCategory, labelsServices);

const statusServices = ["nouveau", "en attente", "en cours", "terminé", "litige"];
export const serviceStatus = generateLabels(serviceStep, statusServices);

export const getLabel = (value: string | any, array: Label[]): string => {
    const find = array.find((cat) => cat.value === value?.toUpperCase())
    return find ? find.label : ' - '
}
export const getValue = (label: string, array: Label[]): string => {
    const find = (array.find((cat) => cat.label === label)?.value)
    return find ? find : ' - '
}
export const getEnumVal = (element: any, enumArray: any) => Object.values(enumArray).indexOf(element);

export const getDefaultImage = (category: string) => {
    const catToFind = category.toLowerCase();
    const foundCategory = defaultEventImage.find(category => category.type.toLowerCase() === catToFind);
    return foundCategory ? foundCategory.image : defaultEventImage[0].image;
}

export const GetPoints = (service: Service, user?: Profile): number[] => {
    const userResp = service.UserResp ? service.UserResp.Profile : null
    const userP = user ? user : service.User.Profile
    const hard = getEnumVal(service.hard, HardLevel)
    const skill = getEnumVal(service.skill, SkillLevel)
    const userPoints = getEnumVal(userP.assistance, AssistanceLevel)
    const userRespPoints = userResp ? getEnumVal(userResp.assistance, AssistanceLevel) : 0
    const type = getLabel(service.type, serviceTypes)
    const base = Number(((hard / 2 + skill / 2) + 1).toFixed(1))
    const points =
        userResp && [base + userRespPoints / 2] ||
        type === "offre" && [base + userPoints / 2] ||
        [base, (base + 1.5)]
    return points
}


export const generateContact = (user: User): string => {
    return `
        <br> <span className="font-medium">${user?.Profile.firstName} </span>
        <br> par mail :<br>
        <a href="mailto:${user?.email}" className="text-orange-500 font-medium underline">${user?.email}</a>
        <br> ou télèphone :
        <br> <a href="tel:${user?.Profile.phone}" className="text-orange-500 font-medium underline">${user?.Profile.phone}</a>`;
};