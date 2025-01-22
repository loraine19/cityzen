import axios from "axios";
import Cookies from "js-cookie";
export interface Api {
    get: (url: string) => Promise<any>;
    delete: (url: string) => Promise<any>;
    put: (url: string, data?: any) => Promise<any>;
    post: (url: string, data: any, config?: any) => Promise<any>;
    patch: (url: string, data: any, config?: any) => Promise<any>;
}

const url = import.meta.env.PROD ? import.meta.env.VITE_FETCH_URL : import.meta.env.VITE_FETCH_URL_DEV

if (typeof axios === "undefined") { throw new Error("Axios must be loaded to use this module.") }

export const useApi = (isRefreshRequest?: boolean): Api => {
    const api = axios.create({ baseURL: url });
    api.interceptors.request.use((config) => {
        const token = isRefreshRequest ? Cookies.get('refreshToken') : Cookies.get('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (!error.response) {
                console.error("Network/Server error:", error);
                return Promise.resolve({ error: true, message: error.message })
            }
            const { status, data } = error.response;
            switch (status) {
                case 401:
                    { console.log("401 Unauthorized error:", data) };
                    await refreshAccess();
                    break;
                case 404:
                    if (data.message.includes("expired") || data.message.includes("jwt")) {
                        const refresh = await refreshAccess();
                        refresh ? setTimeout(() => location.reload(), 100) : window.location.replace("/signin");
                    } else if (data.message.includes("P2025")) {
                        return Promise.resolve({ error: true, message: 'aucune donnée trouvée' })
                    }
                    break;
                default:
                    return Promise.resolve({ error: true, message: error.message })
            }
            return Promise.resolve({ error: true, message: error.message })
        }
    );
    return api;
};


export const refreshAccess = async () => {
    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken) {
        window.location.replace('/signin');
        return null;
    }
    const data = { refreshToken };
    const apiRefresh = useApi(true);
    try {
        const result = await apiRefresh.post('auth/refresh', data);
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
