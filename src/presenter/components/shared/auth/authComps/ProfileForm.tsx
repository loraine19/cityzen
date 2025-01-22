import { Card, CardHeader, Avatar, Button, CardBody, Typography, Input, Select, Option, List, ListItem, ListItemSuffix, IconButton } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Profile, assistanceLevel } from "../../../../../domain/entities/Profile";
import { getImageBlob } from "../../../../../infrastructure/services/utilsService";
import { AddressInputOpen } from "../../../common/mapComps/AddressInputOpen";
import { Address } from "../../../../../domain/entities/Address";
import { useUserStore } from "../../../../../application/stores/userStore";


interface AddressErrors { zipcode: string, city: string }
export const ProfileForm = (props: { formik: any, user?: Profile, setSkillList?: any }) => {
    const [imgBlob, setImgBlob] = useState<string | Blob | ArrayBuffer | null>('');
    const { formik, setSkillList } = props;
    const { user } = useUserStore()
    const [Address, setAddress] = useState<Address>(formik.values.Address || {} as Address);
    const { image, firstName, lastName, phone, skills } = formik.values;
    const [newSkill, setNewSkill] = useState<string | undefined>()
    let assistanceLevelSelect = assistanceLevel.filter((level: any) => { if (!isNaN(level)) { return level.toString() } }) as string[]

    /// SKILLS FUNCTIONS
    const removeSkill = (skill: string) => {
        formik.values.skills = formik.values.skills.replace(',' + skill, '')
        setSkillList(formik.values.skills.split(','))
    }
    const addSkill = () => {
        formik.values.skills = formik.values.skills ? formik.values.skills + ',' + newSkill : newSkill
        setNewSkill('');
        setSkillList(formik.values.skills.split(','))
    }

    useEffect(() => { formik.values.Address = Address }, [Address])

    return (
        <form onSubmit={formik.handleSubmit} className='flex h-full flex-col gap-2 ' >
            <main className='relative flex flew-1 pt-6 -mt-4'>
                <Card className="w-respLarge h-full justify-between ">
                    <CardHeader className="!bg-transparent shadow-none flex justify-center items-end" floated={true}>
                        <Avatar src={imgBlob ? imgBlob as String : image} alt={image || imgBlob ? firstName : ''}
                            className={"shadow-md BgUser !rounded-full !h-[5rem] !w-[5rem] mb-1 bg-blue-gray-400"} />
                        <div className="flex -ml-8">
                            <Button color="gray" className="p-2.5 rounded-full z-20 mb-1">
                                <label htmlFor="image"
                                    className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                                    <span className="material-symbols-rounded">{image ? 'edit' : 'add_a_photo'}</span>
                                    <div className="flex flex-col w-full items-center justify-center">
                                        <input id="image" type="file" name="image" className="hidden" onChange={(e) => getImageBlob(e, setImgBlob, formik)} />
                                    </div>
                                </label>
                            </Button>
                            <button type='button' className={imgBlob ? `p-0 absolute bottom-0 z-50 right-[calc(50%-4.5rem)] rounded] text-red-500 h-max !text-sm` : `hidden`}
                                onClick={() => { setImgBlob(''), formik.values.image = '' }}>
                                <span className="material-symbols-rounded ">cancel</span>
                            </button>
                        </div>
                        <div className="w-full z-0 absolute left-0 top-10 flex justify-between">
                            <Typography className="!font-light !whitespace-break-spaces max-w-[30vw] !text-xs !text-left">{user.email} </Typography>
                            <Link to="/motdepasse_oublie"
                                className="!font-light !whitespace-break-spaces max-w-[30vw] !text-xs !text-right"
                            >
                                modifier le mot de passe ?
                            </Link>
                        </div>
                    </CardHeader>
                    <CardBody className="flex flex-1 flex-col h-full gap-[4%] pb-4 pt-1.5 overflow-auto !max-h-[calc(100vh-18rem)]">

                        <Input label={formik.errors.firstName ? formik.errors.firstName as string : "Prénom"} name="firstName" variant="standard" onChange={formik.handleChange} value={firstName}
                            error={Boolean(formik.errors.firstName)} />
                        <Input label={formik.errors.lastName ? formik.errors.lastName as string : "Nom"} name="lastName" variant="standard" onChange={formik.handleChange} value={lastName}
                            error={Boolean(formik.errors.lastName)} />
                        <Input label={formik.errors.phone ? formik.errors.phone as string : "Télephone"} name="phone" variant="standard" onChange={formik.handleChange}
                            value={phone}
                            type='tel'
                            error={Boolean(formik.errors.phone)} />
                        <Typography className={`${!formik.errors.Address && 'hidden'} bg-red-500 text-xs error `}>
                            {formik.errors.Address && (formik.errors.Address as AddressErrors).zipcode && (formik.errors.Address as AddressErrors).city ? `${(formik.errors.Address as AddressErrors).zipcode} ${(formik.errors.Address as AddressErrors).city}` : '' as string}
                        </Typography>
                        <AddressInputOpen
                            address={formik.values.Address} setAddress={setAddress} error={Boolean(formik.errors.Address)} />
                        <Select className="p-5 capitaliz " label={formik.errors.assistance ? formik.errors.assistance as string : "Assistance"} name="level" variant='standard'
                            error={Boolean(formik.errors.assistance)}
                            value={formik.values.assistance as string}
                            onChange={(val: any) => { formik.values.assistance = val }}>
                            {assistanceLevelSelect.map((level: string, index: number) => {
                                return (
                                    <Option value={level.toString()} key={index}>
                                        {level}
                                    </Option>
                                )
                            })}
                        </Select>
                        <Input label="Ajouter une compétences" name="skills" value={newSkill} variant="standard"
                            onChange={(e) => { e.preventDefault(); setNewSkill(e.target.value) }}
                            onSubmit={addSkill}
                            icon={<button type='button' onClick={addSkill} className={`material-symbols-rounded !-mt-1 ${newSkill && 'error bg-red-100 rounded-full'}`}>add</button>} />
                        <List className='flex  p-0'>
                            <Typography className='text-xs'>Liste des compétences</Typography>
                            {skills?.split(',').map((skill: string, index: number) =>
                                <ListItem ripple={true} key={index} className="!py-0 px-2 rounded-full text-sm">
                                    {skill}
                                    <ListItemSuffix>
                                        <IconButton variant="text" color="blue-gray"
                                            onClick={() => removeSkill(skill)}>
                                            <span className="material-symbols-rounded !text-xl">close</span>
                                        </IconButton>
                                    </ListItemSuffix>
                                </ListItem>
                            )}
                        </List>
                    </CardBody>
                </Card>
            </main>
            <footer className="w-respLarge pb-2 flex-2">
                <Button type="submit" size="md" className="w-full rounded-full" >
                    modifier mon profile
                </Button>
            </footer>
        </form >
    )
}
