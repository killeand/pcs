import { useState, useId } from 'react';
import { BGCOLORS, BORDERCOLORS, ZeroValue } from '@/scripts/Utilities';

export default function TextArea({title, id, value, color, placeholder, innerClass, outerClass, onChange}) {
    let [ formValue, setFormValue ] = useState(ZeroValue(value, ""));
    let [ formId, setFormId ] = useState(id || useId());

    function ChangeValue(e) {
        let newValue = e.target.value;

        setFormValue(newValue);
        if (onChange) onChange(newValue);
    }

    return (
        <label htmlFor={formId} className={`textarea textarea-bordered flex flex-col p-0 ${BORDERCOLORS[color] || BORDERCOLORS.default} ${outerClass || ""}`}>
            <div className={`title_3 p-2 rounded-t-md ${BGCOLORS[color] || BGCOLORS.default}`}>{ZeroValue(title, "Text Area")}</div>
            <textarea id={formId} name={formId} value={formValue} placeholder={placeholder} className={`rounded-b-md px-2 ${innerClass || ""} ${BORDERCOLORS[color] || BORDERCOLORS.default}`} onChange={ChangeValue} />
        </label>
    );
}