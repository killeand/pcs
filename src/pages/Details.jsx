import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import PCSContext from '../components/PCSContext';
import TextRow from '../components/TextRow';
import SelectRow from '../components/SelectRow';
import CheckboxRow from '../components/CheckboxRow';
import { PF_SIZES, PF_ALIGNMENTS, PF_LANGUAGES } from '../scripts/Pathfinder';
import '../styles/Details.css';

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

    return (
        <>
            <h1>Character Details</h1>
            <div className="det-cont">
                {(charIndex == -1)?(
                    <p>Loading...</p>
                ):(
                    <>
                        <TextRow title="Name" id="name" value={GetAPI("name")} onChange={(retval)=>SetAPI("name", retval)} />
                        <TextRow title="Race" id="race" value={GetAPI("race")} onChange={(retval)=>SetAPI("race", retval)} />
                        <SelectRow title="Size" id="size" value={GetAPI("size")} items={PF_SIZES} arrow="bi-aspect-ratio" onChange={(retval)=>SetAPI("size", retval)} />
                        <TextRow title="Gender" id="gender" value={GetAPI("gender")} onChange={(retval)=>SetAPI("gender", retval)} />
                        <TextRow title="Height" id="height" value={GetAPI("height")} onChange={(retval)=>SetAPI("height", retval)} />
                        <TextRow title="Weight" id="weight" value={GetAPI("weight")} onChange={(retval)=>SetAPI("weight", retval)} />
                        <TextRow title="Hair" id="hair" value={GetAPI("hair")} onChange={(retval)=>SetAPI("hair", retval)} />
                        <TextRow title="Eyes" id="eyes" value={GetAPI("eyes")} onChange={(retval)=>SetAPI("eyes", retval)} />
                        <TextRow title="Skin" id="skin" value={GetAPI("skin")} onChange={(retval)=>SetAPI("skin", retval)} />
                        <TextRow title="Age" id="age" value={GetAPI("age")} onChange={(retval)=>SetAPI("age", retval)} />
                        <SelectRow title="Alignment" id="alignment" value={GetAPI("alignment")} items={PF_ALIGNMENTS} arrow="bi-text-indent-left" onChange={(retval)=>SetAPI("alignment", retval)} />
                        <TextRow title="Deity" id="deity" value={GetAPI("deity")} onChange={(retval)=>SetAPI("deity", retval)} />
                        <TextRow title="Homeland" id="homeland" value={GetAPI("homeland")} onChange={(retval)=>SetAPI("homeland", retval)} />
                        <CheckboxRow title="Languages" id="languages" value={GetAPI("languages")} items={PF_LANGUAGES} onChange={(retval)=>SetAPI("languages", retval)} />
                    </>
                )}
            </div>
        </>
    );
}