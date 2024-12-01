import { Select, Option } from "@material-tailwind/react";

type categoriesSelectProps = {
    categoriesArray: string[];
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
            {categoriesArray.map((category: string, key: number) => {
                return (
                    <Option
                        className="rounded-full my-1 capitalize "
                        value={category}
                        key={key}
                    >
                        {category}
                    </Option>
                );
            })}
        </Select>
    );
}
