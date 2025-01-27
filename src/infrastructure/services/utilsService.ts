import { useNavigate } from "react-router";
import { EventView, eventCategory } from "../../domain/entities/Event";
import { Flag, flagTarget, flagReason } from "../../domain/entities/Flag";
import { Label, Action, defaultEventImage } from "../../domain/entities/frontEntities";
import { Issue } from "../../domain/entities/Issue";
import { Pool } from "../../domain/entities/Pool";
import { Post, postCategory } from "../../domain/entities/Post";
import { Profile, AssistanceLevel } from "../../domain/entities/Profile";
import { Service, serviceType, serviceCategory, serviceStep, HardLevel, SkillLevel } from "../../domain/entities/Service";
import { Survey, surveyCategory } from "../../domain/entities/Survey";
import { User } from "../../domain/entities/User";
import { Address } from "../../domain/entities/Address";
import { notifCategory } from "../../domain/entities/Notif";
import { LikeService } from "../../domain/repositoriesBase/LikeRepository";
import { PostService } from "../../domain/repositoriesBase/PostRepository";
import { AddressApi } from "../providers/http/addressApi";
import { ServiceApi } from "../providers/http/serviceApi";
const { getServiceById, putService } = new ServiceApi();
const { getAddresses, postAddress } = new AddressApi();

export const dayMS = 24 * 60 * 60 * 1000
///// CALL BACK ADD DATA IN EVENTS 
// migrate to EventService.ts


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


export const getFlagsInElement = (array: any[], arrayOfJoin: any[]): any => {
    return array.map((element: any) => {
        let flags: any = [];
        flags = (arrayOfJoin.filter((tag: any) => tag.type === 'event' && tag.target_id === element.id))
        element.flags = flags;
        return element
    })
}



export const GetPathElement = (type: string) => type === "post" ? "annonce" : type === "event" ? "evenement" : type === "survey" ? "sondage" : type === "pool" ? "cagnotte" : type === "service" ? "service" : type === "issue" ? "Conciliation" : ""
export const GetArrayElement = (type: string) => type === "annonce" ? "posts" : type === "evenement" ? "events" : type === "sondage" ? "surveys" : type === "cagnotte" ? "pools" : type === "service" ? "services" : type === "litige" ? "issues" : ""






///// Convert Date 
export const shortDateString = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { weekday: 'short', month: 'short', day: 'numeric' })
}





///// DELET ELEMENT NOTIF / FLAG 

export const deleteElement = (id: number, array: any[], setArray: any,) => {
    setArray([...array.filter((element: any) => element.id !== id)]);

}

export const deleteElementJoin = (elementJoin: any, array: any[], setArray: any) => {
    let index = array.findIndex((element: any) => (element.userId + element.type + element.target_id) === (elementJoin.userId + elementJoin.type + elementJoin.target_id));
    confirm(" voulez vous supprimer " + array[index].element.title + " ?") && array.splice(index, 1); setArray([...array])

}


export const imIn = (elementCheck: any, arrayJoin: any, userId: number | undefined, keyOf?: string) => {
    keyOf ? keyOf = keyOf : keyOf = 'target_id'
    return arrayJoin.find((element: any) => element[keyOf] === elementCheck.id && element.userId === userId) ? true : false
}



//// GET CATEGORI SERVICE 
export const GetCategory = (service: Service, categories: Label[]): string => {
    return service.category <= categories.length ? categories[(service.category) - 1].value : "autre"
}



export const isLate = (date: Date, days: number) => new Date(date) < new Date((new Date().getTime() - days * 24 * 60 * 60 * 1000))


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


export const toggleLike = async (postId: number, userId: number, setPost: any) => {
    const { getPostById } = new PostService();
    const { postLike, deleteLike } = new LikeService();
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
    // await putServiceValidation(serviceId, userId)
    setService(await getServiceById(serviceId));
};



export async function addressIn(formik: any, newElement: EventView | Profile) {
    const AdressToSearch = formik.values.Address
    const addressList = await getAddresses()
    const addressFind = addressList.find((address: Address) => address.address === AdressToSearch.address && address.city === AdressToSearch.city)
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
    formik.values.image = file as File;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        setImgBlob(reader.result as string)
    }
}

//
export const GenereMyActions = (element: Post | EventView | Service | Survey | Issue | Pool | Flag, type: string, deleteRoute: (id: number) => Promise<any>, handleOpen?: () => void, icon3?: boolean): Action[] => {
    const navigate = useNavigate()
    let title = ''
    let id = 0;
    'title' in element ? title = element.title : 'litige';
    'id' in element ? id = element.id : element.targetId;
    const actions = [
        {
            icon: handleOpen ? 'Supprimer' : 'close',
            title: "Confirmer la suppression",
            body: "Confirmer la suppression de " + title,
            function: async () => { await deleteRoute(id); handleOpen && handleOpen() && location.reload() },
        },
        {
            icon: handleOpen ? 'Modifier' : 'edit',
            title: "Confirmer la modification",
            body: "Confirmer la modification de " + title,
            function: () => { navigate(`/${type}/edit/${id}`); handleOpen && handleOpen(); },
        },

    ];
    icon3 && actions.length < 3 && actions.push({
        icon: handleOpen ? 'Relancer' : 'groups',
        title: "Relancer " + title,
        body: "Relancer " + title,
        function: () => { console.log(`Voulez-vous relancer ${title}?`) }
    })
    return actions
}

//// GENERE LABELS 
const generateLabels = (categories: string[], labels: string[]) => {
    return categories.map((category, index) => ({ value: category, label: labels[index] }));
};
const labelsEvents = ['sport', 'social', 'culturelle', 'blob', 'autre'];
export const eventCategories = generateLabels(eventCategory, labelsEvents);

const labelsPost = ["perdu-trouvé", "animaux", "à vendre", "je donne", "autre"];
export const postCategories = generateLabels(postCategory, labelsPost);

const typesService = ["demande", "offre"];
export const serviceTypes = generateLabels(serviceType, typesService);

const labelsServices = ["bricolage", "cours", "animaux", "blob", "autre"];
export const serviceCategories = generateLabels(serviceCategory, labelsServices);

const statusServices = ["nouveau", "en attente", "en cours", "terminé", "litige"];
export const serviceStatus = generateLabels(serviceStep, statusServices);

const labelsFlagTarget = ["evenement", "annonce", "sondage", "service"];
export const flagTargets = generateLabels(flagTarget, labelsFlagTarget);

const reasonsFlag = ["illicite", "haineux", "dangereux", "irrespecteux", "atteinte à la vie privé"]
export const flagReasons = generateLabels(flagReason, reasonsFlag);

const labelsSurvey = ['sécurité', 'environnement', 'régles', 'suggestion', 'autre'];
export const surveyCategories = generateLabels(surveyCategory, labelsSurvey);

const labelsNotif = ['annonce', 'evenement', 'service', 'litige', 'sondage', 'cagnotte', 'flag']
export const notifCategories = generateLabels(notifCategory, labelsNotif);

export const getLabel = (value: string | any, array: Label[]): string => {
    const find = array.find((cat) => cat.value === value?.toUpperCase())
    return find ? find.label : ' - '
}
export const getValue = (label: string, array: Label[]): string => {
    const find = (array.find((cat) => cat.label === label)?.value)
    return find ? find : ''
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




