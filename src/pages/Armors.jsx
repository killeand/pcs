import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { v1 as uuid } from 'uuid';
import PCSContext from '../components/PCSContext';
import Button from '../components/Button';
import Text from '../components/Text';
import Number from '../components/Number';
import Accordian from '../components/Accordian';
import Modal from '../components/Modal';
import TextArea from '../components/TextArea';
import '../styles/Page.css';

export default function Armors() {
    /*#########################################################################
    ## OPENING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/
    let PCSD = useContext(PCSContext);
    let Nav = useNavigate();
    let [ charIndex, setCharIndex ] = useState(-1);
    let [ armList, setArmList ] = useState([]);
    let [ showModal, setShowModal ] = useState(false);
    let [ removeIndex, setRemoveIndex ] = useState(-1);
    
    function SetAPI(value) {
        PCSD.files[charIndex].data.armors = value;
        PCSD.files[charIndex].saved = false;
    }

    useEffect(() => {
        let tempIndex = PCSD.getLoadedIndex();

        if (tempIndex == -1) {
            Nav("/");

            return;
        }

        if (!_.has(PCSD.files[tempIndex], "data.armors")) {
            _.assign(PCSD.files[tempIndex].data, {
                armors: [] 
            });
        }

        setCharIndex(tempIndex);

        /* ENTER PAGE SPECIFIC CODE HERE */
        setArmList(PCSD.files[tempIndex].data.armors);
        /* ENTER PAGE SPECIFIC CODE HERE */
    }, []);
    /*#########################################################################
    ## CLOSING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/

    function AddArm() {
        let newArms = [...armList];
        newArms.push({
            _id: uuid(),
            name: "New Armor",
            active: false,
            ac: 0,
            maxdex: -1,
            penalty: 0,
            spellfail: 0,
            info: ""
        });

        SetAPI(newArms);
        setArmList(newArms);
    }

    function RemoveArm() {
        let newArms = [ ...armList ];
        newArms.splice(removeIndex,1);

        SetAPI(newArms);
        setArmList(newArms);
        setRemoveIndex(-1);
        setShowModal(false);
    }

    function ChangeValue(index, type, value) {
        let newArms = [...armList];
        newArms[index][type] = value;

        setArmList(newArms);
        SetAPI(newArms);
    }

    function RenderArms() {
        if (charIndex == -1)
            return (<p>Loading...</p>);

        if (armList.length == 0)
            return (<p>No armors have been added yet...</p>)
        
        return armList.map((item, index) => {
            return (
                <Accordian key={`arm-${item._id}`} title={item.name} titleElements={<Button color={(item.active)?"green":"gray"} className={`pointer-events-auto ${(item.active)?"bi-check-square":"bi-square"}`} onClick={()=>ChangeValue(index, "active", !item.active)} />}>
                    <div className="flex flex-row space-x-1">
                        <Text title="Name" id={`arm${index}name`} value={item.name} className="flex-grow" onChange={(retval)=>ChangeValue(index, "name", retval)} />
                        <Button color="red" className="bi-trash" onClick={()=>{setShowModal(true);setRemoveIndex(index);}} />
                    </div>
                    <div className="flex flex-row space-x-1">
                        <Number title="AC" id={`arm${index}ac`} value={item.ac} min={0} className="flex-grow w-1/2" onChange={(retval)=>ChangeValue(index, "ac", retval)} />
                        <Number title="Max Dex" id={`arm${index}max`} value={item.maxdex} min={-1} className="flex-grow w-1/2" onChange={(retval)=>ChangeValue(index, "maxdex", retval)} />
                    </div>
                    <div className="flex flex-row space-x-1">
                        <Number title="Penalty" id={`arm${index}pen`} value={item.penalty} min={0} className="flex-grow w-1/2" onChange={(retval)=>ChangeValue(index, "penalty", retval)} />
                        <Number title="Spell Fail" id={`arm${index}fail`} value={item.spellfail} min={0} className="flex-grow w-1/2" onChange={(retval)=>ChangeValue(index, "spellfail", retval)} />
                    </div>
                    <TextArea title="Notes" id={`arm${index}info`} value={item.info} onChange={(retval)=>ChangeValue(index, "info", retval)} />
                </Accordian>
            );
        });
    }

    function RenderRemoveModal() {
        if (showModal && removeIndex != -1) {
            return (
                <Modal className="flex flex-col" title="Confirm Remove?" onClose={()=>{setShowModal(false);setRemoveIndex(-1);}}>
                    <div className="mt-2 py-2 border-t border-black">
                        <p>Are you sure you wish to remove the armor: <span className="font-bold">{PCSD.files[charIndex].data.armors[removeIndex].name}</span>?</p>
                        <p>This action is permanent and can only be reverted by re-loading the character data.</p>
                    </div>
                    <div className="flex justify-center">
                        <Button color="red" onClick={RemoveArm}>Confirmed, remove!</Button>
                    </div>
                </Modal>
            );
        }
    }

    return (
        <>
            {RenderRemoveModal()}
            <h1>Armors</h1>
            <div className="main-container">
                <Button color="yellow" onClick={AddArm}>Add Armor</Button>
            </div>
            <div className="main-container">
                {RenderArms()}
            </div>
            <div className="msg-container">
                <div><span className="font-bold">Max Dex:</span> If the armor has no max dex penalty, set the value to a negative value.</div>
                <div><span className="font-bold">Note:</span> Before the armor piece becomes active on the defensive stats page, you must click on the button in the title.</div>
                <div><span className="font-bold">Inactive:</span> <span className="text-xs bi-square px-1 py-0.5 rounded-lg bg-gradient-to-b from-gray-100 to-gray-400" /> <span className="font-bold">Active:</span> <span className="text-xs bi-check-square px-1 py-0.5 rounded-lg bg-gradient-to-b from-emerald-100 to-emerald-400" /></div>
            </div>
        </>
    );
}