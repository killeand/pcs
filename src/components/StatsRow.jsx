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

    let [ open, setOpen ] = useState(false);
    let [ rowValue, setRowValue ] = useState(value);
    let [ rowId, setRowId ] = useState(id);

    useEffect(() => {
        if (_.isEmpty(rowId))
            setRowId(uuid());
    }, []);

    function ChangeValue(e, index) {
        let inputValue = e.target.value;
        let newValue = [...rowValue];
        newValue[index] = inputValue;

        setRowValue(newValue);
        if (!_.isNil(onChange)) onChange(newValue);
    }

    return (
        <div className="flex flex-row space-x-1 bg-amber-300 p-1 cursor-pointer">
            {(open)?(
                <>
                    <p>Blah</p>
                </>
            ):(
                <>
                    <div className="flex-grow font-bold">Strength</div>
                    <div className="border">Total</div>
                    <div className="border rounded-full">Mod</div>
                </>
            )}
        </div>
    );
}