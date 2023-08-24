import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { ulid } from 'ulidx';
import Button from './Button';
import Accordian from './Accordian';
import '../styles/List.css';
import { BORDERCOLORS } from '../scripts/Utilities';

export default function List({title, id, value, color, className, innerClass, outerClass, onChange}) {
    if (!onChange) console.warn("In order to get the list, you need to assign something to onChange...");
    
    let [ formValue, setFormValue ] = useState(value || []);
    let [ formId, setFormId ] = useState(id || "");

    useEffect(() => {
        if (_.isEmpty(formId))
            setFormId(ulid());
    }, []);

    useEffect(() => {
        setFormValue(value || []);
    }, [value]);

    function ChangeValue(e, index) {
        let tempValue = e.target.value;
        let newValue = [...formValue];
        newValue[index] = tempValue;

        setFormValue(newValue);
        if (onChange) onChange(newValue);
    }

    function AddItem() {
        let newValue = [...formValue];
        newValue.push("");

        setFormValue(newValue);
        if (onChange) onChange(newValue);
    }

    function RemoveItem(index) {
        let newValue = [...formValue];
        newValue.splice(index, 1);

        setFormValue(newValue);
        if (onChange) onChange(newValue);
    }

    function RenderItems() {
        if (formValue.length == 0) {
            return (<p>No items in list...</p>)
        }

        return formValue.map((item, index) => {
            return (
                <div key={`${id}-${index}`} className="list-row">
                    <input type="text" value={item} className={`list-input ${BORDERCOLORS[color] || BORDERCOLORS.default}`} onChange={(e)=>ChangeValue(e, index)} />
                    <Button color="error" className="bi-trash border border-black" onClick={()=>RemoveItem(index)} />
                </div>
            );
        });
    }

    return (
        <Accordian title={title || "List"} titleElements={[
            <div key={`${id}-size`} className="flex items-center">{formValue.length}</div>,
            <Button key={`${id}-add`} color="success" className="bi-plus-circle pointer-events-auto border border-black" onClick={AddItem} />
        ]} className={className || ""} outerClass={outerClass || ""} innerClass={innerClass || ""} color={color}>
            {RenderItems()}
        </Accordian>
    );
}