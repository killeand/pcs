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
    let [ clearModal, setClearModal ] = useState(false);
    let [ clearIndex, setClearIndex ] = useState(-1);
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
                        console.log(PCSD.files, data);
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
                if (file.loaded) file.loaded = false;
                else file.loaded = (index == subindex);
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
                <Modal className="flex flex-col p-1 space-y-1" title="Create New Character" onClose={()=>{setNewCharModal(false);setNewTitle("");}}>
                    <div className="flex flex-row items-center">
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

    function RenderClearDataModal() {
        function ClearData(path) {
            _.unset(PCSD.files[clearIndex].data, path);
        }

        function RenderItem(title, path) {
            return (
                <div className="flex flex-row items-center space-x-3 p-1 last:rounded-b-md hover:bg-gradient-to-r hover:from-slate-300 hover:to-white">
                    <div className="flex-grow">{title}</div>
                    <Button color="red" className="bi-trash" onClick={()=>ClearData(path)}> Clear</Button>
                </div>
            );
        }

        if (clearModal) {
            return (
                <Modal className="flex flex-col space-y-1 max-h-80 overflow-y-scroll" title="Clear Data" onClose={()=>{setClearModal(false);setClearIndex(-1);}}>
                    {RenderItem("Character Details", "details")}
                    {RenderItem("Ability Scores", "stats")}
                    {RenderItem("Classes", "classes")}
                    {RenderItem("Health", "health")}
                    {RenderItem("Saving Throws", "saves")}
                    {RenderItem("Offensive Stats", "offense")}
                    {RenderItem("Defensive Stats", "defense")}
                    {RenderItem("Miscellaneous Stats", "miscstats")}
                    {RenderItem("Weapons", "weapons")}
                    {RenderItem("Armor", "armors")}
                    {RenderItem("Skills", "skills")}
                    {RenderItem("Custom Skills", "custskills")}
                    {RenderItem("Experience", "exp")}
                    {RenderItem("Wealth", "wealth")}
                    {RenderItem("Abilities", "abilities")}
                    {RenderItem("Equipment", "equipment")}
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
                    <div className="flex flex-row space-x-1">
                        <Button color="white" className="bi-eraser" onClick={()=>{setClearModal(true);setClearIndex(index);}} />
                        <Button color={(files.loaded)?"white":"blue"} className={(files.loaded)?"text-stone-400 bi-square-fill":"text-white bi-caret-right-fill"} onClick={()=>ActivateCharacter(index)} />
                        <Button color={(files.saved)?"white":"green"} className={"bi-save-fill " + ((files.saved)?"text-stone-400":"text-white")} onClick={()=>SaveCharacter(index)} />
                        <Button color="red" className="bi-trash" onClick={()=>RemoveCharacter(index)} />
                    </div>
                </div>
            );
        });
    }

    return (
        <>
            {RenderNewCharModal()}
            {RenderClearDataModal()}
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
            <div className="msg-container space-y-1">
                <div className="font-bold">
                    <Button color="white" className="bi-eraser text-xs px-1 py-0.5" /> - Clear Data
                </div>
                <div className="font-bold">
                    <Button color="white" className="bi-square-fill text-stone-400 text-xs px-1 py-0.5" /> - Disable Character &nbsp;
                    <Button color="blue" className="bi-caret-right-fill text-white text-xs px-1 py-0.5" /> - Activate Character 
                </div>
                <div className="font-bold">
                    <Button color="white" className="bi-save-fill text-stone-400 text-xs px-1 py-0.5" /> - Character Saved &nbsp;
                    <Button color="green" className="bi-save-fill text-white text-xs px-1 py-0.5" /> - Character NOT Saved
                </div>
                <div className="font-bold">
                    <Button color="red" className="bi-trash text-xs px-1 py-0.5" /> - Remove Character
                </div>
                <div>Characters will be stored upon any changes to the list from this page, or periodically every 10 seconds. Upon loading the page again, they should be reloaded. Please note that this store uses localstorage for the characters, so if you move this web application the localstorage will be reset. It is a known flaw with non-server based web applications. To prevent any major losses, make sure you <Button color="green" className="bi-save-fill text-white text-xs px-1 py-0.5" /> save the characters listed.</div>
            </div>
        </>
    );
}