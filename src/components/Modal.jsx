import React from 'react';
import _ from 'lodash';
import Button from './Button';
import '../styles/Modal.css';

export default function Modal({title, onClose, className, children}) {
    return (
        <div className="mymodal-backdrop">
            <div className="mymodal-dialog">
                <div className="mymodal-handle">
                    <div className="mymodal-title">{title}</div>
                    <Button className="bi-x-lg" color="error" onClick={(onClose)?onClose:()=>console.error("Modal component needs onClose prop... did you forget it?")} />
                </div>
                <div className={"mymodal-content " + (className)}>
                    {children}
                </div>
            </div>
        </div>
    );
}