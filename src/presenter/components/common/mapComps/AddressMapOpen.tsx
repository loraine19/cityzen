import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Popover, PopoverHandler, PopoverContent, Chip } from '@material-tailwind/react';
import { Icon } from '../SmallComps';
import { Address } from '../../../../domain/entities/Address';
import { Link } from 'react-router-dom';

function FlyToMarker({ position }: { position: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        const currentCenter = map.getCenter();
        if (currentCenter.lat !== position[0] || currentCenter.lng !== position[1]) {
            map.flyTo(position, 16, {
                animate: true,
                duration: 1,
            });
        }
    }, [position, map]);
    return null;
}

export default function AddressMapOpen(props: { address: Address, message?: string }) {
    const { message } = props;
    const Address = props.address;
    const [position, setPosition] = useState<[number, number]>([Address?.lat, Address?.lng]);

    useEffect(() => {
        setPosition([Address.lat, Address.lng]);
    }, [Address]);
    const [open, setOpen] = useState(false);

    const googleMapsLink = `https://www.google.com/maps/dir/?api=1&destination=${Address.lat},${Address.lng}`;

    return (
        <Popover open={open} >
            <PopoverHandler>
                <div className=' relative flex flex-1 min-h-[5.5rem]  !h-[100%] !rounded-2xl  shadow mb-2'>
                    <Icon icon='expand_content' fill size='2xl' onClick={() => setOpen(true)} style={'absolute lg:top-0 right-0 rounded-full !z-50 !px-1.5 '} title='Ouvrir la carte' />
                    <MapContainer center={position} zoom={16} scrollWheelZoom={false} className='!z-10 flex flex-1 min-h-20 !rounded-xl ' >
                        <TileLayer
                            url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
                        />
                        <Marker
                            position={position}
                            icon={L.icon({
                                iconUrl: '/marker.svg',
                                iconSize: [50, 50],
                                iconAnchor: [10, 50],
                                popupAnchor: [0, -25],
                            })}
                        >
                            <Popup>
                                {message || `${Address?.address} ${Address?.city}`}
                                <br />
                            </Popup>
                        </Marker>
                        {!message && <FlyToMarker position={position} />}
                        <Link style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: 1000 }} to={googleMapsLink} target="_blank" rel="noopener noreferrer">
                            <Chip value='itineraire' color='cyan' className='CyanChip rounded-full shadow' size='sm' />
                        </Link>
                    </MapContainer>
                </div>
            </PopoverHandler >
            <PopoverContent>
                <div className='Map flex FixedCenter'>
                    <MapContainer center={position} zoom={16} scrollWheelZoom={false}
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '0.8rem',
                            display: 'flex',
                            flex: 1,
                            backgroundColor: 'white',
                            boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
                        }}>
                        <TileLayer
                            url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
                        />
                        <Marker position={position}
                            icon={L.icon({
                                iconUrl: '/marker.svg',
                                iconSize: [90, 55],
                                iconAnchor: [2, 5],
                                popupAnchor: [0, -90],
                            })}>
                            <Popup>
                                {message || `${Address?.address} ${Address?.city}`}
                                <br />
                                <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">y aller</a>
                            </Popup>
                        </Marker>
                        {!message && <FlyToMarker position={position} />}
                        <Link style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: 1000 }} to={googleMapsLink} target="_blank" rel="noopener noreferrer">
                            <Chip value='itineraire' color='cyan' className='CyanChip rounded-full shadow' size='sm' />
                        </Link>
                    </MapContainer>
                    <Icon icon='cancel' fill bg size='4xl' onClick={() => setOpen(false)} style={'absolute top-8 rounded-full !z-50 !px-1 '} title='Fermer la carte' />
                </div>
            </PopoverContent>
        </Popover >
    );
}
