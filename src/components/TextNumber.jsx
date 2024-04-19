import { useState, useId } from 'react';
import { BGCOLORS, BORDERCOLORS, ZeroValue } from '../scripts/Utilities';

export default function TextNumber({title, id, value, min, max, color, innerClass, outerClass, onChange}) {
    let [ formValue, setFormValue ] = useState(ZeroValue(value, 0));
    let [ formId, setFormId ] = useState(id || useId());

    function ChangeValue(e) {
        let newValue = Number(e.target.value) || 0;

        setFormValue(newValue);
        if (onChange) onChange(newValue);
    }

    return (
        <label htmlFor={formId} className={`input input-bordered flex items-stretch px-0 ${BORDERCOLORS[color] || BORDERCOLORS.default} ${outerClass || ""}`}>
            <div className={`title_3 min-w-[20%] rounded-l-md flex items-center justify-center pl-2 ${BGCOLORS[color] || BGCOLORS.default}`}>{ZeroValue(title, "Text")}</div>
            <input type="number" id={formId} name={formId} value={formValue} min={(min==0)?0:min || -5000} max={(max==0)?0:max || 10000000} onChange={ChangeValue} className={`grow flex items-center px-2 ${innerClass || ""}`} />
        </label>
    );
}