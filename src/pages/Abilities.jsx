import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import PCSContext from '../components/application/PCSContext';
import List from '../components/List';
import '../styles/Page.css';

export default function Abilities() {
    /*#########################################################################
    ## OPENING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/
    let PCSD = useContext(PCSContext);
    let Nav = useNavigate();
    let [ charIndex, setCharIndex ] = useState(-1);

    function GetAPI(path) {
        return _.get(PCSD.files[charIndex].data.abilities, path);
    }
    
    function SetAPI(path, value) {
        let newObj = {};
        newObj[path] = value;
        _.assign(PCSD.files[charIndex].data.abilities, newObj);
        PCSD.files[charIndex].saved = false;
    }

    useEffect(() => {
        let tempIndex = PCSD.getLoadedIndex();

        if (tempIndex == -1) {
            Nav("/");

            return;
        }

        if (!_.has(PCSD.files[tempIndex], "data.abilities")) {
            _.assign(PCSD.files[tempIndex].data, {
                abilities: {
                    feats: [],
                    features: [],
                    racial: [],
                    misc: []
                }
            });
        }

        setCharIndex(tempIndex);

        /* ENTER PAGE SPECIFIC CODE HERE */
        
        /* ENTER PAGE SPECIFIC CODE HERE */
    }, []);
    /*#########################################################################
    ## CLOSING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/

    if (charIndex == -1)
        return (<p>Loading...</p>);

    return (
        <>
            <h1>Feats and Abilities</h1>
            <div className="main-container">
                <List title="Feats" id="feats" value={GetAPI("feats")} onChange={(retval)=>SetAPI("feats",retval)} />
                <List title="Class Features" id="features" value={GetAPI("features")} onChange={(retval)=>SetAPI("features",retval)} />
                <List title="Racial" id="racial" value={GetAPI("racial")} onChange={(retval)=>SetAPI("racial",retval)} />
                <List title="Miscellaneous" id="misc" value={GetAPI("misc")} onChange={(retval)=>SetAPI("misc",retval)} />
            </div>
        </>
    );
}