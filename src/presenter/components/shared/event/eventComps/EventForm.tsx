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

export function EventForm(props: { formik: any, Address: AddressDTO, setAddress: any }) {
    const { formik, Address, setAddress } = props;
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
        Address && (formik.values.Address = Address)
    }, [Address]);

    const { image, title, category, description, start, end, participantsMin, Participants } = formik.values;
    const label = category ? getLabel(category, eventCategories) : '';

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col h-full overflow-hidden">
            <main>
                <div className="sectionHeader gap-2">
                    <SubHeader
                        type={title ? 'Modifier mon évenement ' : 'Créer mon évenement'}
                        place={category ? label : ''} closeBtn />
                    <div className="w-respLarge flex flex-col lg:flex-row !gap-4 py-2">
                        <Select className='rounded-full shadow bg-white border-none capitalize'
                            label={formik.errors.category ? formik.errors.category as string : "Choisir la catégorie"}
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
                <section className="flex flex-1 pb-1 pt-6 relative">
                    <Card className="w-respLarge FixCard !relative !z-10">
                        <CardHeader className="FixCardHeaderSmall">
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
                            <div className='CardOverFlow gap-3'>
                                <Input
                                    label={formik.errors.title ? formik.errors.title as string : "titre"}
                                    name="title" variant="standard"
                                    onChange={formik.handleChange}
                                    error={formik.errors.title ? true : false}
                                    defaultValue={title} />
                                <div className='flex flex-col lg:flex-row gap-5 h-full'>
                                    <div className='flex flex-col flex-1 pb-2'>
                                        <Textarea
                                            rows={1}
                                            resize={true}
                                            variant="standard"
                                            label={formik.errors.description ? formik.errors.description as string : "Description"}
                                            error={formik.errors.description ? true : false}
                                            name="description" onChange={formik.handleChange}
                                            className=" focus:outline-none min-h-full  "
                                            defaultValue={description}
                                            containerProps={{ className: "grid h-full" }}
                                            labelProps={{ className: "before:content-none after:content-none" }} />
                                    </div>
                                    <div className="flex flex-1 flex-col lg:pt-3 ">

                                        {(Address?.lat && Address?.lng) ?
                                            <AddressMapOpen address={Address} /> : ''}

                                        <div className='relative z-50'>
                                            <AddressInputOpen
                                                address={Address || formik.values.Address}
                                                setAddress={setAddress}
                                                error={formik.errors.Address} />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex gap-[2vw] pt-4'>
                                    <div className='flex flex-col flex-1 !max-w-[40vw] overflow-auto pt-1'>
                                        <Input
                                            type="datetime-local"
                                            label={formik.errors.start ? formik.errors.start as string : "date de debut"}
                                            error={formik.errors.start ? true : false}
                                            name="start" variant="standard"
                                            onChange={formik.handleChange}
                                            min={today}
                                            defaultValue={`${start && formatDateForDB(start)}`} />
                                    </div>
                                    <div className='flex flex-col flex-1 !max-w-[40vw] overflow-auto pt-1'>
                                        <Input
                                            type="datetime-local"
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
                                        <Input
                                            type='number'
                                            label={formik.errors.participantsMin ? formik.errors.participantsMin as string : "participants minimum"}
                                            name="participantsMin"
                                            error={formik.errors.participantsMin ? true : false}
                                            variant="standard"
                                            onChange={formik.handleChange}
                                            defaultValue={participantsMin} />
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
                        size='xl'
                        color='white'
                        icon={title ? 'edit' : 'add'} />
                    {title ? 'Modifier' : 'Créer'}
                </Button>
            </footer>
        </form>
    );
}
