import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { ulid } from 'ulidx';
import PCSContext from '../components/application/PCSContext';
import Button from '../components/Button';
import Dialog from '../components/Dialog';
import Modal, {MODAL_TYPE} from '../components/Modal';
import "../styles/Page.css";
import UpgradeManager from '../scripts/UpgradeManager';

export default function FileManager() {
    let PCSD = useContext(PCSContext);
    let [ showClear, setShowClear ] = useState([]);

    useEffect(() => {
        PCSD.setFiles([...PCSD.files]);
        setShowClear((new Array(PCSD.files.length)).fill(false));
    }, []);
    
    function ToggleErase(index) {
        let newShow = [...showClear];
        newShow[index] = !newShow[index];

        setShowClear(newShow);
    }

    function NewCharacter(newCharName) {
        if (!_.isEmpty(newCharName) && newCharName !== "close") {
            let newFiles = [...PCSD.files];
            newFiles.push({
                _id: ulid(),
                title: newCharName,
                loaded: false,
                saved: false,
                data: {},
                version: UpgradeManager.CurrentVersion
            });

            let newShow = [...showClear];
            newShow.push(false);

            PCSD.setFiles(newFiles);
            setShowClear(newShow);
        }
    }

    function LoadCharacter(e) {
        let files = e.target.files;

        for (let i = 0; i < files.length; i++) {
            if (files[i].type.match(/(json)+/gmi)) {
                let FR = new FileReader();
                FR.addEventListener("loadend", (e) => {
                    let results = FR.result;
                    let data = null;

                    try {
                        data = JSON.parse(decodeURIComponent(results));
                        if (!_.has(data, "title") || !_.has(data, "data")) throw ("Invalid data format");
                        
                        let upgraded = UpgradeManager.Upgrade(data);
                        _.assign(data, { _id: ulid(), loaded: false, saved: !upgraded });
                        
                        PCSD.setFiles([...PCSD.files, data]);
                        
                        let newShow = [...showClear];
                        newShow.push(false);
                        setShowClear(newShow);
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
        db.href = `data:application/json;charset=utf8,${encodeURIComponent(JSON.stringify(SavedClass, null, '\t'))}`;
        db.download = `${SavedClass.title}.json`;
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

    function RenderDataItem(index, title, path) {
        if (_.has(PCSD.files[index].data, path))
            return (
                <div className="flex flex-row items-center space-x-3 p-1 last:rounded-b-md hover:bg-gradient-to-r hover:from-slate-300 hover:to-white">
                    <div className="flex-grow">{title}</div>
                    <Button color="error" className="bi-trash" onClick={() => ClearData(index, path)}> Clear</Button>
                </div>
            );
    }

    function ClearData(index, path) {
        _.unset(PCSD.files[index].data, path);
    }

    function RenderCharacters() {
        if (PCSD.files.length == 0) {
            return (<p>No characters have been loaded or created...</p>);
        }
          
        return PCSD.files.map((files, index) => {
            return (
                <div key={`character-${files._id}`} className="border border-primary rounded-md p-1 space-y-1">
                    <div className="flex flex-row items-center space-x-2">
                        <div className="flex-grow" onClick={()=>console.info(PCSD.files[index])}>{files.title}</div>
                        <div className="flex flex-row space-x-1">
                            <Button color="primary" className="bi-eraser" onClick={()=>ToggleErase(index)} />
                            <Button color={(files.loaded)?"disabled":"secondary"} className={`${(files.loaded)?"bi-square-fill":"bi-caret-right-fill"} pointer-events-auto`} onClick={()=>ActivateCharacter(index)} />
                            <Button color={(files.saved)?"disabled":"success"} className="bi-save-fill pointer-events-auto" onClick={()=>SaveCharacter(index)} />
                            <Button color="error" className="bi-trash" onClick={()=>RemoveCharacter(index)} />
                        </div>
                    </div>
                    {(showClear[index]) && (<Dialog title="Erase Data" color="error">
                        {RenderDataItem(index, "Character Details", "details")}
                        {RenderDataItem(index, "Ability Scores", "stats")}
                        {RenderDataItem(index, "Classes", "classes")}
                        {RenderDataItem(index, "Health", "health")}
                        {RenderDataItem(index, "Saving Throws", "saves")}
                        {RenderDataItem(index, "Offensive Stats", "offense")}
                        {RenderDataItem(index, "Defensive Stats", "defense")}
                        {RenderDataItem(index, "Miscellaneous Stats", "miscstats")}
                        {RenderDataItem(index, "Weapons", "weapons")}
                        {RenderDataItem(index, "Armor", "armors")}
                        {RenderDataItem(index, "Skills", "skills")}
                        {RenderDataItem(index, "Custom Skills", "custskills")}
                        {RenderDataItem(index, "Experience", "exp")}
                        {RenderDataItem(index, "Wealth", "wealth")}
                        {RenderDataItem(index, "Abilities", "abilities")}
                        {RenderDataItem(index, "Equipment", "equipment")}
                        {RenderDataItem(index, "Spellbook", "spellbook")}
                        {RenderDataItem(index, "Notes", "notes")}
                    </Dialog>)}
                </div>
            );
        });
    }

    return (
        <>
            <h1>File Manager</h1>
            <div className="main-container">
                <Button color="primary" onClick={()=>window.newchar.showModal()}>New Character</Button>
                <Button as="label" color="primary">
                    <input type="file" className="hidden h-0" multiple accept=".json" onChange={LoadCharacter} />
                    Load Character
                </Button>
            </div>
            <h2>Characters</h2>
            <div className="main-container">
                {RenderCharacters()}
            </div>
            <div className="msg-container space-y-1">
                <div className="font-bold">
                    <Button color="primary" className="bi-eraser text-xs px-1 py-0.5" /> - Clear Data
                </div>
                <div className="font-bold">
                    <Button color="disabled" className="bi-square-fill text-xs px-1 py-0.5" /> - Disable Character &nbsp;
                    <Button color="secondary" className="bi-caret-right-fill text-xs px-1 py-0.5" /> - Activate Character 
                </div>
                <div className="font-bold">
                    <Button color="disabled" className="bi-save-fill text-xs px-1 py-0.5" /> - Character Saved &nbsp;
                    <Button color="success" className="bi-save-fill text-xs px-1 py-0.5" /> - Character NOT Saved
                </div>
                <div className="font-bold">
                    <Button color="error" className="bi-trash text-xs px-1 py-0.5" /> - Remove Character
                </div>
                <div>Characters will be stored upon any changes to the list from this page, or periodically every 10 seconds. Upon loading the page again, they should be reloaded. Please note that this store uses localstorage for the characters, so if you move this web application the localstorage will be reset. It is a known flaw with non-server based web applications. To prevent any major losses, make sure you <Button color="green" className="bi-save-fill text-white text-xs px-1 py-0.5" /> save the characters listed.</div>
            </div>
            <Modal id="newchar" title="Create New Character" type={MODAL_TYPE.prompt} onClose={(RetVal)=>NewCharacter(RetVal)}>
                <p>Please enter the name of your new Character:</p>
            </Modal>
        </>
    );
}