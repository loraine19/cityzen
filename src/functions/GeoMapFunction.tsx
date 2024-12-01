import {
    setKey,
    setLanguage,
    setRegion,
    fromAddress,
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

