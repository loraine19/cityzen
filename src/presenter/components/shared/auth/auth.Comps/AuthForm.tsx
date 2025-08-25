import { Card, CardBody, Typography, Input, CardFooter, Checkbox, Button, CardHeader } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import PopUp from '../../../common/PopUp';
import { Icon } from '../../../common/IconComp';
import { FormikProps } from 'formik';
import { useUserStore } from '../../../../../application/stores/user.store'
import DI from '../../../../../di/ioc';
import { InputError } from '../../../common/adaptatersComps/input';

type AuthFormProps = {
    lead: string;
    notif: string;
    popOverContent: string;
    popOverButtonText: string;
    popOverClass: string;
    submitText: string;
    confirm?: boolean;
    checkbox?: boolean;
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
    checkbox,
    formik,
    hidden = false,
    inError = false
}: AuthFormProps) => {
    const passwordType = { value: 'password', icon: 'visibility' }
    const textType = { value: 'text', icon: 'visibility_off' }
    const [passWordInput, setPassWordInput] = useState<{ value: string, icon: string }>(passwordType)
    const [passWordInput2, setPassWordInput2] = useState<{ value: string, icon: string }>(passwordType)
    useEffect(() => { hidden && formik.resetForm() && (formik.values = {}) }, [hidden])
    const { setIsLoggedIn } = useUserStore()
    const toggleInputStyle = (inputState: { value: string, icon: string }, setInputState: React.Dispatch<React.SetStateAction<{ value: string, icon: string }>>) => {
        setInputState(inputState.value === 'password' ? textType : passwordType);
    }

    const googleAuth = async () => await DI.resolve('googleAuthUseCase').execute()
    const hiddeImage = (): string => { if (window.innerHeight < 780) return "hidden"; else return "" }
    window.addEventListener('resize', () => {
        hiddeImage()
    })


    return (
        <form onSubmit={formik.handleSubmit} className='main'>
            <div className='flex md:flex-row  flex-1 items-center h-full gap-8 wRespXL px-[2%] pt-8 pb-2 w-full'>

                <Card className={`border-blue-gray-200 !hidden md:!flex flex-[50%] FixCardNoImage !p-8`} >
                    <div className="absolute rounded-xl inset-0 bg-black/10   z-0" />
                    <img src="image/welcome.jpg"
                        alt="connexion"
                        className="absolute inset-0 object-cover object-center w-full h-full rounded-xl opacity-90 z-0" />
                    <Typography
                        color="white"
                        className="py-6 px-8 !leading-[1] text-[2.5rem] font-bold !text-center font-comfortaa relative z-10"
                        style={{ textShadow: "0px 1px 4px #000000" }} >
                        Connecter vous à votre Quartier
                    </Typography>
                </Card>
                <Card className="md:flex-[50%] overflow-auto min-h-38 !h-full !w-full !flex flex-1 FixCardNoImage">
                    <CardHeader
                        className="FixCardHeaderNoImage h-max w-full px-6 py-5 !flex flex-col"
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
                    <CardBody className='FixCardBody  !flex overflow-auto'>
                        <div className='flex flex-col gap-[1.5vh] w-full px-4 pt-2'>
                            <Input
                                labelProps={{ className: "before:content-none after:content-none" }}
                                className={`inputStandart ${formik?.errors.email ? 'error' : ''}`}
                                placeholder={"Email"}
                                name="email"
                                onChange={formik.handleChange}
                                data-cy="email-input" />
                            <InputError error={formik?.errors.email} />
                            <Input
                                labelProps={{ className: "before:content-none after:content-none" }}
                                className={`inputStandart ${formik?.errors.password ? 'error' : ''}`}
                                icon={
                                    <Icon onClick={() => toggleInputStyle(passWordInput, setPassWordInput)}
                                        size='xl'
                                        icon={passWordInput.icon} />
                                }
                                error={!!formik?.errors.password}
                                placeholder={"Mot de passe"}
                                name="password"
                                onChange={formik.handleChange}
                                type={passWordInput.value}
                                data-cy="password-input" />
                            <InputError error={formik?.errors.password} />
                            <div className={!confirm ? "hidden" : ""}>
                                <Input
                                    labelProps={{ className: "before:content-none after:content-none" }}
                                    className={`inputStandart ${formik?.errors.passwordConfirm ? 'error' : ''}`}
                                    icon={
                                        <Icon onClick={() =>
                                            toggleInputStyle(passWordInput2, setPassWordInput2)}
                                            icon={passWordInput2.icon}
                                            size='xl' />
                                    }
                                    placeholder={"Confirmer le mot de passe"}
                                    name="passwordConfirm"
                                    type={passWordInput2.value}
                                    onChange={formik.handleChange}
                                    data-cy="password-confirm-input" />
                                <InputError mt error={formik?.errors.passwordConfirm} />
                            </div>
                        </div>
                        <div className={`flex pt-8 min-h-44  px-4 ${hiddeImage()} justify-center `}>
                            <Card className={`!flex  md:!hidden !min-h-24 FixCardNoImage`} >
                                <img
                                    src="image/welcome.jpg"
                                    alt="connexion"
                                    className="absolute inset-0 object-cover w-full h-full rounded-xl  z-0   object-center" />
                            </Card>
                        </div>
                    </CardBody>
                    <CardFooter className={`flex flex-col !py-6`}>
                        <Typography className={`${!checkbox ? "hidden" : 'text-xs error'}`} >
                            {typeof formik.errors.checkbox === 'string' && formik.errors.checkbox}
                        </Typography>
                        <div className={`${!checkbox ? "hidden" : "flex justify-center  items-center"} `}>
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
                        <div className='flex flex-col gap-4 pb-2'>
                            <Button
                                data-cy="submit-button"
                                type="submit"
                                color="cyan"
                                size="md"
                                className=" w-[90%] m-auto rounded-full">
                                {submitText}
                            </Button>
                            <Button
                                size="md"
                                variant="outlined"
                                color="gray"
                                className=" !relative flex max-h-10 px-4 items-center justify-center rounded-full w-[90%] m-auto "
                                onClick={async () => {
                                    setIsLoggedIn(true)
                                    await googleAuth()
                                }}>
                                <img
                                    src="image/google.svg"
                                    alt="metamask"
                                    className="h-6 w-6 !absolute left-2" />
                                {submitText} avec Google
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </form>
    )
}
