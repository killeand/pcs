import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { v1 as uuid } from 'uuid';
import '../styles/TextRow.css';

export default function TextRow({title, id, value, className, onChange, ...props}) {
    if (_.isNil(title)) title = "Text";
    if (_.isNil(id)) id = "";
    if (_.isNil(value)) value = "";
    if (_.isNil(className)) className = "";
    if (_.isNil(onChange)) console.warn("In order to get the text, you need to assign something to onChange...");
    
    let [ rowValue, setRowValue ] = useState(value);
    let [ rowId, setRowId ] = useState(id);

    useEffect(() => {
        if (_.isEmpty(rowId))
            setRowId(uuid());
    }, []);

    function ChangeValue(e) {
        let newValue = e.target.value;

        setRowValue(newValue);
        if (!_.isNil(onChange)) onChange(newValue);
    }

    return (
        <div className={`textrow-cont ${className}`}>
            <label htmlFor={rowId} className="textrow-label">{title}</label>
            <input type="text" id={rowId} name={rowId} value={rowValue} className="textrow-input" onChange={ChangeValue} />
        </div>
    );
}