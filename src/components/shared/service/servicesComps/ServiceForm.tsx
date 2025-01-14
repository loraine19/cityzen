import { Radio, Select, Card, CardHeader, Button, Typography, Chip, CardBody, Input, Textarea, Option } from "@material-tailwind/react";
import { useContext, useState, useEffect } from "react";
import UserContext from "../../../../contexts/user.context";
import { Label } from "../../../../domain/entities/frontEntities";
import { GetPoints, serviceCategories, getImageBlob } from "../../../../utils/GetDataFunctions";
import NavBarTop from "../../../common/NavBarTop";
import SubHeader from "../../../common/SubHeader";

export function ServiceForm(props: { formik: any, setValue: (value: string) => void }) {
    const { formik, setValue } = props;
    const { createdAt, title, description, image } = formik.values
    const { userProfile } = useContext(UserContext)
    const haveImage = image ? true : false
    const [imgBlob, setImgBlob] = useState<string>(formik.values.image as string)

    useEffect(() => {
        !imgBlob && setImgBlob(formik.values.image as string)
    }, [formik.values.image, imgBlob])

    const skill: number[] = [0, 1, 2, 3, 4]
    const hard: number[] = [0, 1, 2, 3, 4]
    const [points, setPoints] = useState<number[]>(GetPoints(formik.values, userProfile))

    useEffect(() => {
        setPoints(GetPoints(formik.values, userProfile))
    }, [formik.values.skill, formik.values.hard, formik.values.type])

    const isGet = formik.values.type === 'GET'
    const isDo = formik.values.type === 'DO'

    return (
        <>
            <form onSubmit={formik.handleSubmit} className="flex flex-col h-full gap-3 pb-3">
                <header className="px-4">
                    <NavBarTop />
                    <SubHeader type={formik.values.title ? `Modifier mon service` : "Créer mon service"} place={formik.values.title} closeBtn />
                    <div className="w-respLarge">
                        <div className="flex gap-10">
                            <Radio name="type" label="Demande" value="GET" color='orange' checked={isGet} onChange={formik.handleChange} />
                            <Radio name="type" label="Offre" value="DO" color='cyan' checked={isDo} onChange={formik.handleChange} />
                        </div>
                        <Select className="rounded-full shadow  bg-white border-none capitalize"
                            label={formik.errors.category ? formik.errors.category as string : "Choisir la catégorie"}
                            name={"category"}
                            labelProps={{ className: `${formik.errors.category && "error"} before:border-none after:border-none ` }}
                            value={formik.values.category}
                            onChange={(val: any) => { setValue(val); formik.values.category = val }}
                        >
                            {serviceCategories.map((category: Label, index: number) => {
                                return (
                                    <Option className={category.value === '' ? "hidden" : "rounded-full my-1 capitalize"} value={category.value} key={index} >
                                        {category.label}
                                    </Option>)
                            })}
                        </Select>
                    </div>
                </header>
                <main className={`flex flex-1 pb-1 ' ${haveImage && "pt-[1.5rem]"}`}>
                    <Card className=" w-respLarge FixCard">
                        <CardHeader className={haveImage ? "FixCardHeader " : "FixCardHeader NoImage"}
                            floated={haveImage}>
                            <div className={`${!haveImage ? "relative pb-2" : "absolute top-0 p-2"} h-full   justify-between w-full flex `}>
                                <div className="flex justify-end items-end h-full">
                                    <Button className="shadow  relative bottom-0 w-8 h-12 rounded-full z-20" ripple={false}>
                                        <label htmlFor="image"
                                            className=" flex flex-col items-center justify-center w-full h-full cursor-pointer">
                                            <span className="material-symbols-rounded">{imgBlob ? "edit" : "add_a_photo"}</span>
                                            <div className="flex flex-col w-full items-center justify-center">
                                                <input id="image" type="file" name="image" className="hidden"
                                                    onChange={(e) => getImageBlob(e, setImgBlob, formik)} />
                                            </div>
                                        </label>
                                    </Button>
                                    <Button type='button' variant='text' ripple={false} color="red" className={formik.values.image ? `z-30 rounded-full relative -left-8 -bottom-4` : `hidden`} onClick={() => { formik.values.image = '', setImgBlob('') }}>
                                        <span className="material-symbols-rounded !text-2xl">cancel</span>
                                    </Button>
                                </div>
                                <Typography className='text-xs px-4'>{formik.values.image != formik.values.image && formik.values.image as string} </Typography>
                                <Chip value={(new Date(createdAt ? createdAt : Date.now())).toLocaleDateString('fr-FR')} className={`rounded-full GrayChip h-max flex items-center gap-2 shadow font-medium `}>
                                </Chip>
                            </div>
                            {image &&

                                <img
                                    src={imgBlob}
                                    alt={title}
                                    className="h-full w-full object-cover"
                                />
                            }
                        </CardHeader>
                        <CardBody className='FixCardBody '>
                            <div className='CardOverFlow h-full justify-between gap-4'>
                                <Input label="titre" name="title" variant="standard" onChange={formik.handleChange} value={title} />
                                <Typography className='text-xs error'>{formik.errors.title as string} </Typography>
                                <div className='flex flex-col lg:flex-row gap-5 pt-3 h-full '>
                                    <div className='flex flex-col flex-1 pt-1 '>
                                        <Textarea rows={2} resize={true} variant="static" label="Description" name="description" onChange={formik.handleChange} className=" focus:outline-none min-h-full  "
                                            value={description}
                                            containerProps={{
                                                className: "grid h-full",
                                            }} labelProps={{
                                                className: "before:content-none after:content-none",
                                            }} />
                                        <Typography className='text-xs error pt-2'>{formik.errors.description as string} </Typography>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center pt-4 h-full  ">
                                    <Typography className='text-xs pb-3'>Difficulté du service: </Typography>
                                    <div className="flex gap-9">
                                        <div className="flex flex-1 items-center">
                                            <Select className="shadowborder-none capitalize max-w-20 " variant="standard" label="Compétence" name={"skill"}
                                                labelProps={{
                                                    className:
                                                        " before:border-none after:border-none  "
                                                }}
                                                containerProps={{ className: "min-w-max h-8 " }}
                                                onChange={(e: any) => { formik.values.skill = parseInt(e); setPoints(GetPoints(formik.values, userProfile)) }}
                                                value={formik.values.skill?.toString()}>
                                                {skill.map(
                                                    (skill: number, index: number) => {
                                                        return (
                                                            <Option value={skill.toString()} key={index} >
                                                                {skill}
                                                            </Option>
                                                        )
                                                    }
                                                )}
                                            </Select>
                                        </div>
                                        <div className="flex flex-1 items-center">
                                            <Select className="shadowborder-none capitalize max-w-20 " variant="standard" label="Pénibilité" name={"hard"}
                                                labelProps={{
                                                    className:
                                                        " before:border-none after:border-none border-none "
                                                }}
                                                containerProps={{ className: "min-w-max h-8 " }}
                                                onChange={(e: any) => { formik.values.hard = parseInt(e); setPoints(GetPoints(formik.values, userProfile)) }}
                                                value={formik.values.hard?.toString()}>
                                                {hard.map(
                                                    (hard: number, index: number) => {
                                                        return (
                                                            <Option value={hard?.toString()} key={index} >
                                                                {hard}
                                                            </Option>
                                                        )
                                                    }
                                                )}
                                            </Select></div>
                                        <Chip value={`${points.join(' à ')}  pts`} className="flex-1 GrayChip  lowercase !font-medium  rounded-full h-full flex items-center justify-center gap-2"
                                            icon={<span className={`${formik.values.type === "do" ? " !text-green-500" : "!text-orange-500"} ${userProfile.points > points[0] && "fill"}  material-symbols-outlined flex flex-1 -mt-0.5 `}>fiber_manual_record</span>}>


                                        </Chip>
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