import { useState, useEffect, useRef } from 'react';
import {
    APIProvider,
    useMapsLibrary,
} from '@vis.gl/react-google-maps';


const API_KEY: any = "AIzaSyDNjhPXdHwsECXX68PZ_P3LikGEUdYNBNA"

export default function MapPickUpComp(props: { address: any, setAddress: any, text?: string, inputStyle?: boolean }) {
    //
    const { address, setAddress, text } = props
    const [selectedPlace, setSelectedPlace] =
        useState<google.maps.places.PlaceResult | null>(null);

    5 < 4 && console.log("avoid compile error ", selectedPlace)
    return (
        <APIProvider
            apiKey={API_KEY}
            solutionChannel='GMP_devsite_samples_v3_rgmautocomplete'>
            <PlaceAutocomplete onPlaceSelect={setSelectedPlace} address={address} setAddress={setAddress} text={text} inputStyle={props.inputStyle} />
        </APIProvider>
    );
};


interface PlaceAutocompleteProps {
    onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
    address: string,
    setAddress: any,
    text?: string,
    inputStyle?: boolean
}


const PlaceAutocomplete = ({ onPlaceSelect, setAddress, text, inputStyle }: PlaceAutocompleteProps) => {
    const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const places = useMapsLibrary('places');

    useEffect(() => {
        if (!places || !inputRef.current) return;
        const options = {
            fields: ['formatted_address', 'address_components', 'address_components', 'place_id', 'geometry']
        };
        setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    }, [places]);


    useEffect(() => {
        if (!placeAutocomplete) return;
        placeAutocomplete.addListener('place_changed', () => {
            onPlaceSelect(placeAutocomplete.getPlace());
            //
            setAddress(inputRef.current?.value);
            //
        });
    }, [onPlaceSelect, placeAutocomplete, inputRef]);

    const changeValue = () => {
        setAddress(inputRef.current?.value)

    }
    const placeHolder = text ? text : "choisir une adresse"
    const roundedCyan = 'px-3 py-3 rounded-full border border-cyan-500 text-center text-xs placeholder:font-bold placeholder:uppercase placeholder:text-md placeholder:text-cyan-500  placeholder:capitalize'
    const classic = "placeholder:text-blue-gray-500 placeholder:!text-sm pt-4 border-b-[1px] border-b-gray-400 text-small pb-1"

    return (

        <div className="flex justify-center flex-col  h-full w-full rounded-full bg-transparent">
            <input className={`${inputStyle ? classic : roundedCyan} focus:outline-none bg-white`} name="adress" ref={inputRef} onChange={changeValue} placeholder={placeHolder} />
        </div>
    );
};


