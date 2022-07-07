import React from 'react';
import Button from '../components/Button';

export default function FileManager() {
    function RenderCharacters() {
        return ["char 1", "char 2", "char 3"].map((char, index) => {
            return (
                <div key={`char${index}`} className="border border-black p-1 flex flex-row items-center space-x-2">
                    <div className="flex-grow">{char}</div>
                    <div className="">Saved</div>
                    <div className="flex flex-row space-x-1">
                        <Button color="green" className="bi-save" />
                        <Button color="red" className="bi-trash" />
                    </div>
                </div>
            );
        });
    }

    return (
        <>
            <h1>File Manager</h1>
            <div className="flex justify-evenly m-3">
                <Button color="blue">New Character</Button>
                <Button color="yellow">Load Character</Button>
            </div>
            <h2>Characters</h2>
            <div className="flex flex-col m-3 space-y-2">
                {RenderCharacters()}
            </div>
        </>
    );
}