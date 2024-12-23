import { User, Auth } from "../../types/class";
import { handleApiCall, useApi, useApiRefresh } from "./useApi";
import Cookies from 'js-cookie';

type UserDto = Partial<User>;
// type AuthDto = Partial<Auth>;

const api = useApi();
const dataType = "users";
const apiRefresh = useApiRefresh();


// USERS
export const getUsers = async (): Promise<User[]> => handleApiCall(() => api.get(dataType));

export const getUserById = async (id: number): Promise<User> => handleApiCall(() => api.get(`${dataType}/${id}`));

export const getUserMe = async (): Promise<User> => handleApiCall(() => api.get(`${dataType}/me`));

export const postUser = async (user: UserDto): Promise<User> => handleApiCall(() => api.post(dataType, user));

export const putUser = async (id: number, user: UserDto): Promise<User> => handleApiCall(() => api.put(`${dataType}/${id}`, user));

export const deleteUser = async (id: number): Promise<User> => handleApiCall(() => api.delete(`${dataType}/${id}`));

// AUTH
export const signIn = async (credentials: { email: string, password: string }): Promise<Auth> => handleApiCall(() => api.post('auth/signin', credentials));

export const signUp = async (user: any): Promise<Auth> => handleApiCall(() => api.post('auth/signup', user));


// export const getRefreshToken = async (): Promise<Auth> => handleApiCall(async () => {
//     const refreshToken = Cookies.get('refreshToken');
//     const data = { refreshToken };
//     const result = await apiRefresh.post('auth/refresh', data);
//     Cookies.set('accessToken', result.data.accessToken, { expires: 1 });
//     Cookies.set('refreshToken', result.data.refreshToken, { expires: 10 });
//     return result;
// });