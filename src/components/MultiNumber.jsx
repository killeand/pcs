import { useState, useEffect } from 'react';
import _ from 'lodash';
import { ulid } from 'ulidx';
import '../styles/MultiNumber.css';
import { BGCOLORS, BORDERCOLORS } from '../scripts/Utilities';

export default function MultiNumber({ title, id, value, min, max, color, className, innerClass, outerClass, onChange }) {
    title = title || ["Num 1", "Num 2", "Num 3", "Num 4"];
    value = value || new Array(title.length).fill(0);
    min = min || new Array(title.length).fill(-5000);
    max = max || new Array(title.length).fill(10000000);
    
    if (!onChange) console.warn("In order to get the number array, you need to assign something to onChange...");
    if (!Array.isArray(title) || !Array.isArray(value) || !Array.isArray(min) || !Array.isArray(max)) throw new Error("The properties of title, value, min and max must be of type Array");
    if (title.length != value.length || title.length != min.length || title.length != max.length) throw new Error("The properties of title, value, min, and max must be of the same Array dimension");

    let [ formValue, setFormValue ] = useState(value);
    let [ formId, setFormId ] = useState(id || ulid());

    useEffect(() => {
        if (JSON.stringify(new Array(title.length).fill(0)) != JSON.stringify(value.filter((i)=>(i==0))))
            setFormValue(value);
    }, [value]);

    function ChangeValue(e, index) {
        let inputValue = e.target.value;
        let newValue = [...formValue];
        newValue[index] = parseInt(inputValue) || 0;

        setFormValue(newValue);
        if (onChange) onChange(newValue);
    }

    function RenderSections() {
        let retval = [];

        for (let i = 0; i < title.length; i++) {
            retval.push(
                <div key={`${formId}-section${i}`} className={`mn-section ${innerClass || ""} ${BORDERCOLORS[color] || BORDERCOLORS.default}`}>
                    <label htmlFor={`${formId}-form${i}`} className={`mn-label lg-title ${BGCOLORS[color] || BGCOLORS.default}`}>{(title[i]==0)?"0":title[i] || "Number"}</label>
                    <input type="number" id={`${formId}-form${i}`} name={`${formId}-form${i}`} value={formValue[i]} min={min[i]} max={max[i]} className="mn-num" onChange={(e)=>ChangeValue(e,i)} />
                </div>
            );
        }

        return retval;
    }

    return (
        <div className={`mn-cont ${className || ""} ${outerClass || ""} ${BORDERCOLORS[color] || BORDERCOLORS.default}`}>
            {RenderSections()}
        </div>
    );
}