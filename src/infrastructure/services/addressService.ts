//src/infrastructure/services/notifService.ts
import { Address, AddressView } from '../../domain/entities/Address';

interface AddressServiceI {
    addressForAddressView(address: Address): AddressView;
}

export class AddressService implements AddressServiceI {
    constructor() { }

    addressForAddressView(address: Address): AddressView {

        const newAddress: AddressView = {
            ...address,
            addressString: `${address.address} ${address.zipcode} ${address.city}`
        }
        return newAddress;
    }
}
