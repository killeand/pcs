import React, { useState } from 'react';
import _ from 'lodash';
import { ulid } from 'ulidx';
import Button from '../Button';
import '../../styles/SkillRow.css';
import { BORDERCOLORS } from '../../scripts/Utilities';

export default function CSkillRow({title, id, value, color, className, onChange, onDelete}) {
    value = value || [0,0,false,0,0]; // flags, modval, class, rank, misc
    if (!onChange) console.warn("In order to get the Skill Value, you need to assign something to onChange...");
    if (!onDelete) console.warn("onDelete must be set or items cannot be removed...");
    
    let [ formValue, setFormValue ] = useState([value[2],title||"",value[3],value[4]]); // class, title, rank, misc
    let [ formId, setFormId ] = useState(id || ulid());

    function ChangeValue(value, index) {
        let newValue = [...formValue];
        newValue[index] = value;

        setFormValue(newValue);
        if (onChange) onChange(newValue);
    }

    let total = ((formValue[0]&&(formValue[2]>0))?3:0) + formValue[2] + value[1] + formValue[3];
            
    if (((value[0]&2)==2)&&formValue[2]<=0) total = 0;

    return (
        <div className={`sr-cont ${className||""}`}>
            <div className={`col-span-1 sr-center`}><input type="checkbox" checked={formValue[0]} onChange={(e)=>ChangeValue(e.target.checked, 0)} /></div>
            <div className={`col-span-4 sr-input ${BORDERCOLORS[color] || BORDERCOLORS.default}`}><input type="text" value={formValue[1]} onChange={(e)=>ChangeValue(e.target.value, 1)} /></div>
            <div className={`col-span-1 sr-input sr-center ${BORDERCOLORS[color] || BORDERCOLORS.default}`}>{(((value[0]&2)==2)&&formValue[2]<=0)?"-":total}</div>
            <div className={`col-span-2 sr-input ${BORDERCOLORS[color] || BORDERCOLORS.default}`}><input type="number" value={formValue[2]} min={0} max={100} onChange={(e)=>ChangeValue(parseInt(e.target.value), 2)} /></div>
            <div className={`col-span-1 sr-input sr-center ${BORDERCOLORS[color] || BORDERCOLORS.default}`}>{value[1]}</div>
            <div className={`col-span-2 sr-input ${BORDERCOLORS[color] || BORDERCOLORS.default}`}><input type="number" value={formValue[3]} min={-100} max={100} onChange={(e)=>ChangeValue(parseInt(e.target.value), 3)} /></div>
            <div className={`col-span-1 sr-center`}><Button color="error" className="bi-trash text-xs px-1 py-0.5" onClick={onDelete} /></div>
        </div>
    );
}