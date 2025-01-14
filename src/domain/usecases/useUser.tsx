import { useState } from "react";
import { User } from "../entities/User";
import { UserService } from "../../data/repositories/UserRepository";

export const useUser = () => {
    const userService = new UserService();
    const [user, setUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateUser = async (newUser: User) => {
        setLoading(true);
        try {
            const res = await userService.updateUser(newUser.id, newUser);
            setUser(res);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    }
    const getUsers = async () => {
        setLoading(true);
        try {
            const res = await userService.getUsers();
            setUsers(res);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    }

    return { user, updateUser, users, getUsers, loading, error }
}