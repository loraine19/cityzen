import { Radio, Select, Card, CardHeader, Button, Typography, Chip, CardBody, Input, Textarea, Option } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Label } from "../../../../../domain/entities/frontEntities";
import SubHeader from "../../../common/SubHeader";
import { Profile } from "../../../../../domain/entities/Profile";
import { useUserStore } from "../../../../../application/stores/user.store";
import { ImageBtn } from "../../../common/ImageBtn";
import { Icon } from "../../../common/IconComp";
import { DateChip } from "../../../common/ChipDate";
import { hardLevels, serviceCategoriesS, skillLevels } from "../../../../constants";
import { ServiceView } from "../../../../views/viewsEntities/serviceViewEntity";
import { ServiceType } from "../../../../../domain/entities/Service";
import GroupSelect from "../../../common/GroupSelect";

export function ServiceForm(props: { formik: any }) {
    const { formik } = props;
    const { user } = useUserStore();

    // DEBUT LOGIQUE CALCUL POUR CHAMPS POINTS ds form
    const [points, setPoints] = useState<string>(formik.values.points?.join(' à ') || '0 à 1');

    useEffect(() => {
        const updatedValues = new ServiceView(formik.values as ServiceView, user)
        formik.setValues(updatedValues);
        setPoints(updatedValues?.points?.join(' à ') || '0 à 1');
    }, [formik.values.hard, formik.values.skill, formik.values.type]);


    const userProfile: Profile = user.Profile;
    const start = formik.values.createdAt || new Date()
    //const end = new Date(new Date().getTime() + (1 * dayMS)).toLocaleDateString('fr-FR')
    const haveImage = formik.values.image ? true : false;
    const [imgBlob, setImgBlob] = useState<string | undefined>(formik.values.image);
    const [groupId, setGroupId] = useState<string | undefined>(formik.values.groupId);

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col h-full overflow-hidden">
            <main>
                <div className="sectionHeader">
                    <SubHeader
                        type={formik.values.id ? `Modifier votre service ` : "Créer votre service "}
                        place={formik.values.title}
                        closeBtn
                    />
                    <div className="w-respLarge flex flex-col lg:flex-row !gap-4 pt-4">
                        <div className="flex lg:flex-[150%]  gap-4 w-full">
                            <div className="flex  bg-white rounded-full pr-6 shadow-sm shadow-blue-gray-500/25 border h-10 gap-6">
                                <Radio
                                    icon={
                                        <Icon
                                            fill
                                            size="lg"
                                            color='sky'
                                            icon='check_circle'
                                        />
                                    }
                                    className="checked:!border-sky-500 checked:border-2"
                                    labelProps={{ className: "text-sm font-normal text-blue-gray-600 -ml-1" }}
                                    disabled={formik.values.statusValue > 0}
                                    name="type"
                                    label="Demande"
                                    value="GET"
                                    checked={formik.values.typeS === ServiceType.GET}
                                    onChange={(e) => { formik.handleChange(e) }}
                                />
                                <Radio
                                    icon={
                                        <Icon
                                            fill
                                            size="lg"
                                            color='sky'
                                            icon='check_circle'
                                        />
                                    }
                                    className="checked:!border-sky-500 checked:border-2"
                                    labelProps={{ className: "text-sm font-normal text-blue-gray-600 -ml-1" }}
                                    disabled={formik.values.statusValue > 0}
                                    name="type"
                                    label="Offre"
                                    value="DO"
                                    checked={formik.values.typeS === ServiceType.DO}
                                    onChange={(e) => { formik.handleChange(e) }}
                                />
                            </div>
                            <Select
                                className="rounded-full  shadow bg-white border-none capitalize"
                                label={formik.errors.category ? formik.errors.category as string : "Choisir la catégorie"}
                                name={"category"}
                                labelProps={{ className: `${formik.errors.category && "error"} before:border-none after:border-none ` }}
                                value={formik.values.category}
                                onChange={(val: any) => {
                                    formik.setFieldValue('category', val)
                                }} >
                                {serviceCategoriesS.map((category: Label, index: number) => {
                                    return (
                                        <Option
                                            className={category.value === '' ?
                                                "hidden" : "rounded-full my-1 capitalize"}
                                            value={category.value}
                                            key={index}
                                        >
                                            {category.label}
                                        </Option>
                                    )
                                })}
                            </Select>
                        </div>
                        <GroupSelect
                            groupId={groupId}
                            setGroupId={setGroupId}
                            formik={formik}
                            user={user} />
                    </div>
                </div>
                <section className={`flex pb-1 flex-1 relative pt-8`}>
                    <Card className={`${haveImage ? "FixCard" : "FixCardNoImage"} w-respLarge`}>
                        <CardHeader className={haveImage ?
                            "FixCardHeader" :
                            "FixCardHeaderNoImage pt-16 pb-0"} >
                            <div className={`${start ? 'ChipDiv !justify-end' : 'invisible'}`}>
                                <DateChip
                                    prefix="publié le"
                                    start={start} />
                            </div>
                            <ImageBtn
                                className="!absolute z-40 !h-max !left-3  top-3"
                                formik={formik}
                                setImgBlob={setImgBlob} />
                            <img
                                onError={(e) => e.currentTarget.src = '/images/placeholder.jpg'}
                                src={imgBlob || formik.values.image || null}
                                alt={formik.values.title || 'image'}
                                width={100}
                                height={100}
                                className={haveImage ? "CardImage" : "hidden"}
                            />
                        </CardHeader>
                        <CardBody className='FixCardBody'>
                            <div className='CardOverFlow h-full justify-between gap-4'>
                                <Input
                                    error={formik.errors.title}
                                    label={formik.errors.title ?
                                        formik.errors.title as string : "titre"}
                                    name="title"
                                    variant="standard"
                                    onChange={formik.handleChange}
                                    value={formik.values.title}
                                />
                                <div className='flex flex-col lg:flex-row gap-5 pt-3 h-full '>
                                    <div className='flex flex-col flex-1 pt-1 '>
                                        <Textarea
                                            rows={2}
                                            resize={true}
                                            variant="static"
                                            error={formik.errors.description}
                                            label={formik.errors.description ?
                                                formik.errors.description as string : "Description"}
                                            name="description"
                                            onChange={formik.handleChange}
                                            className="focus:outline-none min-h-full"
                                            value={formik.values.description}
                                            containerProps={{
                                                className: "grid h-full",
                                            }}
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center pt-4 h-full">
                                    <Typography className='text-xs pb-3'>Difficulté du service: </Typography>
                                    <div className="flex gap-[20%]">
                                        <div className="flex flex-1 items-center">
                                            <Select
                                                variant="standard"
                                                label={"Compétence"}
                                                name={"skill"}
                                                value={formik.values.skill?.toString()}
                                                containerProps={{ className: "min-w-max h-8" }}
                                                labelProps={{
                                                    className: "before:border-none after:border-none"
                                                }}
                                                onChange={(e: any) => {
                                                    formik.setFieldValue('skill', e);
                                                }} >
                                                {skillLevels.map(
                                                    (skill: Label, index: number) => {
                                                        return (
                                                            <Option
                                                                value={skill.value}
                                                                key={index}>
                                                                {skill.label}
                                                            </Option>
                                                        )
                                                    }
                                                )}
                                            </Select>
                                        </div>
                                        <div className="flex flex-1 items-center">
                                            <Select
                                                variant="standard"
                                                label="Pénibilité"
                                                name={"hard"}
                                                labelProps={{
                                                    className: "before:border-none after:border-none border-none"
                                                }}
                                                containerProps={{ className: "min-w-max h-8" }}
                                                onChange={(e: any) => {
                                                    formik.setFieldValue('hard', e);

                                                }}
                                                value={formik.values.hard?.toString()}
                                            >
                                                {hardLevels.map(
                                                    (hard: Label, index: number) => {
                                                        return (
                                                            <Option
                                                                value={hard.value}
                                                                key={index}>
                                                                {hard.label}
                                                            </Option>
                                                        )
                                                    }
                                                )}
                                            </Select>
                                        </div>
                                        <Chip
                                            value={`${points} points`}
                                            className="flex-1 GrayChip lowercase !font-medium rounded-full h-full flex items-center justify-center gap-2 max-w-max px-5"
                                            icon={
                                                <Icon
                                                    color={formik.values.type === "do" ?
                                                        "green" : "orange"}
                                                    icon="toll"
                                                    size="md"
                                                    style=" ml-0.5"
                                                    fill={userProfile?.points > parseInt(points[0])}
                                                />}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </section>
            </main>
            <footer className="CTA">
                <Button
                    size='lg'
                    type="submit"
                    disabled={formik.values.statusValue > 0}
                    className="lgBtn bg-sky-500">
                    <Icon
                        disabled
                        size='xl'
                        color="white"
                        icon={formik.values.statusValue <= 0 ? 'save' : 'block'}
                    />
                    {formik.values.statusValue > 0 ? 'Non modifiable : ' + formik.values.statusS : `enregistrer`}
                </Button>

            </footer>
        </form>
    )
}