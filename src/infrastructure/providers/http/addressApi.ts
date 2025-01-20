///src/infrastructure/providers/http/authApi.ts
import { Address, AddressDTO } from "../../../domain/entities/Address";
import { Api, useApi } from "./UseApi";
import { handleApiCall } from "./utilsApi";

export class AddressApi {
    private readonly api: Api;
    private readonly dataType: string = 'addresses';

    constructor() { this.api = useApi() }

    async getAddresses(): Promise<Address[]> {
        return handleApiCall(() => this.api.get(this.dataType));
    }

    async getAddressById(id: number): Promise<Address> {
        return handleApiCall(() => this.api.get(`${this.dataType}/${id}`));
    }

    async postAddress(address: AddressDTO): Promise<Address> {
        return handleApiCall(() => this.api.post(this.dataType, address));
    }

}


