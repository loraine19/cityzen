import { useState } from "react";

interface ModalProps {
    title: string;
    description: string;
    openModal: boolean;
    getModalResult: (result: boolean) => void;
}

export default function Modal(props: ModalProps) {
    const { title } = props;
    const { description } = props;
    const { openModal } = props;
    const { getModalResult } = props;

    const [open, setOpen] = useState<boolean>(openModal);
    const cancel = () => {
        setOpen(!open);
        getModalResult(false);
    };
    const confirm = () => {
        setOpen(!open);
        getModalResult(true);
    };

    return (
        <>
            {open === true && (
                <div className="bg-gray-200 backdrop-blur-md bg-opacity-20 absolute z-50 h-full w-full flex justify-center items-center top-0 left-0 ">
                    <div className="flex flex-col w-full md:w-[60%] lg:w-[50%] xl:w-[500px] mx-4 rounded-lg bg-white p-4 shadow-lg">
                        <h1 className="text-2xl font-bold border-b-[1px] border-gray-400 pb-4">{title}</h1>
                        <p className="py-4 ">{description}</p>
                        <div className="flex gap-2 justify-end">
                            <button className="bg-white rounded-full px-4 py-3" onClick={cancel}>
                                Annuler
                            </button>
                            <button className="bg-green-800 text-white rounded-full px-4 py-3" onClick={confirm}>
                                Confirmer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
