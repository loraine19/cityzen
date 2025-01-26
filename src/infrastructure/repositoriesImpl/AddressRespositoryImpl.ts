//src/infrastructure/repositoriesImpl/UserRespositoryImpl.tsx
import { AddressRepositoryBase } from "../../domain/repositoriesBase/AddressRepositoryBase";
import { Address, AddressDTO } from "../../domain/entities/Address";

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
        console.log(address)

        return this.addressData.postAddress(address);
    }

}
