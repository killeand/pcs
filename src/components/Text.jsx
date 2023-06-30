import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { ulid } from 'ulidx';
import '../styles/Text.css';

export default function Text({title, id, value, placeholder, className, onChange}) {
    title = title || "Text";
    id = id || "";
    value = value || ((value == 0) ? 0 : "");
    className = className || "";
    if (!onChange) console.warn("In order to get the text, you need to assign something to onChange...");
    
    let [ formValue, setFormValue ] = useState(value);
    let [ formId, setFormId ] = useState(id);

    useEffect(() => {
        if (_.isEmpty(formId))
            setFormId(ulid());
    }, []);

    useEffect(() => {
        setFormValue(value);
    }, [value]);

    function ChangeValue(e) {
        let newValue = e.target.value;

        setFormValue(newValue);
        if (onChange) onChange(newValue);
    }

    return (
        <div className={`text-cont ${className}`}>
            <label htmlFor={formId} className="text-label">{title}</label>
            <input type="text" id={formId} name={formId} value={formValue} placeholder={placeholder} className="text-input" onChange={ChangeValue} />
        </div>
    );
}