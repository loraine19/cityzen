import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Popover, PopoverHandler, PopoverContent, Chip, Typography } from '@material-tailwind/react';
import { Icon } from '../IconComp';
import { Address } from '../../../../domain/entities/Address';
import { AddressDTO } from '../../../../infrastructure/DTOs/AddressDTO';
import { NotifView } from '../../../views/viewsEntities/notifViewEntity';
import { ElementNotif } from '../../../../domain/entities/Notif';

function FlyToMarker({ position, setFly }: { position: [number, number], setFly?: React.Dispatch<React.SetStateAction<boolean>> }) {
    const map = useMap();
    useEffect(() => {
        const currentCenter = map.getCenter();
        if (currentCenter.lat !== position[0] || currentCenter.lng !== position[1]) {
            map.flyTo(position, 16, {
                animate: true,
                duration: 1,
            })
        }
    }, [position, map]);
    if (setFly) setFly(false);
    return null;
}


const MarkerList = ({ notifsMap }: { notifsMap: NotifView[] }) => {
    return (
        notifsMap.map((notif: NotifView, index: number) => notif?.Address && notif?.Address.lat && notif?.Address?.lng &&
            <Marker
                key={notif.id}
                position={[notif?.Address.lat, notif?.Address.lng]}
                icon={notif.type === ElementNotif.SERVICE ?
                    L.icon({
                        iconUrl: '/image/marker_green.svg',
                        iconSize: [50, 50],
                        iconAnchor: [(notif.Address?.id && index > 0 && notif.Address.id === notifsMap[index - 1]?.Address?.id) ? 35 : 25, 50],
                        popupAnchor: [0, -20],
                        shadowAnchor: [(notif.Address?.id && index > 0 && notif.Address.id === notifsMap[index - 1]?.Address?.id) ? 30 : 25, 50],
                        shadowUrl: '/image/marker_shadow.png',
                        pane: 'markerPane',
                    }) :
                    L.icon({
                        iconUrl: '/image/marker_orange.svg',
                        iconSize: [50, 50],
                        iconAnchor: [(notif.Address?.id && index > 0 && notif.Address.id === notifsMap[index - 1]?.Address?.id) ? 30 : 25, 50],
                        popupAnchor: [0, -20],
                        shadowAnchor: [(notif.Address?.id && index > 0 && notif.Address.id === notifsMap[index - 1]?.Address?.id) ? 30 : 25, 50],
                        shadowUrl: '/image/marker_shadow.png',
                        pane: 'markerPane',
                    })} >
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
            </Marker>
        )
    )
}


type AddressMapOpenProps = { address: AddressDTO | Address, message?: string | Element, notifs?: NotifView[] }

export const AddressMapOpen: React.FC<AddressMapOpenProps> = ({ address, message, notifs }) => {

    const [position, setPosition] = useState<[number, number]>([address?.lat, address?.lng]);
    useEffect(() => { setPosition([address.lat, address.lng]) }, [address]);
    const [open, setOpen] = useState(false);
    const googleMapsLink = `https://www.google.com/maps/dir/?api=1&destination=${address.lat},${address.lng}`;

    const IntenaryChip = () => (
        <div style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: 1000 }}>
            <Icon
                link={`${googleMapsLink}`}
                bg
                style='!bg-cyan-100 hover:!bg-opacity-100 !pb-1'
                title='Ouvrir dans Google Maps'
                size='xl'
                color='cyan'
                icon='near_me'
                fill />
        </div>)

    const FlyButton = () => (
        <div style={{ position: 'absolute', bottom: '10px', left: '10px', zIndex: 1000 }}>
            <Icon
                bg
                title='Zoomer sur la position'
                onClick={() => setFly(true)}
                icon="my_location"
                style='!pb-1.5 '
                size="xl"
                fill />
        </div>)

    const CloseButton = () => (
        <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 900 }}>
            <Icon
                bg
                icon='close'
                fill
                size='xl'
                onClick={() => setOpen(false)}
                style={'!pb-1.5'}
                title='Fermer la carte' />
        </div>)

    const ExpandButton = () => (
        <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 600 }}>
            <Icon
                bg
                icon='expand_content'
                fill
                size='xl'
                onClick={() => setOpen(true)}
                style={' !pb-1.5 '}
                title='Ouvrir la carte' />
        </div>)

    const [fly, setFly] = useState(false);
    return (
        <Popover open={open} >
            <PopoverHandler>
                <div className=' relative flex flex-1 min-h-[5.5rem] !h-[100%] !rounded-2xl  shadow-md mb-2'>
                    <ExpandButton />
                    <MapContainer
                        center={position}
                        zoom={16}
                        scrollWheelZoom={false}
                        className='!z-10 flex flex-1 min-h-20 !rounded-xl ' >
                        <TileLayer url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}" />
                        <Marker
                            position={position}
                            icon={L.icon({
                                iconUrl: '/image/marker.svg',
                                iconSize: [60, 60],
                                iconAnchor: [30, 60],
                                popupAnchor: [0, -30],
                                shadowAnchor: [30, 60],
                                shadowUrl: '/image/marker_shadow.png'
                            })}>
                            <Popup>
                                {typeof message === 'string' ? message : <>{message}</> || `${address?.address} ${address?.city}`}
                            </Popup>
                        </Marker>
                        {notifs && <MarkerList notifsMap={notifs} />}
                        {!message && <FlyToMarker position={position} />}
                        {fly && <FlyToMarker position={position} setFly={setFly} />}
                        <IntenaryChip />
                        <FlyButton />
                    </MapContainer>
                </div>
            </PopoverHandler >
            <PopoverContent>
                <div className='Map flex flex-col FixedCenter'>
                    <MapContainer
                        center={position}
                        zoom={16}
                        scrollWheelZoom={false}
                        className='shadow-xl rounded-xl border-2 border-gray-300 flex w-full h-full' >
                        <TileLayer url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}" />
                        <Marker
                            position={position}
                            icon={L.icon({
                                iconUrl: '/image/marker.svg',
                                iconSize: [60, 60],
                                iconAnchor: [30, 60],
                                popupAnchor: [0, -5],
                                shadowAnchor: [30, 60],
                                shadowUrl: '/image/marker_shadow.png'
                            })}>
                            <Popup>
                                {typeof message === 'string' ?
                                    message :
                                    <>{message}</>
                                    || `${address?.address} ${address?.city}`}
                                <br />
                                <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
                                    y aller
                                </a>
                            </Popup>
                        </Marker>
                        {notifs && <MarkerList notifsMap={notifs} />}
                        {!message && <FlyToMarker position={position} />}
                        {fly && <FlyToMarker position={position} setFly={setFly} />}
                        <IntenaryChip />
                        <FlyButton />
                        <CloseButton />
                    </MapContainer>
                </div>
            </PopoverContent>
        </Popover >
    );
}
export default AddressMapOpen;