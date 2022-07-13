import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { v1 as uuid } from 'uuid';
import '../styles/SelectRow.css';

export default function SelectRow({className, title, value, onChange, id, ...props}) {
    if (_.isNil(className)) className = "";
    if (_.isNil(value)) value = [];
    if (_.isNil(title)) title = "Text";
    if (_.isNil(onChange)) console.warn("In order to get the text, you need to assign something to onChange...");
    if (_.isNil(id)) id = "";

    let [ textvalue, setTextvalue ] = useState(value);
    let [ textId, setTextId ] = useState(id);

    useEffect(() => {
        if (_.isEmpty(textId))
            setTextId(uuid());
    }, []);

    function TextChange(e) {
        let newValue = e.target.value;

        setTextvalue(newValue);
        if (!_.isNil(onChange)) onChange(newValue);
    }

    return (
        <div className={`textrow-cont ${className}`}>
            <label htmlFor={textId} className="textrow-label">{title}</label>
            <input type="text" id={textId} name={textId} value={textvalue} className="textrow-input" onChange={TextChange} />
        </div>
    );
}