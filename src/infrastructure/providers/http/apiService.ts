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
    private count: number = 0;
    private api: AxiosInstance;
    //  private authService: AuthService;
    // private _refreshingToken: boolean = (this.count > 1) ? true : false;

    constructor() {
        //   this.authService = new AuthService();
        this.api = axios.create({ baseURL, withCredentials: true });
        this.api.interceptors.request.use(this.handleRequest);
        this.api.interceptors.response.use(
            response => response,
            error => this.handleResponseError(error)
        );
    }
    getBaseUrl = () => baseURL;

    private logWithTime = (message: string) => {
        const now = new Date().toLocaleTimeString();
        const milliseconds = new Date().getMilliseconds();
        console.error(`[${now}+${milliseconds}] ${message}`);
    };

    private handleRequest = (config: any) => {
        // Remove user cookies from the request headers if present
        if (config.headers) {
            // Remove Cookie header if present
            delete config.headers['Cookie'];
            delete config.headers['cookie'];
        }
        // Remove cookies property if present
        if (config.cookies) {
            delete config.cookies;
        }
        return config
    }

    private handleResponseError = async (error: any) => {
        this.count++;
        console.error('handleResponseError count:', this.count, 'error:', error);
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

        this.count = 0;
        throw Error(newError.message || 'Une erreur est survenue');
    };

    //// REFRESH ACCESS
    refreshAccess = async (): Promise<boolean> => {
        const echec = () => {
            this.logWithTime('refreshAccess echec');
            setTimeout(() => {
                window.location.href = `/signin?msg=Session expirée, veuillez vous reconnecter`;
            }, 2000);
            return false
        }
        if (window.location.pathname.includes('/sign')) return echec();
        if (this.count > 2) return echec();
        if (this.count > 1) {
            this.logWithTime('refreshAccess already called, count: ' + this.count);
            return false;
        }
        this.count++


        const { data } = await axios.post(`${baseURL}/auth/refresh`, {}, { withCredentials: true });
        if (data?.message || data?.status === 201) {
            this.count = 0;
            this.logWithTime('refreshAccess message: ' + data.message);
            return true;
        }
        else return echec();

    }

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
