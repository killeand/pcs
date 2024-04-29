import { useState, useId, useEffect } from "react";
import { BGCOLORS, BORDERCOLORS, ZeroValue } from "@/scripts/Utilities";

export default function Select({ title, id, value, items, color, innerClass, outerClass, onChange }) {
    if (!Array.isArray(items)) throw new Error("The Select component requires the items property to be present, and be of type Array.");

    let [formValue, setFormValue] = useState(ZeroValue(value, 0));
    let [formId, setFormId] = useState(id || useId());

    useEffect(() => {
        setFormValue(ZeroValue(value, 0));
    }, [value]);

    function ChangeValue(e) {
        let newValue = e.target.selectedIndex;

        setFormValue(newValue);
        if (onChange) onChange(newValue);
    }

    function RenderItems() {
        return items.map((item, index) => {
            return (
                <option key={`${formId}${index}`} value={index}>
                    {item}
                </option>
            );
        });
    }

    return (
        <label htmlFor={formId} className={`select select-bordered select-sm flex items-stretch px-0 ${BORDERCOLORS[color] || BORDERCOLORS.default} ${outerClass || ""}`}>
            <div className={`title_3 flex min-w-[20%] items-center justify-center rounded-l-md pl-2 ${BGCOLORS[color] || BGCOLORS.default}`}>{ZeroValue(title, "Select")}</div>
            <select id={formId} name={formId} value={formValue} className={`flex grow items-center rounded-r-md bg-base-100 px-2 ${innerClass || ""} ${BORDERCOLORS[color] || BORDERCOLORS.default}`} onChange={ChangeValue}>
                {RenderItems()}
            </select>
        </label>
    );
}
