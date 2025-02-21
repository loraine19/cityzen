import { Flag } from "../../../domain/entities/Flag";
import { Action, Label, defaultEventImage } from "../../../domain/entities/frontEntities";
import { Issue } from "../../../domain/entities/Issue";
import { notifCategory } from "../../../domain/entities/Notif";
import { Pool } from "../../../domain/entities/Pool";
import { Post, postCategory } from "../../../domain/entities/Post";
import { Profile } from "../../../domain/entities/Profile";
import { Service } from "../../../domain/entities/Service";
import { Survey, surveyCategory } from "../../../domain/entities/Survey";
import { User } from "../../../domain/entities/User";
import { LikeApi } from "../../../infrastructure/providers/http/likeApi";
import { PostApi } from "../../../infrastructure/providers/http/postApi";
import { EventView } from "./eventViewEntities";


export const dayMS = 24 * 60 * 60 * 1000

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
    const index = array.findIndex((element: any) => (element.userId + element.type + element.target_id) === (elementJoin.userId + elementJoin.type + elementJoin.target_id));
    confirm(" voulez vous supprimer " + array[index].element.title + " ?") && array.splice(index, 1); setArray([...array])
}


export const imIn = (elementCheck: any, arrayJoin: any, userId: number | undefined, keyOf?: string) => {
    keyOf ? keyOf = keyOf : keyOf = 'target_id'
    return arrayJoin.find((element: any) => element[keyOf] === elementCheck.id && element.userId === userId) ? true : false
}


//// GET CATEGORI SERVICE 
export const isLate = (date: Date, days: number) => new Date(date) < new Date((new Date().getTime() - days * 24 * 60 * 60 * 1000))


export const takeElement = (id: number, array: Service[], setArray: any, userProfile: Profile) => {
    let index = array.findIndex((element: Service) => element.id === id);
    if (array[index].userIdResp === userProfile?.userId) {
        array[index].userIdResp = 0;
        // array[index].status = 0;
    }
    else {
        array[index].userIdResp = userProfile?.userId;
        //   array[index].status = 1;
    }
    setArray([...array]);
}


//// NEW FUNCTIONS
export const toggleLike = async (postId: number, userId: number, setPost: any) => {
    const { getPostById } = new PostApi();
    const { postLike, deleteLike } = new LikeApi();
    const response = await getPostById(postId);
    const isLiked = response.Likes.find((like: any) => like.userId === userId) ? true : false;
    isLiked ? await deleteLike(postId) : await postLike({ userId: userId, postId: postId });
    setPost(await getPostById(postId));
}

export const formatDateForDB = (date: any) => (new Date(date).toISOString().slice(0, 16).replace('Z', '').split('.')[0]);

//
export const GenereMyActions = (element: Post | EventView | Service | Survey | Issue | Pool | Flag, type: string, deleteRoute: (id: number) => Promise<any>, handleOpen?: () => void, icon3?: boolean): Action[] => {
    let title = ''
    let id = 0;
    'title' in element ? title = element.title ?? 'litige' : 'litige';
    'id' in element ? id = element.id : element.targetId;
    const actions = [
        {
            icon: handleOpen ? 'Supprimer' : 'close',
            title: "Confirmer la suppression",
            body: "Confirmer la suppression de " + title,
            function: async () => { await deleteRoute(id); handleOpen && handleOpen() && (window.location.href = (`/${type}`)) },
        },
        {
            icon: handleOpen ? 'Modifier' : 'edit',
            title: "Confirmer la modification",
            body: "Confirmer la modification de " + title,
            function: () => { window.location.href = (`/${type}/edit/${id}`); handleOpen && handleOpen(); },
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


export const getEnumLabel = (enumArray: any, all?: boolean): Label[] => {
    const allLabel = { label: 'tous', value: '' }
    const array = [...Object.keys(enumArray).map(key => ({
        label: enumArray[key as keyof typeof enumArray],
        value: key,
    }))];
    all && array.unshift(allLabel as Label);
    return array
};


const generateLabels = (categories: string[], labels: string[]) => {
    return categories.map((category, index) => ({ value: category, label: labels[index] }));
};

const labelsPost = ["perdu-trouvé", "animaux", "à vendre", "je donne", "autre"];
export const postCategories = generateLabels(postCategory, labelsPost);


const labelsFlagTarget = ["evenement", "annonce", "sondage", "service"];
export const flagTargets = generateLabels(labelsFlagTarget, labelsFlagTarget);

const reasonsFlag = ["illicite", "haineux", "dangereux", "irrespecteux", "atteinte à la vie privé"]
export const flagReasons = generateLabels(reasonsFlag, reasonsFlag);

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


export const generateContact = (user: User): string => {
    return `
        <br> <span className="font-medium">${user?.Profile.firstName} </span>
        <br> par mail :<br>
        <a href="mailto:${user?.email}" className="text-orange-500 font-medium underline">${user?.email}</a>
        <br> ou télèphone :
        <br> <a href="tel:${user?.Profile.phone}" className="text-orange-500 font-medium underline">${user?.Profile.phone}</a>`;
}


export const handleScroll = (divRef: any, setIsBottom: any, hasNextPage: any, fetchNextPage: any) => {
    if (divRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = divRef.current;
        if (scrollTop + clientHeight + 2 >= scrollHeight) {
            setIsBottom(true);
            if (hasNextPage) {
                fetchNextPage();
            }
        } else {
            setIsBottom(false);
        }
    }
};