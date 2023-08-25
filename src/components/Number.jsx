import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { ulid } from 'ulidx';
import '../styles/Text.css';
import { BGCOLORS, BORDERCOLORS } from '../scripts/Utilities';

export default function Number({title, id, value, min, max, color, className, innerClass, outerClass, onChange}) {
    if (!onChange) console.warn("In order to get the number, you need to assign something to onChange...");
    
    let [ formValue, setFormValue ] = useState(value || 0);
    let [ formId, setFormId ] = useState(id || ulid());

    useEffect(() => {
        setFormValue(value || 0);
    }, [value]);

    function ChangeValue(e) {
        let newValue = parseInt(e.target.value) || 0;

        setFormValue(newValue);
        if (onChange) onChange(newValue);
    }

    return (
        <div className={`text-cont ${className || ""} ${outerClass || ""}`}>
            <label htmlFor={formId} className={`text-label lg-title ${BGCOLORS[color] || BGCOLORS.default} ${BORDERCOLORS[color] || BORDERCOLORS.default}`}>{(title==0)?"0":title || "Number"}</label>
            <input type="number" id={formId} name={formId} value={formValue} min={(min==0)?0:min || -5000} max={(max==0)?0:max || 10000000} className={`text-input ${BORDERCOLORS[color] || BORDERCOLORS.default} ${innerClass || ""}`} onChange={ChangeValue} />
        </div>
    );
}