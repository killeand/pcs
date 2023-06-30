import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { ulid } from 'ulidx';
import '../styles/Select.css';

export default function Select({title, id, value, items, arrow, className, onChange}) {
    title = title || "Select";
    id = id || "";
    value = value || 0;
    items = items || [];
    arrow = arrow || "bi-caret-down";
    className = className || "";
    if (!onChange) console.warn("In order to get the index, you need to assign something to onChange...");

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
        let newValue = e.target.selectedIndex;

        setFormValue(newValue);
        if (onChange) onChange(newValue);
    }

    function RenderItems() {
        return items.map((item, index) => {
            return (<option key={`${formId}${index}`} value={index}>{item}</option>);
        });
    }

    return (
        <div className={`select-cont ${className}`}>
            <label htmlFor={formId} className="select-label">{title}</label>
            <select id={formId} name={formId} value={formValue} className="select-input" onChange={ChangeValue}>
                {RenderItems()}
            </select>
            <div className={`select-end ${arrow}`} />
        </div>
    );
}