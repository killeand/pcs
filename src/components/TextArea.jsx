import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { ulid } from 'ulidx';
import '../styles/TextArea.css';

export default function TextArea({title, id, value, className, onChange}) {
    title = title || "Text Area";
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
        <div className={`textarea-cont ${className}`}>
            <label htmlFor={formId} className="textarea-label">{title}</label>
            <textarea id={formId} name={formId} value={formValue} className="textarea-box" onChange={ChangeValue} />
        </div>
    );
}