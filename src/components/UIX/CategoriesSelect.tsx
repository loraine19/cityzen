import { Select, Option } from "@material-tailwind/react";
import { Label } from "../../domain/entities/frontEntities";

type categoriesSelectProps = {
    categoriesArray: string[] | Label[];
    change: (e: any) => void;
    categorySelected?: string;
    disabled?: boolean;
    label?: string;
};
export function CategoriesSelect(props: categoriesSelectProps) {
    const { categoriesArray, change, categorySelected, disabled, label } =
        props;

    return (
        <Select
            className="rounded-full shadow bg-white border-none capitalize "
            size="md"
            label={label}
            name={"categories"}
            containerProps={{
                className: "grid h-8 p-0",
            }}
            labelProps={{ className: " before:border-none after:border-none " }}
            onChange={(e) => {
                change(e);
            }}
            value={categorySelected}
            disabled={disabled}
        >
            {categoriesArray.map((category: any, key: number) => {
                return (
                    <Option
                        className="rounded-full my-1 capitalize "
                        value={typeof category === "string" ? category : category.value}
                        key={key}
                    >
                        {typeof category === "string" ? category : category.label}
                    </Option>
                );
            })}
        </Select>
    );
}
