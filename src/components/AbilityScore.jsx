import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { v1 as uuid } from 'uuid';
import MultiNumber from './MultiNumber';
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

    function ChangeValue(value) {
        setFormValue(value);
        if (!_.isNil(onChange)) onChange(value);
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
                <MultiNumber title={["Base", "Enhance", "Misc", "Temp"]} id={`${id}`} value={formValue} onChange={(retval)=>ChangeValue(retval)} />
            </div>
        </div>
    );
}