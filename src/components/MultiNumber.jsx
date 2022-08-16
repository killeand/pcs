import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { v1 as uuid } from 'uuid';
import "../styles/MultiNumber.css";

export default function MultiNumber({title, id, value, min, className, onChange, ...props}) {
    if (_.isNil(title)) title = ["Num 1", "Num 2", "Num 3", "Num 4"];
    if (_.isNil(id)) id = "";
    if (_.isNil(value)) value = new Array(title.length);
    if (_.isNil(min)) min = new Array(title.length);
    if (_.isNil(className)) className = "";
    if (_.isNil(onChange)) console.warn("In order to get the number array, you need to assign something to onChange...");

    let [ formValue, setFormValue ] = useState(value);
    let [ formId, setFormId ] = useState(id);

    useEffect(() => {
        if (_.isEmpty(formId))
            setFormId(uuid());
    }, []);

    useEffect(() => {
        setFormValue(value);
    }, [value]);

    function ChangeValue(e, index) {
        let inputValue = e.target.value;
        let newValue = [...formValue];
        newValue[index] = parseInt(inputValue) | 0;

        setFormValue(newValue);
        if (!_.isNil(onChange)) onChange(newValue);
    }

    function RenderSections() {
        let retval = [];

        for (let i = 0; i < title.length; i++) {
            retval.push(
                <div key={`${formId}-section${i}`} className="mn-section">
                    <label htmlFor={`${formId}-form${i}`} className="mn-label">{title[i]}</label>
                    <input type="number" id={`${formId}-form${i}`} name={`${formId}-form${i}`} value={formValue[i]} min={(!_.isNil(min[i]))?min[i]:-5000} className="mn-num" onChange={(e)=>ChangeValue(e,i)} />
                </div>
            );
        }

        return retval;
    }

    return (
        <div className={`mn-cont ${className}`}>
            {RenderSections()}
        </div>
    );
}