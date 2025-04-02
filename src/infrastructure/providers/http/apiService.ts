import axios, { AxiosInstance } from "axios";
import { AuthService } from "../../services/authService";

const baseURL = import.meta.env.PROD ? import.meta.env.VITE_FETCH_URL : import.meta.env.VITE_FETCH_URL_DEV;

class ApiError extends Error {
    constructor(public status: number | string, message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

class BadRequestError extends ApiError {
    constructor(message = "Mauvaise requête") {
        super(400, message);
    }
}

class UnauthorizedError extends ApiError {
    constructor(message = "Non autorisé") {
        super(401, message);
    }
}

class ForbiddenError extends ApiError {
    constructor(message = "Accès refusé") {
        super(403, message);
    }
}

class NotFoundError extends ApiError {
    constructor(message = "La ressource demandée n'existe pas ou plus") {
        super(404, message);
    }
}

class ConflictError extends ApiError {
    constructor(message = "Conflit de ressources") {
        super(409, message);
    }
}

class ServerError extends ApiError {
    constructor(message = "Erreur serveur") {
        super(500, message);
    }
}


export type ApiServiceI = {
    get(url: string): Promise<any>;
    delete(url: string): Promise<any>;
    put(url: string, data?: any): Promise<any>;
    post(url: string, data?: any, config?: any): Promise<any>;
    patch(url: string, data?: any, config?: any): Promise<any>;
    createFormData(element: any): FormData;
}

export class ApiService implements ApiServiceI {
    private api: AxiosInstance;
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
        this.api = axios.create({ baseURL, withCredentials: true });
        this.api.interceptors.request.use(this.handleRequest);
        this.api.interceptors.response.use(
            response => response,
            error => this.handleResponseError(error)
        );
    }

    private logWithTime = (message: string) => {
        const now = new Date().toLocaleTimeString();
        const milliseconds = new Date().getMilliseconds();
        console.error(`[${now}+${milliseconds}] ${message}`);
    };

    private handleRequest = (config: any) => {
        // implemente here cookies filter 
        return config;

    };

    private handleResponseError = async (error: any) => {
        let newError = new ApiError(500, 'Serveur non disponible, veuillez réessayer plus tard');
        const originalRequest = error.config || {};
        originalRequest._retry = originalRequest._retry || false;
        if (!error.response) {
            this.logWithTime('not api error');
            return Promise.reject(newError);
        }
        const status = error.status || error.response?.status || error.response?.data?.statuscode || 500
        const message = error.response?.data?.message || error.response?.message || '';
        console.error('complete error:', error);
        newError = new ApiError(status, message);
        switch (status) {
            case 400:
                newError = new BadRequestError(message);
                break;
            case 401:
                if (!originalRequest._retry) {
                    originalRequest._retry = true;
                    const refreshSuccess = await this.refreshAccess();
                    if (refreshSuccess) {
                        this.logWithTime('token refreshed SUCCESS 401');
                        return this.api(originalRequest);
                    } else {
                        newError = new UnauthorizedError(message || 'Erreur lors du rafraîchissement du token');
                    }
                } else {
                    newError = new UnauthorizedError();
                }
                break;
            case 403:
                newError = new ForbiddenError(message);
                break;
            case 404:
                newError = new NotFoundError();
                break;
            case 409:
                newError = new ConflictError(message);
                break;
            case 500:
                newError = new ServerError();
                break;
        }
        //  this.errorService.handleErrors(newError);
        console.error('newError:', newError, newError.message);
        //  return Promise.reject(newError);
        return { data: { error: newError } };
    };

    refreshAccess = async (): Promise<boolean> => {

        const refreshToken = this.authService.getRefreshToken();
        const errorRedirect = (message?: string) => {
            alert(refreshToken + '' + message)
            //  this.authService.clearCookies();
            // setTimeout(() => { window.location.replace(`/signin?msg=${message ?? 'Merci de vous re-identifier'}`) }, 2000)
        }
        if (window.location.pathname.includes('/sign') || window.location.pathname.includes('/motdepass')) return false;
        if (!refreshToken && !window.location.pathname.includes('/sign')) errorRedirect('notoken');
        const { data } = await axios.post(`${baseURL}/auth/refresh`, {},
            { withCredentials: true, headers: { Authorization: `Bearer ${refreshToken}` } });
        if (!data.refreshToken) errorRedirect('notoken in data');
        const saved = this.authService.saveToken(data.refreshToken);
        if (!saved) {
            this.logWithTime('token not saved');
            errorRedirect();
            return false;
        }
        else this.logWithTime('token saved');
        return true
    };

    public async get(url: string): Promise<any> {
        try {
            const response = await this.api.get(url, { withCredentials: true });
            return response.data;
        } catch (error) {
            return this.handleResponseError(error);
        }
    }

    public async delete(url: string): Promise<any> {
        try {
            const response = await this.api.delete(url, { withCredentials: true });
            return response.data;
        } catch (error) {
            return this.handleResponseError(error);
        }
    }

    public async put(url: string, data?: any): Promise<any> {
        try {
            const response = await this.api.put(url, data, { withCredentials: true });
            return response.data;
        } catch (error) {
            return this.handleResponseError(error);
        }
    }

    public async post(url: string, data: any, config?: any): Promise<any> {
        try {
            const response = await this.api.post(url, data, { ...config, withCredentials: true });
            return response.data;
        } catch (error) {
            return this.handleResponseError(error);
        }
    }

    public async patch(url: string, data: any, config?: any): Promise<any> {
        try {
            const response = await this.api.patch(url, data, { ...config, withCredentials: true });
            return response.data;
        } catch (error) {
            return this.handleResponseError(error);
        }
    }

    public createFormData = (element: any): FormData => {
        const formData = new FormData();
        for (const [key, value] of Object.entries(element)) {
            if (value instanceof File) {
                formData.append(key, value);
            } else if (value !== undefined && value !== null) {
                (typeof value === 'object') ?
                    formData.append(key, JSON.stringify(value))
                    : formData.append(key, value.toString());
            }
        }
        return formData;
    };
}
