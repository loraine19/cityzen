//src/infrastructure/services/notifService.ts

import { Address, AddressView } from '../../domain/entities/Address';


interface AddressServiceI {
    addressForAddressView(address: Address): AddressView;
}

export class AddressService implements AddressServiceI {


    constructor() { }

    addressForAddressView(address: Address): AddressView {
        return { ...address, addressString: `${address.address} ${address.zipcode} ${address.city}` }
    }

}
