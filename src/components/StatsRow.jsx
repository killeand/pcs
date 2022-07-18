import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { v1 as uuid } from 'uuid';
import "../styles/StatsRow.css";

export default function StatsRow({title, id, value, className, onChange, ...props}) {
    if (_.isNil(title)) title = "Ability Score";
    if (_.isNil(id)) id = "";
    if (_.isNil(value)) value = [0,0,0,0];
    if (_.isNil(className)) className = "";
    if (_.isNil(onChange)) console.warn("In order to get the text, you need to assign something to onChange...");

    let [ rowValue, setRowValue ] = useState(value);
    let [ rowId, setRowId ] = useState(id);

    useEffect(() => {
        if (_.isEmpty(rowId))
            setRowId(uuid());
    }, []);

    function ChangeValue(e, index) {
        let inputValue = e.target.value;
        let newValue = [...rowValue];
        newValue[index] = parseInt(inputValue) | 0;

        setRowValue(newValue);
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

    let stattotal = rowValue[0] + rowValue[1] + rowValue[2] + rowValue[3];
    let modifier = Math.floor((stattotal - 10) / 2);

    return (
        <div className={className}>
            <div className="statsrow-top rounded-b-md" onClick={OpenClose}>
                <div className="statsrow-title">{title}</div>
                <div className="statsrow-total">{stattotal}</div>
                <div className="statsrow-mod">{modifier}</div>
            </div>
            <div className="statsrow-bottom hidden">
                <div className="statsrow-cont">
                    <label htmlFor={`${rowId}-base`} className="statsrow-label">Base</label>
                    <input type="number" id={`${rowId}-base`} name={`${rowId}-base`} value={rowValue[0]} className="statsrow-num" onChange={(e)=>ChangeValue(e,0)} />
                </div>
                <div className="statsrow-cont">
                    <label htmlFor={`${rowId}-enh`} className="statsrow-label">Enhance</label>
                    <input type="number" id={`${rowId}-enh`} name={`${rowId}-enh`} value={rowValue[1]} className="statsrow-num" onChange={(e)=>ChangeValue(e,1)} />
                </div>
                <div className="statsrow-cont">
                    <label htmlFor={`${rowId}-misc`} className="statsrow-label">Misc</label>
                    <input type="number" id={`${rowId}-misc`} name={`${rowId}-misc`} value={rowValue[2]} className="statsrow-num" onChange={(e)=>ChangeValue(e,2)} />
                </div>
                <div className="statsrow-cont">
                    <label htmlFor={`${rowId}-temp`} className="statsrow-label">Temp</label>
                    <input type="number" id={`${rowId}-temp`} name={`${rowId}-temp`} value={rowValue[3]} className="statsrow-num" onChange={(e)=>ChangeValue(e,3)} />
                </div>
            </div>
        </div>
    );
}