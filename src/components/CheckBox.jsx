import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { v1 as uuid } from 'uuid';
import '../styles/CheckBox.css';

export default function CheckBox({title, id, value, className, onChange, ...props}) {
    if (_.isNil(title)) title = "CheckBox";
    if (_.isNil(id)) id = "";
    if (_.isNil(value)) value = false;
    if (_.isNil(className)) className = "";
    if (_.isNil(onChange)) console.warn("In order to get the boolean, you need to assign something to onChange...");

    let [ formValue, setFormValue ] = useState(value);
    let [ formId, setFormId ] = useState(id);

    useEffect(() => {
        if (_.isEmpty(formId))
            setFormId(uuid());
    }, []);

    function ChangeValue(e) {
        let value = e.target.checked;

        setFormValue(value);
        if (!_.isNil(onChange)) onChange(value, title);
    }

    return (
        <div className={`checkbox-cont ${className}`}>
            <input type="checkbox" id={formId} name={formId} value={title} className="checkbox-input" checked={formValue} onChange={ChangeValue} />
            <label htmlFor={formId} className="checkbox-label">{title}</label>
        </div>   
    );
}