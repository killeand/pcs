import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import PCSContext from '../components/application/PCSContext';
import Accordian from '../components/Accordian';
import MultiNumber from '../components/MultiNumber';
import Label from '../components/Label';
import Select from '../components/Select';
import '../styles/Page.css';

export default function Offensive() {
    /*#########################################################################
    ## OPENING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/
    let PCSD = useContext(PCSContext);
    let Nav = useNavigate();
    let [ charIndex, setCharIndex ] = useState(-1);
    let [ meleeValue, setMeleeValue ] = useState([0,0]);
    let [ rangeValue, setRangeValue ] = useState([0,0]);
    let [ cmbValue, setCmbValue ] = useState([0,0]);
    let [ cmdValue, setCmdValue ] = useState([0,0]);
    let [ cmbState, setCmbState ] = useState(0);

    function GetAPI(path) {
        return _.get(PCSD.files[charIndex].data.offense, path);
    }
    
    function SetAPI(path, value) {
        let newObj = {};
        newObj[path] = value;
        _.assign(PCSD.files[charIndex].data.offense, newObj);
        PCSD.files[charIndex].saved = false;
    }

    useEffect(() => {
        let tempIndex = PCSD.getLoadedIndex();

        if (tempIndex == -1) {
            Nav("/");

            return;
        }

        if (!_.has(PCSD.files[tempIndex], "data.offense")) {
            _.assign(PCSD.files[tempIndex].data, {
                offense: {
                    melee: [0,0],
                    range: [0,0],
                    cmb: [0,0],
                    cmd: [0,0]
                }
            });
        }

        setCharIndex(tempIndex);

        /* ENTER PAGE SPECIFIC CODE HERE */
        setMeleeValue(PCSD.files[tempIndex].data.offense.melee);
        setRangeValue(PCSD.files[tempIndex].data.offense.range);
        setCmbValue(PCSD.files[tempIndex].data.offense.cmb);
        setCmdValue(PCSD.files[tempIndex].data.offense.cmd);
        /* ENTER PAGE SPECIFIC CODE HERE */
    }, []);
    /*#########################################################################
    ## CLOSING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/

    let totals = [0,0,0,0];
    let bab = 0;
    let size_att = 0;
    let size_cm = 0;
    let mods = [0,0];
    let temp_bab = 0;
    let temp_melee = 0;
    let temp_range = 0;
    let melee_bonus = [];
    let range_bonus = [];
    let getMod = (val)=>Math.floor((val-10)/2);

    if (charIndex != -1) {
        if (_.has(PCSD.files[charIndex].data, "details")) {
            let sizeval = PCSD.files[charIndex].data.details.size - 4;
            let calced = Math.ceil(Math.pow(2,Math.abs(sizeval))/2)
            size_att = (sizeval==0)?0:((sizeval>0)?-(calced):calced);
            size_cm = -(size_att);
        }

        if (_.has(PCSD.files[charIndex].data, "stats")) {
            mods = [
                getMod(_.sum(PCSD.files[charIndex].data.stats.str)),
                getMod(_.sum(PCSD.files[charIndex].data.stats.dex))
            ]
        }

        if (_.has(PCSD.files[charIndex].data, "classes")) {
            PCSD.files[charIndex].data.classes.forEach((classData) => {
                bab += classData.bab;
            });
        }

        totals = [_.sum(meleeValue),_.sum(rangeValue),_.sum(cmbValue),_.sum(cmdValue)];

        temp_bab = bab;
        temp_melee = bab + mods[0] + size_att + totals[0];
        temp_range = bab + mods[1] + size_att + totals[1];

        while (temp_bab > 0) {
            melee_bonus.push(temp_melee);
            range_bonus.push(temp_range);

            temp_bab -= 5;
            temp_melee -= 5;
            temp_range -= 5;
        }
    }

    function ChangeValue(path, value) {
        if (path=='melee')setMeleeValue(value);
        if (path=='range')setRangeValue(value);
        if (path=='cmb')setCmbValue(value);
        if (path=='cmd')setCmdValue(value);

        SetAPI(path, value);
    }

    function RenderOffense(title, id, index, stat) {
        if (charIndex == -1) {
            return (<p>Loading...</p>);
        }
        
        let sp_size = (id[0]=='c')?size_cm:size_att;
        let sp_mod = ((id=='cmd')?(mods[0]+mods[1]):mods[stat])
        let sp_ttl = ((id=='cmd')?10:0)+bab+sp_mod+sp_size+totals[index];

        return (
            <Accordian title={`${title}${(id=='cmb')?((cmbState)?" (Dex)":" (Str)"):""}`} titleElements={
                <div className="flex flex-row space-x-1">
                    {(id=='cmd')?(
                        <div className="flex flex-col divide-y divide-solid divide-black">
                            <p className="text-xs m-0 p-0">Base</p>
                            <p className="text-center m-0 p-0">10</p>
                        </div>
                    ):""}
                    <div className="flex flex-col divide-y divide-solid divide-black">
                        <p className="text-xs m-0 p-0">BAB</p>
                        <p className="text-center m-0 p-0">{bab}</p>
                    </div>
                    <div className="flex flex-col divide-y divide-solid divide-black">
                        <p className="text-xs m-0 p-0">Mod</p>
                        <p className="text-center m-0 p-0">{sp_mod}</p>
                    </div>
                    <div className="flex flex-col divide-y divide-solid divide-black">
                        <p className="text-xs m-0 p-0">Size</p>
                        <p className="text-center m-0 p-0">{sp_size}</p>
                    </div>
                    <div className="flex flex-col divide-y divide-solid divide-black">
                        <p className="text-xs m-0 p-0">Misc</p>
                        <p className="text-center m-0 p-0">{totals[index]}</p>
                    </div>
                    <div className="flex flex-col divide-y divide-solid divide-black bg-base-300 text-base-content rounded-md">
                        <p className="text-xs m-0 p-0">Total</p>
                        <p className="text-center m-0 p-0">{sp_ttl}</p>
                    </div>
                </div>
            }>
                {(id=='cmb')?(
                    <Select title="Modifier" id="cmbstate" value={cmbState} items={["Strength","Dexterity"]} onChange={setCmbState} />
                ):""}
                <MultiNumber title={["Misc","Temp"]} id={id} value={GetAPI(id)} min={[-100,-100]} onChange={(retval)=>ChangeValue(id,retval)} />
            </Accordian>
        );
    }

    return (
        <>
            <h1>Offensive Stats</h1>
            <div className="main-container">
                {RenderOffense("Melee","melee",0,0)}
                {RenderOffense("Ranged","range",1,1)}
                {RenderOffense("CMB","cmb",2,cmbState)}
                {RenderOffense("CMD","cmd",3,0)}
                <Label title="Melee Attacks" value={melee_bonus.join(", ")} />
                <Label title="Ranged Attacks" value={range_bonus.join(", ")} />
            </div>
            <div className="msg-container">
                <div><span className="font-bold">Mods Used</span>: Melee (str), Ranged (dex)</div>
                <div><span className="font-bold">CMD Calculation</span>: 10 + BAB + Str Mod + Dex Mod + Size + Misc + Temp</div>
            </div>
        </>
    );
}