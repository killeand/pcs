import React, { useState, useId } from 'react';
import { BGCOLORS, BORDERCOLORS, ZeroValue } from '@/scripts/Utilities';

export default function Select({title, id, value, items, color, innerClass, outerClass, onChange}) {
    if (!Array.isArray(items)) throw new Error("The Select component requires the items property to be present, and be of type Array.");

    let [ formValue, setFormValue ] = useState(ZeroValue(value, 0));
    let [ formId, setFormId ] = useState(id || useId());

    function ChangeValue(e) {
        let newValue = e.target.selectedIndex;

        setFormValue(newValue);
        if (onChange) onChange(newValue);
    }

    function RenderItems() {
        return items.map((item, index) => {
            return (<option key={`${formId}${index}`} value={index}>{item}</option>);
        });
    }

    return (
        <label htmlFor={formId} className={`select select-sm select-bordered flex items-stretch px-0 ${BORDERCOLORS[color] || BORDERCOLORS.default} ${outerClass || ""}`}>
            <div className={`title_3 min-w-[20%] rounded-l-md flex items-center justify-center pl-2 ${BGCOLORS[color] || BGCOLORS.default}`}>{ZeroValue(title, "Select")}</div>
            <select id={formId} name={formId} value={formValue} className={`grow flex items-center px-2 rounded-r-md bg-base-100 ${innerClass || ""} ${BORDERCOLORS[color] || BORDERCOLORS.default}`} onChange={ChangeValue}>
                {RenderItems()}
            </select>
        </label>
    );
}