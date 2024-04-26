import { useState, useId } from 'react';
import { BGCOLORS, BORDERCOLORS, ZeroValue } from '../scripts/Utilities';

export default function InputText({ title, id, value, placeholder, color, innerClass, outerClass, onChange }) {
    let [formValue, setFormValue] = useState(ZeroValue(value));
    let [formId, setFormId] = useState(id || useId());

    function ChangeValue(e) {
        let newValue = e.target.value;

        setFormValue(newValue);
        if (onChange) onChange(newValue);
    }

    return (
        <label htmlFor={formId} className={`input input-sm input-bordered flex items-stretch px-0 ${BORDERCOLORS[color] || BORDERCOLORS.default} ${outerClass || ''}`}>
            <div className={`title_3 flex min-w-[20%] items-center justify-center rounded-l-md px-2 ${BGCOLORS[color] || BGCOLORS.default}`}>{ZeroValue(title, 'Text')}</div>
            <input type='text' id={formId} name={formId} value={formValue} placeholder={placeholder} onChange={ChangeValue} className={`flex grow items-center px-2 ${innerClass || ''}`} />
        </label>
    );
}
