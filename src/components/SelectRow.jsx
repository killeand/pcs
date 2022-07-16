import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { v1 as uuid } from 'uuid';
import '../styles/SelectRow.css';

export default function SelectRow({title, id, value, items, arrow, className, onChange, ...props}) {
    if (_.isNil(title)) title = "Select";
    if (_.isNil(id)) id = "";
    if (_.isNil(value)) value = 0;
    if (_.isNil(items)) items = [];
    if (_.isNil(arrow)) arrow = "bi-caret-down";
    if (_.isNil(className)) className = "";
    if (_.isNil(onChange)) console.warn("In order to get the index, you need to assign something to onChange...");

    let [ rowValue, setRowValue ] = useState(value);
    let [ rowId, setRowId ] = useState(id);

    useEffect(() => {
        if (_.isEmpty(rowId))
            setRowId(uuid());
    }, []);

    function ChangeValue(e) {
        let newValue = e.target.selectedIndex;

        setRowValue(newValue);
        if (!_.isNil(onChange)) onChange(newValue);
    }

    function RenderItems() {
        return items.map((item, index) => {
            return (<option key={`${rowId}${index}`} value={index}>{item}</option>);
        });
    }

    return (
        <div className={`selectrow-cont ${className}`}>
            <label htmlFor={rowId} className="selectrow-label">{title}</label>
            <select id={rowId} name={rowId} value={rowValue} className="selectrow-select" onChange={ChangeValue}>
                {RenderItems()}
            </select>
            <div className={`selectrow-end ${arrow}`} />
        </div>
    );
}