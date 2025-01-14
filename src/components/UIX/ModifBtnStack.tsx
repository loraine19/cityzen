import { useState } from "react";
import { ConfirmModal } from "./ConfirmModal";
import { action } from "../../domain/entities/frontEntities";
import { Icon } from "./SmallComps";

type ModifBtnStackProps = {
    actions: action[];
    icon3?: boolean;
    disabled1?: boolean;
    disabled2?: boolean;
    update?: () => void;
}

export default function ModifBtnStack(props: ModifBtnStackProps) {
    const { actions, disabled1, disabled2, update } = props;
    const [buttons] = useState<action[]>(actions);
    const [icon3] = useState<boolean>(props.icon3 ? true : false);
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0)
    return (
        <div className="flex gap-2 items-center  w-full">
            <ConfirmModal
                open={open}
                handleOpen={() => setOpen(false)}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={() => {
                    buttons[index].function();
                    setOpen(false)
                    update && update()
                }}
                title={buttons[index].title as string}
                element={buttons[index].body as any} />

            <div className={`flex gap-2 items-center`}>
                <Icon icon={buttons[0].icon as string} color={'red'} onClick={() => { setOpen(true), setIndex(0) }}
                    bg size="2xl" style={"shadow rounded-full min-w-min"} disabled={disabled1} title={buttons[0].title as string} />

                <Icon icon={buttons[1].icon as string} color={'orange'} onClick={() => { setOpen(true), setIndex(1) }}
                    bg size="2xl" style={"shadow rounded-full min-w-min "} disabled={disabled2} title={buttons[1].title as string} />

                {icon3 &&
                    <Icon icon={buttons[2].icon as string} color={'cyan'} onClick={() => { setOpen(true), setIndex(2) }}
                        bg size="2xl" style={"shadow rounded-full"} title={buttons[2].title as string} />
                }
            </div></div>
    );
}


