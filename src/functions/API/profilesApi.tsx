import { User, Auth } from "../../types/class";
import { useApi } from "./useApi";

type UserDto = Partial<User>;
// type AuthDto = Partial<Auth>;

const api = useApi();
const dataType = "users";

const handleApiCall = async (apiCall: () => Promise<any>) => {
    try {
        const { data } = await apiCall();
        return data;
    } catch (error) {
        console.error(error);
    }
};


// USERS
export const getUsers = async (): Promise<User[]> => handleApiCall(() => api.get(dataType));

export const getUserById = async (id: number): Promise<User> => handleApiCall(() => api.get(`${dataType}/${id}`));

export const postUser = async (user: UserDto): Promise<User> => handleApiCall(() => api.post(dataType, user));

export const putUser = async (id: number, user: UserDto): Promise<User> => handleApiCall(() => api.put(`${dataType}/${id}`, user));

export const deleteUser = async (id: number): Promise<User> => handleApiCall(() => api.delete(`${dataType}/${id}`));

// AUTH
export const signIn = async (credentials: { email: string, password: string }): Promise<Auth> => handleApiCall(() => api.post('auth/signin', credentials));

export const signUp = async (user: any): Promise<Auth> => handleApiCall(() => api.post('auth/signup', user));

export const refreshToken = async (refreshtoken: string): Promise<Auth> => handleApiCall(() => api.post('auth/refresh', { refreshtoken }));