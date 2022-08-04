import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import PCSContext from '../components/PCSContext';
import Text from '../components/Text';
import Accordian from '../components/Accordian';
import MultiNumber from '../components/MultiNumber';
import Number from '../components/Number';
import '../styles/Page.css';

export default function Miscellaneous() {
    /*#########################################################################
    ## OPENING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/
    let PCSD = useContext(PCSContext);
    let Nav = useNavigate();
    let [ charIndex, setCharIndex ] = useState(-1);
    let [ speedValues, setSpeedValues ] = useState([0,0,0,0,0]);
    let [ initValue, setInitValue ] = useState(0);

    function GetAPI(path) {
        return _.get(PCSD.files[charIndex].data.miscstats, path);
    }

    function SetAPI(path, value) {
        let newObj = {};
        newObj[path] = value;
        _.assign(PCSD.files[charIndex].data.miscstats, newObj);
        PCSD.files[charIndex].saved = false;
    }

    useEffect(() => {
        let tempIndex = PCSD.getLoadedIndex();

        if (tempIndex == -1) {
            Nav("/");

            return;
        }

        if (!_.has(PCSD.files[tempIndex], "data.miscstats")) {
            _.assign(PCSD.files[tempIndex].data, {
                miscstats: {
                    speed: [0,0,0,0,0],
                    init: 0,
                    resist: [0,0,0,0,0],
                    dr: "",
                    sr: ""
                }
            });
        }

        setCharIndex(tempIndex);

        /* ENTER PAGE SPECIFIC CODE HERE */
        setSpeedValues(PCSD.files[tempIndex].data.miscstats.speed);
        setInitValue(PCSD.files[tempIndex].data.miscstats.init);
        /* ENTER PAGE SPECIFIC CODE HERE */
    }, []);
    /*#########################################################################
    ## CLOSING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/

    let dexmod = 0;
    let getMod = (val)=>Math.floor((val-10)/2);

    if (charIndex != -1) {
        if (_.has(PCSD.files[charIndex].data, "stats")) {
            dexmod = getMod(_.sum(PCSD.files[charIndex].data.stats.dex));
        }
    }

    function ChangeValue(path, value) {
        if (path=='speed') setSpeedValues(value);
        if (path=='init') setInitValue(value);

        SetAPI(path, value);
    }

    if (charIndex == -1) {
        return (<p>Loading...</p>);
    }

    return (
        <>
            <h1>Miscellaneous Stats</h1>
            <div className="main-container">
                <Accordian title="Speeds" titleElements={
                    <div className="flex flex-row space-x-1">
                        <div className="flex flex-col divide-y divide-solid divide-black">
                            <p className="text-xs m-0 p-0">Walk</p>
                            <p className="text-center m-0 p-0">{speedValues[0]}</p>
                        </div>
                        <div className="flex flex-col divide-y divide-solid divide-black">
                            <p className="text-xs m-0 p-0">Run x4</p>
                            <p className="text-center m-0 p-0">{(speedValues[1]==0)?speedValues[0]*4:speedValues[1]}</p>
                        </div>
                        <div className="flex flex-col divide-y divide-solid divide-black">
                            <p className="text-xs m-0 p-0">Swim</p>
                            <p className="text-center m-0 p-0">{(speedValues[2]==0)?Math.floor(speedValues[0]/4):speedValues[2]}</p>
                        </div>
                        <div className="flex flex-col divide-y divide-solid divide-black">
                            <p className="text-xs m-0 p-0">Climb</p>
                            <p className="text-center m-0 p-0">{(speedValues[3]==0)?Math.floor(speedValues[0]/4):speedValues[3]}</p>
                        </div>
                        <div className="flex flex-col divide-y divide-solid divide-black">
                            <p className="text-xs m-0 p-0">Fly</p>
                            <p className="text-center m-0 p-0">{speedValues[4]}</p>
                        </div>
                    </div>
                }>
                    <MultiNumber title={["Walk","Run","Swim","Climb","Fly"]} id="speed" value={GetAPI("speed")} onChange={(retval)=>ChangeValue("speed",retval)} />
                </Accordian>
                <Accordian title="Initiative" titleElements={
                    <div className="flex flex-row space-x-1">
                        <div className="flex flex-col divide-y divide-solid divide-black">
                            <p className="text-xs m-0 p-0">Dexterity</p>
                            <p className="text-center m-0 p-0">{dexmod}</p>
                        </div>
                        <div className="flex flex-col divide-y divide-solid divide-black">
                            <p className="text-xs m-0 p-0">Misc</p>
                            <p className="text-center m-0 p-0">{initValue}</p>
                        </div>
                        <div className="flex flex-col divide-y divide-solid divide-black bg-white rounded-md">
                            <p className="text-xs m-0 p-0">Total</p>
                            <p className="text-center m-0 p-0">{dexmod+GetAPI("init")}</p>
                        </div>
                    </div>
                }>
                    <Number title="Misc" id="init" value={GetAPI("init")} onChange={(retval)=>ChangeValue("init",retval)} />
                </Accordian>
                <fieldset>
                    <legend>Resistances</legend>
                    <MultiNumber title={["Acid","Cold","Elec","Fire","Sonic"]} id="resist" value={GetAPI("resist")} onChange={(retval)=>ChangeValue("resist",retval)} />
                </fieldset>
                <Text title="DR" id="dr" value={GetAPI("dr")} onChange={(retval)=>ChangeValue("dr",retval)} />
                <Text title="SR" id="sr" value={GetAPI("sr")} onChange={(retval)=>ChangeValue("sr",retval)} />
            </div>
            <div className="msg-container">
                <div><span className="font-bold">Speeds</span>: Base speed is your walk speed. All other values are automatically derived (exception is fly) unless you override the value.</div>
            </div>
        </>
    );
}