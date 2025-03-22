import { Card, CardBody, Typography, Input, CardFooter, Checkbox, Button, CardHeader } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import PopUp from '../../../common/PopUp';
import { Icon } from '../../../common/IconComp';
import { FormikProps } from 'formik';

type AuthFormProps = {
    lead: string;
    notif: string;
    popOverContent: string;
    popOverButtonText: string;
    popOverClass: string;
    submitText: string;
    confirm: boolean;
    formik: FormikProps<any>;
    hidden?: boolean;
    inError?: boolean;
};

export const AuthForm: React.FC<AuthFormProps> = ({
    lead,
    notif,
    popOverContent,
    popOverButtonText,
    popOverClass,
    submitText,
    confirm,
    formik,
    hidden = false,
    inError = false
}: AuthFormProps) => {
    const passwordType = { value: 'password', icon: 'visibility' }
    const textType = { value: 'text', icon: 'visibility_off' }
    const [passWordInput, setPassWordInput] = useState<{ value: string, icon: string }>(passwordType)
    const [passWordInput2, setPassWordInput2] = useState<{ value: string, icon: string }>(passwordType)
    useEffect(() => { hidden && formik.resetForm() && (formik.values = {}) }, [hidden])

    const toggleInputStyle = (inputState: { value: string, icon: string }, setInputState: React.Dispatch<React.SetStateAction<{ value: string, icon: string }>>) => {
        setInputState(inputState.value === 'password' ? textType : passwordType);
    }

    return (
        <div className='flex justify-center items-center h-full w-resp pt-6'>
            <Card className=" flex FixCardNoImage !gap-0 ">
                <form
                    onSubmit={formik.handleSubmit}
                    className="flex flex-col h-full gap-2 ">
                    <CardHeader className="FixCardHeaderNoImage flex-col !h-max px-4 !pt-4"
                        floated={false}>
                        <Typography
                            variant="h5">
                            {lead}
                        </Typography>
                        <Typography
                            data-cy="notif-text"
                            className={`text-sm ${inError ? "error" : ""}`}>
                            {notif}
                        </Typography>
                    </CardHeader>

                    <CardBody className='FixCardBody gap-3 min-h-24'>
                        <Input
                            size='md'
                            error={!!formik?.errors.email}
                            label={typeof formik?.errors.email === 'string' ? formik?.errors.email : "Email"}
                            name="email"
                            variant="standard"
                            onChange={formik.handleChange}
                            data-cy="email-input"
                        />
                        <Input
                            size='md'
                            icon={
                                <Icon
                                    onClick={() => toggleInputStyle(passWordInput, setPassWordInput)}
                                    size='2xl'
                                    icon={passWordInput.icon}
                                    style='!-mt-2 -ml-4' />
                            }
                            error={!!formik?.errors.password}
                            label={typeof formik?.errors.password === 'string' ? formik?.errors.password : "Mot de passe"}
                            name="password"
                            variant="standard"
                            onChange={formik.handleChange}
                            type={passWordInput.value}
                            data-cy="password-input"
                        />
                        <div className={!confirm ? "hidden" : ""}>
                            <Input
                                size='md'
                                icon={
                                    <Icon onClick={() => toggleInputStyle(passWordInput2, setPassWordInput2)}
                                        icon={passWordInput2.icon}
                                        size='2xl'
                                        style='!-mt-2 -ml-4' />

                                }
                                error={!!formik.errors.passwordConfirm}
                                label={typeof formik?.errors.passwordConfirm === 'string' ?
                                    formik?.errors.passwordConfirm : "Confirmer le mot de passe"}
                                name="passwordConfirm"
                                type={passWordInput2.value}
                                variant="standard"
                                onChange={formik.handleChange}
                                data-cy="password-confirm-input"
                            />
                        </div>
                    </CardBody>

                    <CardFooter className="flex flex-col  !py-4">
                        <Typography className='text-xs error'>
                            {typeof formik.errors.checkbox === 'string' && formik.errors.checkbox}
                        </Typography>
                        <div className=" flex  justify-center items-center  ">
                            <Checkbox
                                data-cy="terms-checkbox"
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
                            data-cy="submit-button"
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
