import React from 'react';
import _ from 'lodash';
import Button from './Button';
import '../styles/Modal.css';

export default function Modal(props) {
    return (
        <div className="modal-backdrop">
            <div className="modal-dialog">
                <div className="modal-handle">
                    <div className="modal-title">{(_.has(props, "title"))?props.title:""}</div>
                    <Button className="bi-x-lg" color="red" onClick={(_.has(props, "onClose"))?props.onClose:()=>console.error("Modal component needs onClose prop... did you forget it?")} />
                </div>
                <div className={"modal-content " + (_.has(props, "className"))?props.className:""}>
                    {(_.has(props, "children"))?props.children:null}
                </div>
            </div>
        </div>
    );
}