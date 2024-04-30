import { useState } from "react";
import Button from "./Button";
import { BGCOLORS, ZeroValue, MODAL_TYPE } from "@/scripts/Utilities";
import InputText from "./InputText";

export default function Modal({ id, title, color, value, valueReset, innerClass, outerClass, children, type, onClose }) {
    const [formValue, setFormValue] = useState(ZeroValue(value));

    function RenderButtons() {
        switch (type) {
            case MODAL_TYPE.okcancel:
                return (
                    <>
                        <Button color="primary" value="ok" className="flex-grow">
                            OK
                        </Button>
                        <Button color="error" value="cancel" className="flex-grow">
                            Cancel
                        </Button>
                    </>
                );
            case MODAL_TYPE.yesno:
                return (
                    <>
                        <Button color="primary" value="yes" className="flex-grow">
                            YES
                        </Button>
                        <Button color="error" value="no" className="flex-grow">
                            NO
                        </Button>
                    </>
                );
            default:
                return (
                    <Button color="primary" value="ok" className="flex-grow">
                        OK
                    </Button>
                );
        }
    }

    function CloseModal(e) {
        if (onClose) {
            if (type == MODAL_TYPE.prompt && e.target.returnValue === "ok") onClose(formValue);
            else onClose(e.target.returnValue);
        }

        if (valueReset) setFormValue("");
    }

    return (
        <dialog id={id} className={`${outerClass || ""} modal`} onClose={(e) => CloseModal(e)}>
            <form method="dialog" className={`modal-box border border-black`}>
                <div className={`flex flex-row items-center rounded-lg p-2 ${BGCOLORS[color] || BGCOLORS.default}`}>
                    <div className="title_3 flex-grow">{ZeroValue(title, "Modal")}</div>
                    <Button className={`bi-x-lg border border-black`} color="error" value="close" />
                </div>
                <div className={`${innerClass || ""} p-0.5`}>
                    {children || <p>Dialog Message</p>}
                    {type == MODAL_TYPE.prompt && (
                        <div className="mt-3 flex">
                            <InputText title="Value" placeholder="Enter new value..." outerClass="flex-grow" value={formValue} color="secondary" onChange={(RetVal) => setFormValue(RetVal)} />
                        </div>
                    )}
                </div>
                <div className="modal-action">{RenderButtons()}</div>
            </form>
            <form method="dialog" className={`modal-backdrop`}>
                <button value="close">close</button>
            </form>
        </dialog>
    );
}
