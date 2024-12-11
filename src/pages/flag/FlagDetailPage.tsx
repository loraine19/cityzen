import { useNavigate, useParams } from 'react-router-dom';
import NavBarTop from '../../components/NavBarTop';
import SubHeader from '../../components/SubHeader';
import { Option, Button, Select, Switch } from '@material-tailwind/react';
import { useContext, useState } from 'react';
import UserContext from '../../contexts/user.context';
import { getCommuns } from '../../functions/GetDataFunctions';

import { flagCategories } from '../../datas/enumsCategories';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { all, flag, } from '../../types/type';
import FlagDetailComp from '../../components/flagComps/FlagDetailComp';
import DataContext from '../../contexts/data.context';
import { ConfirmModal } from '../../components/ConfirmModal';
import parse from 'html-react-parser';
export default function FlagDetailPage() {
    const { id } = useParams()
    const { user } = useContext(UserContext)
    const { data, setDataInLocal } = useContext(DataContext)
    const { posts, events, surveys, pools, services } = data
    const idS = user.id ? user.id : 0
    const elementList: all[] = getCommuns(posts, events, surveys, pools, services);
    const elementFound = elementList.find((element) => (element.type + element.id) === id);
    const elementSelected = elementFound ? elementFound : {} as all;

    const navigate = useNavigate();
    const reasonesArray: string[] = flagCategories;
    const [newFlag, setNewFlag] = useState<flag>({
        user_id: idS,
        target_id: elementSelected.id,
        reason: "",
        active: true,
        element: elementSelected.element,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        type: elementSelected.type
    });


    const formSchema = object({
        reason: string().required("Le type de signalement est obligatoire"),
    })
    const [value, setValue] = useState("");

    const formik = useFormik({
        initialValues: newFlag as flag,
        validationSchema: formSchema,
        onSubmit: values => {
            setNewFlag(values)
            formik.values = values
            setOpen(true)
            value && console.log("avoid compile error ", value)

        }
    });


    const [open, setOpen] = useState(false);
    function saveIssue() {

        data.flags.push(newFlag),
            setDataInLocal({ ...data, flags: [...data.flags] })
    }
    return (
        <div className="Body gray">

            <ConfirmModal
                open={open}
                handleOpen={() => setOpen(false)}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={() => {
                    saveIssue();
                    navigate("/flag")
                    setOpen(false)
                }}
                title={"Confimrer le litige"}
                element={parse((JSON.stringify(formik.values, null, 2).replace(/,/g, "   ",).replace(/"/g, "").replace(/{/g, " : ")).replace(/}/g, "")) as any} />
            <form onSubmit={formik.handleSubmit} className="flex flex-col h-full gap-2 pb-3">
                <header className="px-4">
                    <NavBarTop />
                    <SubHeader type={`Signaler `} place={elementFound ? "un " + elementFound.type : ""} closeBtn />

                    <div className='w-respLarge h-full flex flex-col gap-2'>
                        <div className='flex justify-between items-center px-2'>
                            <Switch label={formik.values.active ? "signalé" : "non signalé"} className='px-2' color='cyan' name="active" onChange={formik.handleChange} checked={formik.values.active} /></div>
                        <Select className={` rounded-full shadow bg-white border-none capitalize`}
                            label={formik.errors.reason ? formik.errors.reason as string : "Raison du signalement"}
                            name="reason"
                            labelProps={{ className: `${formik.errors.reason && "error"} before:border-none after:border-none ` }}
                            value={value}
                            onChange={(val: any) => { setValue(val); formik.values.reason = val; }}
                        >
                            {reasonesArray.map((reason: string, index: number) => {
                                return (
                                    <Option className={reason === "tous" ? "hidden" : "rounded-full my-1 capitalize"} value={reason} key={index} >
                                        {reason}
                                    </Option>)
                            })}
                        </Select>

                    </div>
                </header>

                <main className='flex pb-2'>
                    <FlagDetailComp flag={elementSelected} />
                </main>

                <footer className=" w-respLarge">
                    <Button type="submit" size="lg" className="w-full rounded-full" >
                        {formik.values.active ? "signaler" : "retirer mon signalement"}
                    </Button>
                </footer>
            </form>
        </div >
    )
}