import React from 'react';

export default function FileManager() {
    function RenderCharacters() {
        return ["char 1", "char 2", "char 3"].map((char, index) => {
            return (
                <div key={`char${index}`} className="border border-black p-1 flex flex-row items-center">
                    <div className="flex-grow">{char}</div>
                    <div className="flex flex-row">
                        <button className="bi-save" />
                        <button className="bi-trash" />
                    </div>
                </div>
            );
        });
    }

    return (
        <>
            <h1>File Manager</h1>
            <div className="flex justify-evenly m-3">
                <button>New Character</button>
                <button>Load Character</button>
            </div>
            <h2>Characters</h2>
            <div className="flex flex-col m-3 space-y-2">
                {RenderCharacters()}
            </div>
        </>
    );
}