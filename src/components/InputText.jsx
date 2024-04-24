import { useState, useId } from 'react';
import { BGCOLORS, BORDERCOLORS, ZeroValue } from '../scripts/Utilities';

export default function InputText({ title, id, value, placeholder, color, innerClass, outerClass, onChange }) {
    let [ formValue, setFormValue ] = useState(ZeroValue(value));
    let [ formId, setFormId ] = useState(id || useId());

    function ChangeValue(e) {
        let newValue = e.target.value;

        setFormValue(newValue);
        if (onChange) onChange(newValue);
    }

    return (
        <label htmlFor={formId} className={`input input-sm input-bordered flex items-stretch px-0 ${BORDERCOLORS[color] || BORDERCOLORS.default} ${outerClass || ""}`}>
            <div className={`title_3 min-w-[20%] rounded-l-md flex items-center justify-center pl-2 ${BGCOLORS[color] || BGCOLORS.default}`}>{ZeroValue(title, "Text")}</div>
            <input type="text" id={formId} name={formId} value={formValue} placeholder={placeholder} onChange={ChangeValue} className={`grow flex items-center px-2 ${innerClass || ""}`} />
        </label>
    );
}