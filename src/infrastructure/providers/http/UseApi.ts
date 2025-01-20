//src/infrastructure/api/useApi.tsx
import axios from "axios";
import Cookies from "js-cookie";
import { FETCH_URL } from "../../../../env.local";

export interface Api {
    get: (url: string) => Promise<any>;
    delete: (url: string) => Promise<any>;
    put: (url: string, data?: any) => Promise<any>;
    post: (url: string, data: any, config?: any) => Promise<any>;
    patch: (url: string, data: any, config?: any) => Promise<any>;
}

const url = FETCH_URL
let refreshToken = Cookies.get('refreshToken')

if (typeof axios === "undefined") {
    throw new Error("Axios doit être chargé pour utiliser ce module.");
}



const createApi = (accessToken: string): Api => {
    const headers = { Authorization: `Bearer ${accessToken}` };
    const api = axios.create({ baseURL: url, headers });

    api.interceptors.request.use((config) => {
        // You can add logic to modify the request config here
        return config;
    });

    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            console.error(error);
            if (error.response && error.response.status === 401) {
                console.log("401 error.response:", error.response);
                await refreshAccess();
            }
            if (error.response && error.response.status === 404) {
                console.log("404 error.response:", error.response);
                if (
                    error.response.data.message.includes("expired") ||
                    error.response.data.message.includes("jwt")
                ) {
                    for (let i = 0; i < 1; i++) {
                        console.log("Trying refresh access:", i);
                        const ok = await refreshAccess();
                        if (ok) {
                            setTimeout(() => {
                                location.reload();
                            }, 100);
                        } else {
                            // Redirect to signin if refresh fails
                            window.location.replace("/signin");
                        }
                    }
                }
                if (error.response.data.message.includes("P2025")) {
                    return null; // Handle specific error (replace with your logic)
                }
            }
            return Promise.reject(error);
        }
    );

    return api;
};

export const useApi = (): Api => {
    let accessToken = Cookies.get("accessToken");
    if (!accessToken) {
        accessToken = refreshToken;
        Cookies.set("accessToken", accessToken || "echec");
    }

    return createApi(accessToken || "");
};

export const useApiRefresh = (): Api => {
    const headersRefresh = { 'Authorization': 'Bearer ' + refreshToken }
    const api = axios.create({ baseURL: url, headers: headersRefresh })
    api.interceptors.request.use((config) => { return config })
    api.interceptors.response.use(
        (response) => response,
        (error) => { console.log(error); return Promise.reject(error) });
    return api;
}


export const refreshAccess = async () => {
    let refreshToken = Cookies.get('refreshToken');
    !refreshToken && window.location.replace('/signin');
    const data = { refreshToken };
    const apiRefresh = useApiRefresh();
    let result;
    try {
        result = await apiRefresh.post('auth/refresh', data);
        const newAccessToken = result.data.accessToken;
        const newRefreshToken = result.data.refreshToken;
        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        Cookies.set('accessToken', newAccessToken);
        Cookies.set('refreshToken', newRefreshToken);
        setTimeout(() => { location.reload() }, 1000);
        return result;
    } catch (error) {
        console.log('blocked reload in refresh', error);
        // setTimeout(() => { window.location.replace('/signin') }, 1000);
        return null;
    }
}






