import { useState } from 'react';
import { BGCOLORS, BORDERCOLORS } from '../scripts/Utilities';
import '../styles/Accordian.css';

export default function Accordian({title, titleElements, color, className, innerClass, outerClass, children}) {
    const [opened, setOpened] = useState(false);
    const caretstyle = (opened) ? "bi-caret-down" : "bi-caret-right";
    const topstyle = (opened) ? "" : "rounded-b-md";
    const bottomstyle = (opened) ? "flex" : "hidden";

    function OpenClose(e) {
        if (e.target.tagName != "BUTTON")
            setOpened(!opened);
    }

    return (
        <div className={`${className || ""} ${outerClass || ""}`}>
            <div className={`accordian-top ${topstyle} ${BGCOLORS[color] || BGCOLORS.default} ${BORDERCOLORS[color] || BORDERCOLORS.default}`} onClick={OpenClose}>
                <div className={`pointer-events-none ${caretstyle}`} />
                <div className={`pointer-events-none flex-grow lg-title`}>{title || "Accordian"}</div>
                <div className={`pointer-events-none accordian-elements`}>{titleElements}</div>
            </div>
            <div className={`${innerClass || ""} accordian-bottom ${bottomstyle} ${BORDERCOLORS[color] || BORDERCOLORS.default}`}>
                {children}
            </div>
        </div>
    );
}