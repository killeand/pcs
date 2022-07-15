import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { v1 as uuid } from 'uuid';
import '../styles/CheckboxRow.css';

export default function CheckboxRow({className, title, checked, values, onChange, id, ...props}) {
    if (_.isNil(className)) className = "";
    if (_.isNil(checked)) checked = [];
    if (_.isNil(values)) values = [];
    if (_.isNil(title)) title = "Checkboxes";
    if (_.isNil(onChange)) console.warn("In order to get the index, you need to assign something to onChange...");
    if (_.isNil(id)) id = "";

    let [ selectedItems, setSelectedItems ] = useState(checked);
    let [ CheckboxId, setCheckboxId ] = useState(id);

    useEffect(() => {
        if (_.isEmpty(CheckboxId))
            setCheckboxId(uuid());
    }, []);

    function InSelectedItems(item) {
        for (let i = 0; i < selectedItems.length; i++) {
            if (selectedItems[i] == item)
                return true;
        }

        return false;
    }

    function UpdateSelected(e) {
        let tempItems = null;
        let value = e.target.value;

        if (e.target.checked) {
            tempItems = [...selectedItems];
            tempItems.push(value);
        }
        else {
            tempItems = [...selectedItems].filter((item)=>(item != value));
        }

        setSelectedItems(tempItems);
        if (!_.isNil(onChange)) onChange(tempItems);
    }

    function RenderValues() {
        return values.map((item, index) => {
            return (
                <div key={`${CheckboxId}${index}`} className="checkboxrow-item">
                    <input type="checkbox" id={`${CheckboxId}${index}`} name={`${CheckboxId}${index}`} value={item} className="checkboxrow-check" checked={InSelectedItems(item)} onChange={UpdateSelected} />
                    <label htmlFor={`${CheckboxId}${index}`} className="checkboxrow-label">{item}</label>
                </div>    
            );
        });
    }

    return (
        <div className={`checkboxrow-cont ${className}`}>
            <div className="checkboxrow-title">{title}</div>
            <div className="checkboxrow-group">
                {RenderValues()}
            </div>
        </div>
    );
}