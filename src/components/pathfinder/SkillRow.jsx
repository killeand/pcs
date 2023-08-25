import React, { useState } from 'react';
import _ from 'lodash';
import { ulid } from 'ulidx';
import { PF_STATS_SHORT } from '../../scripts/Pathfinder';
import '../../styles/SkillRow.css';
import { BORDERCOLORS } from '../../scripts/Utilities';

export default function SkillRow({title, id, value, color, className, onChange}) {
    value = value || [0,0,0,0,false,0,0]; // flags, penalty, mod, modval, class, rank, misc
    if (!onChange) console.warn("In order to get the Skill Value, you need to assign something to onChange...");
    
    let [ formValue, setFormValue ] = useState([value[4],title||"",value[5],value[6]]); // class, title, rank, misc
    let [ formId, setFormId ] = useState(id || ulid());

    function ChangeValue(value, index) {
        let newValue = [...formValue];
        newValue[index] = value;

        setFormValue(newValue);
        if (onChange) onChange(newValue);
    }

    let total = ((formValue[0]&&(formValue[2]>0))?3:0) + formValue[2] + value[3] + formValue[3];
            
    if ((value[0]&1)==1) total -= value[1];
    if (((value[0]&2)==2)&&formValue[2]<=0) total = 0;

    return (
        <div className={`sr-cont ${className||""}`}>
            <div className={`col-span-1 sr-center`}><input type="checkbox" checked={formValue[0]} onChange={(e)=>ChangeValue(e.target.checked, 0)} /></div>
            <div className={`col-span-3 sr-label`}>{formValue[1]} {((value[0]&1)==1)?"*":""} {((value[0]&2)==2)?<>&dagger;</>:""}</div>
            <div className={`col-span-2 sr-label text-right`}>{PF_STATS_SHORT[value[2]]}</div>
            <div className={`col-span-1 sr-input sr-center ${BORDERCOLORS[color] || BORDERCOLORS.default}`}>{(((value[0]&2)==2)&&formValue[2]<=0)?"-":total}</div>
            <div className={`col-span-2 sr-input ${BORDERCOLORS[color] || BORDERCOLORS.default}`}><input type="number" value={formValue[2]} min={0} max={100} onChange={(e)=>ChangeValue(parseInt(e.target.value), 2)} /></div>
            <div className={`col-span-1 sr-input sr-center ${BORDERCOLORS[color] || BORDERCOLORS.default}`}>{value[3]}</div>
            <div className={`col-span-2 sr-input ${BORDERCOLORS[color] || BORDERCOLORS.default}`}><input type="number" value={formValue[3]} min={-100} max={100} onChange={(e)=>ChangeValue(parseInt(e.target.value), 3)} /></div>
        </div>
    );
}