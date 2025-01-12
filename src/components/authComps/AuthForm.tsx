import { Card, CardBody, Typography, Input, CardFooter, Checkbox, Button } from '@material-tailwind/react';
import PopUp from "../UIX/PopUp";
import { useEffect, useState } from 'react';

type authFormProps = {
    lead: string,
    notif: string,
    popOverContent: string,
    popOverButtonText: string,
    popOverClass: string,
    popOverVariant: string,
    submitText: string,
    confirm: boolean
    formik: any
    hidden?: boolean
}
export function AuthForm(props: authFormProps) {
    const { lead, notif, popOverContent, popOverButtonText, popOverClass, submitText, confirm, formik, hidden } = props
    const passwordType = { value: 'password', icon: 'visibility' }
    const textType = { value: 'text', icon: 'visibility_off' }
    const [passWordInput, setPassWordInput] = useState<{ value: string, icon: string }>(passwordType)
    const [passWordInput2, setPassWordInput2] = useState<{ value: string, icon: string }>(passwordType)
    useEffect(() => { hidden && formik.resetForm() && (formik.values = {}) }, [hidden])

    return (
        <>
            <Card className="w-respLarge flex h-[calc(100vh-14rem)] p-4">
                <form onSubmit={formik.handleSubmit} className="flex flex-col h-full">
                    <CardBody className={`flex flex-1 flex-col gap-4`}>
                        <Typography variant="lead" color="blue-gray">{lead}</Typography>
                        <Typography className='text-sm'>{notif} </Typography>
                        <Input
                            error={formik?.errors.email}
                            label={formik?.errors.email ? formik?.errors.email : "Email"}
                            name="email"
                            variant="standard"
                            onChange={formik.handleChange}
                            defaultValue={formik.values.email ? formik.values.email : "test@mail.com"}
                        />

                        <Input
                            icon={
                                <span
                                    className="material-symbols-outlined cursor-pointer"
                                    onClick={() => {
                                        passWordInput.value === 'password' ? setPassWordInput(textType) : setPassWordInput(passwordType)
                                    }}
                                >
                                    {passWordInput.icon}
                                </span>
                            }
                            error={formik?.errors.password}
                            label={formik?.errors.password ? formik?.errors.password : "Mot de passe"}
                            name="password"
                            variant="standard"
                            onChange={formik.handleChange}
                            type={passWordInput.value}
                            defaultValue="passwordtest"
                        />
                        <div className={!confirm ? "hidden" : ""}>
                            <Input icon={
                                <span
                                    className="material-symbols-outlined cursor-pointer"
                                    onClick={() => {
                                        passWordInput2.value === 'password' ? setPassWordInput2(textType) : setPassWordInput2(passwordType)
                                    }}
                                >
                                    {passWordInput2.icon}
                                </span>
                            } error={formik.errors.passwordConfirm} label={formik?.errors.passwordConfirm ? formik?.errors.passwordConfirm : "Confirmer le mot de passe"} name="passwordConfirm" type={passWordInput2.value} variant="standard" onChange={formik.handleChange} />
                        </div>
                    </CardBody>
                    <CardFooter className="flex flex-col">
                        <Typography className='text-xs error'>{formik.errors.checkbox} </Typography>
                        <div className=" flex  justify-center items-center  ">

                            <Checkbox
                                type="checkbox" name="checkbox"
                                className={formik.errors.checkbox ? "error bg-red-300/50" : ""}
                                onChange={(e) => { formik.values.checkbox = e.target.checked; console.log(formik.values, formik.errors) }} />
                            <div className=' w-full flex flex-col'>

                                <PopUp variant={"text"} classNames={popOverClass} text={popOverButtonText} content={popOverContent} />
                            </div>
                        </div>

                        <Button type="submit" color="cyan" size="md" className="rounded-full">
                            {submitText}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </>
    )
}