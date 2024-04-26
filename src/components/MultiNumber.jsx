import { useState, useId } from 'react';
import { BGCOLORS, BORDERCOLORS, ZeroValue } from '../scripts/Utilities';

export default function MultiNumber({ title, id, value, min, max, color, innerClass, outerClass, onChange }) {
    title = title || ['Num 1', 'Num 2', 'Num 3', 'Num 4'];
    value = value || new Array(title.length).fill(0);
    min = min || new Array(title.length).fill(-5000);
    max = max || new Array(title.length).fill(10000000);

    if (!Array.isArray(title) || !Array.isArray(value) || !Array.isArray(min) || !Array.isArray(max)) throw new Error('The properties of title, value, min and max must be of type Array');
    if (title.length != value.length || title.length != min.length || title.length != max.length) throw new Error('The properties of title, value, min, and max must be of the same Array dimension');

    let [formValue, setFormValue] = useState(value);
    let [formId, setFormId] = useState(id || useId());

    // useEffect(() => {
    //     if (JSON.stringify(new Array(title.length).fill(0)) != JSON.stringify(value.filter((i)=>(i==0))))
    //         setFormValue(value);
    // }, [value]);

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
                <label key={`${formId}-section${i}`} htmlFor={`${formId}-form${i}`} className={`flex flex-col [&>div]:first:rounded-tl-md [&>div]:last:rounded-tr-md [&>input]:first:rounded-bl-md [&>input]:last:rounded-br-md`}>
                    <div className={`title_3 flex items-center justify-center p-2 ${BGCOLORS[color] || BGCOLORS.default}`}>{ZeroValue(title[i], 'Num')}</div>
                    <input type='number' id={`${formId}-form${i}`} name={`${formId}-form${i}`} value={formValue[i]} min={min[i]} max={max[i]} className={`w-full px-2 ${innerClass || ''}`} onChange={(e) => ChangeValue(e, i)} />
                </label>
            );
        }

        return retval;
    }

    return <div className={`flex flex-row divide-x rounded-md border ${outerClass || ''} ${BORDERCOLORS[color] || BORDERCOLORS.default}`}>{RenderSections()}</div>;
}
