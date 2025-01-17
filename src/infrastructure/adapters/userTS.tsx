//src/infrastructure/api/userApi.tsx
import { useQuery } from "@tanstack/react-query";
import { Api, useApi } from "../providers/http/useApi";
import { User, UserDTO } from "../../domain/entities/User";
import { UserApi } from "../providers/http/userApi";

//import { useReactTable } from '@tanstack/react-table';

export class UserTS {
    private readonly api: Api;
    private readonly userApi: any;
    private readonly dataType: string = 'users';

    constructor() { this.api = useApi(), this.userApi = new UserApi() }


    async getUsers(): Promise<User> {

        const { data } = useQuery({
            queryKey: [this.dataType],
            queryFn: async () => {
                const response = await this.api.get(this.dataType);
                return response.data;
            },
        });
        return data;
    }

    async getUsersModos(): Promise<User[]> {
        const { data } = useQuery({
            queryKey: [`${this.dataType}/modos`],
            queryFn: async () => {
                const response = await this.api.get(`${this.dataType}/modos`);
                return response.data;
            },
        });
        return data;
    }

    // async getUserMe() {
    //     const res = useQuery({
    //         queryKey: ['userMe'],
    //         queryFn: await this.userApi.getUserMe(),
    //     });
    //     const { data, error, isLoading } = res
    //     console.log('Data:', data, 'Error:', error, 'isLoading:', isLoading);
    //     return { data, error, isLoading }
    // }

    async deleteUser(id: number): Promise<void> {
        const { data } = useQuery({
            queryKey: [`${this.dataType}/${id}`],
            queryFn: async () => {
                const response = await this.api.delete(`${this.dataType}/${id}`);
                return response.data;
            }
        });
        return data
    }

    async patchUser(dataDTO: UserDTO): Promise<User> {
        const { data } = useQuery({
            queryKey: [`${this.dataType}`],
            queryFn: async () => {
                const response = await this.api.patch(`${this.dataType}`, dataDTO);
                return response.data;
            }
        });
        return data;
    }

    async postUser(dataDTO: UserDTO): Promise<User> {
        const { data } = useQuery({
            queryKey: [`${this.dataType}`],
            queryFn: async () => {
                const response = await this.api.post(`${this.dataType}`, dataDTO);
                return response.data;
            }
        });
        return data;
    }


}

