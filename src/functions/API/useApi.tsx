import axios from "axios";
import Cookies from "js-cookie";
import { Auth } from "../../types/class";

// On vérifie qu'Axios est chargé via le CDN avant d'utiliser ce module
//let url = "'https://back.imagindev-app.fr";
//const url = import.meta.env.BASE_URL;
//console.log(url);
const url = 'http://localhost:3000';

const accessToken = Cookies.get('accessToken')
const refreshToken = Cookies.get('refreshToken')

if (typeof axios === "undefined") {
    throw new Error("Axios doit être chargé pour utiliser ce module.");
}

export const handleApiCall = async (apiCall: () => Promise<any>) => {
    try {
        const { data } = await apiCall();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const useApi = () => {
    const headers = {
        'Authorization': 'Bearer ' + accessToken,
    };

    // Création d'une instance Axios
    const api = axios.create({
        baseURL: url,
        headers: headers,
    });

    // Juste avant l'envoi de la requète
    api.interceptors.request.use((config) => {
        // on pourrait ajouter des éléments dans le header
        // ajouter dans le header le token (Authorization)
        //
        return config;
    });

    // tout de suite la reponse de la requète
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            console.log(error);
            if (error.response && error.response.status === 401) {
                console.log("401error.response", error.response)
                refreshAccess()
            }
            if (error.response && error.response.status === 404) {
                console.log("404 error.response", error.response)
                if (error.response.data.message.includes("expired")) {
                    refreshAccess()
                }
            }
            return Promise.reject(error);
        }
    );

    return api;
};

export const useApiRefresh = () => {
    const headersRefresh = {
        'Authorization': 'Bearer ' + refreshToken,
    };

    // Création d'une instance Axios
    const api = axios.create({
        baseURL: url,
        headers: headersRefresh,
    });

    // Juste avant l'envoi de la requète
    api.interceptors.request.use((config) => {
        // on pourrait ajouter des éléments dans le header
        // ajouter dans le header le token (Authorization)
        //
        return config;
    });

    // tout de suite la reponse de la requète
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            console.log(error);
            if (error.response && error.response.status === 401) {
                console.log("401error.response", error.response)
                refreshAccess()
            }
            if (error.response && error.response.status === 404) {
                console.log("404 error.response", error.response)
                console.log(headersRefresh)
                //  refreshAccessToken()

            }
            return Promise.reject(error);
        }
    );

    return api;
};


export const refreshAccess = async (): Promise<Auth> => {
    const refreshToken = Cookies.get('refreshToken');
    const data = { refreshToken };
    const apiRefresh = useApiRefresh();
    const result = await apiRefresh.post('auth/refresh', data);
    Cookies.set('accessToken', result.data.accessToken, { expires: 1 });
    Cookies.set('refreshToken', result.data.refreshToken, { expires: 10 });
    return result.data;
};