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
    constructor(message = "Ressource non trouvée") {
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
        this.api = axios.create({ baseURL });
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
        // remove this beacuse it's not used since I use httpOnly cookie
        return config;
    };

    private handleResponseError = async (error: any) => {
        const originalRequest = error.config || {};
        originalRequest._retry = originalRequest._retry || false;
        if (!error.response) {
            this.logWithTime('not api error');
            // if (!originalRequest._retry) {
            //     originalRequest._retry = true;
            //     if (!window.location.pathname.includes('/sign') && !window.location.pathname.includes('/reset')) {
            //         setTimeout(() => window.location.replace('/signin?msg=merci de vous connecter dans quelques instants'), 50000);
            return Promise.reject(new ApiError(error.code, error.message));
        }
        const { status, data } = error.response;
        console.error('complete error:', error.response);
        let newError = new ApiError(status, data.message);
        switch (status) {
            case 400:
                newError = new BadRequestError(data.message);
                break;
            case 401:
                if (!originalRequest._retry) {
                    originalRequest._retry = true;
                    const refreshSuccess = await this.refreshAccess();
                    if (refreshSuccess) {
                        this.logWithTime('token refreshed SUCCESS 401');
                        return this.api(originalRequest);
                    } else {
                        newError = new UnauthorizedError('Erreur lors du rafraîchissement du token');
                    }
                } else {
                    newError = new UnauthorizedError();
                }
                break;
            case 403:
                newError = new ForbiddenError();
                break;
            case 404:
                newError = new NotFoundError();
                break;
            case 409:
                newError = new ConflictError();
                break;
            case 500:
                newError = new ServerError();
                break;
        }
        console.error('newError:', newError);
        return Promise.reject(newError);
    };

    private refreshAccess = async (): Promise<boolean> => {
        const refreshToken = this.authService.getRefreshToken();
        if (window.location.pathname.includes('/sign')) return false;
        if (!refreshToken && !window.location.pathname.includes('/sign')) {
            window.location.replace('/signin?msg=merci de vous connecter');
        }
        try {
            const response = await axios.post(`${baseURL}/auth/refresh`, {},
                { withCredentials: true, headers: { Authorization: `Bearer ${refreshToken}` } });
            const { refreshToken: newRefreshToken } = response.data;
            this.authService.saveToken(newRefreshToken);
            return true;
        } catch (error) {
            console.error('error refresh:', error);
            if (!window.location.pathname.includes('/sign')) {
                setTimeout(() => window.location.replace('/signin?msg=merci de vous connecter'), 5000)
            }
            return false;
        }
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
