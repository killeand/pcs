import { useState } from 'react';
import Button from './Button';
import _ from 'lodash';
import { BGCOLORS, BORDERCOLORS } from '../scripts/Utilities';
import Text from './InputText';

export default function Modal({ id, title, color, className, innerClass, outerClass, children, type, onClose }) {
    const [formValue, setFormValue] = useState("");

    if (_.isEmpty(id)) console.warn("You must supply an id property for a Modal component, or else you will not be able to call it via window.id.showModal()");
    if (!onClose) console.warn("In order to get a return value, you must provide an onClose property");

    function RenderButtons() {
        switch (type) {
            case MODAL_TYPE.okcancel:
                return (
                    <>
                        <Button color="primary" value="ok" className="flex-grow">OK</Button>
                        <Button color="error" value="cancel" className="flex-grow">Cancel</Button>
                    </>
                );
            case MODAL_TYPE.yesno:
                return (
                    <>
                        <Button color="primary" value="yes" className="flex-grow">YES</Button>
                        <Button color="error" value="no" className="flex-grow">NO</Button>
                    </>
                );
            default:
                return (<Button color="primary" value="ok" className="flex-grow">OK</Button>);
        }
    }

    function CloseModal(e) {
        if (onClose) {
            if (type == MODAL_TYPE.prompt && e.target.returnValue === "ok") onClose(formValue);
            else onClose(e.target.returnValue);
        }

        setFormValue("");
    }

    return (
        <dialog id={id} className={`${className || ""} ${outerClass || ""} modal`} onClose={(e)=>CloseModal(e)}>
            <form method="dialog" className={`modal-box border border-black`}>
                <div className={`flex flex-row p-1 items-center rounded-t-lg border ${BGCOLORS[color] || BGCOLORS.default} ${BORDERCOLORS[color] || BORDERCOLORS.default}`}>
                    <div className="lg-title flex-grow">{(title==0)?"0":title|| "Modal"}</div>
                    <Button className={`bi-x-lg border ${BORDERCOLORS[color] || BORDERCOLORS.default}`} color="error" value="close" />
                </div>
                <div className={`${innerClass || ""} rounded-b-lg border border-t-0 p-0.5 ${BORDERCOLORS[color] || BORDERCOLORS.default}`}>
                    {children || (<p>Dialog Message</p>)}
                    {(type == MODAL_TYPE.prompt) && (
                        <div className="flex mt-3">
                            <Text title="Value" placeholder="Enter new value..." outerClass="flex-grow" value={formValue} color="secondary" onChange={(RetVal)=>setFormValue(RetVal)} />
                        </div>
                    )}
                </div>
                <div className="modal-action">
                    {RenderButtons()}
                </div>
            </form>
        </dialog>
    );
}

export const MODAL_TYPE = {
    ok: 0,
    okcancel: 1,
    yesno: 2,
    prompt: 3
}