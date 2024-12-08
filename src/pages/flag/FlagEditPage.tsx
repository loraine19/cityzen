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
import { Flag } from '../../types/class';

export default function FlagEditPage() {
    const { id } = useParams()
    const { user } = useContext(UserContext)
    const { data } = useContext(DataContext)
    const { flags, posts, events, surveys, pools, services } = data
    const idS = user.id ? user.id : 0
    const elementList: all[] = getCommuns(posts, events, surveys, pools, services);
    const elementFound = elementList.find((element) => (element.type + element.id) === id);
    const elementSelected = elementFound ? elementFound : {} as all;


    let found = (flags.find((flag: Flag) => (flag.target + flag.target_id) === id))
    const [selectedFlag] = useState<any>(found ? (found) : (flags[0]))

    const navigate = useNavigate();
    const reasonesArray: string[] = flagCategories;
    const [newFlag, setNewFlag] = useState<flag>({
        user_id: idS,
        target_id: elementSelected.id,
        reason: selectedFlag.reason,
        active: true,
        element: elementSelected.element,
        created_at: new Date(selectedFlag.created_at).toISOString(),
        updated_at: new Date().toISOString(),
        type: elementSelected.type
    });


    const formSchema = object({
        reason: string().required("Le type de signalement est obligatoire"),
    })
    const [value, setValue] = useState("");

    const formik = useFormik({
        initialValues: newFlag,
        validationSchema: formSchema,
        onSubmit: values => {
            setNewFlag(values)
            alert("Flag enregistré : " + JSON.stringify(values, null, 2));
            navigate("/flag")
        }
    });



    return (
        <div className="Body gray">
            <form onSubmit={formik.handleSubmit} className="flex flex-col h-full gap-2 pb-3">
                <header className="px-4">
                    <NavBarTop />
                    <SubHeader type={`Signaler `} place={elementFound ? "un " + elementFound.type : ""} closeBtn />

                    <div className='w-respLarge h-full flex flex-col gap-2'>
                        <div className='flex justify-between items-center px-2'>
                            <Switch label={formik.values.active ? "signalé le " + new Date(selectedFlag.created_at).toLocaleDateString('fr-FR') : "non signalé"} className='px-2' color='cyan' name="active" onChange={formik.handleChange} checked={formik.values.active} /></div>
                        <Select className={` rounded-full shadow bg-white border-none capitalize`}
                            label={formik.errors.reason ? formik.errors.reason as string : selectedFlag.reason}
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
                        {formik.values.active ? "mettre à jour mon signalement" : "retirer mon signalement"}
                    </Button>
                </footer>
            </form>
        </div >
    )
}