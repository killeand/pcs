import React, { useState } from 'react';

const PCSContext = React.createContext(null);

export function PCSContextProvider(props) {
    let [ character, setCharacter ] = useState(null);
    let [ files, setFiles ] = useState([]);

    function clean() {
        setCharacter(null);
        setFiles([]);
    }

    return (
        <PCSContext.Provider value={{ character, setCharacter, files, setFiles, clean }}>
            {props.children}
        </PCSContext.Provider>
    );
}

export default PCSContext;