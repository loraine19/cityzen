import { useEffect, useState } from "react";
import axios from 'axios';
import { User } from "../types/class";


export function Test() {


    useEffect(() => {
        const getUsers = async (): Promise<any> => {
            try {
                const result = await axios.get('https://back.imagindev-app.fr/users', { headers: {} })
                setUsers(result.data)
            }
            catch (error) { console.log(error) }
        }
        getUsers()
    }, [])


    const [users, setUsers] = useState<User[]>([])


    return (
        <div className="Body cyan">
            <main ><ul className="flex flex-col items-center gap-4 h-full p-12">
                {users && users.map((user) => {
                    return (
                        <li key={user.id}>
                            {user.email}
                        </li>
                    );
                })}
            </ul>
            </main>
        </div>
    );
}