import { Card, CardBody, Typography, Input, CardFooter, Checkbox, Button } from "@material-tailwind/react";
import PopUp from "../PopUp";

type authFormProps = {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    lead: string,
    notif: string,
    popOverContent: string,
    popOverButtonText: string,
    popOverClass: string,
    popOverVariant: string,
    checkboxName: string,
    submitText: string,
    errorEmail: any,
    errorPassword: any
    errorCheck: any
    confirm: boolean
    errorConfirm: any
    confirmPassword?: boolean

}
export function AuthForm({ handleChange, handleSubmit, lead, notif, errorEmail, errorPassword, errorCheck, popOverContent, popOverClass, popOverButtonText, checkboxName, submitText, confirm, errorConfirm }: authFormProps) {


    return (
        <>
            <Card className="w-respLarge flex h-[90%] p-4">
                <form onSubmit={handleSubmit} className="flex flex-col h-full">
                    <CardBody className="flex flex-1 flex-col gap-2 ">
                        <Typography variant="lead" color="blue-gray">{lead}</Typography>
                        <Typography className='text-sm'>{notif} </Typography>
                        <Typography className='text-xs error'>{errorEmail} </Typography>
                        <Input label="Email" name="email" variant="standard" onChange={handleChange} defaultValue="test@mail.com" />
                        <Typography className='text-xs error'>{errorPassword} </Typography>
                        <Input label="Mot de passe" name="password" variant="standard" onChange={handleChange} defaultValue="passwordtest" />
                        <div className={!confirm ? "hidden" : ""}>
                            <Typography className='text-xs mb-2 error'>{errorConfirm} </Typography>
                            <Input label="Password Confirm" name="passwordConfirm" variant="standard" onChange={handleChange} /></div>
                    </CardBody>
                    <CardFooter className="py-0 flex flex-col">
                        <div className=" flex  justify-center items-center py-4 ">
                            <Checkbox name={checkboxName} onChange={handleChange} />
                            <div className=' w-full flex flex-col'>
                                <Typography className='text-xs error'>{errorCheck}
                                </Typography>
                                <PopUp variant={"text"} classNames={popOverClass} text={popOverButtonText} content={popOverContent} />
                            </div>
                        </div>

                        <Button type="submit" color="cyan" size="lg" className="rounded-full">
                            {submitText}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </>
    )
}