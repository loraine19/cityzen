import { Card, CardHeader, Avatar, Button, CardBody, Typography, Input, Select, Option, List, ListItem, ListItemSuffix } from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { assistanceLevel, mailSubscriptions } from "../../../../../domain/entities/Profile";
import { AddressInputOpen } from "../../../common/mapComps/AddressInputOpen";
import { useUserStore } from "../../../../../application/stores/user.store";
import { Label } from "../../../../../domain/entities/frontEntities";
import { ImageBtn } from "../../../common/ImageBtn";
import { Icon } from "../../../common/SmallComps";


export const ProfileForm = (props: {
    formik: any,
    setAssistance?: any,
    setAddress?: any,
    setMailSub?: any,
}) => {
    const { formik, setAssistance, setMailSub, setAddress, } = props;
    const [imgBlob, setImgBlob] = useState<string | Blob>(formik.values.image || './person.svg');
    const { user } = useUserStore()
    const [newSkill, setNewSkill] = useState<string | undefined>()
    const [skillList, setSkillList] = useState<string[]>(formik.values?.skills?.split(',') || [])


    const removeSkill = (skill: string) => {
        formik.values.skills = skillList.filter((sk) => sk !== skill).join(',')
        setSkillList([...skillList.filter((sk) => sk !== skill)])

    }
    const addSkill = () => {
        skillList.push(newSkill as string);
        formik.values.skills = skillList.join(',')
        setSkillList([...skillList])
        setNewSkill('');
    }


    return (
        <form onSubmit={formik.handleSubmit} className='flex h-full flex-col gap-2 ' >
            <main className='relative flex flew-1 pt-6 -mt-4'>
                <Card className="w-respLarge h-full justify-between ">
                    <CardHeader className="!bg-transparent shadow-none flex justify-center items-end" floated={true}>
                        <ImageBtn setImgBlob={setImgBlob} formik={formik} imgDef="./person.svg" className="-mr-9" />
                        <Avatar src={imgBlob as string || formik.values.image} alt={formik.values.image || imgBlob ? formik.values.firstName : ''}
                            className={"shadow-md BgUser !rounded-full !h-[5rem] !w-[5rem] mb-1 bg-blue-gray-400"} />
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
                        <Input label={formik.errors.firstName ? formik.errors.firstName as string : "Prénom"} name="firstName" variant="standard" onChange={formik.handleChange} value={formik.values.firstName}
                            error={formik.errors.firstName} />
                        <Input label={formik.errors.lastName ? formik.errors.lastName as string : "Nom"} name="lastName" variant="standard" onChange={formik.handleChange} value={formik.values.lastName}
                            error={formik.errors.lastName} />
                        <Input label={formik.errors.phone ? formik.errors.phone as string : "Télephone"} name="phone" variant="standard" onChange={formik.handleChange}
                            value={formik.values.phone}
                            type='tel'
                            error={formik.errors.phone} />
                        <AddressInputOpen
                            address={formik.values.Address}
                            setAddress={setAddress}
                            error={formik.errors.Address}
                        />
                        <Select className="p-5 capitaliz "
                            label={formik.errors.mailSub ? formik.errors.mailSub as string : "Notifications mails"} name="mailSub" variant='standard'
                            error={formik.errors.mailSub}
                            value={formik.values.mailSub}
                            onChange={(val: any) => {
                                setMailSub(val);
                                formik.values.maillSub = val
                            }}>
                            {mailSubscriptions.map((label: Label, index: number) => {
                                return (
                                    <Option value={label.value} key={index}>
                                        {label.label}
                                    </Option>
                                )
                            })}
                        </Select>
                        <Select className="p-5 capitaliz " label={formik.errors.assistance ? formik.errors.assistance as string : "Assistance"} name="level" variant='standard'
                            error={formik.errors.assistance}
                            value={formik.values.assistance}
                            onChange={(val: any) => {
                                setAssistance(val);
                                formik.values.assistance = val
                            }}>
                            {assistanceLevel.map((label: Label, index: number) => {
                                return (
                                    <Option value={label.value} key={index}>
                                        {label.label}
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
                            {skillList.map((skill: string, index: number) =>
                                <ListItem ripple={true} key={index} className="!py-1 pl-4 rounded-full text-sm">
                                    {skill}
                                    <ListItemSuffix>
                                        <Icon onClick={() => { removeSkill(skill) }} icon="close" size="xl" />
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
