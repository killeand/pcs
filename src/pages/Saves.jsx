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

    function RenderThrow(title, id, index) {
        if (charIndex == -1) {
            return (<p>Loading...</p>);
        }

        return (
            <Accordian title={title} titleElements={
                <div className="flex flex-row space-x-1">
                    <div className="flex flex-col divide-y divide-solid divide-black">
                        <p className="text-xs m-0 p-0">Base</p>
                        <p className="text-center m-0 p-0">{base_saves[index]}</p>
                    </div>
                    <div className="flex flex-col divide-y divide-solid divide-black">
                        <p className="text-xs m-0 p-0">Mod</p>
                        <p className="text-center m-0 p-0">{abi_saves[index]}</p>
                    </div>
                    <div className="flex flex-col divide-y divide-solid divide-black">
                        <p className="text-xs m-0 p-0">Misc</p>
                        <p className="text-center m-0 p-0">{ttl_saves[index]}</p>
                    </div>
                    <div className="flex flex-col divide-y divide-solid divide-black bg-white rounded-md">
                        <p className="text-xs m-0 p-0">Total</p>
                        <p className="text-center m-0 p-0">{base_saves[index] + abi_saves[index] + ttl_saves[index]}</p>
                    </div>
                </div>
            }>
                <MultiNumber title={["Enhance", "Misc", "Temp"]} id={id} value={GetAPI(id)} onChange={(retval) => ChangeValue(id, retval)} />
            </Accordian>
        );
    }

    return (
        <>
            <h1>Saving Throws</h1>
            <div className="main-container">
                {RenderThrow("Fortitude", "fort", 0)}
                {RenderThrow("Reflex", "ref", 1)}
                {RenderThrow("Will", "will", 2)}
            </div>
        </>
    );
}