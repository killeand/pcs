import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import PCSContext from '../components/application/PCSContext';
import Accordian from '../components/Accordian';
import MultiNumber from '../components/MultiNumber';
import '../styles/Page.css';

export default function Stats() {
    /*#########################################################################
    ## OPENING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/
    let PCSD = useContext(PCSContext);
    let Nav = useNavigate();
    let [ charIndex, setCharIndex ] = useState(-1);
    let [ strValue, setStrValue ] = useState([0,0,0,0]);
    let [ dexValue, setDexValue ] = useState([0,0,0,0]);
    let [ conValue, setConValue ] = useState([0,0,0,0]);
    let [ intValue, setIntValue ] = useState([0,0,0,0]);
    let [ wisValue, setWisValue ] = useState([0,0,0,0]);
    let [ chrValue, setChrValue ] = useState([0,0,0,0]);

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
        setStrValue(PCSD.files[tempIndex].data.stats.str);
        setDexValue(PCSD.files[tempIndex].data.stats.dex);
        setConValue(PCSD.files[tempIndex].data.stats.con);
        setIntValue(PCSD.files[tempIndex].data.stats.int);
        setWisValue(PCSD.files[tempIndex].data.stats.wis);
        setChrValue(PCSD.files[tempIndex].data.stats.chr);
        /* ENTER PAGE SPECIFIC CODE HERE */
    }, []);
    /*#########################################################################
    ## CLOSING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/

    let getMod = (val) => Math.floor((val - 10) / 2);

    function ChangeValue(path, value) {
        if (path=='str')setStrValue(value);
        if (path=='dex')setDexValue(value);
        if (path=='con')setConValue(value);
        if (path=='int')setIntValue(value);
        if (path=='wis')setWisValue(value);
        if (path=='chr')setChrValue(value);

        SetAPI(path, value);
    }

    function RenderStat(title, id) {
        if (charIndex == -1) {
            return (<p>Loading...</p>);
        }

        let stat = _.sum(GetAPI(id));

        return (
            <Accordian title={title} titleElements={
                <div className="flex flex-row space-x-1">
                    <div className="flex flex-col divide-y divide-solid divide-black bg-base-300 text-base-content rounded-md">
                        <p className="text-xs m-0 p-0">Total</p>
                        <p className="text-center m-0 p-0">{stat}</p>
                    </div>
                    <div className="flex flex-col divide-y divide-solid divide-black">
                        <p className="text-xs m-0 p-0">Mod</p>
                        <p className="text-center m-0 p-0">{getMod(stat)}</p>
                    </div>
                </div>
            }>
                <MultiNumber title={["Base", "Enhance", "Misc", "Temp"]} id={`${id}`} value={GetAPI(id)} min={[0,0,-100,-100]} onChange={(retval)=>ChangeValue(id, retval)} />
            </Accordian>
        );
    }

    return (
        <>
            <h1>Ability Scores</h1>
            <div className="main-container">
                {RenderStat("Strength", "str")}
                {RenderStat("Dexterity", "dex")}
                {RenderStat("Constitution", "con")}
                {RenderStat("Intelligence", "int")}
                {RenderStat("Wisdom", "wis")}
                {RenderStat("Charisma", "chr")}
            </div>
            <div className="msg-container">
                <div><span className="font-bold">Mods Calculation</span>: &lfloor;(StatTotal - 10) / 2)&rfloor;</div>
            </div>
        </>
    );
}