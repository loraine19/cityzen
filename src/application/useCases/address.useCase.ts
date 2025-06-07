import { Address } from "../../domain/entities/Address";
import { AddressRepositoryBase } from "../../domain/repositoriesBase/AddressRepositoryBase";
import { AddressDTO } from "../../infrastructure/DTOs/AddressDTO";




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

export class GetAddressOpenUseCase {
    private addressRepository: AddressRepositoryBase;

    constructor({ addressRepository }: { addressRepository: AddressRepositoryBase }) {
        this.addressRepository = addressRepository;
    }
    public async execute(url: string, params: any): Promise<any> {
        return await this.addressRepository.getAddressesOpen(url, params)

    }
}

export class GetAddressUseCase {
    private addressRepository: AddressRepositoryBase;

    constructor({ addressRepository }: { addressRepository: AddressRepositoryBase }) {
        this.addressRepository = addressRepository;
    }
    public async execute(): Promise<any> {
        return await this.addressRepository.getAddresses()

    }
}

