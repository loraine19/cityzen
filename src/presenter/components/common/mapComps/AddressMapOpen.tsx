import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Popover, PopoverHandler, PopoverContent, Chip, Typography } from '@material-tailwind/react';
import { Icon } from '../IconComp';
import { Address } from '../../../../domain/entities/Address';
import { Link } from 'react-router-dom';
import { AddressDTO } from '../../../../infrastructure/DTOs/AddressDTO';
import { NotifView } from '../../../views/viewsEntities/notifViewEntity';
import { ElementNotif } from '../../../../domain/entities/Notif';

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

const MarkerList = ({ notifsMap }: { notifsMap: NotifView[] }) => {
    return (
        notifsMap.map((notif: NotifView) => notif?.Address && notif?.Address.lat && notif?.Address?.lng &&
            <Marker
                key={notif.id}
                position={[notif?.Address.lat, notif?.Address.lng]}
                icon={notif.type === ElementNotif.SERVICE ? L.icon({
                    iconUrl: '/image/marker_green.svg',
                    iconSize: [40, 40],
                    iconAnchor: [25, 50],
                    popupAnchor: [-5, -15],
                    pane: 'markerPane',
                }) : L.icon({
                    iconUrl: '/image/marker_orange.svg',
                    iconSize: [40, 40],
                    iconAnchor: [25, 50],
                    popupAnchor: [-5, -15],
                    pane: 'markerPane',
                })}
            >
                <Popup>
                    <div>
                        <div className='flex flex-1 justify-between items-center  w-full'>
                            <Typography
                                variant='h6'
                                color='gray'
                                className=''>
                                {notif.title}
                            </Typography>
                            <Chip
                                size='sm'
                                value={notif.typeS}
                                className='CyanChip text-ellipsis rounded-full max-w-max ' />
                        </div>
                        <div className='flex max-h-16 justify-between items-center w-full'>
                            <Typography
                                variant="small"
                                color='gray'
                                className='font-normal truncate !p-0 !my-0'>
                                {notif.description}
                            </Typography>
                            <Icon
                                style='!text-gray-900 max-h-max'
                                icon='arrow_circle_right'
                                link={notif.link}
                                title={`voir les details de ${notif.title}`}
                                size='3xl'
                                fill />
                        </div>

                    </div>
                </Popup>
                <div className='!absolute !-mt-0 border-orange-100 border-2 rounded-lg shadow-md'>
                    <div className='bg-white p-2 -mt-3 z-50 relative top-0 left-0 right-0 rounded-t-lg'>
                        <div className='flex flex-1 justify-between items-center  w-full'>
                            <Typography
                                variant='h6'
                                color='gray'
                                className=''>
                                {notif.title}
                            </Typography>
                            <Chip
                                size='sm'
                                value={notif.typeS}
                                className='CyanChip text-ellipsis rounded-full max-w-max ' />
                        </div>
                        <div className='flex max-h-16 justify-between items-center w-full'>
                            <Typography
                                variant="small"
                                color='gray'
                                className='font-normal truncate !p-0 !my-0'>
                                {notif.description}
                            </Typography>
                            <Icon
                                style='!text-gray-900 max-h-max'
                                icon='arrow_circle_right'
                                link={`/${notif.link}`}
                                title={`voir les details de ${notif.title}`}
                                size='3xl'
                                fill />
                        </div>
                    </div>
                </div>
            </Marker>)
    )
}




type AddressMapOpenProps = { address: AddressDTO | Address, message?: string, notifs?: NotifView[] }

export const AddressMapOpen: React.FC<AddressMapOpenProps> = ({ address, message, notifs }) => {
    const [position, setPosition] = useState<[number, number]>([address?.lat, address?.lng]);



    useEffect(() => {
        setPosition([address.lat, address.lng]);
    }, [address]);
    const [open, setOpen] = useState(false);

    const googleMapsLink = `https://www.google.com/maps/dir/?api=1&destination=${address.lat},${address.lng}`;

    const IntenaryChip = () => (<Link
        style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: 1000 }}
        to={googleMapsLink}
        target="_blank"
        rel="noopener noreferrer">
        <Chip
            value='itineraire'
            className='CyanChip rounded-full shadow'
            size='sm' />
    </Link>)

    return (
        <Popover open={open} >
            <PopoverHandler>
                <div className=' relative flex flex-1 min-h-[5.5rem] !h-[100%] !rounded-2xl  shadow-md mb-2'>
                    <Icon
                        icon='expand_content'
                        fill size='2xl'
                        onClick={() => setOpen(true)}
                        style={'absolute lg:top-0 right-0 rounded-full !z-50 !px-1.5 '}
                        title='Ouvrir la carte' />
                    <MapContainer
                        center={position}
                        zoom={16}
                        scrollWheelZoom={false}
                        className='!z-10 flex flex-1 min-h-20 !rounded-xl ' >
                        <TileLayer
                            url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
                        />


                        {notifs &&
                            <MarkerList notifsMap={notifs} />}
                        <Marker
                            position={position}
                            icon={L.icon({
                                iconUrl: '/image/marker.svg',
                                iconSize: [50, 50],
                                iconAnchor: [25, 50],
                                popupAnchor: [0, -5],
                            })}
                        >
                            <Popup>
                                {message || `${address?.address} ${address?.city}`}
                            </Popup>
                        </Marker>
                        {!message &&
                            <FlyToMarker position={position} />}
                        <IntenaryChip />
                    </MapContainer>
                </div>
            </PopoverHandler >
            <PopoverContent>
                <div className='Map flex flex-col FixedCenter'>
                    <Icon
                        icon='cancel'
                        fill size='3xl'
                        onClick={() => setOpen(false)}
                        style={' !px-1'}
                        title='Fermer la carte' />
                    <MapContainer
                        center={position}
                        zoom={16}
                        scrollWheelZoom={false}
                        className='shadow-xl rounded-xl border-2 border-gray-300 flex w-full h-full' >
                        <TileLayer
                            url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
                        />
                        <Marker position={position}
                            icon={L.icon({
                                iconUrl: '/image/marker.svg',
                                iconSize: [50, 50],
                                iconAnchor: [25, 50],
                                popupAnchor: [0, -5],
                            })}>
                            <Popup>
                                {message || `${address?.address} ${address?.city}`}
                                <br />
                                <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">y aller</a>
                            </Popup>
                        </Marker>
                        {!message && <FlyToMarker position={position} />}
                        {notifs && <MarkerList notifsMap={notifs} />}
                        <IntenaryChip />
                    </MapContainer>
                </div>
            </PopoverContent>
        </Popover >
    );
}
export default AddressMapOpen;