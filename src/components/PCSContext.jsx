import React, { useState } from 'react';

const PCSContext = React.createContext(null);

export function PCSContextProvider(props) {
    let [ test, setTest ] = useState("");

    function Clean() {
        setTest("");
    }

    return (
        <PCSContext.Provider value={{ test, setTest }}>
            {props.children}
        </PCSContext.Provider>
    );
}

export default PCSContext;