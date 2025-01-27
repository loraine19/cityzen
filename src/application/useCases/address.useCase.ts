import { Address, AddressDTO } from "../../domain/entities/Address";
import { AddressRepositoryBase } from "../../domain/repositoriesBase/AddressRepositoryBase";


export class AddressUseCase {
    private addressRepository: AddressRepositoryBase;

    constructor({ addressRepository }: { addressRepository: AddressRepositoryBase }) {
        this.addressRepository = addressRepository;
    }

    public async getAddresses(): Promise<Address[]> {
        return this.addressRepository.getAddresses();
    }

    public async getAddressById(id: number): Promise<Address> {
        return this.addressRepository.getAddressById(id);
    }

    public async postAddress(address: AddressDTO): Promise<Address> {
        return this.addressRepository.postAddress(address);
    }

}