import { useState } from "react";
import { PF_STATS_SHORT } from "@/scripts/Pathfinder";
import { BORDERCOLORS, ZeroValue } from "@/scripts/Utilities";

export default function SkillRow({ title, id, value, color, className, onChange }) {
    value = value || [0, 0, 0, 0, false, 0, 0]; // flags, penalty, mod, modval, class, rank, misc

    let [formValue, setFormValue] = useState([value[4], ZeroValue(title), value[5], value[6]]); // class, title, rank, misc

    function ChangeValue(value, index) {
        let newValue = [...formValue];
        newValue[index] = value;

        setFormValue(newValue);
        if (onChange) onChange(newValue);
    }

    let total = (formValue[0] && formValue[2] > 0 ? 3 : 0) + formValue[2] + value[3] + formValue[3];

    if ((value[0] & 1) == 1) total -= value[1];
    if ((value[0] & 2) == 2 && formValue[2] <= 0) total = 0;

    return (
        <div className={`grid grid-cols-12 items-center gap-1 px-1 last:rounded-b-sm hover:bg-gradient-to-r hover:from-accent hover:to-base-100 ${className || ""}`}>
            <div className={`col-span-1 justify-center text-center`}>
                <input type="checkbox" checked={formValue[0]} onChange={(e) => ChangeValue(e.target.checked, 0)} />
            </div>
            <div className={`col-span-3 text-xs font-bold capitalize`}>
                {formValue[1]} {(value[0] & 1) == 1 ? "*" : ""} {(value[0] & 2) == 2 ? <>&dagger;</> : ""}
            </div>
            <div className={`col-span-2 text-right text-xs font-bold capitalize`}>{PF_STATS_SHORT[value[2]]}</div>
            <div className={`col-span-1 justify-center border text-center ${BORDERCOLORS[color] || BORDERCOLORS.default}`}>{(value[0] & 2) == 2 && formValue[2] <= 0 ? "-" : total}</div>
            <div className={`col-span-2 border ${BORDERCOLORS[color] || BORDERCOLORS.default}`}>
                <input type="number" className="w-full bg-transparent text-center" value={formValue[2]} min={0} max={100} onChange={(e) => ChangeValue(parseInt(e.target.value), 2)} />
            </div>
            <div className={`col-span-1 justify-center border text-center ${BORDERCOLORS[color] || BORDERCOLORS.default}`}>{value[3]}</div>
            <div className={`col-span-2 border ${BORDERCOLORS[color] || BORDERCOLORS.default}`}>
                <input type="number" className="w-full bg-transparent text-center" value={formValue[3]} min={-100} max={100} onChange={(e) => ChangeValue(parseInt(e.target.value), 3)} />
            </div>
        </div>
    );
}
