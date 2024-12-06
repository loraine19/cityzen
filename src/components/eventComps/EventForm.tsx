import NavBarTop from '../NavBarTop';
import SubHeader from '../SubHeader';
import { useContext, useEffect, useState } from 'react';
import { Card, CardBody, Typography, Input, Button, Select, Option, Textarea, CardHeader, Chip, Progress } from '@material-tailwind/react';
import { eventCategories } from "../../datas/enumsCategories";
import MapPickUpComp from '../mapComps/MapPickUpComp';
import { MapComp } from '../mapComps/MapComp';
import { GetAdressGps } from '../../functions/GeoMapFunction';
import { getAdress, getImageBlob } from '../../functions/GetDataFunctions';
import { defaultEventImage } from '../../datas/enumsCategories';
import DataContext from '../../contexts/data.context';
import { Address, EventP } from '../../types/class';


export function EventForm(props: { formik: any, setValue: (value: string) => void }) {
    const { formik, setValue } = props;
    const { data } = useContext(DataContext)

    const [gpsAdress, setGpsAdress] = useState<any>(null)
    const [newEvent] = useState<EventP>(formik.values);
    const address: Address = getAdress(formik.values.address_id, data.address) as Address
    const [newAddress, setNewAddress] = useState<string>(address ? address.address : '');

    const formatDate = (date: any) => (new Date(date).toISOString().replace('Z', '').split('.')[0])
    const pourcentParticipants = Math.floor((formik.values.users.length) / formik.values.participants_min * 100)
    const daysBefore: number = ((new Date(newEvent.start).getTime() - new Date().getTime()) / 1000 / 60 / 60 / 24)
    let dateClass = daysBefore < 15 ? "OrangeChip" : "GrayChip";
    const today = new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString().slice(0, 16).replace('Z', '');

    ///// BLOB FUNCTION 
    const imgCategory = (defaultEventImage.find(category => category.type.toLowerCase() === formik.values.category.toLowerCase()) ?
        defaultEventImage.find(category => category.type.toLowerCase() === formik.values.category.toLowerCase())?.image
        : defaultEventImage[0].image);

    const [img] = useState<string>(formik.values.image ? (formik.values.image) : (imgCategory));
    const [imgBlob, setImgBlob] = useState<string | undefined>(img);

    useEffect(() => {
        console.log("loadGps", gpsAdress)
        const loadGps = async () => {
            const adressGpsLoaded = await GetAdressGps(newAddress);
            adressGpsLoaded && setGpsAdress(adressGpsLoaded)
            formik.values.address = newAddress
        }
        loadGps()
        formik.values.address = newAddress
        console.log(formik.errors)
    }, [newAddress])

    useEffect(() => {
        !formik.values.image && setImgBlob(defaultEventImage.find(category => category.type === formik.values.category.toLowerCase())?.image)
    }, [formik.values.category])

    return (
        <>
            <form onSubmit={formik.handleSubmit} className="flex flex-col h-full gap-3 pb-3">
                <header className="px-4">
                    <NavBarTop />
                    <SubHeader type={formik.values.title ? `Modifier mon évenement ` : "Créer mon évenement"} place={formik.values.category ? formik.values.category : ""} closeBtn />
                    <div className="w-respLarge">
                        <Select className="rounded-full shadow  bg-white border-none capitalize"
                            label={formik.errors.category ? formik.errors.category as string : "Choisir la catégorie"}
                            name={"category"}
                            labelProps={{ className: `${formik.errors.category && "error"} before:border-none after:border-none ` }}
                            value={formik.values.category.toLowerCase()}
                            onChange={(val: any) => { setValue(val); formik.values.category = val }}
                        >
                            {eventCategories.map((category: string, index: number) => {
                                return (
                                    <Option className={category === "tous" ? "hidden" : "rounded-full my-1 capitalize"} value={category} key={index} >
                                        {category}
                                    </Option>)
                            })}
                        </Select>
                    </div>
                </header>


                <main className='flex flex-1 pb-1 pt-[1.5rem]'>
                    <Card className=" w-respLarge FixCard">
                        <CardHeader className="FixCardHeader ">
                            <Chip value={formik.values.start ?
                                new Date(formik.values.start).toLocaleDateString('fr-FR', { weekday: 'short', month: 'short', day: 'numeric' }) :
                                new Date().toLocaleDateString('fr-FR', { weekday: 'short', month: 'short', day: 'numeric' })}
                                className={`${dateClass}` + ` absolute top-2 right-2 rounded-full h-max flex items-center gap-2 shadow font-medium `}>
                            </Chip>
                            <img
                                src={imgBlob}
                                alt={formik.values.title}
                                width={100}
                                height={100}
                                className="h-full w-full object-cover"
                            />
                            <Button className="shadow absolute left-2 bottom-2 w-8 h-12 rounded-full z-20" ripple={false}>
                                <label htmlFor="image"
                                    className=" flex flex-col items-center justify-center w-full h-full cursor-pointer">
                                    <span className="material-symbols-rounded">{(imgBlob && formik.values.image) ? "edit" : "add_a_photo"}</span>
                                    <div className="flex flex-col w-full items-center justify-center">
                                        <input id="image" type="file" name="image" className="hidden" onChange={(e) => getImageBlob(e, setImgBlob, formik)} />
                                    </div>
                                </label>
                            </Button>
                            <Button type='button' variant='text' ripple={false} color="red" className={formik.values.image ? `p-1 absolute left-10 bottom-0 z-30 rounded-full shadow` : `hidden`} onClick={() => {
                                formik.values.image = ''; setImgBlob(imgCategory)
                            }}>
                                <span className="material-symbols-rounded !text-2xl">cancel</span>
                            </Button>

                        </CardHeader>
                        <Typography className='text-xs px-4'>{formik.values.image != formik.values.image && formik.values.image as string} </Typography>

                        <CardBody className='FixCardBody'>
                            <div className='CardOverFlow'>
                                <Input label="titre" name="title" variant="standard" onChange={formik.handleChange} value={formik.values.title} />
                                <Typography className='text-xs error'>{formik.errors.title as string} </Typography>

                                <div className='flex flex-col lg:flex-row gap-5 pt-3 justify-end'>
                                    <div className='flex flex-col flex-1 pt-1'>
                                        <Textarea rows={1} resize={true} variant="static" label="Description" name="description" onChange={formik.handleChange} className=" focus:outline-none min-h-full  "
                                            value={formik.values.description}
                                            containerProps={{
                                                className: "grid h-full",
                                            }} labelProps={{
                                                className: "before:content-none after:content-none",
                                            }} />
                                        <Typography className='text-xs error pt-2'>{formik.errors.description as string} </Typography>

                                    </div>
                                    <div className="flex flex-1 flex-col  ">
                                        <label className="text-sm text-blue-gray-600 -mt-2.5">Adresse</label>

                                        {gpsAdress && <MapComp adressGpsEvent={gpsAdress} />}


                                        <MapPickUpComp address={newAddress} setAddress={setNewAddress} text={formik.values.address as string} inputStyle />
                                        <Typography className='text-xs error pt-2'>{formik.errors.adress as string} </Typography>

                                    </div>
                                </div>

                                <div className='flex gap-[2vw] pt-4'>
                                    <div className='flex flex-col flex-1 !max-w-[40vw] overflow-auto pt-1'>
                                        <Input type="datetime-local" label="date de debut" name="start" variant="standard" onChange={formik.handleChange} min={today} defaultValue={`${formik.values.start && formatDate(formik.values.start)}`} />
                                        <Typography className='pb-1 text-xs error'>{formik.errors.start as string} </Typography></div>
                                    <div className='flex flex-col flex-1 !max-w-[40vw] overflow-auto pt-1'>
                                        <Input type="datetime-local" min={today} defaultValue={formik.values.end && formatDate(formik.values.end)} label="date de fin" name="end" variant="standard" onChange={formik.handleChange} />
                                        <Typography className='pb-1 text-xs error'>{formik.errors.end as string} </Typography>
                                    </div>
                                </div>


                                <div className='flex w-full gap-[10%]  pt-1'>
                                    <div className='flex flex-col w-full max-w-[30rem]'>
                                        <Input type='number' label="participants" name="participants" variant="standard" onChange={formik.handleChange} defaultValue={formik.values.participants_min} />
                                        <Typography className='text-xs error'>{formik.errors.participants_min as string} </Typography>

                                    </div>
                                    <div className={formik.values.users.length < 1 ? "hidden " : "flex items-center  gap-1 flex-col justify-center w-full"}>
                                        <div className="mb-2 flex  w-full items-center justify-between gap-4">
                                            <Typography color="blue-gray" variant="small">
                                                {pourcentParticipants <= 0 ? pourcentParticipants >= 100 ? `validé` : `aucun inscrit` : `Particpants inscrits`}
                                            </Typography>
                                            <Typography color="blue-gray" variant="small">
                                                {formik.values.users.length}  /  {formik.values.participants_min}
                                            </Typography>
                                        </div>
                                        <Progress value={pourcentParticipants} color={pourcentParticipants === 100 ? "green" : "cyan"} size="md" />
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                </main>
                <footer className="w-respLarge">
                    <Button type="submit" size="lg" className="w-full rounded-full" >
                        enregistrer
                    </Button>
                </footer>
            </form>
        </>
    )
}

