import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { v1 as uuid } from 'uuid';
import Button from './Button';
import Accordian from './Accordian';
import '../styles/List.css';

export default function List({title, id, value, className, onChange, ...props}) {
    if (_.isNil(title)) title = "List";
    if (_.isNil(id)) id = "";
    if (_.isNil(value)) value = [];
    if (_.isNil(className)) className = "";
    if (_.isNil(onChange)) console.warn("In order to get the list, you need to assign something to onChange...");
    
    let [ formValue, setFormValue ] = useState(value);
    let [ formId, setFormId ] = useState(id);

    useEffect(() => {
        if (_.isEmpty(formId))
            setFormId(uuid());
    }, []);

    function ChangeValue(e, index) {
        let tempValue = e.target.value;
        let newValue = [...formValue];
        newValue[index] = tempValue;

        setFormValue(newValue);
        if (!_.isNil(onChange)) onChange(newValue);
    }

    function AddItem() {
        let newValue = [...formValue];
        newValue.push("");

        setFormValue(newValue);
        if (!_.isNil(onChange)) onChange(newValue);
    }

    function RemoveItem(index) {
        let newValue = [...formValue];
        newValue.splice(index, 1);

        setFormValue(newValue);
        if (!_.isNil(onChange)) onChange(newValue);
    }

    function RenderItems() {
        if (formValue.length == 0) {
            return (<p>No items in list...</p>)
        }

        return formValue.map((item, index) => {
            return (
                <div key={`${id}-${index}`} className="list-item">
                    <input type="text" value={item} className="list-input" onChange={(e)=>ChangeValue(e, index)} />
                    <Button color="red" className="bi-trash" onClick={()=>RemoveItem(index)} />
                </div>
            );
        });
    }

    return (
        <Accordian title={title} titleElements={[
            <div key={`${id}-size`} className="flex items-center">{formValue.length}</div>,
            <Button key={`${id}-add`} color="green" className="bi-plus-circle pointer-events-auto" onClick={AddItem} />
        ]} className={className}>
            {RenderItems()}
        </Accordian>
    );
}