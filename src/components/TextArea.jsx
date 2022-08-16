import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { v1 as uuid } from 'uuid';
import '../styles/TextArea.css';

export default function TextArea({title, id, value, className, onChange, ...props}) {
    if (_.isNil(title)) title = "Text Area";
    if (_.isNil(id)) id = "";
    if (_.isNil(value)) value = "";
    if (_.isNil(className)) className = "";
    if (_.isNil(onChange)) console.warn("In order to get the text, you need to assign something to onChange...");
    
    let [ formValue, setFormValue ] = useState(value);
    let [ formId, setFormId ] = useState(id);

    useEffect(() => {
        if (_.isEmpty(formId))
            setFormId(uuid());
    }, []);

    useEffect(() => {
        setFormValue(value);
    }, [value]);

    function ChangeValue(e) {
        let newValue = e.target.value;

        setFormValue(newValue);
        if (!_.isNil(onChange)) onChange(newValue);
    }

    return (
        <div className={`textarea-cont ${className}`}>
            <label htmlFor={formId} className="textarea-label">{title}</label>
            <textarea id={formId} name={formId} value={formValue} className="textarea-box" onChange={ChangeValue} />
        </div>
    );
}