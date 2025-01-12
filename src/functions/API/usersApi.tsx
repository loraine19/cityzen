import { User, Auth, UserDTO } from "../../types/class";
import { handleApiCall, useApi, } from "./useApi";


const api = useApi();
const dataType = "users";


// USERS
export const getUsers = async (): Promise<User[]> => handleApiCall(() => api.get(dataType));

export const getUserById = async (id: number): Promise<User> => handleApiCall(() => api.get(`${dataType}/${id}`));

export const getUserMe = async (): Promise<User> => handleApiCall(() => api.get(`${dataType}/me`));

export const getUserByEmail = async (email: string): Promise<User> => handleApiCall(() => api.get(`${dataType}/email/${email}`));

export const getUserModos = async (): Promise<User[]> => handleApiCall(() => api.get(`${dataType}/modos`));

export const postUser = async (user: UserDTO): Promise<User> => handleApiCall(() => api.post(dataType, user));

export const patchUser = async (id: number, user: UserDTO): Promise<User> => handleApiCall(() => api.patch(`${dataType}/${id}`, user));

export const deleteUser = async (id: number): Promise<User> => handleApiCall(() => api.delete(`${dataType}/${id}`));

// AUTH
export const signIn = async (credentials: { email: string, password: string }): Promise<Auth> => handleApiCall(() => api.post('auth/signin', credentials));

export const signInVerify = async (credentials: { email: string, password: string, verifyToken: string }): Promise<Auth> => handleApiCall(() => api.post('auth/signin/verify', credentials))

export const signUp = async (credentials: { email: string, password: string }): Promise<{ message: string }> => handleApiCall(() => api.post('auth/signup', credentials));

export const resetPassword = async (email: string): Promise<any> => handleApiCall(() => api.post('reset-password', { email }));

export const resetPasswordUpdate = async (email: string, password: string, token: string): Promise<any> => handleApiCall(() => api.post('reset-password/update', { email, password, token }));

// export const confirmEmail = async (email: string, token: string): Promise<any> => handleApiCall(() => api.post('confirm-email', { email, token }));



//NOTIF

export const getNotifs = async (): Promise<any> => handleApiCall(() => api.get(`notifs`));