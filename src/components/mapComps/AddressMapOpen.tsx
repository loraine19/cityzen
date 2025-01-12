import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { Address } from '../../types/class';
import L from 'leaflet';
import { Popover, PopoverHandler, PopoverContent, Button } from '@material-tailwind/react';

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

    return (
        <Popover open={open} >
            <PopoverHandler>
                <div className='z-0 flex flex-1 min-h-20  !h-[100%] !rounded-2xl  shadow'>
                    <MapContainer center={position} zoom={16} scrollWheelZoom={false} className=' flex flex-1 min-h-20 !rounded-xl' >
                        {/* <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>  <TileLayer
    url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
/> */}
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
                                {message || Address?.address + " " + Address?.city}
                            </Popup>
                        </Marker>
                        {!message && <FlyToMarker position={position} />}

                    </MapContainer>
                    <Button ripple={false} onClick={() => setOpen(true)} color={'cyan'} variant='text' className={`${open && 'hidden'}  absolute top-2 right-2 p-2 rounded-full `}>
                        <span className='material-symbols-outlined'>expand_content</span>
                    </Button>

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
                            backgroundColor: 'white'
                        }}>
                        <TileLayer
                            url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}" />
                        <Marker
                            position={position}
                            icon={L.icon({
                                iconUrl: '/marker.svg',
                                iconSize: [55, 55],
                                iconAnchor: [22, 55],
                                popupAnchor: [0, -45],
                            })}
                        >
                            <Popup>
                                {message || Address?.address + " " + Address?.city}
                            </Popup>
                        </Marker>
                        {!message && <FlyToMarker position={position} />}
                    </MapContainer>
                    <Button ripple={false} onClick={() => setOpen(false)} variant='text' className='absolute top-8 right-0 rounded-full !z-50 '>
                        <span className='material-symbols-outlined fillThin !text-3xl'>cancel</span>
                    </Button>
                </div>

            </PopoverContent>
        </Popover >
    );
}
