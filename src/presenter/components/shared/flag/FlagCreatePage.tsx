import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Option, Button, Select, Switch } from '@material-tailwind/react';
import { Flag } from '../../../../domain/entities/Flag';
import { Label } from '../../../../domain/entities/frontEntities';
import { FlagService } from '../../../../domain/repositoriesBase/FlagRepository';
import { PostService } from '../../../../domain/repositoriesBase/PostRepository';
import { ConfirmModal } from '../../common/ConfirmModal';
import NavBarTop from '../../common/NavBarTop';
import SubHeader from '../../common/SubHeader';
import FlagDetailComp from './flagComps/FlagDetailComp';
import { EventApi } from '../../../../infrastructure/providers/http/eventApi';
import { Skeleton } from '../../common/Skeleton';
import { ServiceApi } from '../../../../infrastructure/providers/http/serviceApi';
import { flagReasons, flagTargets, getLabel } from '../../../views/viewsEntities/utilsService';

export default function FlagCreatePage() {
    const { id, target } = useParams()
    const [loading, setLoading] = useState<boolean>(true);
    const [element, setElement] = useState<any>({} as any)
    const label = getLabel(target?.toUpperCase() || '', flagTargets)
    console.log('label', label, target)
    const navigate = useNavigate();
    const [flag, setFlag] = useState<Flag>({} as Flag)
    const { postFlag } = new FlagService()
    const { getEventById, } = new EventApi()
    const { getServiceById } = new ServiceApi()
    const { getPostById } = new PostService()


    const fetch = async () => {
        setLoading(true);
        const idS = id ? parseInt(id) : 0;
        target === "event" && setElement(await getEventById(idS))
        target === "service" && setElement(await getServiceById(idS))
        target === "post" && setElement(await getPostById(idS))
        formik.values.target = target?.toUpperCase()
        formik.values.targetId = idS
        // target === "survey" && setElement(await getSurveyById(idS))
        setLoading(false);
    }
    useEffect(() => { fetch() }, []);
    const formSchema = object({ reason: string().required("Le type de signalement est obligatoire"), })

    const formik = useFormik({
        initialValues: element,
        validationSchema: formSchema,
        onSubmit: values => {
            formik.values = values
            setFlag(values)
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
                    const PostData = { ...formik.values }
                    console.log('PostData', PostData)
                    const ok = await postFlag(PostData)
                    if (ok) { setOpen(false); navigate(`/flag/${ok.target.toString().toLowerCase()}/${ok.targetId}`) }
                }}
                title={"Confimrer le Flag"}
                element={` Vous confirmez le signalement </br>
                    sur  <br>${label} ${element.title} <br> pour le motif <b>${getLabel(flag.reason, flagReasons)}</b>`} />
            <form onSubmit={formik.handleSubmit} className="flex flex-col h-full gap-2 pb-3">
                <header className="px-4">
                    <NavBarTop />
                    <SubHeader type={`Signaler `} place={'un ' + label} closeBtn />

                    <div className='w-respLarge h-full flex flex-col gap-2'>
                        <div className='flex justify-between items-center px-2'>
                            <Switch label={flag.reason ? "signalé" : "non signalé"} className='px-2' color='cyan' name="active" checked={flag.reason ? true : false} /></div>
                        <Select className={` rounded-full shadow bg-white border-none capitalize`}
                            label={formik.errors.reason ? formik.errors.reason as string : "Raison du signalement"}
                            name="reason"
                            labelProps={{ className: `${formik.errors.reason && "error"} before:border-none after:border-none ` }}
                            value={flag.reason as unknown as string || ''}
                            onChange={(val: any) => { formik.values.reason = val; }}
                        >
                            {flagReasons.map((reason: Label, index: number) => {
                                return (
                                    <Option className={reason.value === '' ? "hidden" : "rounded-full my-1 capitalize"} value={reason.value} key={index} >
                                        {reason.label}
                                    </Option>)
                            })}
                        </Select>
                    </div>
                </header>

                <main className='flex pb-2'>
                    {loading ? <Skeleton className='w-respLarge m-auto !h-full !rounded-3xl' /> :
                        <FlagDetailComp flag={flag} element={element} label={label} />}
                </main>

                <footer className=" w-respLarge">
                    <Button type="submit" size="lg" className="w-full rounded-full lgBtn"
                        disabled={formik.values.reason ? true : false}>
                        {formik.values.reason ? `Déja signalé` : `Enregistrer`}
                    </Button>
                </footer>
            </form>
        </div >
    )
}

