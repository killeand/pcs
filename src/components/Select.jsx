import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { ulid } from 'ulidx';
import '../styles/Select.css';
import { BGCOLORS, BORDERCOLORS } from '../scripts/Utilities';

export default function Select({title, id, value, items, arrow, color, className, innerClass, outerClass, onChange}) {
    if (!Array.isArray(items)) throw new Error("The Select component requires the items property to be present, and be of type Array.");
    if (!onChange) console.warn("In order to get the index, you need to assign something to onChange...");

    let [ formValue, setFormValue ] = useState(value || 0);
    let [ formId, setFormId ] = useState(id || ulid());

    useEffect(() => {
        setFormValue(value || 0);
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
        <div className={`select-cont ${className || ""} ${outerClass || ""}`}>
            <label htmlFor={formId} className={`select-label lg-title ${BGCOLORS[color] || BGCOLORS.default} ${BORDERCOLORS[color] || BORDERCOLORS.default}`}>{(title==0)?"0":title || "Select"}</label>
            <select id={formId} name={formId} value={formValue} className={`select-input ${innerClass || "bg-base-100"} ${BORDERCOLORS[color] || BORDERCOLORS.default}`} onChange={ChangeValue}>
                {RenderItems()}
            </select>
            <div className={`select-end ${arrow || "bi-caret-down"}`} />
        </div>
    );
}