//src/infrastructure/services/notifService.ts
import { AddressUseCase } from '../../application/useCases/address.useCase';
import { Address, AddressDTO, AddressView } from '../../domain/entities/Address';
import { AddressRepositoryBase } from '../../domain/repositoriesBase/AddressRepositoryBase';
import DI from '../../di/ioc';

interface AddressServiceI {
    addressForAddressView(address: Address): AddressView;
    updateAddress(formAddress: Address): Promise<Address>;
}

export class AddressService implements AddressServiceI {
    private addressRepository: AddressRepositoryBase;
    private addressUseCase: AddressUseCase;

    constructor({ addressRepository, addressUseCase }:
        { addressRepository: AddressRepositoryBase, addressUseCase: AddressUseCase }) {
        this.addressRepository = DI.resolve('addressUseCase');
        this.addressUseCase = addressUseCase;
        console.log('attente de la meilleure solution', addressRepository, this.addressUseCase)
    }

    addressForAddressView(address: Address): AddressView {
        return { ...address, addressString: `${address.address} ${address.zipcode} ${address.city}` }
    }

    async updateAddress(formAddress: AddressDTO): Promise<Address> {
        const addressList = await this.addressRepository.getAddresses()
        const addressFind = addressList.find((address: Address) => address.address === formAddress.address && address.zipcode === formAddress.zipcode && address.city === formAddress.city);
        if (!addressFind) return this.addressRepository.postAddress(formAddress)
        else return addressFind
    }
}
