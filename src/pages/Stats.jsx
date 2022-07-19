import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import PCSContext from '../components/PCSContext';
import StatsRow from '../components/StatsRow';
import '../styles/Page.css';

export default function Stats() {
    /*#########################################################################
    ## OPENING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/
    let PCSD = useContext(PCSContext);
    let Nav = useNavigate();
    let [ charIndex, setCharIndex ] = useState(-1);

    function GetAPI(path) {
        return _.get(PCSD.files[charIndex].data.stats, path);
    }
    
    function SetAPI(path, value) {
        let newObj = {};
        newObj[path] = value;
        _.assign(PCSD.files[charIndex].data.stats, newObj);
        PCSD.files[charIndex].saved = false;
    }

    useEffect(() => {
        let tempIndex = PCSD.getLoadedIndex();

        if (tempIndex == -1) {
            Nav("/");

            return;
        }

        if (!_.has(PCSD.files[tempIndex], "data.stats")) {
            _.assign(PCSD.files[tempIndex].data, {
                stats: {
                    str: [0,0,0,0],
                    dex: [0,0,0,0],
                    con: [0,0,0,0],
                    int: [0,0,0,0],
                    wis: [0,0,0,0],
                    chr: [0,0,0,0]
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
            <h1>Ability Scores</h1>
            <div className="main-container">
                {(charIndex == -1)?(
                    <p>Loading...</p>
                ):(
                    <>
                        <StatsRow title="Strength" id="str" value={GetAPI("str")} onChange={(retval)=>SetAPI("str",retval)} />
                        <StatsRow title="Dexterity" id="dex" value={GetAPI("dex")} onChange={(retval)=>SetAPI("dex",retval)} />
                        <StatsRow title="Constitution" id="con" value={GetAPI("con")} onChange={(retval)=>SetAPI("con",retval)} />
                        <StatsRow title="Intelligence" id="int" value={GetAPI("int")} onChange={(retval)=>SetAPI("int",retval)} />
                        <StatsRow title="Wisdom" id="wis" value={GetAPI("wis")} onChange={(retval)=>SetAPI("wis",retval)} />
                        <StatsRow title="Charisma" id="chr" value={GetAPI("chr")} onChange={(retval)=>SetAPI("chr",retval)} />
                    </>
                )}
            </div>
            <div className="msg-container">
                <div><span className="font-bold">Mods Calculation</span>: &lfloor;(StatTotal - 10) / 2)&rfloor;</div>
            </div>
        </>
    );
}