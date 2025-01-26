import axios from "axios";
import Cookies from "js-cookie";
import { ApiError } from "./utilsApi";
import { AuthService } from "../../../infrastructure/services/authService";

export interface Api {
    get: (url: string) => Promise<any>;
    delete: (url: string) => Promise<any>;
    put: (url: string, data?: any) => Promise<any>;
    post: (url: string, data: any, config?: any) => Promise<any>;
    patch: (url: string, data: any, config?: any) => Promise<any>;
}

const baseURL = import.meta.env.PROD ? import.meta.env.VITE_FETCH_URL : import.meta.env.VITE_FETCH_URL_DEV;
const authService = new AuthService();

if (typeof axios === "undefined") {
    throw new Error("Axios must be loaded to use this module");
}

const logWithTime = (message: string) => {
    const now = new Date().toLocaleTimeString();
    const milliseconds = new Date().getMilliseconds();
    console.log(`[${now}+${milliseconds}] ${message}`);
};

export const useApi = (): Api => {
    const api = axios.create({ baseURL });
    let isRefreshing = false;
    api.interceptors.request.use((config) => {
        const token = Cookies.get('accessToken')?.trim() || localStorage.getItem('accessToken')?.trim();
        if (token) { config.headers.Authorization = `Bearer ${token}` }
        return config;
    });

    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (!error.response) {
                logWithTime('not api error');
                if (!originalRequest._retry) {
                    originalRequest._retry = true;
                    if (!window.location.pathname.includes('/signin')) {
                        window.location.replace('/signin?msg=merci de vous connecter dans quelques instants');
                    }
                    return Promise.reject(new ApiError(error.code, error.message));
                }
            }
            const { status, data } = error.response;
            console.error('complete error:', error.response);
            let errorMessage = "Une erreur s'est produite";
            switch (status) {
                case 400:
                    errorMessage = 'Mauvaise requête.';
                    break;
                case 401:
                    if (!originalRequest._retry && !isRefreshing) {
                        originalRequest._retry = true;
                        isRefreshing = true;
                        try {
                            const refreshSuccess = await refreshAccess();
                            if (refreshSuccess) {
                                logWithTime('token refreshed SUCCESS 401');
                                return api(originalRequest);
                            } else {
                                logWithTime('token refresh FAILED 401');
                                errorMessage = 'Erreur de rafraîchissement du token';
                            }
                        } finally {
                            isRefreshing = false;
                        }
                    } else {
                        errorMessage = 'Rafraîchissement du token en cours...';
                    }
                    break;
                case 403:
                    errorMessage = 'Accès refusé.';
                    break;
                case 404:
                    data.message.includes("Bad Request") && (errorMessage = 'Mauvaise requête.');
                    errorMessage = 'Ressource non trouvée.';
                    break;
                case 409:
                    errorMessage = 'Conflit de ressources.';
                    break;
                case 500:
                    errorMessage = 'Erreur serveur.';
                    break;
                default:
                    errorMessage = "Une erreur inconnue s'est produite";
            }
            return Promise.reject(new ApiError(status, errorMessage));
        }
    )
    return api;
}

export const refreshAccess = async (): Promise<boolean> => {
    let refreshToken = Cookies.get('refreshToken') || localStorage.getItem('refreshToken');
    if (window.location.pathname.includes('/sign')) return false;
    if (!refreshToken && !window.location.pathname.includes('/signin')) {
        window.location.replace('/signin?msg=merci de vous connecter');
    }
    try {
        const response = await axios.post(`${baseURL}/auth/refresh`, { refreshToken },
            { headers: { Authorization: `Bearer ${refreshToken}` } });
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        authService.saveToken(accessToken, newRefreshToken);
        return true;
    } catch (error) {
        if (!window.location.pathname.includes('/signin')) {
            setTimeout(() => window.location.replace('/signin?msg=merci de vous connecter'), 5000)
        }
        return false;
    }
};
