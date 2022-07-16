import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { v1 as uuid } from 'uuid';
import '../styles/CheckboxRow.css';

export default function CheckboxRow({title, id, value, items, className, onChange, ...props}) {
    if (_.isNil(title)) title = "Checkboxes";
    if (_.isNil(id)) id = "";
    if (_.isNil(value)) value = [];
    if (_.isNil(items)) items = [];
    if (_.isNil(className)) className = "";
    if (_.isNil(onChange)) console.warn("In order to get the index, you need to assign something to onChange...");

    let [ rowValue, setRowValue ] = useState(value);
    let [ rowId, setRowId ] = useState(id);

    useEffect(() => {
        if (_.isEmpty(rowId))
            setRowId(uuid());
    }, []);

    function HasItem(item) {
        for (let i = 0; i < rowValue.length; i++) {
            if (rowValue[i] == item)
                return true;
        }

        return false;
    }

    function ChangeValue(e) {
        let tempItems = null;
        let value = e.target.value;

        if (e.target.checked) {
            tempItems = [...rowValue];
            tempItems.push(value);
        }
        else {
            tempItems = [...rowValue].filter((item)=>(item != value));
        }

        setRowValue(tempItems);
        if (!_.isNil(onChange)) onChange(tempItems);
    }

    function RenderItems() {
        return items.map((item, index) => {
            return (
                <div key={`${rowId}${index}`} className="checkboxrow-item">
                    <input type="checkbox" id={`${rowId}${index}`} name={`${rowId}${index}`} value={item} className="checkboxrow-check" checked={HasItem(item)} onChange={ChangeValue} />
                    <label htmlFor={`${rowId}${index}`} className="checkboxrow-label">{item}</label>
                </div>    
            );
        });
    }

    return (
        <div className={`checkboxrow-cont ${className}`}>
            <div className="checkboxrow-title">{title}</div>
            <div className="checkboxrow-group">
                {RenderItems()}
            </div>
        </div>
    );
}