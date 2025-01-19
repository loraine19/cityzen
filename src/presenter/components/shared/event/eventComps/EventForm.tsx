import { Select, Card, CardHeader, Chip, Button, Typography, CardBody, Input, Textarea, Progress, Option } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { Label } from "../../../../../domain/entities/frontEntities";
import { Address } from "../../../../../domain/entities/Address";
import { dayMS, getDefaultImage, getLabel, eventCategories, getImageBlob } from "../../../../../infrastructure/services/utilsService";
import { AddressInputOpen } from "../../../common/mapComps/AddressInputOpen";
import AddressMapOpen from "../../../common/mapComps/AddressMapOpen";
import NavBarTop from "../../../common/NavBarTop";
import SubHeader from "../../../common/SubHeader";


export function EventForm(props: { formik: any }) {
    const { formik } = props
    const [Address, setAddress] = useState<Address>(formik.values.Address ? formik.values.Address : {} as Address);
    const formatDate = (date: any) => (new Date(date).toISOString().slice(0, 16).replace('Z', '').split('.')[0])
    const pourcentParticipants = Math.floor((formik.values.Participants?.length) / formik.values.participantsMin * 100)
    const daysBefore: number = ((new Date(formik.values.start).getTime() - new Date().getTime()) / dayMS)
    const dateClass = daysBefore < 15 ? "OrangeChip" : "GrayChip";
    const today = new Date(new Date().getTime() + (1 * dayMS)).toISOString().slice(0, 16).replace('Z', '')

    ///// BLOB FUNCTION 
    const imgCategory = getDefaultImage(formik.values.category || '')
    const [img] = useState<string>(formik.values.image ? formik.values.image : imgCategory);
    const [imgBlob, setImgBlob] = useState<string | undefined>(img);

    //// ADDRESS GPS FUNCTION
    useEffect(() => {
        Address && Address?.address?.length > 2 && (formik.values.Address = Address)
    }, [Address])

    //// UPDATE IMAGE BLOB
    useEffect(() => {
        !formik.values.image && setImgBlob(getDefaultImage(formik.values.category || ''))
    }, [formik.values.category])
    const { image, title, category, description, start, end, participantsMin, Participants } = formik.values
    const label = category ? getLabel(category, eventCategories) : ''

    return (
        <>
            <form onSubmit={formik.handleSubmit} className="flex flex-col h-full gap-3 pb-3">
                <header className="px-4">
                    <NavBarTop />
                    <SubHeader
                        type={title ? 'Modifier mon évenement ' : 'Créer mon évenement'}
                        place={category ? label : ''} closeBtn />
                    <div className='w-respLarge'>
                        <Select className='rounded-full shadow bg-white border-none capitalize'
                            label={formik.errors.category ? formik.errors.category as string : "Choisir la catégorie"}
                            name={"category"}
                            error={formik.errors.category ? true : false}
                            labelProps={{ className: `before:border-none after:border-none` }}
                            value={category || ''}
                            onChange={(val: any) => { formik.values.category = val }}>
                            {eventCategories.map((category: Label, index: number) => {
                                return (
                                    <Option className={`${category.value === '' && "hidden"} rounded-full my-1 capitalize`} value={category.value} key={index} >
                                        {category.label}
                                    </Option>)
                            })}
                        </Select>
                    </div>
                </header>
                <main className='flex flex-1 pb-1 pt-[1.5rem]'>
                    <Card className=" w-respLarge FixCard !relative !z-10">
                        <CardHeader className="FixCardHeader bg-blue-gray-300">
                            <Chip value={start ? new Date(start).toLocaleDateString('fr-FR', { weekday: 'short', month: 'short', day: 'numeric' }) :
                                new Date().toLocaleDateString('fr-FR', { weekday: 'short', month: 'short', day: 'numeric' })}
                                className={`${dateClass}` + ` absolute top-2 right-2 rounded-full h-max flex items-center gap-2 shadow font-medium `}>
                            </Chip>
                            <img
                                src={imgBlob}
                                alt={title}
                                width={100}
                                height={100}
                                className={image || imgBlob ? "h-full w-full object-cover" : "hidden"}
                            />
                            <Button className="shadow absolute left-2 bottom-2 w-8 h-12 rounded-full z-20" ripple={false}>
                                <label htmlFor="image"
                                    className=" flex flex-col items-center justify-center w-full h-full cursor-pointer">
                                    <span className="material-symbols-rounded">{(imgBlob && image) ? "edit" : "add_a_photo"}</span>
                                    <div className="flex flex-col w-full items-center justify-center">
                                        <input id="image" type="file" name="image" className="hidden" onChange={(e) => getImageBlob(e, setImgBlob, formik)} />
                                    </div>
                                </label>
                            </Button>
                            <Button type='button' variant='text' ripple={false} color="red" className={image ? `p-1 absolute left-10 bottom-0 z-30 rounded-full shadow` : `hidden`}
                                onClick={() => { formik.values.image = ''; setImgBlob(imgCategory) }}>
                                <span className="material-symbols-rounded !text-2xl">cancel</span>
                            </Button>
                        </CardHeader>
                        <Typography className='text-xs px-4'>{image != image && image as string} </Typography>
                        <CardBody className='FixCardBody'>
                            <div className='CardOverFlow gap-3'>
                                <Input label={formik.errors.title ? formik.errors.title as string : "titre"}
                                    name="title" variant="standard" onChange={formik.handleChange} error={formik.errors.title ? true : false} defaultValue={title} />
                                <div className='flex flex-col lg:flex-row gap-5 h-full'>
                                    <div className='flex flex-col flex-1 pb-2'>
                                        <Textarea rows={1} resize={true} variant="standard"
                                            label={formik.errors.description ? formik.errors.description as string : "Description"} error={formik.errors.description ? true : false} name="description" onChange={formik.handleChange} className=" focus:outline-none min-h-full  "
                                            defaultValue={description}
                                            containerProps={{ className: "grid h-full" }}
                                            labelProps={{ className: "before:content-none after:content-none" }} />
                                    </div>
                                    <div className="flex flex-1 flex-col  ">
                                        {Address.lat && Address.lng && <AddressMapOpen address={Address} />}
                                        <div className='relative z-50'>
                                            <AddressInputOpen address={Address} setAddress={setAddress}
                                                error={formik.errors.Address} /></div>
                                    </div>
                                </div>
                                <div className='flex gap-[2vw] pt-4'>
                                    <div className='flex flex-col flex-1 !max-w-[40vw] overflow-auto pt-1'>
                                        <Input type="datetime-local"
                                            label={formik.errors.start ? formik.errors.start as string : "date de debut"}
                                            error={formik.errors.start ? true : false} name="start" variant="standard"
                                            onChange={formik.handleChange} min={today} defaultValue={`${start && formatDate(start)}`} />
                                    </div>
                                    <div className='flex flex-col flex-1 !max-w-[40vw] overflow-auto pt-1'>
                                        <Input type="datetime-local" min={today} defaultValue={end && formatDate(end)} label={formik.errors.end ? formik.errors.end as string : "date de fin"} error={formik.errors.end ? true : false} name="end" variant="standard" onChange={formik.handleChange} />
                                    </div>
                                </div>
                                <div className='flex w-full gap-[10%]  pt-1'>
                                    <div className='flex flex-col w-full max-w-[30rem]'>
                                        <Input type='number'
                                            label={formik.errors.participantsMin ? formik.errors.participantsMin as string : "participants"}
                                            name="participantsMin" error={formik.errors.participantsMin ? true : false}
                                            variant="standard" onChange={formik.handleChange} defaultValue={participantsMin} />

                                    </div>
                                    <div className={Participants?.length < 1 ? "hidden " : "flex items-center  gap-1 flex-col justify-center w-full"}>
                                        <div className="mb-2 flex  w-full items-center justify-between gap-4">
                                            <Typography color="blue-gray" variant="small">
                                                {pourcentParticipants <= 0 ? pourcentParticipants >= 100 ? `validé` : `aucun inscrit` : `Particpants inscrits`}
                                            </Typography>
                                            <Typography color="blue-gray" variant="small">
                                                {Participants?.length}  /  {participantsMin}
                                            </Typography>
                                        </div>
                                        <Progress value={pourcentParticipants} size="md"
                                            color={pourcentParticipants === 100 ? "green" : "cyan"} />
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

