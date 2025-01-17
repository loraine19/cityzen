//src/useCases/useUser.tsx
import { useState, useCallback } from "react";
import { User } from "../../domain/entities/User";
import { handleError, } from "./useCaseUtils";
import { UserRepositoryImpl } from "../../infrastructure/repositoriesImpl/UserRespositoryImpl";
import { UserApi } from "../../infrastructure/providers/http/userApi";


export const useUser = () => {
    const service = new UserRepositoryImpl(new UserApi());
    const [user, setUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [usersModos, setUsersModos] = useState<User[]>([]);
    const [loadingUser, setLoadingUser] = useState(false);
    const [errorUser, setErrorUser] = useState<string | null>(null);
    const labelEntity = 'utilisateur';

    // src/domain/usecases/GetUsers.ts
    // import { UserRepository } from '../ports/UserRepository';

    // export class GetUsers {
    //   constructor(private readonly userRepository: UserRepository) {}

    //   async execute(): Promise<User> {
    //     return this.userRepository.getUsers();
    //   }
    // }

    const getUserMe = useCallback(async () => {
        setLoadingUser(true);
        try {
            const res = await service.getUserMe();
            setUser(res);
        }
        catch (error) {
            handleError(error, `lors de chargement de l'${labelEntity}`, setErrorUser)
        }
        finally { setLoadingUser(false) }
    }, [service]);


    const getUsers = useCallback(async () => {
        setLoadingUser(true);
        try {
            const res = await service.getUsers();
            setUsers(res);
        } catch (error) {
            handleError(error, `lors de chargement des ${labelEntity}s`, setErrorUser);
        } finally {
            setLoadingUser(false);
        }
    }, [service]);

    const getUsersModos = useCallback(async () => {
        setLoadingUser(true);
        try {
            const res = await service.getUserModos();
            setUsersModos(res);
        } catch (error) {
            handleError(error, `lors de chargement des ${labelEntity}s modos`, setErrorUser);
        } finally {
            setLoadingUser(false);
        }
    }, [service]);

    const updateUser = useCallback(async (newUser: User) => {
        setLoadingUser(true);
        try {
            const res = await service.updateUser(newUser);
            setUser(res);
        } catch (error) {
            handleError(error, `lors de la mise à jour de l'${labelEntity}`, setErrorUser);
        } finally {
            setLoadingUser(false);
        }
    }, [service]);

    const deleteUser = useCallback(async (userId: number) => {
        setLoadingUser(true);
        try {
            await service.deleteUser(userId);
            setUser(null);
        } catch (error) {
            handleError(error, `lors de la suppression de l'${labelEntity}`, setErrorUser);
        } finally {
            setLoadingUser(false);
        }
    }, [service]);

    return { getUserMe, users, getUsers, user, getUsersModos, usersModos, updateUser, deleteUser, loadingUser, errorUser };
}
