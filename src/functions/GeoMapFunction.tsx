import { setKey, setLanguage, setRegion, fromAddress, fromLatLng } from "react-geocode";
import { AddressDTO } from "../types/class"
import { GM_API_KEY } from "../../env.local";

setLanguage("fr");
setRegion("fr");
setKey(GM_API_KEY);
console.log('GM_API_KEY', GM_API_KEY)

// Get latitude & longitude from address.
export const GetAddressGps = async (address: string) => {
    try {
        let addressGps = { lat: 0, lng: 0 }
        const { results } = await fromAddress(address);
        addressGps = results[0].geometry.location;
        return (addressGps)
    }
    catch (error) { console.log(error) }
}


export const GetAddressDataByGps = async (lat: number, lng: number) => {
    if (lat !== 0 && lng !== 0) {
        try {
            let addressString = {} as any
            const { results } = await fromLatLng(lat, lng);
            addressString = {
                address: results[0].address_components[0]?.long_name + " " + results[0].address_components[1].long_name,
                city: results[0].address_components[2]?.long_name,
                zipcode: (results[0].address_components[6]?.long_name),
                lat: results[0].geometry.location.lat,
                lng: results[0].geometry.location.lng,
            }
            return (addressString)
        }
        catch (error) { console.log(error) }
    }
}

export const GetAddressObject = async (address: string) => {

    try {
        let addressObject = {} as AddressDTO
        const { results } = await fromAddress(address)
        addressObject = {
            address: results[0].address_components[0]?.long_name + " " + results[0].address_components[1].long_name,
            city: results[0].address_components[2]?.long_name,
            zipcode: (results[0].address_components[6]?.long_name),
            lat: results[0].geometry.location.lat,
            lng: results[0].geometry.location.lng,
        }
        console.log('formated addres object for db', addressObject)
        return (addressObject)
    }
    catch (error) { console.log(error) }
}


// // Get address fr

// om latitude & longitude.
// fromLatLng(48.8583701, 2.2922926)
//     .then(({ results }) => {
//         const { lat, lng } = results[0].geometry.location;
//         console.log(lat, lng);
//     })
//     .catch(console.error);




// // Get latitude & longitude from place_id.
// fromPlaceId("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
//     .then(({ results }) => {
//         const { lat, lng } = results[0].geometry.location;
//         console.log(lat, lng);
//     })
//     .catch(console.error);

// // Alternatively, use geocode function for consistency
// geocode(RequestType.ADDRESS, "Eiffel Tower")
//     .then(({ results }) => {
//         const { lat, lng } = results[0].geometry.location;
//         console.log(lat, lng);
//     })
//     .catch(console.error);

