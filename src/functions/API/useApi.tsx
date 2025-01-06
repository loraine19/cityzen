import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { FETCH_URL } from "../../../env.local";

const url = FETCH_URL
const accessToken = Cookies.get('accessToken')
const refreshToken = Cookies.get('refreshToken')

if (typeof axios === "undefined") {
    throw new Error("Axios doit être chargé pour utiliser ce module.");
}

export const handleApiCall = async (apiCall: () => Promise<any>) => {
    try {
        const { data } = await apiCall(); return data;
    } catch (error) {
        //   console.error('apiCall', error);
        // throw error;
    }
}

export const useApi = () => {
    const headers = { 'Authorization': 'Bearer ' + accessToken };
    // Création d'une instance Axios
    const api = axios.create({ baseURL: url, headers: headers });
    // Juste avant l'envoi de la requète
    api.interceptors.request.use((config) => {
        // on pourrait ajouter des éléments dans le header
        return config;
    })
    // tout de suite la reponse de la requète
    api.interceptors.response.use(
        (response) => response, async (error) => {
            console.log(error);
            if (error.response && error.response.status === 401) {
                console.log("401error.response", error.response)
                refreshAccess()
            }
            if (error.response && error.response.status === 404) {
                console.log("404 error.response", error.response)
                if (error.response.data.message.includes("expired") || error.response.data.message.includes("jwt")) {
                    for (let i = 0; i < 1; i++) {
                        console.log("try refreshAccess")
                        refreshAccess()
                    }
                }
                if (error.response.data.message.includes("P2025")) {
                    return null
                    // window.location.replace('/*')
                }

            }
            return Promise.reject(error);
        }
    )
    return api;
}

export const useApiRefresh = () => {
    const headersRefresh = { 'Authorization': 'Bearer ' + refreshToken }
    const api = axios.create({ baseURL: url, headers: headersRefresh })
    api.interceptors.request.use((config) => { return config })
    api.interceptors.response.use(
        (response) => response,
        (error) => { console.log(error); return Promise.reject(error) });
    return api;
}


export const refreshAccess = async () => {
    const refreshToken = Cookies.get('refreshToken');
    !refreshToken && window.location.replace('/signin');
    const data = { refreshToken };
    const apiRefresh = useApiRefresh();
    let result;
    try {
        result = await apiRefresh.post('auth/refresh', data);
        console.log("result refresh", result)
        const expirationDateAccess = getTokenExpirationDate(result.data.accessToken) || new Date();
        const expirationDateRefresh = getTokenExpirationDate(result.data.refreshToken) || new Date();
        Cookies.set('accessToken', result.data.accessToken, { expires: expirationDateAccess });
        Cookies.set('refreshToken', result.data.refreshToken, { expires: expirationDateRefresh });
        location.reload()
        return result;

    } catch (error) {
        console.error("Error refreshing access token", error);
        await new Promise(resolve => setTimeout(resolve, 5000));
        location.reload();
        window.location.replace('/signin');
        return;
    }

};


export const getTokenExpirationDate = (token: string): Date | null => {
    const decoded: any = jwtDecode(token);
    if (!decoded.exp) { console.log(decoded); return null; }
    return new Date(decoded.exp * 1000);
};

export const isTokenExpired = (token: string): boolean => {
    const expirationDate = getTokenExpirationDate(token);
    return expirationDate ? expirationDate < new Date() : true;
};


//// CREATION DE FORM DATA
export const createFormData = (element: any): FormData => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(element)) {
        if (value instanceof File) {
            formData.append(key, value);
        } else if (value !== undefined && value !== null) {
            (typeof value === 'object') ?
                formData.append(key, JSON.stringify(value))
                : formData.append(key, value.toString())
        }
    }
    return formData;
};