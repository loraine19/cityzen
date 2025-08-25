import { useState, useEffect } from "react";
import { Select, Card, CardHeader, Button, Typography, CardBody, Input, Textarea, Progress, Option } from "@material-tailwind/react";
import { Label } from "../../../../../domain/entities/frontEntities";
import AddressMapOpen from "../../../common/mapComps/AddressMapOpen";
import { AddressInputOpen } from "../../../common/mapComps/AddressInputOpen";
import SubHeader from "../../../common/SubHeader";
import { ImageBtn } from "../../../common/ImageBtn";
import { dayMS, formatDateForDB, getLabel } from "../../../../views/viewsEntities/utilsService";
import { eventCategories, EventImage } from "../../../../constants";
import { AddressDTO } from "../../../../../infrastructure/DTOs/AddressDTO";
import { DateChip } from "../../../common/ChipDate";
import { Icon } from "../../../common/IconComp";
import GroupSelect from "../../../common/GroupSelect";
import { useUserStore } from "../../../../../application/stores/user.store";
import { InputError } from "../../../common/adaptatersComps/input";

interface EventFormProps {
    formik: any;
    Address: AddressDTO;
    setAddress: any
}

export function EventForm({ formik, Address, setAddress }: EventFormProps) {
    const pourcentParticipants = Math.floor((formik.values.Participants?.length) / formik.values.participantsMin * 100) || 0;
    const today = new Date(new Date().getTime() + (1 * dayMS)).toISOString().slice(0, 16).replace('Z', '');
    const [groupId, setGroupId] = useState<number | String | undefined>(formik.values.Group?.id);
    const user = useUserStore((state) => state.user);

    ///// BLOB FUNCTION ;
    const imgCategory = EventImage[formik.values.category as keyof typeof EventImage] || EventImage.default
    const [imgBlob, setImgBlob] = useState<string>(formik.values.image ?? imgCategory);

    //// ADDRESS GPS FUNCTION
    useEffect(() => {
        setAddress(Address)
        if (Address) {
            formik.values.Address = Address
        }
    }, [Address]);

    const { image, title, category, description, start, end, participantsMin, Participants, id } = formik.values;
    const label = category ? getLabel(category, eventCategories) : '';

    return (
        <form onSubmit={formik.handleSubmit} className="flex h-full flex-col overflow-hidden">
            <main>
                <div className="sectionHeader gap-2">
                    <SubHeader
                        type={id ? 'Modifier mon évenement ' : 'Créer mon évenement '}
                        place={category ? label : ''} closeBtn />
                    <div className="w-respLarge flex flex-col lg:flex-row !gap-4 pt-3 pb-2">
                        <Select className='rounded-full shadow bg-white border-none capitalize'
                            label={formik?.errors?.category ? formik?.errors?.category as string : "Choisir la catégorie"}
                            name={"category"}
                            error={formik.errors.category ? true : false}
                            labelProps={{ className: `before:border-none after:border-none` }}
                            value={category || ''}
                            onChange={(val: any) => {
                                formik.values.category = val;
                                !formik.values.image && setImgBlob(EventImage[val as keyof typeof EventImage || EventImage.default]);
                            }}>
                            {eventCategories.map((category: Label, index: number) => {
                                return (
                                    <Option
                                        className={`rounded-full my-1 capitalize`}
                                        value={category.value}
                                        key={index} >
                                        {category.label}
                                    </Option>);
                            })}
                        </Select>
                        <GroupSelect
                            groupId={groupId?.toString()}
                            setGroupId={setGroupId}
                            formik={formik}
                            user={user} />
                    </div>
                </div>
                <section className="flex flex-1 pt-6 relative overflow-hidden">
                    <Card className="w-respLarge FixCard !relative !z-10">
                        <CardHeader className="FixCardHeader">
                            <div className={`${start ? 'ChipDiv !justify-end' : 'hidden'}`}>
                                <DateChip
                                    start={start}
                                    end={start}
                                    prefix={start ? 'Début' : ''} />
                            </div>
                            <ImageBtn
                                className="!absolute z-40 !h-max bottom-0 !left-3 mb-1"
                                formik={formik}
                                setImgBlob={setImgBlob}
                                imgDef={imgCategory} />
                            <img
                                onError={(e) => e.currentTarget.src = '/images/eventDefault.png'}
                                src={imgBlob || formik.values.blob || './load.gif'}
                                alt={title || 'image'}
                                width={100}
                                height={100}
                                className={image || imgBlob ? "h-full w-full object-cover" : "hidden"} />
                        </CardHeader>
                        <CardBody className='FixCardBody '>
                            <div className='CardOverFlow gap-3 lg:gap-2'>
                                <Input
                                    className={`inputStandart ${formik.errors.title ? 'error' : ''}`}
                                    labelProps={{ className: "before:content-none after:content-none" }}
                                    placeholder={"Titre"}
                                    name="title"
                                    onChange={formik.handleChange}
                                    defaultValue={title} />
                                <InputError error={formik.errors.title} />
                                <div className='flex flex-col lg:flex-row gap-5 h-full'>
                                    <div className='flex flex-col flex-1'>
                                        <Textarea
                                            className={`inputStandart min-h-full placeholder:pt-3 ${formik.errors.description ? 'error' : ''}`}
                                            labelProps={{ className: "before:content-none after:content-none" }}
                                            placeholder='Description'
                                            rows={1}
                                            resize={true}
                                            name="description"
                                            onChange={formik.handleChange}
                                            defaultValue={description}
                                            containerProps={{ className: "grid h-full" }}
                                        />
                                        <InputError mt error={formik.errors.description} />
                                    </div>
                                    <div className="flex flex-1 flex-col lg:pt-2 ">
                                        {((Address?.lat && Address?.lng)) ?
                                            <AddressMapOpen address={Address} /> : ''}

                                        <div className='relative z-50'>
                                            <AddressInputOpen
                                                address={Address}
                                                setAddress={setAddress}
                                                error={formik.errors.Address} />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex gap-[2vw] '>
                                    <div className='flex flex-col flex-1 !max-w-[40vw] overflow-auto pb-1'>
                                        <Input
                                            labelProps={{ className: "before:content-none after:content-none" }}
                                            className={`inputStandart ${formik.errors.start ? 'error' : ''}`}
                                            type="datetime-local"
                                            placeholder={"date de debut"}
                                            name="start"
                                            onChange={formik.handleChange}
                                            min={today}
                                            defaultValue={start && formatDateForDB(start)} />
                                        <InputError error={formik.errors.start} tips={'Date de début'} mt />
                                    </div>
                                    <div className='flex flex-col flex-1 !max-w-[40vw] overflow-auto pb-1'>
                                        <Input
                                            labelProps={{ className: "before:content-none after:content-none" }}
                                            className={`inputStandart ${formik.errors.end ? 'error' : ''}`}
                                            type="datetime-local"
                                            min={today}
                                            defaultValue={end && formatDateForDB(end)}
                                            placeholder={"date de fin"}
                                            name="end"
                                            onChange={formik.handleChange} />
                                        <InputError mt error={formik.errors.end} tips={'Date de fin'} />
                                    </div>
                                </div>
                                <div className='flex w-full gap-[10%]  '>
                                    <div className='flex flex-col w-full max-w-[30rem]'>
                                        <Input
                                            labelProps={{ className: "before:content-none after:content-none" }}
                                            className={`inputStandart ${formik.errors.participantsMin ? 'error' : ''}`}
                                            type='number'
                                            placeholder={"Participants minimum"}
                                            name="participantsMin"
                                            onChange={formik.handleChange}
                                            defaultValue={participantsMin} />
                                        <InputError mt error={formik.errors.participantsMin} tips={'Participants minimum'} />
                                    </div>
                                    <div className={"flex items-center  gap-1 flex-col justify-center w-full"}>
                                        <div className="mb-2 flex  w-full items-center justify-between gap-4">
                                            <Typography
                                                color="blue-gray"
                                                variant="small">
                                                {pourcentParticipants > 0 && `Particpants inscrits` ||
                                                    pourcentParticipants >= 100 && `validé` || `aucun inscrit`}
                                            </Typography>
                                            <Typography
                                                color="blue-gray"
                                                variant="small"
                                                className={pourcentParticipants <= 0 || pourcentParticipants >= 100 ? 'hidden' : ''}>
                                                {Participants?.length}  /  {participantsMin}
                                            </Typography>
                                        </div>
                                        <Progress
                                            label={``}
                                            value={pourcentParticipants}
                                            size="md"
                                            color={pourcentParticipants === 100 ? "green" : "cyan"} />
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </section>
            </main>
            <footer className="CTA">
                <Button
                    color='cyan'
                    type="submit"
                    size="lg"
                    className="lgBtn w-full rounded-full" >
                    <Icon
                        size='lg'
                        color='white'
                        icon={id ? 'edit' : 'add'} />
                    {id ? 'Modifier' : 'Créer'}
                </Button>
            </footer>
        </form>
    );
}
