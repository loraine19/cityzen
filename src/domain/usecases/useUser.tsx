import { useState, useCallback } from "react";
import { User } from "../entities/User";
import { UserService } from "../repositories/UserRepository";
import { handleError } from "./useCaseUtils";

/**
 * Hook personnalisé pour gérer les utilisateurs.
 
 * @returns {Object} - Un objet contenant les informations et les fonctions liées aux utilisateurs.
 * @property {User | null} user - L'utilisateur actuel.
 * @property {Function} updateUser - Fonction pour mettre à jour un utilisateur.
 * @property {User[]} users - La liste des utilisateurs.
 * @property {Function} getUsers - Fonction pour récupérer la liste des utilisateurs.
 * @property {boolean} loadingUser - Indicateur de chargement pour la mise à jour de l'utilisateur.
 * @property {string | null} errorUser - Message d'erreur en cas de problème lors de la mise à jour de l'utilisateur.
 *
 * @example
 * const { user, updateUser, users, getUsers, loadingUpdate, loadingGet, errorUpdate, errorGet } = useUser();
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


/**
 * Exemple d'utilisation du hook useUser dans un composant fonctionnel.
 *
 * @example
 * const MyComponent = () => {
 *   const { user, getUserMe, users, getUsers, updateUser, deleteUser, loadingUser, errorUser } = useUser();
 *
 *   useEffect(() => {
 *     getUserMe();
 *   }, [getUserMe]);
 *
 *   const handleUpdateUser = async (newUser) => {
 *     await updateUser(newUser);
 *   };
 *
 *   const handleDeleteUser = async (userId) => {
 *     await deleteUser(userId);
 *   };
 *
 *   if (loadingUser) {
 *     return <div>Chargement...</div>;
 *   }
 *
 *   if (errorUser) {
 *     return <div>Erreur: {errorUser}</div>;
 *   }
 *
 *   return (
 *     <div>
 *       <h1>Utilisateur actuel</h1>
 *       {user ? <div>{user.name}</div> : <div>Aucun utilisateur</div>}
 *       <h2>Liste des utilisateurs</h2>
 *       <ul>
 *         {users.map((u) => (
 *           <li key={u.id}>{u.name}</li>
 *         ))}
 *       </ul>
 *     </div>
 *   );
 * };
import React, { createContext, useContext, useEffect } from "react";
import { useUser } from "./useUser";

const UserContext = createContext<UseUserReturn | undefined>(undefined);

const user = useUser();

export const UserProvider: React.FC = ({ children }) => {
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUserContext = (): UseUserReturn => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};

// Example of using the context in a component
const MyComponent = () => {
    const { user, getUserMe, users, getUsers, updateUser, deleteUser, loadingUser, errorUser } = useUserContext();

    useEffect(() => {
        getUserMe();
    }, [getUserMe]);

    const handleUpdateUser = async (newUser: User) => {
        await updateUser(newUser);
    };

    const handleDeleteUser = async (userId: number) => {
        await deleteUser(userId);
    };

    if (loadingUser) {
        return <div>Chargement...</div>;
    }

    if (errorUser) {
        return <div>Erreur: {errorUser}</div>;
    }

    return (
        <div>
            <h1>Utilisateur actuel</h1>
            {user ? <div>{user.name}</div> : <div>Aucun utilisateur</div>}
            <h2>Liste des utilisateurs</h2>
            <ul>
                {users.map((u) => (
                    <li key={u.id}>{u.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default MyComponent;
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

