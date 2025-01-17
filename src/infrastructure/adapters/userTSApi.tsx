//src/infrastructure/api/userApi.tsx
import { useQuery } from "@tanstack/react-query";
import { Api, useApi } from "../providers/http/useApi";
import { User, UserDTO } from "../../domain/entities/User";


export class UserTSApi {
    private readonly api: Api;
    private readonly dataType: string = 'users';

    constructor() {
        this.api = useApi();
    }

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

    async getUserMe(): Promise<User> {
        const { data } = useQuery({
            queryKey: [`${this.dataType}/me`],
            queryFn: async () => {
                const response = await this.api.get(`${this.dataType}/me`);
                return response.data;
            }
        })
        return data;
    }

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

