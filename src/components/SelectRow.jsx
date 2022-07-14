import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { v1 as uuid } from 'uuid';
import '../styles/SelectRow.css';

export default function SelectRow({className, title, index, values, onChange, id, arrow, ...props}) {
    if (_.isNil(className)) className = "";
    if (_.isNil(index)) index = 0;
    if (_.isNil(values)) values = [];
    if (_.isNil(title)) title = "Select";
    if (_.isNil(onChange)) console.warn("In order to get the index, you need to assign something to onChange...");
    if (_.isNil(id)) id = "";
    if (_.isNil(arrow)) arrow = "bi-caret-down";

    let [ selectedIndex, setSelectedIndex ] = useState(index);
    let [ selectId, setSelectId ] = useState(id);

    useEffect(() => {
        if (_.isEmpty(selectId))
            setSelectId(uuid());
    }, []);

    function SelectChange(e) {
        let newValue = e.target.selectedIndex;

        setSelectedIndex(newValue);
        if (!_.isNil(onChange)) onChange(newValue);
    }

    function RenderValues() {
        return values.map((item, index) => {
            return (<option key={`${selectId}${index}`} value={index}>{item}</option>);
        });
    }

    return (
        <div className={`selectrow-cont ${className}`}>
            <label htmlFor={selectId} className="selectrow-label">{title}</label>
            <select id={selectId} name={selectId} value={selectedIndex} className="selectrow-select" onChange={SelectChange}>
                {RenderValues()}
            </select>
            <div className={`selectrow-end ${arrow}`} />
        </div>
    );
}