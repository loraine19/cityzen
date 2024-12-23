import {
    setKey,
    setLanguage,
    setRegion,
    fromAddress,
    fromLatLng,
} from "react-geocode";


setKey("AIzaSyDNjhPXdHwsECXX68PZ_P3LikGEUdYNBNA");
setLanguage("fr");
setRegion("fr");

// Get latitude & longitude from address.
export const GetAdressGps = async (adress: string) => {
    try {
        let adressGps = { lat: 0, lng: 0 }
        const { results } = await fromAddress(adress);
        adressGps = results[0].geometry.location;
        return (adressGps)
    }
    catch (error) { console.log(error) }
}

// Get latitude & longitude from address.
export const GetAdressString = async (lat: number, lng: number) => {
    try {
        let adressString = {} as any
        const { results } = await fromLatLng(lat, lng);
        adressString = {
            address: results[0].address_components[0]?.long_name + " " + results[0].address_components[1].long_name,
            city: results[0].address_components[2]?.long_name,
            zipcode: (results[0].address_components[6]?.long_name),
            lat: lat,
            lng: lng,
            formated: results[0].formatted_address
        }

        return (adressString)
    }
    catch (error) { console.log(error) }
}

export const GetAddressDataByGps = async (lat: number, lng: number) => {
    try {
        let adressString = {} as any
        const { results } = await fromLatLng(lat, lng);
        adressString = {
            address: results[0].address_components[0]?.long_name + " " + results[0].address_components[1].long_name,
            city: results[0].address_components[2]?.long_name,
            zipcode: (results[0].address_components[6]?.long_name),
            lat: results[0].geometry.location.lat,
            lng: results[0].geometry.location.lng,
        }
        console.log('554,', adressString)
        return (adressString)
    }
    catch (error) { console.log(error) }
}

export const GetAddressObject = async (adress: string) => {
    try {
        let adressString = {} as any
        const { results } = await fromAddress(adress);
        adressString = {
            address: results[0].address_components[0]?.long_name + " " + results[0].address_components[1].long_name,
            city: results[0].address_components[2]?.long_name,
            zipcode: (results[0].address_components[6]?.long_name),
            lat: results[0].geometry.location.lat,
            lng: results[0].geometry.location.lng,
        }
        console.log('formated addres object for db', adressString)
        return (adressString)
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

