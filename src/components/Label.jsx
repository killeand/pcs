import { BGCOLORS, BORDERCOLORS } from '../scripts/Utilities';
import '../styles/Text.css';

export default function Label({title, value, color, className, innerClass, outerClass}) {
    //value = value || ((value === "0") ? "0" : "");

    return (
        <div className={`text-cont ${className || ""} ${outerClass || ""}`}>
            <div className={`text-label lg-title ${BGCOLORS[color] || BGCOLORS.default} ${BORDERCOLORS[color] || BORDERCOLORS.default}`}>{(title==0)?"0":title || "Label"}</div>
            <div className={`text-input ${BORDERCOLORS[color] || BORDERCOLORS.default} ${innerClass || ""}`}>{(value==0)?"0":value || ""}</div>
        </div>
    );
}