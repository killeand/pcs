import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { v1 as uuid } from 'uuid';
import '../styles/Text.css';

export default function Number({title, id, value, min, className, onChange, ...props}) {
    if (_.isNil(title)) title = "Number";
    if (_.isNil(id)) id = "";
    if (_.isNil(value)) value = 0;
    if (_.isNil(min)) min = -5000;
    if (_.isNil(className)) className = "";
    if (_.isNil(onChange)) console.warn("In order to get the number, you need to assign something to onChange...");
    
    let [ formValue, setFormValue ] = useState(value);
    let [ formId, setFormId ] = useState(id);

    useEffect(() => {
        if (_.isEmpty(formId))
            setFormId(uuid());
    }, []);

    function ChangeValue(e) {
        let newValue = parseInt(e.target.value) | 0;

        setFormValue(newValue);
        if (!_.isNil(onChange)) onChange(newValue);
    }

    return (
        <div className={`text-cont ${className}`}>
            <label htmlFor={formId} className="text-label">{title}</label>
            <input type="number" id={formId} name={formId} value={formValue} min={min} className="text-input" onChange={ChangeValue} />
        </div>
    );
}