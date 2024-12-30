import { User, Auth, UserDTO } from "../../types/class";
import { handleApiCall, useApi, } from "./useApi";


const api = useApi();
const dataType = "users";


// USERS
export const getUsers = async (): Promise<User[]> => handleApiCall(() => api.get(dataType));

export const getUserById = async (id: number): Promise<User> => handleApiCall(() => api.get(`${dataType}/${id}`));

export const getUserMe = async (): Promise<User> => handleApiCall(() => api.get(`${dataType}/me`));

export const postUser = async (user: UserDTO): Promise<User> => handleApiCall(() => api.post(dataType, user));

export const patchUser = async (id: number, user: UserDTO): Promise<User> => handleApiCall(() => api.patch(`${dataType}/${id}`, user));

export const deleteUser = async (id: number): Promise<User> => handleApiCall(() => api.delete(`${dataType}/${id}`));

// AUTH
export const signIn = async (credentials: { email: string, password: string }): Promise<Auth> => handleApiCall(() => api.post('auth/signin', credentials));

export const signUp = async (user: any): Promise<Auth> => handleApiCall(() => api.post('auth/signup', user));

