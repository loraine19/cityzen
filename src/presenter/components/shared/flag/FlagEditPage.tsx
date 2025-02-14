import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Option, Button, Select, Switch } from '@material-tailwind/react';
import { ConfirmModal } from '../../common/ConfirmModal';
import NavBarTop from '../../common/NavBarTop';
import SubHeader from '../../common/SubHeader';
import FlagDetailComp from './flagComps/FlagDetailComp';
import { Skeleton } from '../../common/Skeleton';
import DI from '../../../../di/ioc';
import { FlagView } from '../../../views/viewsEntities/flagViewEntities';
import { FlagTarget } from '../../../../domain/entities/Flag';
import { flagReasons } from '../../../constants';


export default function FlagEditPage() {
    const { id, target } = useParams()
    const targetKey: FlagTarget = Object.keys(FlagTarget).find(key => FlagTarget[key as keyof typeof FlagTarget] === target) as FlagTarget;
    const navigate = useNavigate();
    const deleteFlag = () => DI.resolve('deleteFlagUseCase').execute(parseInt(id || '0'), targetKey)
    const { flag, isLoading } = DI.resolve('flagByIdViewModel')(parseInt(id || '0'), targetKey)
    //  if (!flag || !flag.targetId) window.location.replace(`/msg?msg=Cette page n'existe pas`)


    const formSchema = object({ reason: string().required("Le type de signalement est obligatoire") })

    const formik = useFormik({
        initialValues: new FlagView(flag),
        validationSchema: formSchema,
        onSubmit: values => {
            formik.values = values
            setOpen(true)
        }
    });

    const [open, setOpen] = useState(false);


    return (
        <div className="Body gray">
            <ConfirmModal
                open={open}
                handleOpen={() => setOpen(false)}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={async () => {
                    await deleteFlag()
                    setOpen(false); navigate('/flag')
                }}
                title={`Confirmer la suppression`}
                element={`<br> Vous confirmez la suppression du signalement </br>
                sur  l'${targetKey} pour le motif ${flag?.reasonS}`} />
            <form onSubmit={formik.handleSubmit} className="flex flex-col h-full gap-2 pb-3">
                <header className="px-4">
                    <NavBarTop />
                    <SubHeader type={`Signaler `} place={'un ' + targetKey} closeBtn />

                    <div className='w-respLarge h-full flex flex-col gap-2'>
                        <div className='flex justify-between items-center px-2'>
                            <Switch label={flag.reason ? "signalé" : "non signalé"} className='px-2' color='cyan' name="active" onChange={formik.handleChange} checked={flag.reason ? true : false} /></div>
                        <Select className={` rounded-full shadow bg-white border-none capitalize`}
                            label={formik.errors.reason ? formik.errors.reason as string : "Raison du signalement"}
                            name="reason"
                            labelProps={{ className: `${formik.errors.reason && "error"} before:border-none after:border-none ` }}
                            value={flag.reason as unknown as string || ''}
                            disabled={flag.reason ? true : false}
                            onChange={(val: any) => { formik.values.reason = val; }}
                        >
                            {flagReasons.map((reason: any, index: number) => {
                                return (
                                    <Option className={reason.value === '' ? "hidden" : "rounded-full my-1 capitalize"} value={reason.value} key={index} >
                                        {reason.label}
                                    </Option>)
                            })}
                        </Select>
                    </div>
                </header>

                <main className='flex pb-2'>
                    {isLoading ?
                        <Skeleton className='w-respLarge m-auto !h-full !rounded-3xl' /> :
                        <FlagDetailComp flag={flag} />}
                </main>

                <footer className="w-respLarge">
                    <Button type="submit" size="lg" className="w-full rounded-full" >
                        retirer mon signalement
                    </Button>
                </footer>
            </form>
        </div >
    )
}

