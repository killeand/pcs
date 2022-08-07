import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { v1 as uuid } from 'uuid';
import Button from './Button';
import '../styles/SkillRow.css';

export default function CSkillRow({title, id, value, className, onChange, onDelete, ...props}) {
    if (_.isNil(title)) title = "New Skill";
    if (_.isNil(id)) id = "";
    if (_.isNil(value)) value = [0,0,false,0,0]; // flags, modval, class, rank, misc
    if (_.isNil(className)) className = "";
    if (_.isNil(onChange)) console.warn("In order to get the Skill Value, you need to assign something to onChange...");
    if (_.isNil(onDelete)) console.warn("onDelete must be set or items cannot be removed...");
    
    let [ formValue, setFormValue ] = useState([value[2],title,value[3],value[4]]);
    let [ formId, setFormId ] = useState(id);

    useEffect(() => {
        if (_.isEmpty(formId))
            setFormId(uuid());
    }, []);

    function ChangeValue(value, index) {
        let newValue = [...formValue];
        newValue[index] = value;

        setFormValue(newValue);
        if (!_.isNil(onChange)) onChange(newValue);
    }

    let total = ((formValue[0]&&(formValue[2]>0))?3:0) + formValue[2] + value[1] + formValue[3];
            
    if (((value[0]&2)==2)&&formValue[2]<=0) total = 0;

    return (
        <div className={`sr-cont ${className}`}>
            <div className="col-span-1 sr-center"><input type="checkbox" checked={formValue[0]} onChange={(e)=>ChangeValue(e.target.checked, 0)} /></div>
            <div className="col-span-4 sr-input"><input type="text" value={formValue[1]} onChange={(e)=>ChangeValue(e.target.value, 1)} /></div>
            <div className="col-span-1 sr-input sr-center">{(((value[0]&2)==2)&&formValue[2]<=0)?"-":total}</div>
            <div className="col-span-2 sr-input"><input type="number" min={0} value={formValue[2]} onChange={(e)=>ChangeValue(parseInt(e.target.value), 2)} /></div>
            <div className="col-span-1 sr-input sr-center">{value[1]}</div>
            <div className="col-span-2 sr-input"><input type="number" value={formValue[3]} onChange={(e)=>ChangeValue(parseInt(e.target.value), 3)} /></div>
            <div className="col-span-1 sr-center"><Button color="red" className="bi-trash text-xs px-1 py-0.5" onClick={onDelete} /></div>
        </div>
    );
}