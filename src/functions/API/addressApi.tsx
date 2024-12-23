import { Address } from "../../types/class";
import { handleApiCall, useApi } from "./useApi";

type AddressDto = Partial<Address>;

const api = useApi();
const dataType = "addresses";

// ADDRESSES
export const getAddresses = async (): Promise<Address[]> => handleApiCall(() => api.get(dataType));

export const getAddressById = async (id: number): Promise<Address> => handleApiCall(() => api.get(`${dataType}/${id}`));

export const postAddress = async (address: AddressDto): Promise<Address> => handleApiCall(() => api.post(dataType, address));

export const putAddress = async (id: number, address: AddressDto): Promise<Address> => handleApiCall(() => api.put(`${dataType}/${id}`, address));

export const deleteAddress = async (id: number): Promise<Address> => handleApiCall(() => api.delete(`${dataType}/${id}`));
