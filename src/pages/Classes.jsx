import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import PCSContext from '../components/PCSContext';
import Button from '../components/Button';
import '../styles/Page.css';

export default function Stats() {
    /*#########################################################################
    ## OPENING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/
    let PCSD = useContext(PCSContext);
    let Nav = useNavigate();
    let [ charIndex, setCharIndex ] = useState(-1);
    let [ classList, setClassList ] = useState([]);

    function GetAPI(path) {
        return _.get(PCSD.files[charIndex].data.classes, path);
    }
    
    function SetAPI(value) {
        _.assign(PCSD.files[charIndex].data.classes, value);
        PCSD.files[charIndex].saved = false;
    }

    useEffect(() => {
        let tempIndex = PCSD.getLoadedIndex();

        if (tempIndex == -1) {
            Nav("/");

            return;
        }

        if (!_.has(PCSD.files[tempIndex], "data.classes")) {
            _.assign(PCSD.files[tempIndex].data, {
                classes: [] 
            });
        }

        setCharIndex(tempIndex);

        /* ENTER PAGE SPECIFIC CODE HERE */
        setClassList(PCSD.files[tempIndex].data.classes);
        /* ENTER PAGE SPECIFIC CODE HERE */
    }, []);
    /*#########################################################################
    ## CLOSING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/

    function AddClass() {
        let newClasses = [...classList];
        newClasses.push({
            name: "",
            level: 0,
            hd: 0,
            health: 0,
            bab: 0,
            skillnum: 0,
            favclass: [0,0],
            saves: [0,0,0]
        });

        SetAPI(newClasses);
        setClassList(newClasses);
    }

    function CalculateLevels() {
        if (charIndex == -1) return 0;

        let total = 0;

        classList.forEach((item, index) => {
            total += item.level;
        })

        return total;
    }

    function RenderClasses() {
        if (charIndex == -1)
            return (<p>Loading...</p>);

        if (classList.length == 0)
            return (<p>No classes have been added yet...</p>)
        
        return classList.map((item, index) => {
            return (
                <div key={`classlist${index}`} className="border-2 border-amber-300 rounded-md">
                    Class {index+1}
                </div>
            );
        });
    }

    return (
        <>
            <h1>Classes</h1>
            <div className="main-container">
                <Button color="yellow" onClick={AddClass}>Add Class</Button>
                <div className="flex flex-row items-center">
                    <div className="bg-amber-300 p-1 rounded-l-md border-r border-amber-700 font-bold h-full">Total Class Levels</div>
                    <div className="flex-grow border-t-2 border-r-2 border-b-2 border-amber-300 p-1 rounded-r-md text-center">{CalculateLevels()}</div>
                </div>
            </div>
            <div className="main-container">
                {RenderClasses()}
            </div>
        </>
    );
}