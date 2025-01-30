import { Address, AddressDTO } from "../../domain/entities/Address";
import { AddressRepositoryBase } from "../../domain/repositoriesBase/AddressRepositoryBase";




export class UpdateAddressUseCase {
    private addressRepository: AddressRepositoryBase;

    constructor({ addressRepository }: { addressRepository: AddressRepositoryBase }) {
        this.addressRepository = addressRepository;
    }
    public async execute(formAddress: AddressDTO): Promise<Address> {
        const addressList = await this.addressRepository.getAddresses()
        const addressFind = addressList.find((address: Address) => address.address === formAddress.address && address.zipcode === formAddress.zipcode && address.city === formAddress.city);
        if (!addressFind) return this.addressRepository.postAddress(formAddress)
        else return addressFind
    }
}


