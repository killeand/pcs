import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import PCSContext from '../components/PCSContext';
import Accordian from '../components/Accordian';
import MultiNumber from '../components/MultiNumber';
import '../styles/Page.css';

export default function Saves() {
    /*#########################################################################
    ## OPENING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/
    let PCSD = useContext(PCSContext);
    let Nav = useNavigate();
    let [ charIndex, setCharIndex ] = useState(-1);
    let [ fortValues, setFortValues ] = useState([0,0,0]);
    let [ refValues, setRefValues ] = useState([0,0,0]);
    let [ willValues, setWillValues ] = useState([0,0,0]);

    function GetAPI(path) {
        return _.get(PCSD.files[charIndex].data.saves, path);
    }
    
    function SetAPI(path, value) {
        let newObj = {};
        newObj[path] = value;
        _.assign(PCSD.files[charIndex].data.saves, newObj);
        PCSD.files[charIndex].saved = false;
    }

    useEffect(() => {
        let tempIndex = PCSD.getLoadedIndex();

        if (tempIndex == -1) {
            Nav("/");

            return;
        }

        if (!_.has(PCSD.files[tempIndex], "data.saves")) {
            _.assign(PCSD.files[tempIndex].data, {
                saves: {
                    fort: [0,0,0],
                    ref: [0,0,0],
                    will: [0,0,0]
                }
            });
        }

        setCharIndex(tempIndex);

        /* ENTER PAGE SPECIFIC CODE HERE */
        setFortValues(PCSD.files[tempIndex].data.saves.fort);
        setRefValues(PCSD.files[tempIndex].data.saves.ref);
        setWillValues(PCSD.files[tempIndex].data.saves.will);
        /* ENTER PAGE SPECIFIC CODE HERE */
    }, []);
    /*#########################################################################
    ## CLOSING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/

    let base_saves = [0,0,0];
    let abi_saves = [0,0,0];
    let ttl_saves = [0,0,0];

    if (charIndex != -1) {
        if (_.has(PCSD.files[charIndex].data, "stats")) {
            let con = PCSD.files[charIndex].data.stats.con;
            let dex = PCSD.files[charIndex].data.stats.dex;
            let wis = PCSD.files[charIndex].data.stats.wis;

            abi_saves[0] = Math.floor((_.sum(con) - 10) / 2);
            abi_saves[1] = Math.floor((_.sum(dex) - 10) / 2);
            abi_saves[2] = Math.floor((_.sum(wis) - 10) / 2);
        }

        if (_.has(PCSD.files[charIndex].data, "classes")) {
            PCSD.files[charIndex].data.classes.forEach((classData) => {
                base_saves[0] += classData.saves[0];
                base_saves[1] += classData.saves[1];
                base_saves[2] += classData.saves[2];
            });
        }

        ttl_saves[0] = _.sum(fortValues);
        ttl_saves[1] = _.sum(refValues);
        ttl_saves[2] = _.sum(willValues);
    }

    function ChangeValue(path, value) {
        if (path == "fort") setFortValues(value);
        if (path == "ref") setRefValues(value);
        if (path == "will") setWillValues(value);

        SetAPI(path, value);
    }

    return (
        <>
            <h1>Saving Throws</h1>
            <div className="main-container">
                {(charIndex == -1)?(
                    <p>Loading...</p>
                ):(
                    <>
                        <Accordian title="Fortitude" titleElements={[<div key="fort0">{base_saves[0]}</div>,<span key="fort1">+</span>,<div key="fort2">{abi_saves[0]}</div>,<span key="fort3">+</span>,<div key="fort4">{ttl_saves[0]}</div>,<span key="fort5">=</span>,<div key="fort6">{base_saves[0] + abi_saves[0] + ttl_saves[0]}</div>]}>
                            <MultiNumber title={["Enhance", "Misc", "Temp"]} id="fort" value={GetAPI("fort")} onChange={(retval) => ChangeValue("fort", retval)} />
                        </Accordian>
                        <Accordian title="Reflex" titleElements={[<div key="ref0">{base_saves[1]}</div>,<span key="ref1">+</span>,<div key="ref2">{abi_saves[1]}</div>,<span key="ref3">+</span>,<div key="ref4">{ttl_saves[1]}</div>,<span key="ref5">=</span>,<div key="ref6">{base_saves[1] + abi_saves[1] + ttl_saves[1]}</div>]}>
                            <MultiNumber title={["Enhance", "Misc", "Temp"]} id="ref" value={GetAPI("ref")} onChange={(retval) => ChangeValue("ref", retval)} />
                        </Accordian>
                        <Accordian title="Will" titleElements={[<div key="will0">{base_saves[2]}</div>,<span key="will1">+</span>,<div key="will2">{abi_saves[2]}</div>,<span key="will3">+</span>,<div key="will4">{ttl_saves[2]}</div>,<span key="will5">=</span>,<div key="will6">{base_saves[2] + abi_saves[2] + ttl_saves[2]}</div>]}>
                            <MultiNumber title={["Enhance", "Misc", "Temp"]} id="will" value={GetAPI("will")} onChange={(retval) => ChangeValue("will", retval)} />
                        </Accordian>
                    </>
                )}
            </div>
        </>
    );
}