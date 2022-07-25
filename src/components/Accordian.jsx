import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import '../styles/Accordian.css';

export default function Accordian({title, titleElements, className, ...props}) {
    if (_.isNil(title)) title = "Accordian";
    if (_.isNil(className)) className = "";

    function OpenClose(e) {
        let container = e.target;
        let sibling = container.nextSibling;

        if (container.classList.contains("rounded-b-md")) {
            container.classList.remove("rounded-b-md");
            container.querySelector(".bi-caret-right").classList.add("bi-caret-down");
            container.querySelector(".bi-caret-right").classList.remove("bi-caret-right");
            sibling.classList.remove("hidden");
            sibling.classList.add("flex");
        }
        else {
            container.classList.add("rounded-b-md");
            container.querySelector(".bi-caret-down").classList.add("bi-caret-right");
            container.querySelector(".bi-caret-down").classList.remove("bi-caret-down");
            sibling.classList.add("hidden");
            sibling.classList.remove("flex");
        }
    }

    return (
        <div className={className}>
            <div className="accordian-top rounded-b-md" onClick={OpenClose}>
                <div className="bi-caret-right" />
                <div className="accordian-title">{title}</div>
                <div className="accordian-elements">{titleElements}</div>
            </div>
            <div className="accordian-bottom hidden">
                {props.children}
            </div>
        </div>
    );
}