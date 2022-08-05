import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { v1 as uuid } from 'uuid';
import PCSContext from '../components/PCSContext';
import Button from '../components/Button';
import Modal from '../components/Modal';
import "../styles/Page.css";

export default function FileManager() {
    let PCSD = useContext(PCSContext);
    let [ newCharModal, setNewCharModal ] = useState(false);
    let [ newTitle, setNewTitle ] = useState("");

    useEffect(() => {
        PCSD.setFiles([...PCSD.files]);
    },[]);

    function NewCharacter() {
        let newFiles = [...PCSD.files];
        newFiles.push({
            _id: uuid(),
            title: newTitle,
            loaded: false,
            saved: false,
            data: {}
        });

        PCSD.setFiles(newFiles);
        setNewCharModal(false);
        setNewTitle("");
    }

    function LoadCharacter(e) {
        let files = e.target.files;

        for (let i = 0; i < files.length; i++) {
            if (files[i].type.match(/(text)+/gmi)) {
                let FR = new FileReader();
                FR.addEventListener("loadend", (e) => {
                    let results = FR.result;
                    let data = null;

                    try {
                        data = JSON.parse(decodeURIComponent(atob(results)));
                        if (!_.has(data, "title") || !_.has(data, "data")) throw("Invalid data format");

                        _.assign(data, {_id:uuid(),loaded:false,saved:true});
                        PCSD.setFiles([...PCSD.files, data]);
                    }
                    catch(error) {
                        console.error("DEAL WITH NON-STANDARD FILE LOADS", error);
                    }
                });
                FR.readAsText(files[i]);
            }
        }
    }

    function ActivateCharacter(index) {
        if (!_.isNil(PCSD.files[index])) {
            let newFiles = PCSD.files.map((file, subindex) => {
                file.loaded = (index == subindex);
                return file;
            });

            PCSD.setFiles(newFiles);
        }
    }

    function SaveCharacter(index) {
        let SavedClass = {...PCSD.files[index]};
        _.unset(SavedClass, "loaded");
        _.unset(SavedClass, "saved");
        _.unset(SavedClass, "_id");
        
        let db = document.createElement("a");
        db.href = `data:text/plain;charset=utf8,${encodeURIComponent(btoa(JSON.stringify(SavedClass)))}`;
        db.download = `${SavedClass.title}.txt`;
        db.style.display = "none";
        document.body.appendChild(db);
        db.click();
        document.body.removeChild(db);

        PCSD.files[index].saved = true;
        PCSD.setFiles([...PCSD.files]);
    }

    function RemoveCharacter(index) {
        let newFiles = [...PCSD.files];
        newFiles.splice(index, 1);
        PCSD.setFiles(newFiles);
    }

    function RenderNewCharModal() {
        if (newCharModal) {
            return (
                <Modal className="flex flex-col" title="Create New Character" onClose={()=>{setNewCharModal(false);setNewTitle("");}}>
                    <div className="flex flex-row items-center mt-2 py-2 border-t border-black">
                        <label htmlFor="title" className="font-bold mr-2">New Title</label>
                        <input type="text" id="title" name="title" value={newTitle} placeholder="Enter new name..." className="flex-grow border rounded-md p-1" onChange={(e)=>setNewTitle(e.target.value)} />
                    </div>
                    <div className="flex">
                        {(_.isEmpty(newTitle))?(
                            <Button color="disabled" className="flex-grow">Create Character</Button>
                        ):(
                            <Button color="green" className="flex-grow" onClick={NewCharacter}>Create Character</Button>
                        )}
                    </div>
                </Modal>
            );
        }
    }

    function RenderCharacters() {
        if (PCSD.files.length == 0) {
            return (<p>No characters have been loaded or created...</p>);
        }
          
        return PCSD.files.map((files, index) => {
            return (
                <div key={`character-${files._id}`} className="border border-amber-300 rounded-md p-1 flex flex-row items-center space-x-2">
                    <div className="flex-grow" onClick={()=>console.log(PCSD.files[index])}>{files.title}</div>
                    <div className="">{(files.saved)?"Saved":"Unsaved"}</div>
                    <div className="flex flex-row space-x-1">
                        {(files.loaded)?<Button color="disabled">Play</Button>:<Button color="yellow" onClick={()=>ActivateCharacter(index)}>Play</Button>}
                        <Button color="green" className="bi-save" onClick={()=>SaveCharacter(index)} />
                        <Button color="red" className="bi-trash" onClick={()=>RemoveCharacter(index)} />
                    </div>
                </div>
            );
        });
    }

    return (
        <>
            {RenderNewCharModal()}
            <h1>File Manager</h1>
            <div className="main-container">
                <Button color="yellow" onClick={()=>setNewCharModal(true)}>New Character</Button>
                <Button as="label" color="yellow">
                    <input type="file" className="hidden h-0" multiple accept=".txt" onChange={LoadCharacter} />
                    Load Character
                </Button>
            </div>
            <h2>Characters</h2>
            <div className="main-container">
                {RenderCharacters()}
            </div>
            <div className="msg-container">
                <div>Characters will be saved upon any changes to the list from this page, or periodically every 10 seconds. Upon loading the page again, they should be reloaded. Please note that this file uses localstorage to store the characters, so if you move this file the localstorage will be reset. It is a known flaw with non-server based web applications. To prevent any major losses, make sure you <span className="bi-save" /> save the characters listed as Unsaved.</div>
            </div>
        </>
    );
}