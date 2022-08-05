import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { v1 as uuid } from 'uuid';
import CheckBox from './CheckBox';
import '../styles/CheckList.css';

export default function CheckList({title, id, value, items, className, onChange, ...props}) {
    if (_.isNil(title)) title = "Check List";
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

    function ChangeValue(title, value) {
        let tempItems = null;

        if (value) {
            tempItems = [...formValue];
            tempItems.push(title);
        }
        else {
            tempItems = [...formValue].filter((item)=>(item != title));
        }

        setFormValue(tempItems);
        if (!_.isNil(onChange)) onChange(tempItems);
    }

    function RenderItems() {
        return items.map((item, index) => {
            return (
                <CheckBox key={`${formId}${index}`} title={item} id={`${formId}${index}`} value={HasItem(item)} className="w-5/12 md:w-2/5 lg:w-1/5" onChange={(retval)=>ChangeValue(item, retval)} /> 
            );
        });
    }

    return (
        <div className={`checklist-cont ${className}`}>
            <div className="checklist-title">{title}</div>
            <div className="checklist-group">
                {RenderItems()}
            </div>
        </div>
    );
}