import { Radio, Select, Card, CardHeader, Button, CardBody, Input, Textarea, Option } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { dayMS, Label } from "../../../../../domain/entities/frontEntities";
import NavBarTop from "../../../common/NavBarTop";
import SubHeader from "../../../common/SubHeader";
import { ImageBtn } from "../../../common/ImageBtn";
import { DateChip } from "../../../common/ChipDate";
import { surveyCategories } from "../../../../constants";
import { VoteTarget } from "../../../../../domain/entities/Vote";
import DI from "../../../../../di/ioc";
import { User } from "../../../../../domain/entities/User";
import { ProfileDiv } from "../../../common/SmallComps";

type PoolSurveyFormProps = {
    formik: any;
    type?: VoteTarget;
}
export function VoteForm({ formik, type }: PoolSurveyFormProps) {
    const start = formik.values.createdAt || new Date()
    const end = new Date(new Date().getTime() + (1 * dayMS)).toLocaleDateString('fr-FR')
    formik.values.typeS = type || VoteTarget.SURVEY
    const haveImage = (formik.values.image && formik.values.typeS === VoteTarget.SURVEY) ? true : false;
    const [imgBlob, setImgBlob] = useState<string | undefined>(formik.values.image);
    const getUsers = async () => await DI.resolve('getUsersUseCase').execute();
    const [users, setUsers] = useState<any>([])

    useEffect(() => {
        const cc = async () => {
            setUsers(await getUsers())
        }
        cc()
        console.log(formik.erro, formik.values)
    }, [type, formik.values])



    return (
        <>
            <form onSubmit={formik.handleSubmit} className="flex flex-col h-full gap-3 pb-3">
                <header className="px-4">
                    <NavBarTop />
                    <SubHeader
                        type={formik.values.title ?
                            `Modifier votre ${formik.values.typeS}` : `Créer votre ${formik.values.typeS || 'vote'}`}
                        place={formik.values.title}
                        closeBtn
                    />
                    <div className="w-respLarge">
                        <div className="flex gap-10">
                            <Radio
                                disabled={type ? true : false}
                                name="typeS"
                                label="Sondage"
                                value={VoteTarget.SURVEY}
                                color='orange'
                                checked={formik.values.typeS === VoteTarget.SURVEY}
                                onChange={(e) => {
                                    formik.handleChange(e);
                                }}
                            />
                            <Radio
                                disabled={type ? true : false}
                                name="typeS"
                                label="Cagnotte"
                                value={VoteTarget.POOL}
                                color='orange'
                                checked={formik.values.typeS === VoteTarget.POOL}
                                onChange={(e) => {
                                    formik.handleChange(e);
                                }}
                            />
                        </div>
                        {formik.values.typeS === VoteTarget.SURVEY ?
                            <Select
                                className="rounded-full shadow bg-white border-none capitalize"
                                label={formik.errors.category ? formik.errors.category as string : "Choisir la catégorie"}
                                name={"category"}
                                labelProps={{ className: `${formik.errors.category && "error"} before:border-none after:border-none ` }}
                                value={formik.values.category}
                                onChange={(val: any) => {
                                    formik.setFieldValue('category', val)
                                }} >
                                {surveyCategories.map((category: Label, index: number) => {
                                    return (
                                        <Option
                                            className={category.value === '' ?
                                                "hidden" : "rounded-full my-1 capitalize"}
                                            value={category.value}
                                            key={index}
                                        >
                                            {category.label}
                                        </Option>
                                    )
                                })}
                            </Select> :
                            <Select
                                className="rounded-full shadow bg-white border-none capitalize"
                                label={formik.errors.userIdBenef ? formik.errors.userIdBenef as string : "Choisir le bénéficiaire"}
                                name={"userIdBenef"}
                                labelProps={{ className: `${formik.errors.userIdBenef && "error"} before:border-none after:border-none ` }}
                                value={formik.values?.UseBenef?.id.toString()}
                                onChange={(val: string | undefined) => {
                                    const find = users.find((user: Partial<User>) => user.id === parseInt(val || ''))
                                    formik.values.UserBenef = find
                                    formik.setFieldValue('userIdBenef', val)
                                }} >
                                {users.map((user: Partial<User>, index: number) => {
                                    return (
                                        <Option
                                            className={"rounded-full my-1 capitalize"}
                                            value={user.id?.toString()}
                                            key={index}
                                        >
                                            {user?.Profile?.firstName} {user?.Profile?.lastName}
                                        </Option>
                                    )
                                })}
                            </Select>
                        }
                    </div>
                </header>
                <main className={`flex flex-1 pb-1 ' ${haveImage && "pt-[1.5rem]"}`}>
                    <Card className="w-respLarge FixCard">
                        <CardHeader
                            className={haveImage ?
                                "FixCardHeader" : `FixCardHeaderNoImage !flex-col  !p-4 !-mb-8 min-h-14`}
                            floated={haveImage ? true : false}
                        >
                            <div className={`${start ? 'ChipDiv !justify-end right-4' : 'invisible'}`}>
                                <DateChip
                                    prefix="publié le"
                                    start={start}
                                    end={end} />
                            </div>

                            <ImageBtn
                                className={formik.values.typeS === VoteTarget.SURVEY ?
                                    "!absolute z-40 !h-max !left-3 mb-1" : "hidden"}
                                formik={formik}
                                setImgBlob={setImgBlob} />
                            {haveImage && <img
                                src={imgBlob || formik.values.image || '../../../../public/image/load.gif'}
                                alt={formik.values.title || 'image'}
                                width={100}
                                height={100}
                                className={"h-full w-full object-cover"}
                            />
                            }
                            {formik.values?.typeS === VoteTarget.POOL &&
                                <ProfileDiv
                                    profile={formik.values?.UserBenef?.Profile} />
                            }

                        </CardHeader>

                        <CardBody className='FixCardBody '>
                            <div className='CardOverFlow h-full justify-between gap-4'>
                                <Input
                                    error={formik.errors.title}
                                    label={formik.errors.title ?
                                        formik.errors.title as string : "titre"}
                                    name="title"
                                    variant="standard"
                                    onChange={formik.handleChange}
                                    value={formik.values.title}
                                />
                                <div className='flex flex-col lg:flex-row gap-5 pt-3 h-full '>
                                    <div className='flex flex-col flex-1 pt-1 '>
                                        <Textarea
                                            rows={2}
                                            resize={true}
                                            variant="static"
                                            error={formik.errors.description}
                                            label={formik.errors.description ?
                                                formik.errors.description as string : "Description"}
                                            name="description"
                                            onChange={formik.handleChange}
                                            className="focus:outline-none min-h-full"
                                            value={formik.values.description}
                                            containerProps={{
                                                className: "grid h-full",
                                            }}
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />
                                    </div>
                                </div>

                            </div>
                        </CardBody>
                    </Card>
                </main>
                <footer className="w-respLarge">
                    <Button
                        type="submit"
                        disabled={formik.values.pourcent > 1}
                        className="lgBtn">
                        {formik.values.pourcent > 1 ?
                            'Non modifiable votes en cours  ' + formik.values.pourcent + '%' : `enregistrer`}
                    </Button>
                </footer>
            </form>
        </>
    )
}