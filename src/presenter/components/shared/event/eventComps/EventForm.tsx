import { useState, useEffect } from "react";
import { Select, Card, CardHeader, Button, Typography, CardBody, Input, Textarea, Progress, Option } from "@material-tailwind/react";
import { AddressDTO } from "../../../../../domain/entities/Address";
import { Label } from "../../../../../domain/entities/frontEntities";
import { eventCategories } from "../../../../../domain/entities/Event";

import AddressMapOpen from "../../../common/mapComps/AddressMapOpen";
import { AddressInputOpen } from "../../../common/mapComps/AddressInputOpen";
import NavBarTop from "../../../common/NavBarTop";
import SubHeader from "../../../common/SubHeader";
import { DateChip } from "../../../common/SmallComps";
import { ImageBtn } from "../../../common/ImageBtn";
import { dayMS, formatDateForDB, getDefaultImage, getLabel } from "../../../../views/viewsEntities/utilsService";

export function EventForm(props: { formik: any, Address: AddressDTO, setAddress: any }) {
    const { formik, Address, setAddress } = props;
    const pourcentParticipants = Math.floor((formik.values.Participants?.length) / formik.values.participantsMin * 100) || 0;
    const today = new Date(new Date().getTime() + (1 * dayMS)).toISOString().slice(0, 16).replace('Z', '');

    ///// BLOB FUNCTION 
    const imgCategory = getDefaultImage(formik.values.category || '');
    const [img] = useState<string>(formik.values.image ? formik.values.image : imgCategory);
    const [imgBlob, setImgBlob] = useState<string | undefined>(img);

    //// ADDRESS GPS FUNCTION
    useEffect(() => {
        setAddress(Address)
        Address && (formik.values.Address = Address);
        console.log('Address', Address)
    }, [Address]);

    const { image, title, category, description, start, end, participantsMin, Participants } = formik.values;
    const label = category ? getLabel(category, eventCategories) : '';

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
                            onChange={(val: any) => {
                                formik.values.category = val;
                                !formik.values.image && setImgBlob(getDefaultImage(val || ''));
                            }}>
                            {eventCategories.map((category: Label, index: number) => {
                                return (
                                    <Option className={`rounded-full my-1 capitalize`}
                                        value={category.value}
                                        key={index} >
                                        {category.label}
                                    </Option>);
                            })}
                        </Select>
                    </div>
                </header>
                <main className='flex flex-1 pb-1 pt-[1.5rem]'>
                    <Card className=" w-respLarge FixCard !relative !z-10">
                        <CardHeader className="FixCardHeader lg:max-h-[20vh]">
                            <div className={`${start ? 'ChipDiv !justify-end' : 'hidden'}`}>
                                <DateChip start={start} end={start} prefix={start ? 'Début' : ''} />
                            </div>
                            <ImageBtn
                                className="!absolute z-40 !h-max bottom-0 !left-3 mb-1"
                                formik={formik}
                                setImgBlob={setImgBlob}
                                imgDef={imgCategory} />
                            <img
                                src={imgBlob || './load.gif'}
                                alt={title || 'image'}
                                width={100}
                                height={100}
                                className={image || imgBlob ? "h-full w-full object-cover" : "hidden"}
                            />

                        </CardHeader>
                        <CardBody className='FixCardBody'>
                            <div className='CardOverFlow gap-3'>
                                <Input
                                    label={formik.errors.title ? formik.errors.title as string : "titre"}
                                    name="title" variant="standard"
                                    onChange={formik.handleChange}
                                    error={formik.errors.title ? true : false}
                                    defaultValue={title} />
                                <div className='flex flex-col lg:flex-row gap-5 h-full'>
                                    <div className='flex flex-col flex-1 pb-2'>
                                        <Textarea rows={1} resize={true} variant="standard"
                                            label={formik.errors.description ? formik.errors.description as string : "Description"} error={formik.errors.description ? true : false} name="description" onChange={formik.handleChange} className=" focus:outline-none min-h-full  "
                                            defaultValue={description}
                                            containerProps={{ className: "grid h-full" }}
                                            labelProps={{ className: "before:content-none after:content-none" }} />
                                    </div>
                                    <div className="flex flex-1 flex-col lg:pt-3 ">

                                        {(Address.lat && Address.lng) ?
                                            <AddressMapOpen address={Address} /> : ''}

                                        <div className='relative z-50'>
                                            <AddressInputOpen
                                                address={Address}
                                                setAddress={setAddress}
                                                error={formik.errors.Address} />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex gap-[2vw] pt-4'>
                                    <div className='flex flex-col flex-1 !max-w-[40vw] overflow-auto pt-1'>
                                        <Input type="datetime-local"
                                            label={formik.errors.start ? formik.errors.start as string : "date de debut"}
                                            error={formik.errors.start ? true : false}
                                            name="start" variant="standard"
                                            onChange={formik.handleChange}
                                            min={today}
                                            defaultValue={`${start && formatDateForDB(start)}`} />
                                    </div>
                                    <div className='flex flex-col flex-1 !max-w-[40vw] overflow-auto pt-1'>
                                        <Input type="datetime-local"
                                            min={today}
                                            defaultValue={end && formatDateForDB(end)}
                                            label={formik.errors.end ? formik.errors.end as string : "date de fin"}
                                            error={formik.errors.end ? true : false}
                                            name="end" variant="standard"
                                            onChange={formik.handleChange} />
                                    </div>
                                </div>
                                <div className='flex w-full gap-[10%]  pt-1'>
                                    <div className='flex flex-col w-full max-w-[30rem]'>
                                        <Input type='number'
                                            label={formik.errors.participantsMin ? formik.errors.participantsMin as string : "participants minimum"}
                                            name="participantsMin"
                                            error={formik.errors.participantsMin ? true : false}
                                            variant="standard"
                                            onChange={formik.handleChange}
                                            defaultValue={participantsMin} />
                                    </div>
                                    <div className={"flex items-center  gap-1 flex-col justify-center w-full"}>
                                        <div className="mb-2 flex  w-full items-center justify-between gap-4">
                                            <Typography color="blue-gray" variant="small">
                                                {pourcentParticipants > 0 && `Particpants inscrits` ||
                                                    pourcentParticipants >= 100 && `validé` || `aucun inscrit`}
                                            </Typography>
                                            <Typography color="blue-gray" variant="small"
                                                className={pourcentParticipants <= 0 || pourcentParticipants >= 100 ? 'hidden' : ''}>
                                                {Participants?.length}  /  {participantsMin}
                                            </Typography>
                                        </div>
                                        <Progress
                                            value={pourcentParticipants} size="md"
                                            color={pourcentParticipants === 100 ? "green" : "cyan"} />
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </main>
                <footer className="w-respLarge">
                    <Button
                        type="submit" size="lg"
                        className="lgBtn w-full rounded-full" >
                        enregistrer
                    </Button>
                </footer>
            </form>
        </>
    );
}
