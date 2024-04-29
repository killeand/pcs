import { useState, useId, useEffect } from "react";
import Button from "./Button";
import Accordian from "./Accordian";
import { BORDERCOLORS, ZeroValue } from "@/scripts/Utilities";

export default function List({ title, id, value, color, innerClass, outerClass, onChange }) {
    let [formValue, setFormValue] = useState(value || []);
    let [formId, setFormId] = useState(id || useId());

    useEffect(() => {
        setFormValue(value || []);
    }, [value]);

    function ChangeValue(e, index) {
        let tempValue = e.target.value;
        let newValue = [...formValue];
        newValue[index] = tempValue;

        setFormValue(newValue);
        if (onChange) onChange(newValue);
    }

    function AddItem() {
        let newValue = [...formValue];
        newValue.push("");

        setFormValue(newValue);
        if (onChange) onChange(newValue);
    }

    function RemoveItem(index) {
        let newValue = [...formValue];
        newValue.splice(index, 1);

        setFormValue(newValue);
        if (onChange) onChange(newValue);
    }

    function RenderItems() {
        if (formValue.length == 0) {
            return <p className="mb-0 mt-4">No items in list...</p>;
        }

        return formValue.map((item, index) => {
            return (
                <div key={`${formId}-${index}`} className="join flex flex-row items-center">
                    <input type="text" value={item} className={`input input-sm join-item flex-grow ${BORDERCOLORS[color] || BORDERCOLORS.default}`} onChange={(e) => ChangeValue(e, index)} />
                    <Button color="error" className="bi-trash join-item border border-black" onClick={() => RemoveItem(index)} />
                </div>
            );
        });
    }

    return (
        <Accordian title={ZeroValue(title, "List")} titleElements={<div className="flex items-center">{formValue.length}</div>} outerClass={outerClass || ""} innerClass={`flex flex-col gap-1 p-1 ${innerClass || ""}`} color={color}>
            <Button color="success" className="bi-plus-circle w-full" onClick={AddItem}>
                Add Item
            </Button>
            {RenderItems()}
        </Accordian>
    );
}
