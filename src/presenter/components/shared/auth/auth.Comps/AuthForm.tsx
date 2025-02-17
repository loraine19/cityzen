import { Card, CardBody, Typography, Input, CardFooter, Checkbox, Button, CardHeader } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import PopUp from '../../../common/PopUp';
import { Icon } from '../../../common/SmallComps';

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
        <div className='flex justify-center items-center h-full w-resp pt-6'>
            <Card className=" flex FixCardNoImage !gap-0 ">
                <form onSubmit={formik.handleSubmit} className="flex flex-col h-full gap-2">
                    <CardHeader className="FixCardHeaderNoImage flex-col !h-max px-4 !pt-4" floated={false}>
                        <Typography variant="h5">{lead}</Typography>
                        <Typography className='text-sm'>{notif}</Typography>
                    </CardHeader>

                    <CardBody className='FixCardBody gap-3'>
                        <Input
                            size='md'
                            error={formik?.errors.email}
                            label={formik?.errors.email ? formik?.errors.email : "Email"}
                            name="email"
                            variant="standard"
                            onChange={formik.handleChange}
                        />
                        <Input
                            size='md'
                            icon={
                                <Icon onClick={() => {
                                    passWordInput.value === 'password' ? setPassWordInput(textType) : setPassWordInput(passwordType)
                                }} icon={passWordInput.icon} style='!-mt-4 -ml-4' />
                            }
                            error={formik?.errors.password}
                            label={formik?.errors.password ? formik?.errors.password : "Mot de passe"}
                            name="password"
                            variant="standard"
                            onChange={formik.handleChange}
                            type={passWordInput.value}
                        />
                        <div className={!confirm ? "hidden" : ""}>
                            <Input
                                size='md'
                                icon={
                                    <Icon onClick={() => {
                                        passWordInput2.value === 'password' ? setPassWordInput2(textType) : setPassWordInput2(passwordType)
                                    }} icon={passWordInput2.icon} style='!-mt-4 !-ml-4' />

                                }
                                error={formik.errors.passwordConfirm}
                                label={formik?.errors.passwordConfirm ? formik?.errors.passwordConfirm : "Confirmer le mot de passe"}
                                name="passwordConfirm"
                                type={passWordInput2.value}
                                variant="standard"
                                onChange={formik.handleChange} />
                        </div>
                    </CardBody>

                    <CardFooter className="flex flex-col  !py-4">
                        <Typography className='text-xs error'>{formik.errors.checkbox} </Typography>
                        <div className=" flex  justify-center items-center  ">
                            <Checkbox
                                type="checkbox"
                                name="checkbox"
                                className={formik.errors.checkbox ? "error bg-red-300/50" : ""}
                                onChange={(e: any) => { formik.values.checkbox = e.target.checked }} />
                            <div className=' w-full flex flex-col'>
                                <PopUp
                                    variant={"text"}
                                    classNames={`${popOverClass} rounded-full !py-2`}
                                    text={popOverButtonText}
                                    content={popOverContent} />
                            </div>
                        </div>
                        <Button
                            type="submit"
                            color="cyan"
                            size="md"
                            className=" w-[90%] m-auto rounded-full">
                            {submitText}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}