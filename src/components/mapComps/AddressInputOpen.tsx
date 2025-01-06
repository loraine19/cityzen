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
    const { setAddress, placeHolder } = props;
    const [inputLoading, setInputLoading] = useState(false)
    const [inputValue, setInputValue] = useState(placeHolder || '');
    const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);


    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const q = event.target.value;
        setInputValue(q);
        setInputLoading(true)
        if (q.length > 2) {
            try {
                const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                    params: {
                        q: q,
                        format: 'json',
                        limit: 3,
                        countrycodes: 'fr',
                        'accept-language': 'fr',
                        addressdetails: 1,
                        //street: q,
                    }
                })
                console.log(response.data, response.data.length > 0)
                response.data.length > 0 && response.data
                    .sort((a: any, b: any) => b.importance - a.importance)
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
                suggestions.length > 0 && setSuggestions([...new Set(suggestions)])
                console.log([...new Set(suggestions)])
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setInputLoading(true)
                setSuggestions([]);
            }
        }
    };

    const handleSuggestionSelect = (suggestion: AddressSuggestion) => {
        setInputValue(suggestion.label)
        setSuggestions([]);
    };

    return (
        <div className='relative z-50 mt-2 '>
            <Input
                label="Adresse"
                variant='standard'
                type="text"
                value={inputValue || ''}
                onChange={(event) => {
                    if (event.target.value.trim() !== '' || event.target.value === '') {
                        handleInputChange(event);
                    }
                }}
                placeholder={placeHolder}
                className='items-center flex-1'
                icon={inputValue && (
                    <button onClick={() => { setInputValue('') }}> &#x2715;</button>
                )}
            />

            {inputValue.length > 3 && inputLoading && (
                <div className='z-50 absolute px-0.5 w-full mt-2' ref={(el) => el && el.scrollIntoView({ behavior: 'smooth', block: 'end' })}>
                    <List className='bg-white rounded-xl border border-gray-300 overflow-auto w-full shadow-lg max-h-32'>
                        {suggestions.length > 0 ? (
                            suggestions.map((suggestion, index) => (
                                suggestion.label !== suggestions[index - 1]?.label &&
                                <ListItem
                                    className="cursor-pointer hover:bg-gray-200 text-sm py-1.5 rounded-2xl"
                                    title='choisir cette adresse'
                                    key={index}
                                    onClick={() => { handleSuggestionSelect(suggestion), setAddress(suggestion.value), setInputLoading(false) }}>
                                    {suggestion.label}
                                </ListItem>
                            ))
                        ) : (
                            <Skeleton count={2} className='w-full h-6 my-1 rounded-full' style={{ borderRadius: '10px' }} />
                        )}
                    </List>
                </div>
            )}
        </div >
    );
};



