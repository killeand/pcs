import React, { useState } from 'react';

const PCSContext = React.createContext(null);

export function PCSContextProvider(props) {
    let [ files, setFiles ] = useState([]);

    function getLoadedIndex() {
        for (let i = 0; i < files.length; i++) {
            if (files[i].loaded) return i;
        }

        return -1;
    }

    function clean() {
        setFiles([]);
    }

    return (
        <PCSContext.Provider value={{ files, setFiles, getLoadedIndex, clean }}>
            {props.children}
        </PCSContext.Provider>
    );
}

export default PCSContext;