import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { v1 as uuid } from 'uuid';
import "../styles/AbilityScore.css";

export default function AbilityScore({title, id, value, className, onChange, ...props}) {
    if (_.isNil(title)) title = "Ability Score";
    if (_.isNil(id)) id = "";
    if (_.isNil(value)) value = [0,0,0,0];
    if (_.isNil(className)) className = "";
    if (_.isNil(onChange)) console.warn("In order to get the text, you need to assign something to onChange...");

    let [ formValue, setFormValue ] = useState(value);
    let [ formId, setFormId ] = useState(id);

    useEffect(() => {
        if (_.isEmpty(formId))
            setFormId(uuid());
    }, []);

    function ChangeValue(e, index) {
        let inputValue = e.target.value;
        let newValue = [...formValue];
        newValue[index] = parseInt(inputValue) | 0;

        setFormValue(newValue);
        if (!_.isNil(onChange)) onChange(newValue);
    }

    function OpenClose(e) {
        let container = e.target;
        let sibling = container.nextSibling;

        if (container.classList.contains("rounded-b-md")) {
            container.classList.remove("rounded-b-md");
            sibling.classList.remove("hidden");
            sibling.classList.add("flex");
        }
        else {
            container.classList.add("rounded-b-md");
            sibling.classList.add("hidden");
            sibling.classList.remove("flex");
        }
    }

    let stattotal = formValue[0] + formValue[1] + formValue[2] + formValue[3];
    let modifier = Math.floor((stattotal - 10) / 2);

    return (
        <div className={className}>
            <div className="abscore-top rounded-b-md" onClick={OpenClose}>
                <div className="abscore-title">{title}</div>
                <div className="abscore-total">{stattotal}</div>
                <div className="abscore-mod">{modifier}</div>
            </div>
            <div className="abscore-bottom hidden">
                <div className="abscore-cont">
                    <label htmlFor={`${formId}-base`} className="abscore-label">Base</label>
                    <input type="number" id={`${formId}-base`} name={`${formId}-base`} value={formValue[0]} className="abscore-num" onChange={(e)=>ChangeValue(e,0)} />
                </div>
                <div className="abscore-cont">
                    <label htmlFor={`${formId}-enh`} className="abscore-label">Enhance</label>
                    <input type="number" id={`${formId}-enh`} name={`${formId}-enh`} value={formValue[1]} className="abscore-num" onChange={(e)=>ChangeValue(e,1)} />
                </div>
                <div className="abscore-cont">
                    <label htmlFor={`${formId}-misc`} className="abscore-label">Misc</label>
                    <input type="number" id={`${formId}-misc`} name={`${formId}-misc`} value={formValue[2]} className="abscore-num" onChange={(e)=>ChangeValue(e,2)} />
                </div>
                <div className="abscore-cont">
                    <label htmlFor={`${formId}-temp`} className="abscore-label">Temp</label>
                    <input type="number" id={`${formId}-temp`} name={`${formId}-temp`} value={formValue[3]} className="abscore-num" onChange={(e)=>ChangeValue(e,3)} />
                </div>
            </div>
        </div>
    );
}