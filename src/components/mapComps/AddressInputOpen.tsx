import React, { useState } from 'react';
import axios from 'axios';
import { Input, List, ListItem } from '@material-tailwind/react';
import Skeleton from 'react-loading-skeleton'
import { Address } from '../../types/class';

interface AddressSuggestion {
    label: string;
    value: Address;
}

export const AddressInputOpen = (props: { address: Address, setAddress: any, placeHolder: string, }) => {
    const { address, setAddress, placeHolder } = props;
    const [inputLoading, setInputLoading] = useState(false)
    const [inputValue, setInputValue] = useState(placeHolder?.length > 0 ? placeHolder : '');
    const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputLoading(true);
        const q = event.target.value;
        setInputValue(q);
        if (q.length > 2) {
            try {
                const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                    params: {
                        q: q,
                        format: 'json',
                        limit: 5,
                        countrycodes: 'fr',
                        'accept-language': 'fr',
                        addressdetails: 1,
                        //street: q,
                    }
                })

                response.data.length > 1 && response.data.sort((a: any, b: any) => b.importance - a.importance)
                console.log('response', response.data)
                //.filter((a: any) => a.display_name.replace(',', '').toLowerCase().includes(q.toLowerCase()))
                const suggestions: AddressSuggestion[] = response.data
                    .map((result: any) => {
                        const addressParts = [
                            result.address?.house_number,
                            result.address?.road,
                            result.address?.postcode,
                            result.address?.city || result.address?.town || result.address?.village
                        ].filter(Boolean).join(' ');

                        return {
                            label: addressParts,
                            value: {
                                address: [
                                    result.address?.house_number,
                                    result.address?.road
                                ].filter(Boolean).join(' '),
                                lat: result.lat,
                                lng: result.lon,
                                zipcode: result.address?.postcode,
                                city: result.address?.city || result.address?.town || result.address?.village,
                            },
                        };
                    });
                setSuggestions([...suggestions]);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionSelect = (suggestion: AddressSuggestion) => {
        setInputValue(suggestion.label)
        setSuggestions([]);
    };

    return (
        <div className='relative z-50 '>
            <Input
                label="Adresse"
                variant='standard'
                type="text"
                value={inputValue || placeHolder || ''}
                onChange={(event) => {
                    if (event.target.value.trim() !== '' || event.target.value === '') {
                        handleInputChange(event);
                    }
                }}
                placeholder={placeHolder}
                className='items-center flex-1'
                icon={inputValue && (
                    <button onClick={() => setInputValue('')}> &#x2715;</button>
                )}
            />
            <div className={inputValue.length > 3 && inputLoading ? 'z-50 absolute px-0.5 w-full mt-2' : 'hidden'}>
                <List className='bg-white rounded-xl border border-gray-300 overflow-auto w-full shadow-lg' >
                    {suggestions.map((suggestion) => (
                        <ListItem
                            className="cursor-pointer hover:bg-gray-100 text-sm py-2"
                            key={suggestion.label + suggestion.value.lat}
                            onClick={() => { handleSuggestionSelect(suggestion), setAddress(suggestion.value), setInputLoading(false) }}>
                            {suggestion.label}
                        </ListItem>
                    ))}
                    {suggestions.length === 0 &&
                        <Skeleton count={2} className='w-full h-6 my-1 rounded-full' style={{ borderRadius: '10px' }} />
                    }
                </List>
            </div>
        </div >
    );
};



