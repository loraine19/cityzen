import { Select, Card, CardHeader, Button, Typography, Chip, CardBody, Input, Textarea, Checkbox, Option } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { Label } from "../../../../../domain/entities/frontEntities";
import NavBarTop from "../../../common/NavBarTop";
import SubHeader from "../../../common/SubHeader";
import { getLabel, postCategories } from "../../../../views/viewsEntities/utilsService";
import { getImageBlob } from "../../../common/ImageBtn";


export function AnnounceForm(props: { formik: any, setValue: (value: string) => void }) {
    const { formik, setValue } = props;
    const haveImage = formik.values.image ? true : false
    const checkShare: any = (word: string) => (formik.values?.share?.toString().toLowerCase())?.includes(word)

    ///// BLOB FUNCTION 
    const [imgBlob, setImgBlob] = useState<string>(formik.values.image as string);
    useEffect(() => {
        !imgBlob && setImgBlob(formik.values.image as string)
    }, [formik.values.image, imgBlob])

    //// DESTRUCTURING FORMIK VALUES
    const { createdAt, title, description, category, image } = formik.values
    const label = category ? getLabel(category, postCategories) : ''
    return (
        <>
            <form onSubmit={formik.handleSubmit} className="flex flex-col h-full gap-3 pb-3">
                <header className="px-4">
                    <NavBarTop />
                    <SubHeader type={formik.values.title ? `Modifier mon annonce ` : "Créer mon annonce "} place={category ? label : ""} closeBtn />
                    <div className="w-respLarge">
                        <Select className="rounded-full shadow  bg-white border-none capitalize"
                            label={formik.errors.category ? formik.errors.category as string : "Choisir la catégorie"}
                            name={"category"}
                            labelProps={{ className: `${formik.errors.category && "error"} before:border-none after:border-none ` }}
                            value={category || ""}
                            onChange={(val: any) => { setValue(val); formik.values.category = val }}
                        >
                            {postCategories.map((category: Label, index: number) => {
                                return (
                                    <Option className={"rounded-full my-1 capitalize"} value={category.value} key={index} >
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
                                                <input id="image" type="file" name="image" className="hidden" onChange={(e) => getImageBlob(e, setImgBlob, formik)} />
                                            </div>
                                        </label>
                                    </Button>
                                    <Button type='button' variant='text' ripple={false} color="red" className={formik.values.image ? `z-30 rounded-full relative -left-8 -bottom-4` : `hidden`} onClick={() => { formik.values.image = '', setImgBlob('') }}>
                                        <span className="material-symbols-rounded !text-2xl">cancel</span>
                                    </Button>
                                </div>
                                <Typography className='text-xs px-4'>{formik.values.image != formik.values.image && formik.values.image as string} </Typography>
                                <Chip value={(new Date(createdAt || new Date())).toLocaleDateString('fr-FR')} className={`rounded-full GrayChip h-max flex items-center gap-2 shadow font-medium `}>
                                </Chip>
                            </div>
                            {image &&

                                <img
                                    src={imgBlob}
                                    alt={title}
                                    width={100}
                                    height={100}
                                    className={image || imgBlob ? "h-full w-full object-cover" : "hidden"}
                                />
                            }
                        </CardHeader>

                        <CardBody className='FixCardBody '>
                            <div className='CardOverFlow h-full justify-between gap-4'>
                                <Input label={formik.errors.title ? formik.errors.title as string : "titre"} name="title" variant="standard" onChange={formik.handleChange} value={title} error={formik.errors.title ? true : false} />

                                <div className='flex flex-col lg:flex-row gap-5 pt-3 h-full'>
                                    <div className='flex flex-col flex-1 pt-1'>
                                        <Textarea rows={2} resize={true} variant="static" label={formik.errors.description ? formik.errors.description as string : "Description"} error={formik.errors.description ? true : false} name="description" onChange={formik.handleChange} className=" focus:outline-none min-h-full  "
                                            value={description}
                                            containerProps={{
                                                className: "grid h-full",
                                            }} labelProps={{
                                                className: "before:content-none after:content-none",
                                            }} />
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center pt-4 h-full w-full">
                                    <Typography className={formik.errors.share && "error" + ' text-xs'}>{formik.errors.share ? formik.errors.share as string : "partager "}
                                    </Typography>
                                    <div className="flex items-center gap-[10%]">
                                        <Checkbox type="checkbox" name="share" value="PHONE" color="orange" label="telephone" onChange={formik.handleChange} checked={checkShare("phone")} />
                                        <Checkbox type='checkbox' color="orange" name="share" value="EMAIL" label="email" onChange={formik.handleChange} checked={checkShare("email")} />
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