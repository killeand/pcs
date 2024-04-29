import { useState, useId, useEffect } from "react";
import { BGCOLORS, BORDERCOLORS, ZeroValue } from "../scripts/Utilities";

export default function InputNumber({ title, id, value, min, max, color, innerClass, outerClass, onChange }) {
    let [formValue, setFormValue] = useState(ZeroValue(value, 0));
    let [formId, setFormId] = useState(id || useId());

    useEffect(() => {
        setFormValue(ZeroValue(value, 0));
    }, [value]);

    function ChangeValue(e) {
        let newValue = Number(e.target.value) || 0;

        setFormValue(newValue);
        if (onChange) onChange(newValue);
    }

    return (
        <label htmlFor={formId} className={`input input-sm input-bordered flex items-stretch px-0 ${BORDERCOLORS[color] || BORDERCOLORS.default} ${outerClass || ""}`}>
            <div className={`title_3 flex min-w-[20%] items-center justify-center rounded-l-md px-2 ${BGCOLORS[color] || BGCOLORS.default}`}>{ZeroValue(title, "Text")}</div>
            <input type="number" id={formId} name={formId} value={formValue} min={min == 0 ? 0 : min || -5000} max={max == 0 ? 0 : max || 10000000} onChange={ChangeValue} className={`flex grow items-center px-2 ${innerClass || ""}`} />
        </label>
    );
}
