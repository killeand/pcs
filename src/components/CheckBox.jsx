import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { v1 as uuid } from 'uuid';
import '../styles/CheckBox.css';

export default function CheckBox({title, id, value, items, className, onChange, ...props}) {
    if (_.isNil(title)) title = "Check Boxes";
    if (_.isNil(id)) id = "";
    if (_.isNil(value)) value = [];
    if (_.isNil(items)) items = [];
    if (_.isNil(className)) className = "";
    if (_.isNil(onChange)) console.warn("In order to get the index, you need to assign something to onChange...");

    let [ formValue, setFormValue ] = useState(value);
    let [ formId, setFormId ] = useState(id);

    useEffect(() => {
        if (_.isEmpty(formId))
            setFormId(uuid());
    }, []);

    function HasItem(item) {
        for (let i = 0; i < formValue.length; i++) {
            if (formValue[i] == item)
                return true;
        }

        return false;
    }

    function ChangeValue(e) {
        let tempItems = null;
        let value = e.target.value;

        if (e.target.checked) {
            tempItems = [...formValue];
            tempItems.push(value);
        }
        else {
            tempItems = [...formValue].filter((item)=>(item != value));
        }

        setFormValue(tempItems);
        if (!_.isNil(onChange)) onChange(tempItems);
    }

    function RenderItems() {
        return items.map((item, index) => {
            return (
                <div key={`${formId}${index}`} className="checkbox-item">
                    <input type="checkbox" id={`${formId}${index}`} name={`${formId}${index}`} value={item} className="checkbox-check" checked={HasItem(item)} onChange={ChangeValue} />
                    <label htmlFor={`${formId}${index}`} className="checkbox-label">{item}</label>
                </div>    
            );
        });
    }

    return (
        <div className={`checkbox-cont ${className}`}>
            <div className="checkbox-title">{title}</div>
            <div className="checkbox-group">
                {RenderItems()}
            </div>
        </div>
    );
}