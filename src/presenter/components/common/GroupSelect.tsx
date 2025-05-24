import { Select, Option } from "@material-tailwind/react"
import { User } from "../../../domain/entities/User"

export default function GroupSelect({ formik, user, setGroupId, groupId }: { formik: any, user: User, setGroupId: any, groupId?: string }) {

    return (
        <Select
            className="rounded-full shadow bg-white border-none capitalize"
            label={formik.errors.groupId ? formik.errors.groupId as string : "Choisir le groupe"}
            name={"groupId"}
            labelProps={{ className: `${formik.errors.groupId && "error"} before:border-none after:border-none ` }}
            value={groupId || formik.values.groupId?.toString() || user.GroupUser[0]?.Group.id.toString()}
            onChange={(val: string | undefined) => {
                formik.setFieldValue('groupId', val)
                formik.groupId = val
                setGroupId(val as string)
            }} >
            {user?.GroupUser?.map((group: any, index: number) => {
                return (
                    <Option
                        className="rounded-full"
                        value={group.Group.id.toString()}
                        key={index}>
                        {group.Group.name}
                    </Option>
                )
            })}
        </Select>
    )
}