import { Button } from "@material-tailwind/react";
import { getImageBlob } from "../../../infrastructure/services/utilsService";
import { useState } from "react";
import { Icon } from "./SmallComps";



export const ImageBtn = (props: { formik: any, setImgBlob: any, imgDef?: string, className?: string }) => {
    const { formik, imgDef, setImgBlob, className } = props;
    const [imgBlob] = useState<string | any>(formik.values.image);

    return (
        <div className={`relative -mb-1 pb-2 pl-1 z-30 ${className}`}>
            <Button className="!shadow-md w-8 h-12 rounded-full  " ripple={false}>
                <label htmlFor="image"
                    className=" flex flex-col items-center justify-center w-full h-full cursor-pointer">
                    <Icon
                        icon={(imgBlob && formik.values.image) ? "edit" : "add_a_photo"}
                        color="white"
                        style="rounded-full shadow"
                    />
                    <div className="flex flex-col w-full items-center justify-center">
                        <input
                            id="image" type="file" name="image" className="hidden"
                            onChange={(e) => getImageBlob(e, setImgBlob, formik)} />
                    </div>
                </label>
            </Button>
            <Icon
                icon="close"
                size="xl"
                color="red"
                bg
                title={"supprimer l'image"}
                onClick={() => { formik.values.image = ''; setImgBlob(imgDef || '') }}
                style={formik.values.image && formik.values.image !== imgDef ? ` absolute -left-2 !px-1 !py-0  !bg-red-100 bottom-2 z-30` : `hidden`}
            />
        </div>
    );
};
