import { useState } from "react";
import Button from "../Button";
import { BORDERCOLORS, ZeroValue } from "@/scripts/Utilities";

export default function CSkillRow({ title, id, value, color, className, onChange, onDelete }) {
    value = value || [0, 0, false, 0, 0]; // flags, modval, class, rank, misc

    let [formValue, setFormValue] = useState([value[2], ZeroValue(title), value[3], value[4]]); // class, title, rank, misc

    function ChangeValue(value, index) {
        let newValue = [...formValue];
        newValue[index] = value;

        setFormValue(newValue);
        if (onChange) onChange(newValue);
    }

    let total = (formValue[0] && formValue[2] > 0 ? 3 : 0) + formValue[2] + value[1] + formValue[3];

    if ((value[0] & 2) == 2 && formValue[2] <= 0) total = 0;

    return (
        <div className={`grid grid-cols-12 items-center gap-1 px-1 last:rounded-b-sm hover:bg-gradient-to-r hover:from-accent hover:to-base-100 ${className || ""}`}>
            <div className={`col-span-1 justify-center text-center`}>
                <input type="checkbox" checked={formValue[0]} onChange={(e) => ChangeValue(e.target.checked, 0)} />
            </div>
            <div className={`col-span-4 border ${BORDERCOLORS[color] || BORDERCOLORS.default}`}>
                <input type="text" className="w-full bg-transparent text-sm" value={formValue[1]} onChange={(e) => ChangeValue(e.target.value, 1)} />
            </div>
            <div className={`col-span-1 justify-center border text-center ${BORDERCOLORS[color] || BORDERCOLORS.default}`}>{(value[0] & 2) == 2 && formValue[2] <= 0 ? "-" : total}</div>
            <div className={`col-span-2 border ${BORDERCOLORS[color] || BORDERCOLORS.default}`}>
                <input type="number" className="w-full bg-transparent text-center" value={formValue[2]} min={0} max={100} onChange={(e) => ChangeValue(parseInt(e.target.value), 2)} />
            </div>
            <div className={`col-span-1 justify-center border text-center ${BORDERCOLORS[color] || BORDERCOLORS.default}`}>{value[1]}</div>
            <div className={`col-span-2 border ${BORDERCOLORS[color] || BORDERCOLORS.default}`}>
                <input type="number" className="w-full bg-transparent text-center" value={formValue[3]} min={-100} max={100} onChange={(e) => ChangeValue(parseInt(e.target.value), 3)} />
            </div>
            <div className={`col-span-1 justify-center text-center`}>
                <Button color="error" className="bi-trash px-1 py-0.5 text-xs" onClick={onDelete} />
            </div>
        </div>
    );
}
