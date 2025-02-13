import { AddressDTO } from "../../infrastructure/DTOs/AddressDTO";
import { Address } from "../entities/Address";


// ADDRESSES
export interface AddressRepositoryBase {
    getAddresses(): Promise<Address[]>;
    getAddressById(id: number): Promise<Address>;
    postAddress(address: AddressDTO): Promise<Address>;
}

