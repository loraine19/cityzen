import { useState, useEffect, useRef } from 'react';
import { GM_API_KEY } from '../../../env.local';
import { APIProvider, useMapsLibrary } from '@vis.gl/react-google-maps';
import { Input } from '@material-tailwind/react';

export default function MapPickUpComp(props: { address: any, setAddress: any, text?: string, inputStyle?: boolean }) {
    const { address, setAddress, text, inputStyle } = props;

    return (
        <APIProvider
            apiKey={GM_API_KEY}
            solutionChannel='GMP_devsite_samples_v3_rgmautocomplete'>
            <PlaceAutocomplete address={address} setAddress={setAddress} text={text} inputStyle={inputStyle} />
        </APIProvider>
    );
}

interface PlaceAutocompleteProps {
    address: string;
    setAddress: any;
    text?: string;
    inputStyle?: boolean;
}

export const PlaceAutocomplete = ({ setAddress, text, inputStyle }: PlaceAutocompleteProps) => {
    const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const places = useMapsLibrary('places');

    useEffect(() => {
        if (!places || !inputRef.current) return;
        const options = {
            fields: ['formatted_address', 'address_components', 'place_id', 'geometry'],
            componentRestrictions: { country: 'fr' } // Restrict to France
        };
        setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    }, [places]);

    useEffect(() => {
        if (!placeAutocomplete) return;
        placeAutocomplete.addListener('place_changed', () => {
            const place = placeAutocomplete.getPlace();
            setAddress(inputRef.current?.value);
        });
    }, [placeAutocomplete, setAddress]);

    const changeValue = () => {
        setAddress(inputRef.current?.value);
    };

    const placeHolder = text ? text : "choisir une adresse";
    const roundedCyan = 'px-3 py-3 rounded-full border border-cyan-500 text-center text-xs placeholder:font-bold placeholder:uppercase placeholder:text-md placeholder:text-cyan-500 placeholder:capitalize';
    const classic = "placeholder:text-blue-gray-500 placeholder:!text-sm pt-4 border-b-[1px] border-b-gray-400 text-small pb-1";

    return (
        <div className="flex justify-center flex-col h-full w-full rounded-full bg-transparent">
            <input
                className={`${inputStyle ? classic : roundedCyan} focus:outline-none bg-white`}
                name="adress"
                ref={inputRef}
                onChange={changeValue}
                placeholder={placeHolder}
            />
            <Input
                className={`${inputStyle ? classic : roundedCyan} focus:outline-none bg-white`}
                name="adress"
                ref={inputRef}
                variant='standard'
                onChange={changeValue}
                placeholder={placeHolder}>
            </Input>
        </div>
    );
};
