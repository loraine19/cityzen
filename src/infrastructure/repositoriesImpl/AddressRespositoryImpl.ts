//src/infrastructure/repositoriesImpl/UserRespositoryImpl.tsx
import { AddressRepositoryBase } from "../../domain/repositoriesBase/AddressRepositoryBase";
import { Address } from "../../domain/entities/Address";
import { AddressDTO } from "../DTOs/AddressDTO";

interface IData extends AddressRepositoryBase {
    api: any;
    dataType: any;
}

export class AddressRepositoryImpl implements AddressRepositoryBase {
    private addressData: IData;
    constructor({ addressData }: { addressData: IData }) { this.addressData = addressData }

    public async getAddresses(): Promise<Address[]> {
        return this.addressData.getAddresses();
    }

    public async getAddressById(id: number): Promise<Address> {
        return this.addressData.getAddressById(id);
    }

    public async postAddress(address: AddressDTO): Promise<Address> {
        return this.addressData.postAddress(address);
    }

    public async getAddressesOpen(url: string, params: any): Promise<any> {
        return this.addressData.getAddressesOpen(url, params);
    }

}
