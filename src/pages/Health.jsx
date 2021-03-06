import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import PCSContext from '../components/PCSContext';
import Label from '../components/Label';
import MultiNumber from '../components/MultiNumber';
import '../styles/Page.css';

export default function Health() {
    /*#########################################################################
    ## OPENING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/
    let PCSD = useContext(PCSContext);
    let Nav = useNavigate();
    let [ charIndex, setCharIndex ] = useState(-1);
    let [ healthValues, setHealthValues ] = useState([0,0,0,0])
    
    function SetAPI(value) {
        _.assign(PCSD.files[charIndex].data.health, value);
        PCSD.files[charIndex].saved = false;
    }

    useEffect(() => {
        let tempIndex = PCSD.getLoadedIndex();

        if (tempIndex == -1) {
            Nav("/");

            return;
        }

        if (!_.has(PCSD.files[tempIndex], "data.health")) {
            _.assign(PCSD.files[tempIndex].data, {
                health: [0,0,0,0]
            });
        }

        setCharIndex(tempIndex);

        /* ENTER PAGE SPECIFIC CODE HERE */
        setHealthValues(PCSD.files[tempIndex].data.health);
        /* ENTER PAGE SPECIFIC CODE HERE */
    }, []);
    /*#########################################################################
    ## CLOSING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/

    function CalculateMaxHealth() {
        let total = 0;

        if (_.has(PCSD.files[charIndex].data, "classes")) {
            PCSD.files[charIndex].data.classes.forEach((item) => {
                total += item.health + item.favclass[0];
            });
        }

        return total;
    }

    function CalculateCurrentHealth() {
        let total = CalculateMaxHealth();

        total += -(healthValues[0]) + -(healthValues[1]) + healthValues[2] + healthValues[3];

        return total;
    }

    function ChangeValue(value) {
        setHealthValues(value);
        SetAPI(value);
    }

    return (
        <>
            <h1>Health</h1>
            <div className="main-container">
                {(charIndex == -1)?(
                    <p>Loading...</p>
                ):(
                    <>
                        <div className="flex flex-row">
                            <Label title="Max Health" value={CalculateMaxHealth()} className="flex-grow mr-2" />
                            <Label title="Current Health" value={CalculateCurrentHealth()} className="flex-grow" />
                        </div>
                        <div className="border-2 border-amber-300 rounded-md p-1">
                            <MultiNumber title={["Wounds", "Non-Lethal", "Misc", "Temp"]} id="health" value={healthValues} onChange={ChangeValue} />
                        </div>
                    </>
                )}
            </div>
            <div className="msg-container">
                <div><span className="font-bold">Note:</span> Wounds and Non-Lethal subtract from the total health, while Misc and Temp add to the total.</div>
                <div><span className="font-bold">Max Calculation:</span> Total = Sum of Each Class(Health + Favored Class Health)</div>
                <div><span className="font-bold">Current Calculation:</span> Total = -(Wounds) + -(Non-Lethal) + Misc + Temp</div>
            </div>
        </>
    );
}