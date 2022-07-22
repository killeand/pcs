import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import PCSContext from '../components/PCSContext';
import Button from '../components/Button';
import Label from '../components/Label';
import Text from '../components/Text';
import Number from '../components/Number';
import MultiNumber from '../components/MultiNumber';
import '../styles/Page.css';

export default function Stats() {
    /*#########################################################################
    ## OPENING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/
    let PCSD = useContext(PCSContext);
    let Nav = useNavigate();
    let [ charIndex, setCharIndex ] = useState(-1);
    let [ classList, setClassList ] = useState([]);
    
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

    function ChangeValue(index, type, value) {
        let newClasses = [...classList];

        if (type == 0) {
            newClasses[index].name = value;
        }
        if (type == 1) {
            newClasses[index].level = value;
        }
        if (type == 2) {
            newClasses[index].hd = value[0];
            newClasses[index].health = value[1];
            newClasses[index].bab = value[2];
            newClasses[index].skillnum = value[3];
        }
        if (type == 3) {
            newClasses[index].favclass = value;
        }
        if (type == 4) {
            newClasses[index].saves = value;
        }

        setClassList(newClasses);
        SetAPI(newClasses);
    }

    function RenderClasses() {
        if (charIndex == -1)
            return (<p>Loading...</p>);

        if (classList.length == 0)
            return (<p>No classes have been added yet...</p>)
        
        return classList.map((item, index) => {
            return (
                <div key={`classlist${index}`} className="border-2 border-amber-300 rounded-md p-1 flex flex-col space-y-1">
                    <Text title="Class Name" id={`class${index+1}name`} value={item.name} onChange={(retval)=>ChangeValue(index, 0, retval)} />
                    <Number title="Level" id={`class${index+1}level`} value={item.level} onChange={(retval)=>ChangeValue(index, 1, retval)} />
                    <MultiNumber title={["HD", "Health", "BAB", "Skill Num"]} id={`class${index+1}bs`} value={[item.hd, item.health, item.bab, item.skillnum]} onChange={(retval)=>ChangeValue(index, 2, retval)} />
                    <MultiNumber title={["Fav Class Health", "Fav Class Skill"]} id={`class${index+1}fc`} value={[item.favclass[0], item.favclass[1]]} onChange={(retval)=>ChangeValue(index, 3, retval)} />
                    <MultiNumber title={["Fortitude", "Reflex", "Will"]} id={`class${index+1}st`} value={[item.saves[0], item.saves[1], item.saves[2]]} onChange={(retval)=>ChangeValue(index, 4, retval)} />
                </div>
            );
        });
    }

    return (
        <>
            <h1>Classes</h1>
            <div className="main-container">
                <Button color="yellow" onClick={AddClass}>Add Class</Button>
                <Label title="Total Class Levels" value={CalculateLevels()} />
            </div>
            <div className="main-container">
                {RenderClasses()}
            </div>
        </>
    );
}