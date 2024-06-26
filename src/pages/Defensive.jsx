import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import PCSContext from "../components/application/PCSContext";
import Label from "../components/Label";
import Accordian from "../components/Accordian";
import MultiNumber from "../components/MultiNumber";

export default function Defensive() {
    /*#########################################################################
    ## OPENING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/
    let PCSD = useContext(PCSContext);
    let Nav = useNavigate();
    let [charIndex, setCharIndex] = useState(-1);
    let [defValues, setDefValues] = useState([0, 0, 0, 0]);

    function SetAPI(value) {
        _.assign(PCSD.files[charIndex].data.defense, value);
        PCSD.files[charIndex].saved = false;
    }

    useEffect(() => {
        let tempIndex = PCSD.getLoadedIndex();

        if (tempIndex == -1) {
            Nav("/");

            return;
        }

        if (!_.has(PCSD.files[tempIndex], "data.defense")) {
            _.assign(PCSD.files[tempIndex].data, {
                defense: [0, 0, 0, 0],
            });
        }

        setCharIndex(tempIndex);

        /* ENTER PAGE SPECIFIC CODE HERE */
        setDefValues(PCSD.files[tempIndex].data.defense);
        /* ENTER PAGE SPECIFIC CODE HERE */
    }, []);
    /*#########################################################################
    ## CLOSING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/

    let total_ac = 0;
    let maxdex = -1;
    let ac_penalty = 0;
    let spellfail = 0;
    let dexmod = 0;
    let actual_dex = 0;
    let size = 0;
    let final_ac = 0;
    let final_touch = 0;
    let final_flat = 0;
    let getMod = (val) => Math.floor((val - 10) / 2);

    if (charIndex != -1) {
        if (_.has(PCSD.files[charIndex].data, "details")) {
            let sizeval = PCSD.files[charIndex].data.details.size - 4;
            let calced = Math.ceil(Math.pow(2, Math.abs(sizeval)) / 2);
            size = sizeval == 0 ? 0 : sizeval > 0 ? -calced : calced;
        }

        if (_.has(PCSD.files[charIndex].data, "stats")) {
            dexmod = getMod(_.sum(PCSD.files[charIndex].data.stats.dex));
        }

        if (_.has(PCSD.files[charIndex].data, "armors")) {
            PCSD.files[charIndex].data.armors.forEach((item) => {
                if (item.active) {
                    total_ac += item.ac;
                    ac_penalty += item.penalty;
                    spellfail += item.spellfail;

                    if (item.maxdex >= 0) {
                        if (maxdex < 0) maxdex = item.maxdex;
                        else if (maxdex > item.maxdex) maxdex = item.maxdex;
                    }
                }
            });
        }

        if (maxdex >= 0) actual_dex = dexmod > maxdex ? maxdex : dexmod;
        else actual_dex = dexmod;

        final_ac = 10 + total_ac + actual_dex + size + _.sum(defValues);
        final_touch = 10 + actual_dex + size + defValues[0] + defValues[2] + defValues[3];
        final_flat = 10 + total_ac + size + defValues[1] + defValues[2] + defValues[3];
    }

    function ChangeValue(value) {
        setDefValues(value);
        SetAPI(value);
    }

    if (charIndex == -1) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h1>Defensive Stats</h1>
            <div className="main-container">
                <Accordian title="Total AC" titleElements={<div>{final_ac}</div>}>
                    <div className="flex flex-row justify-evenly space-x-1">
                        <div className="flex flex-col divide-y divide-solid divide-black">
                            <p className="m-0 p-0 text-xs">Base</p>
                            <p className="m-0 p-0 text-center">10</p>
                        </div>
                        <div className="flex flex-col divide-y divide-solid divide-black">
                            <p className="m-0 p-0 text-xs">Armor</p>
                            <p className="m-0 p-0 text-center">{total_ac}</p>
                        </div>
                        <div className="flex flex-col divide-y divide-solid divide-black">
                            <p className="m-0 p-0 text-xs">Dexterity</p>
                            <p className="m-0 p-0 text-center">{actual_dex}</p>
                        </div>
                        <div className="flex flex-col divide-y divide-solid divide-black">
                            <p className="m-0 p-0 text-xs">Size</p>
                            <p className="m-0 p-0 text-center">{size}</p>
                        </div>
                        <div className="flex flex-col divide-y divide-solid divide-black">
                            <p className="m-0 p-0 text-xs">Bonuses</p>
                            <p className="m-0 p-0 text-center">{_.sum(defValues)}</p>
                        </div>
                    </div>
                </Accordian>
                <Accordian title="Touch AC" titleElements={<div>{final_touch}</div>}>
                    <div className="flex flex-row justify-evenly space-x-1">
                        <div className="flex flex-col divide-y divide-solid divide-black">
                            <p className="m-0 p-0 text-xs">Base</p>
                            <p className="m-0 p-0 text-center">10</p>
                        </div>
                        <div className="flex flex-col divide-y divide-solid divide-black">
                            <p className="m-0 p-0 text-xs">Dexterity</p>
                            <p className="m-0 p-0 text-center">{actual_dex}</p>
                        </div>
                        <div className="flex flex-col divide-y divide-solid divide-black">
                            <p className="m-0 p-0 text-xs">Size</p>
                            <p className="m-0 p-0 text-center">{size}</p>
                        </div>
                        <div className="flex flex-col divide-y divide-solid divide-black">
                            <p className="m-0 p-0 text-xs">Bonuses (-Natural)</p>
                            <p className="m-0 p-0 text-center">{_.sum(defValues) - defValues[1]}</p>
                        </div>
                    </div>
                </Accordian>
                <Accordian title="Flat-Foot AC" titleElements={<div>{final_flat}</div>}>
                    <div className="flex flex-row justify-evenly space-x-1">
                        <div className="flex flex-col divide-y divide-solid divide-black">
                            <p className="m-0 p-0 text-xs">Base</p>
                            <p className="m-0 p-0 text-center">10</p>
                        </div>
                        <div className="flex flex-col divide-y divide-solid divide-black">
                            <p className="m-0 p-0 text-xs">Armor</p>
                            <p className="m-0 p-0 text-center">{total_ac}</p>
                        </div>
                        <div className="flex flex-col divide-y divide-solid divide-black">
                            <p className="m-0 p-0 text-xs">Size</p>
                            <p className="m-0 p-0 text-center">{size}</p>
                        </div>
                        <div className="flex flex-col divide-y divide-solid divide-black">
                            <p className="m-0 p-0 text-xs">Bonuses (-Dodge)</p>
                            <p className="m-0 p-0 text-center">{_.sum(defValues) - defValues[0]}</p>
                        </div>
                    </div>
                </Accordian>
                <Accordian title="AC Bonuses">
                    <MultiNumber title={["Dodge", "Natural", "Misc", "Temp"]} id="bonuses" value={defValues} min={[0, 0, -100, -100]} max={[100, 100, 100, 100]} color="secondary" onChange={ChangeValue} />
                </Accordian>
                <Label title="Armor Check Penalty" value={ac_penalty} />
                <Label title="Maximum Dex" value={maxdex != -1 ? maxdex : "N/A"} />
                <Label title="Spell Failure" value={spellfail} />
            </div>
            <div className="msg-container">
                <div>
                    <span className="font-bold">Armor Number</span>: Total of all protective items (under armor) that are marked as active.
                </div>
                <div>
                    <span className="font-bold">Dexterity Number</span>: If there is a Max Dex, the Dexterity value will be limited by the Max Dex.
                </div>
            </div>
        </>
    );
}
