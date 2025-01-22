import axios from "axios";
import Cookies from "js-cookie";
import { ApiError } from "./utilsApi";
export interface Api {
    get: (url: string) => Promise<any>;
    delete: (url: string) => Promise<any>;
    put: (url: string, data?: any) => Promise<any>;
    post: (url: string, data: any, config?: any) => Promise<any>;
    patch: (url: string, data: any, config?: any) => Promise<any>;
}

const url = import.meta.env.PROD ? import.meta.env.VITE_FETCH_URL : import.meta.env.VITE_FETCH_URL_DEV
if (typeof axios === "undefined") { throw new Error("Axios must be loaded to use this module.") }

export const useApi = (): Api => {
    const token = Cookies.get('accessToken');
    const api = axios.create({ baseURL: url });
    api.interceptors.request.use((config) => {
        if (token) { config.headers.Authorization = `Bearer ${token}` }
        return config;
    });
    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            let errorMessage = "Une erreur s'est produite";
            if (!error.response) {
                return Promise.reject(new ApiError(500, errorMessage))
            }
            const { status, data } = error.response;
            switch (status) {
                case 400:
                    errorMessage = 'Mauvaise requête.';
                    break
                case 401:
                    if (!originalRequest._retry) {
                        originalRequest._retry = true;
                        await refreshAccess();
                    }
                    break;
                case 403:
                    errorMessage = 'Accès refusé.';
                    break
                case 404:
                    console.log(data.message)
                    if (data.message.includes("expired") || data.message.includes("jwt") || data.message.includes("token")) {
                        if (!originalRequest._retry) {
                            originalRequest._retry = true;
                            const refresh = await refreshAccess();
                            refresh ? setTimeout(() => location.reload(), 100) :
                                setTimeout(() => window.location.replace("/signin?msg=Votre session a expiré 53"), 5000);
                        }
                    } else if (data.message.includes("P2025")) {
                        errorMessage = 'Ressource non trouvée.';
                    }
                    break;
                case 409:
                    errorMessage = 'Conflicts de ressources.';
                    break
                case 500:
                    errorMessage = 'Serveur interrompu.';
                    break
                default:
                    errorMessage = "Une erreur inconnue s'est produite";
            }
            console.log('error.response', status, errorMessage, error.response,)
            return Promise.reject(new ApiError(status, errorMessage));
        }
    );
    return api;
};


export const refreshAccess = async () => {
    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken) {
        window.location.replace('/signin?msg=Votre session a expiré 79');
    }
    const data = { refreshToken };

    try {
        console.log('data', data)
        const result = await axios.create({
            baseURL: url, headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        }).post('/auth/refresh', data);
        const { accessToken, refreshToken: newRefreshToken } = result.data;
        Cookies.set('accessToken', accessToken);
        Cookies.set('refreshToken', newRefreshToken);
        setTimeout(() => location.reload(), 1000);
        return result;
    } catch (error) {
        console.log('blocked reload in refresh', error);
        return null;
    }
};
