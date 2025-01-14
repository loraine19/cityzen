import { Address, AddressDTO } from "../../domain/entities/Address";
import { handleApiCall, useApi } from "../api/useApi";

const api = useApi();
const dataType = "addresses";

// ADDRESSES
export interface AddressRepository {
    getAddresses(): Promise<Address[]>;
    getAddressById(id: number): Promise<Address>;
    postAddress(address: AddressDTO): Promise<Address>;
    putAddress(id: number, address: AddressDTO): Promise<Address>;
    deleteAddress(id: number): Promise<Address>;
}

export class AddressService implements AddressRepository {
    async getAddresses(): Promise<Address[]> {
        return handleApiCall(() => api.get(dataType));
    }

    async getAddressById(id: number): Promise<Address> {
        return handleApiCall(() => api.get(`${dataType}/${id}`));
    }

    async postAddress(address: AddressDTO): Promise<Address> {
        return handleApiCall(() => api.post(dataType, address));
    }

    async putAddress(id: number, address: AddressDTO): Promise<Address> {
        return handleApiCall(() => api.put(`${dataType}/${id}`, address));
    }

    async deleteAddress(id: number): Promise<Address> {
        return handleApiCall(() => api.delete(`${dataType}/${id}`));
    }
}