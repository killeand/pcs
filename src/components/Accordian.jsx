import React, { useEffect, useState } from 'react';
import '../styles/Accordian.css';

export default function Accordian({title, titleElements, className, children}) {
    title = title || "Accordian";
    className = className || "";

    const [opened, setOpened] = useState(false);
    const caretstyle = (opened) ? "bi-caret-down" : "bi-caret-right";
    const topstyle = (opened) ? "" : "rounded-b-md";
    const bottomstyle = (opened) ? "flex" : "hidden";

    function OpenClose(e) {
        if (e.target.tagName != "BUTTON")
            setOpened(!opened);
    }

    return (
        <div className={className}>
            <div className={`accordian-top ${topstyle}`} onClick={OpenClose}>
                <div className={`pointer-events-none ${caretstyle}`} />
                <div className="pointer-events-none accordian-title">{title}</div>
                <div className="pointer-events-none accordian-elements">{titleElements}</div>
            </div>
            <div className={`accordian-bottom ${bottomstyle}`}>
                {children}
            </div>
        </div>
    );
}