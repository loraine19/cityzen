import { useState } from 'react';
import { LoadScript, Autocomplete, Libraries } from '@react-google-maps/api';
import { GM_API_KEY } from '../../../env.local';
import { Input } from '@material-tailwind/react';

const libraries = ['places'] as Libraries; // Include the Places library


const AddressInput = () => {
    const [address, setAddress] = useState('');

    return (
        <LoadScript
            googleMapsApiKey={GM_API_KEY}
            libraries={libraries}
        >
            <Autocomplete
                options={{ types: ['address'] }}

            >
                <Input


                    label="Address"
                    variant='standard'
                    type="text"

                //  value={address}
                // onChange={(e: any) => setAddress(e.target.value)}
                />
            </Autocomplete>
        </LoadScript>
    );
};

export default AddressInput;