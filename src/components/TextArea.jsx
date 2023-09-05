import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { ulid } from 'ulidx';
import '../styles/TextArea.css';
import { BGCOLORS, BORDERCOLORS } from '../scripts/Utilities';

export default function TextArea({title, id, value, color, placeholder, className, innerClass, outerClass, onChange}) {
    if (!onChange) console.warn("In order to get the text, you need to assign something to onChange...");
    
    let [ formValue, setFormValue ] = useState((value==0)?"0":value || "");
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
        <div className={`textarea-cont ${className || ""} ${outerClass || ""}`}>
            <label htmlFor={formId} className={`textarea-label lg-title ${BGCOLORS[color] || BGCOLORS.default} ${BORDERCOLORS[color] || BORDERCOLORS.default}`}>{(title==0)?"0":title || "Text Area"}</label>
            <textarea id={formId} name={formId} value={formValue} placeholder={placeholder} className={`textarea-box ${innerClass || ""} ${BORDERCOLORS[color] || BORDERCOLORS.default}`} onChange={ChangeValue} />
        </div>
    );
}