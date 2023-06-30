import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { ulid } from 'ulidx';
import '../styles/Text.css';

export default function Number({title, id, value, min, className, onChange}) {
    title = title || "Number";
    id = id || "";
    value = value || 0;
    min = min || -5000;
    className = className || "";
    if (!onChange) console.warn("In order to get the number, you need to assign something to onChange...");
    
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
        let newValue = parseInt(e.target.value) | 0;

        setFormValue(newValue);
        if (onChange) onChange(newValue);
    }

    return (
        <div className={`text-cont ${className}`}>
            <label htmlFor={formId} className="text-label">{title}</label>
            <input type="number" id={formId} name={formId} value={formValue} min={min} className="text-input" onChange={ChangeValue} />
        </div>
    );
}