import React from 'react';
import _ from 'lodash';
import Button from './Button';

export default function Modal(props) {
    return (
        <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 rounded-lg">
            <div className="bg-white flex flex-col rounded-md p-2">
                <div className="flex items-center space-x-3">
                    <div className="flex-grow text-lg font-bold">{(_.has(props, "title"))?props.title:""}</div>
                    <Button className="bi-x-lg" color="red" onClick={(_.has(props, "onClose"))?props.onClose:()=>console.error("Modal component needs onClose prop... did you forget it?")} />
                </div>
                <div className={(_.has(props, "className"))?props.className:""}>
                    {(_.has(props, "children"))?props.children:null}
                </div>
            </div>
        </div>
    );
}