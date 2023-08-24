import Button from './Button';
import _ from 'lodash';
import { BGCOLORS, BORDERCOLORS } from '../scripts/Utilities';

export default function Modal({ id, title, color, className, innerClass, outerClass, children }) {
    if (_.isEmpty(id)) console.warn("You must supply an id property for a Modal component, or else you will not be able to call it via window.id.showModal()");
    return (
        <dialog id={id} className={`${className || ""} ${outerClass || ""} modal`}>
            <form method="dialog" className={`modal-box border border-black`}>
                <div className={`flex flex-row p-1 items-center rounded-t-lg border ${BGCOLORS[color] || BGCOLORS.default} ${BORDERCOLORS[color] || BORDERCOLORS.default}`}>
                    <div className="lg-title flex-grow">{title || "Modal"}</div>
                    <Button className={`bi-x-lg border ${BORDERCOLORS[color] || BORDERCOLORS.default}`} color="error" />
                </div>
                <div className={`${innerClass || ""} rounded-b-lg border border-t-0 p-0.5 ${BORDERCOLORS[color] || BORDERCOLORS.default}`}>
                    {children}
                </div>
            </form>
        </dialog>
    );
}