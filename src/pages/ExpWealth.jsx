import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import PCSContext from '../components/PCSContext';
import Number from '../components/Number';
import Label from '../components/Label';
import Select from '../components/Select';
import MultiNumber from '../components/MultiNumber';
import TextArea from '../components/TextArea';
import { PF_EXP } from '../scripts/Pathfinder';
import '../styles/Page.css';

export default function ExpWealth() {
    /*#########################################################################
    ## OPENING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/
    let PCSD = useContext(PCSContext);
    let Nav = useNavigate();
    let [ charIndex, setCharIndex ] = useState(-1);
    let [ xp, setXp ] = useState([0,1]);


    function GetWealth(path) {
        return _.get(PCSD.files[charIndex].data.wealth, path);
    }

    function SetEXP(value) {
        PCSD.files[charIndex].data.exp = value;
        PCSD.files[charIndex].saved = false;
    }
    
    function SetWealth(path, value) {
        let newObj = {};
        newObj[path] = value;
        _.assign(PCSD.files[charIndex].data.wealth, newObj);
        PCSD.files[charIndex].saved = false;
    }

    useEffect(() => {
        let tempIndex = PCSD.getLoadedIndex();

        if (tempIndex == -1) {
            Nav("/");

            return;
        }

        if (!_.has(PCSD.files[tempIndex], "data.exp")) {
            _.assign(PCSD.files[tempIndex].data, {
                exp: [0,1]
            });
        }

        if (!_.has(PCSD.files[tempIndex], "data.wealth")) {
            _.assign(PCSD.files[tempIndex].data, {
                wealth: {
                    plat: [0,0],
                    gold: [0,0],
                    silv: [0,0],
                    copp: [0,0],
                    othe: ""
                }
            });
        }

        setCharIndex(tempIndex);

        /* ENTER PAGE SPECIFIC CODE HERE */
        setXp(PCSD.files[tempIndex].data.exp);
        /* ENTER PAGE SPECIFIC CODE HERE */
    }, []);
    /*#########################################################################
    ## CLOSING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/

    let next_level = 0;
    let level_index = 0;

    do {
        level_index += 1;
    } while (PF_EXP[xp[1]][level_index] <= xp[0]);

    next_level = PF_EXP[xp[1]][level_index];

    function ChangeExp(index, value) {
        let newExp = [...xp];
        newExp[index] = value;

        setXp(newExp);
        SetEXP(newExp);
    }

    function ChangeWealth(path, value) {
        SetWealth(path, value);
    }

    if (charIndex == -1)
        return (<p>Loading...</p>);

    return (
        <>
            <h1>Experience and Wealth</h1>
            <h2 className="mt-2">Experience</h2>
            <div className="main-container">
                <div className="flex flex-row space-x-1">
                    <Number title="Current XP" id="xp" value={xp[0]} min={0} className="w-1/2" onChange={(retval)=>ChangeExp(0, retval)} />
                    <Label title="Next Level" className="w-1/2" value={next_level} />
                </div>
                <Select title="Progression" id="progress" value={xp[1]} items={["Slow","Medium","Fast"]} onChange={(retval)=>ChangeExp(1, retval)} />
                <Label title="Current Level" value={level_index} />
            </div>
            <h2 className="mt-2">Wealth</h2>
            <div className="main-container">
                <Label title="Platinum" value={<MultiNumber title={["Carried","Stored"]} id="platinum" value={GetWealth("plat")} min={[0,0]} onChange={(retval)=>ChangeWealth("plat",retval)} />} />
                <Label title="Gold" value={<MultiNumber title={["Carried","Stored"]} id="gold" value={GetWealth("gold")} min={[0,0]} onChange={(retval)=>ChangeWealth("gold",retval)} />} />
                <Label title="Silver" value={<MultiNumber title={["Carried","Stored"]} id="silver" value={GetWealth("silv")} min={[0,0]} onChange={(retval)=>ChangeWealth("silv",retval)} />} />
                <Label title="Copper" value={<MultiNumber title={["Carried","Stored"]} id="copper" value={GetWealth("copp")} min={[0,0]} onChange={(retval)=>ChangeWealth("copp",retval)} />} />
                <TextArea title="Other (in gp)" id="other" value={GetWealth("othe")} onChange={(retval)=>ChangeWealth("othe",retval)} />
            </div>
        </>
    );
}