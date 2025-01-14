import { useState, useCallback } from "react";
import { User } from "../entities/User";
import { UserService } from "../repositories/UserRepository";
import { handleError } from "./useCaseUtils";

/**
 * Hook personnalisé pour gérer les utilisateurs.
 * const { user, updateUser, users, getUsers } = useUser();
 *
 * useEffect(() => {
 *   getUsers();
 * }, [getUsers]);
 *
 * const handleUpdateUser = async (newUser) => {
 *   await updateUser(newUser);
 * };
 *
 * if (loadingUser) {
 *   // Afficher un indicateur de chargement pour la mise à jour de l'utilisateur
 * }
 *
 * if (errorUser) {
 *   // Afficher un message d'erreur pour la récupération des utilisateurs
 * }
 *
 */



export const useUser = (): UseUserReturn => {
    const userService = new UserService();
    const [user, setUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [loadingUser, setLoadingUser] = useState(false);
    const [errorUser, setErrorUser] = useState<string | null>(null);
    const labelEnitity: string = 'utilisateur';


    const getUserMe = useCallback(async () => {
        setLoadingUser(true);
        try {
            const res = await userService.getUserMe();
            setUser(res);
        }
        catch (error) { handleError(error, `lors de chargement de l'${labelEnitity}`, setErrorUser) }
        finally { setLoadingUser(false) }
    }, [userService]);

    const getUsers = useCallback(async () => {
        setLoadingUser(true);
        try {
            const res = await userService.getUsers();
            setUsers(res);
        }
        catch (error) { handleError(error, `lors de chargement des ${labelEnitity}s`, setErrorUser) }
        finally { setLoadingUser(false) }
    }, [userService]);

    const updateUser = useCallback(async (newUser: User) => {
        setLoadingUser(true);
        try {
            const res = await userService.updateUser(newUser.id, newUser);
            setUser(res);
        }
        catch (error) { handleError(error, `lors de la mise à jour de l'${labelEnitity}`, setErrorUser) }
        finally { setLoadingUser(false); }
    }, [userService]);


    const deleteUser = useCallback(async (userId: number) => {
        setLoadingUser(true);
        try {
            await userService.deleteUser(userId)
        }
        catch (error) { handleError(error, `lors de la suppression de l'${labelEnitity}`, setErrorUser) }
        finally { setLoadingUser(false); }
    }, [userService]);

    return { getUserMe, users, getUsers, user, updateUser, deleteUser, loadingUser, errorUser };
}

interface UseUserReturn {
    getUserMe: () => Promise<void>;
    user: User | null;
    updateUser: (newUser: User) => Promise<void>;
    users: User[];
    getUsers: () => Promise<void>;
    deleteUser: (userId: number) => Promise<void>;
    loadingUser: boolean;
    errorUser: string | null;
}

