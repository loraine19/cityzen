import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { Icon } from "./IconComp";


export const ImageBtn = (props: { formik: any, setImgBlob: any, imgDef?: string, className?: string }) => {
    const { formik, imgDef, setImgBlob, className } = props;
    const [imgBlob] = useState<string | any>(formik?.values?.image || imgDef || '');

    const getImageBlob = (event: any, setImgBlob: any, formik: any) => {
        let file = event.target.files[0];
        formik.values.image = file as File;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setImgBlob(reader.result as string)
        }
    }

    return (
        <div className={`absolute -mb-1 pb-2 pl-1 z-30 ${className}`}>
            <Button className="!shadow-md w-10 h-10 rounded-full px-0 " ripple={false}>
                <label htmlFor="image"
                    className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                    <Icon
                        icon={(imgBlob && formik.values.image) ? "edit" : "add_a_photo"}
                        color="white"
                        size="2xl"
                        style="rounded-full shadow"
                    />
                    <div className="flex flex-col w-full items-center justify-center">
                        <input
                            id="image"
                            type="file"
                            name="image"
                            className="hidden"
                            onChange={(e) => getImageBlob(e, setImgBlob, formik)} />
                    </div>
                </label>
            </Button>
            <Icon
                icon="close"
                size="lg"
                color="red"
                title={"supprimer l'image"}
                onClick={() => {
                    formik.values.image = '';
                    setImgBlob(imgDef || '')
                }}
                style={formik?.values?.image && formik.values?.image !== imgDef ? `absolute -left-2 !px-1 !py-0  bottom-0 z-30 ` : `hidden`}
            />
        </div>
    );
};
