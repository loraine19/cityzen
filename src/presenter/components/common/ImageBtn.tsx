import { Button } from "@material-tailwind/react";
import { getImageBlob } from "../../../infrastructure/services/utilsService";
import { useState } from "react";



export const ImageBtn = (props: { formik: any, setImgBlob: any, imgCategory?: string }) => {
    const { formik, imgCategory, setImgBlob } = props;
    const [imgBlob] = useState<string | any>(formik.values.image);

    return (
        <>
            <Button className="shadow absolute left-2 bottom-2 w-8 h-12 rounded-full z-20" ripple={false}>
                <label htmlFor="image"
                    className=" flex flex-col items-center justify-center w-full h-full cursor-pointer">
                    <span className="material-symbols-rounded">
                        {(imgBlob && formik.values.image) ? "edit" : "add_a_photo"}
                    </span>
                    <div className="flex flex-col w-full items-center justify-center">
                        <input
                            id="image" type="file" name="image" className="hidden"
                            onChange={(e) => getImageBlob(e, setImgBlob, formik)} />
                    </div>
                </label>
            </Button>
            <Button type='button' variant='text' ripple={false} color="red" className={formik.values.image ? `p-1 absolute left-10 bottom-0 z-30 rounded-full shadow` : `hidden`}
                onClick={() => { formik.values.image = ''; setImgBlob(imgCategory || ''); }}>
                <span className="material-symbols-rounded !text-2xl">cancel</span>
            </Button>
        </>
    );
};
