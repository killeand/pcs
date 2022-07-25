import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { v1 as uuid } from 'uuid';
import MultiNumber from './MultiNumber';
import Accordian from './Accordian';
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

    let stattotal = formValue[0] + formValue[1] + formValue[2] + formValue[3];
    let modifier = Math.floor((stattotal - 10) / 2);

    return (
        <Accordian title={title} titleElements={[<div key={`${id}-stattotal`}>{stattotal}</div>,<div key={`${id}-modifier`}>{modifier}</div>]}>
            <MultiNumber title={["Base", "Enhance", "Misc", "Temp"]} id={`${id}`} value={formValue} onChange={(retval)=>ChangeValue(retval)} />
        </Accordian>
    );
}