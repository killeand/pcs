import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { v1 as uuid } from 'uuid';
import '../styles/Select.css';

export default function Select({title, id, value, items, arrow, className, onChange, ...props}) {
    if (_.isNil(title)) title = "Select";
    if (_.isNil(id)) id = "";
    if (_.isNil(value)) value = 0;
    if (_.isNil(items)) items = [];
    if (_.isNil(arrow)) arrow = "bi-caret-down";
    if (_.isNil(className)) className = "";
    if (_.isNil(onChange)) console.warn("In order to get the index, you need to assign something to onChange...");

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
        let newValue = e.target.selectedIndex;

        setFormValue(newValue);
        if (!_.isNil(onChange)) onChange(newValue);
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