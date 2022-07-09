import React, { useContext, useEffect, useState } from 'react';
import PCSContext from '../components/PCSContext';
import Button from '../components/Button';
import _ from 'lodash';

export default function FileManager() {
    let PCSD = useContext(PCSContext);

    function NewCharacter() {
        let newFiles = [...PCSD.files];
        newFiles.push({
            title: "New Display Title",
            loaded: false,
            saved: false,
            data: {}
        });

        PCSD.setFiles(newFiles);
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
                        data = JSON.parse(results);

                        console.log(data);
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

    function RenderCharacters() {
        if (PCSD.files.length == 0) {
            return (<p>No characters have been loaded or created...</p>);
        }
          
        return PCSD.files.map((files, index) => {
            return (
                <div key={`char${index}`} className="border border-black p-1 flex flex-row items-center space-x-2">
                    <div className="flex-grow">{files.title}</div>
                    <div className="">{(files.saved)?"Saved":"Unsaved"}</div>
                    <div className="flex flex-row space-x-1">
                        {(files.loaded)?<Button color="disabled" className="bi-play-circle" />:<Button color="purple" className="bi-play-circle" onClick={ActivateCharacter.bind(this, index)} />}
                        <Button color="green" className="bi-save" onClick={()=>console.log(`Saving ${files.title}`)} />
                        <Button color="red" className="bi-trash" onClick={()=>console.log(`Removing ${files.title}`)} />
                    </div>
                </div>
            );
        });
    }

    return (
        <>
            <h1>File Manager</h1>
            <div className="flex justify-evenly m-3">
                <Button color="blue" onClick={NewCharacter}>New Character</Button>
                <Button as="label" color="yellow">
                    <input type="file" className="hidden h-0" multiple accept=".json" onChange={LoadCharacter} />
                    Load Character
                </Button>
            </div>
            <h2>Characters</h2>
            <div className="flex flex-col m-3 space-y-2">
                {RenderCharacters()}
            </div>
        </>
    );
}