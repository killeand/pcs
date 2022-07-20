import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { v1 as uuid } from 'uuid';
import '../styles/Text.css';

export default function Text({title, id, value, className, onChange, ...props}) {
    if (_.isNil(title)) title = "Text";
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

    function ChangeValue(e) {
        let newValue = e.target.value;

        setFormValue(newValue);
        if (!_.isNil(onChange)) onChange(newValue);
    }

    return (
        <div className={`text-cont ${className}`}>
            <label htmlFor={formId} className="text-label">{title}</label>
            <input type="text" id={formId} name={formId} value={formValue} className="text-input" onChange={ChangeValue} />
        </div>
    );
}