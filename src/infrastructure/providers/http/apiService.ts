import axios, { AxiosInstance } from "axios";
//import { AuthService } from "../../services/authService";

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
    getBaseUrl(): string;
}

export class ApiService implements ApiServiceI {
    private countRefresh: number = 0;
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({ baseURL, withCredentials: true });
        this.api.interceptors.request.use(this.handleRequest);
        this.api.interceptors.response.use(
            response => this.handleResponse(response),
            error => this.handleResponseError(error)
        );
    }
    getBaseUrl = () => baseURL;

    private logWithTime = (message: string) => {
        const now = new Date().toLocaleTimeString();
        const milliseconds = new Date().getMilliseconds();
        console.error(`[${now}+${milliseconds}] ${message}`);
    };

    private requestPending: { config: any, status: boolean, error: boolean, count: number } = {
        config: {},
        status: false,
        error: false,
        count: 0
    }

    private handleRequest = (config: any) => {
        document.cookie = "user=; path=/; max-age=0";
        this.logWithTime('handleRequest: ' + config);
        this.requestPending = {
            config: config,
            status: true,
            error: false,
            count: this.requestPending.count + 1
        }
        return config
    }

    private handleResponse = async (response: any): Promise<any> => {
        if (response && response.data) {
            this.requestPending.status = false;
            this.requestPending.error = false;
            this.requestPending.config = {};
        }
        return response
    }

    private handleResponseError = async (error: any) => {
        if (this.requestPending.status) {
            this.requestPending.status = true;
            this.requestPending.error = true
        }
        console.error('handleResponseError countRefresh:', this.countRefresh, 'error:', error);
        let newError = new ApiError(500, 'Une erreur est survenue');
        const originalRequest = error.config || {};
        originalRequest._retry = originalRequest._retry || false;
        if (!error.response) {
            this.logWithTime('not api error');
            // return Promise.reject(newError);
        }
        const status = error.status || error.response?.status || error.response?.data?.statuscode || 500
        let message = error.response?.data?.message || error.response?.message || '';
        message.includes('PRISMA ERROR') && (message = 'Erreur de données');

        newError = new ApiError(status, message);
        switch (status) {
            case 400:
                newError = new BadRequestError(message);
                break;
            case 401:
                this.logWithTime('token expired 401');
                this.countRefresh++;
                const refreshSuccess = await this.refreshAccess();
                if (refreshSuccess) {
                    this.logWithTime('token refreshed successfully');
                    return refreshSuccess
                }
                else newError = new UnauthorizedError(message);
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

        if (this.requestPending.count < 2 && status !== 401) {
            // Set request as pending and retry the request
            this.requestPending.status = true;
            this.requestPending.error = false;
            this.requestPending.count += 1;
            // Retry the original request
            return this.api.request(this.requestPending.config);

        }
        else return { error: newError }
        //  throw Error(newError.message || 'Une erreur est survenue');

    };

    //// REFRESH ACCESS
    refreshAccess = async (): Promise<boolean> => {
        const echec = () => {
            this.logWithTime('refreshAccess echec');
            setTimeout(() => {
                window.location.href = `/signin?msg=Session expirée, veuillez vous reconnecter`;
            }, 2000);
            this.countRefresh++
            return false
        }
        if (window.location.pathname.includes('/sign')) return echec();
        if (this.countRefresh > 2) return echec();
        if (this.countRefresh > 1) {
            this.logWithTime('refreshAccess already called, countRefresh: ' + this.countRefresh);
            return false;
        }
        const { data } = await axios.post(`${baseURL}/auth/refresh`, {}, { withCredentials: true });
        if (data?.message || data?.status === 201) {
            this.countRefresh = 0;
            this.logWithTime('refreshAccess message: ' + data.message);
            return true;
        }
        else return echec();
    }

    public async get(url: string): Promise<any> {
        try {
            const response = await this.api.get(url, { withCredentials: true });
            this.handleResponse(response)
            return response.data;
        } catch (error) {
            return this.handleResponseError(error);
        }
    }

    public async delete(url: string): Promise<any> {
        try {
            const response = await this.api.delete(url, { withCredentials: true });
            this.handleResponse(response)
            return response.data;
        } catch (error) {
            return this.handleResponseError(error);
        }
    }

    public async put(url: string, data?: any): Promise<any> {
        try {
            const response = await this.api.put(url, data, { withCredentials: true });
            this.handleResponse(response)
            return response.data;
        } catch (error) {
            return this.handleResponseError(error);
        }
    }

    public async post(url: string, data: any, config?: any): Promise<any> {
        try {
            const response = await this.api.post(url, data, { ...config, withCredentials: true });
            this.handleResponse(response)
            return response.data;
        } catch (error) {
            return this.handleResponseError(error);
        }
    }

    public async patch(url: string, data: any, config?: any): Promise<any> {
        try {
            const response = await this.api.patch(url, data, { ...config, withCredentials: true });
            this.handleResponse(response)
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
