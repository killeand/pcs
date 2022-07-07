import React, { useContext } from 'react';
import PCSContext from '../components/PCSContext';
import Button from '../components/Button';

export default function FileManager() {
    let PCSD = useContext(PCSContext);

    function NewCharacter() {
        let newFiles = PCSD.files;
        newFiles.push({
            title: "New Display Title",
            loaded: false,
            saved: false,
            data: {}
        });

        PCSD.setFiles(newFiles);

        console.log(PCSD.files);
    }

    function RenderCharacters() {
        if (PCSD.files.length == 0)
            return (<p>No characters have been loaded or created...</p>);

        return PCSD.files.map((files, index) => {
            return (
                <div key={`char${index}`} className="border border-black p-1 flex flex-row items-center space-x-2">
                    <div className="flex-grow">{files.title}</div>
                    <div className="">{(files.saved)?"Saved":"Unsaved"}</div>
                    <div className="flex flex-row space-x-1">
                        {(files.loaded)?<Button color="disabled" className="bi-play-circle" />:<Button color="purple" className="bi-play-circle" onClick={()=>console.log(`Activating ${files.name}`)} />}
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
                <Button color="yellow">Load Character</Button>
            </div>
            <h2>Characters</h2>
            <div className="flex flex-col m-3 space-y-2">
                {RenderCharacters()}
            </div>
        </>
    );
}