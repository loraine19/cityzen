import NavBarTop from '../UIX/NavBarTop';
import SubHeader from '../UIX/SubHeader';
import { useEffect, useState } from 'react';
import { Card, CardBody, Typography, Input, Button, Select, Option, Textarea, CardHeader, Chip, Checkbox } from '@material-tailwind/react'
import { getImageBlob, getLabel, postCategories } from '../../functions/GetDataFunctions';
import { Label } from '../../types/class';

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
                                <Chip value={(new Date(createdAt)).toLocaleDateString('fr-FR')} className={`rounded-full GrayChip h-max flex items-center gap-2 shadow font-medium `}>
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
                                <Input label="titre" name="title" variant="standard" onChange={formik.handleChange} value={title} />
                                <Typography className='text-xs error'>{formik.errors.title as string} </Typography>
                                <div className='flex flex-col lg:flex-row gap-5 pt-3 h-full'>
                                    <div className='flex flex-col flex-1 pt-1'>
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

                                <div className="flex flex-col justify-center pt-4 h-full w-full">
                                    <Typography className='text-xs'>Partager : </Typography>
                                    <div className="flex items-center gap-[10%]">
                                        <Checkbox type="checkbox" name="share" value="PHONE" color="orange" label="telephone" onChange={formik.handleChange} checked={checkShare("phone")} />
                                        <Checkbox type='checkbox' color="orange" name="share" value="EMAIL" label="email" onChange={formik.handleChange} checked={checkShare("email")} />
                                    </div>
                                    <Typography className='text-xs error'>{formik.errors.share as string} </Typography>
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