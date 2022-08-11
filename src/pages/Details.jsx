import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import PCSContext from '../components/PCSContext';
import Text from '../components/Text';
import Select from '../components/Select';
import List from '../components/List';
import { PF_SIZES, PF_ALIGNMENTS, PF_LANGUAGES } from '../scripts/Pathfinder';
import '../styles/Page.css';

export default function Details() {
    /*#########################################################################
    ## OPENING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/
    let PCSD = useContext(PCSContext);
    let Nav = useNavigate();
    let [ charIndex, setCharIndex ] = useState(-1);

    function GetAPI(path) {
        return _.get(PCSD.files[charIndex].data.details, path);
    }
    
    function SetAPI(path, value) {
        let newObj = {};
        newObj[path] = value;
        _.assign(PCSD.files[charIndex].data.details, newObj);
        PCSD.files[charIndex].saved = false;
    }

    useEffect(() => {
        let tempIndex = PCSD.getLoadedIndex();

        if (tempIndex == -1) {
            Nav("/");

            return;
        }

        if (!_.has(PCSD.files[tempIndex], "data.details")) {
            _.assign(PCSD.files[tempIndex].data, {
                details: {
                    name: "",
                    race: "",
                    size: 4,
                    gender: "",
                    height: "",
                    weight: "",
                    hair: "",
                    eyes: "",
                    skin: "",
                    age: "",
                    alignment: "",
                    deity: "",
                    homeland: "",
                    languages: []
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
            <h1>Character Details</h1>
            <div className="main-container">
                <Text title="Name" id="name" value={GetAPI("name")} onChange={(retval)=>SetAPI("name", retval)} />
                <Text title="Race" id="race" value={GetAPI("race")} onChange={(retval)=>SetAPI("race", retval)} />
                <Select title="Size" id="size" value={GetAPI("size")} items={PF_SIZES} arrow="bi-aspect-ratio" onChange={(retval)=>SetAPI("size", retval)} />
                <Text title="Gender" id="gender" value={GetAPI("gender")} onChange={(retval)=>SetAPI("gender", retval)} />
                <Text title="Height" id="height" value={GetAPI("height")} onChange={(retval)=>SetAPI("height", retval)} />
                <Text title="Weight" id="weight" value={GetAPI("weight")} onChange={(retval)=>SetAPI("weight", retval)} />
                <Text title="Hair" id="hair" value={GetAPI("hair")} onChange={(retval)=>SetAPI("hair", retval)} />
                <Text title="Eyes" id="eyes" value={GetAPI("eyes")} onChange={(retval)=>SetAPI("eyes", retval)} />
                <Text title="Skin" id="skin" value={GetAPI("skin")} onChange={(retval)=>SetAPI("skin", retval)} />
                <Text title="Age" id="age" value={GetAPI("age")} onChange={(retval)=>SetAPI("age", retval)} />
                <Select title="Alignment" id="alignment" value={GetAPI("alignment")} items={PF_ALIGNMENTS} arrow="bi-text-indent-left" onChange={(retval)=>SetAPI("alignment", retval)} />
                <Text title="Deity" id="deity" value={GetAPI("deity")} onChange={(retval)=>SetAPI("deity", retval)} />
                <Text title="Homeland" id="homeland" value={GetAPI("homeland")} onChange={(retval)=>SetAPI("homeland", retval)} />
                <List title="Languages" id="languages" value={GetAPI("languages")} onChange={(retval)=>SetAPI("languages",retval)} />
            </div>
        </>
    );
}