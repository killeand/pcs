import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { ulid } from 'ulidx';
import '../styles/Text.css';
import { BGCOLORS, BORDERCOLORS } from '../scripts/Utilities';

export default function Text({title, id, value, placeholder, color, className, innerClass, outerClass, onChange}) {
    if (!onChange) console.warn("In order to get the text, you need to assign something to onChange...");
    
    let [ formValue, setFormValue ] = useState(value || "");
    let [ formId, setFormId ] = useState(id || ulid());

    useEffect(() => {
        setFormValue(value || "");
    }, [value]);

    function ChangeValue(e) {
        let newValue = e.target.value;

        setFormValue(newValue);
        if (onChange) onChange(newValue);
    }

    return (
        <div className={`text-cont ${className || ""} ${outerClass || ""}`}>
            <label htmlFor={formId} className={`text-label lg-title ${BGCOLORS[color] || BGCOLORS.default} ${BORDERCOLORS[color] || BORDERCOLORS.default}`}>{(title==0)?"0":title || "Text"}</label>
            <input type="text" id={formId} name={formId} value={formValue} placeholder={placeholder} className={`text-input ${innerClass} ${BORDERCOLORS[color] || BORDERCOLORS.default}`} onChange={ChangeValue} />
        </div>
    );
}