import { useMutation, useQuery } from '@tanstack/react-query';
import { AddressUseCase } from '../../application/useCases/address.useCase';
import { Address, AddressDTO } from '../../domain/entities/Address';
import { AddressService } from '../../infrastructure/services/addressService';


export const addressViewModel = ({ addressUseCase }: { addressUseCase: AddressUseCase }) => {
    return () => {
        //// TS CALL ADDRESSES
        const { data: addresses, error: errorAddresses, isLoading: loadingAddresses } = useQuery({
            queryKey: ['addresses'],
            queryFn: async () => await addressUseCase.getAddresses()
        })
        return { addresses, errorAddresses, loadingAddresses };
    }
}

export const postAddressViewModel = ({ addressUseCase }: { addressUseCase: AddressUseCase }) => {
    return () => {
        //// TS MUTATION
        const { data: address, error: errorAddress, isSuccess: successAddress, mutateAsync: postAddress } = useMutation({
            mutationKey: ['postAddress'],
            mutationFn: async (data: AddressDTO) => await addressUseCase.postAddress(data)
        })
        return { address, errorAddress, successAddress, postAddress };
    }
}


export const addressIdViewModel = ({ addressUseCase, addressService }: { addressUseCase: AddressUseCase, addressService: AddressService }) => {
    return (id: number) => {
        //// TS CALL EVENT BY ID
        const { data, isLoading: loadingAddress, error: errorAddress } = useQuery({
            queryKey: ['addressById', id],
            queryFn: async () => await addressUseCase.getAddressById(id),
        })
        //// RETURN FORMATTED DATA

        const addressById = data ? addressService.addressForAddressView(data) : {} as Address;
        return { addressById, loadingAddress, errorAddress }
    }
}