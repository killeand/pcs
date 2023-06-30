import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { ulid } from 'ulidx';
import PCSContext from '../components/PCSContext';
import Button from '../components/Button';
import Text from '../components/Text';
import Accordian from '../components/Accordian';
import Modal from '../components/Modal';
import TextArea from '../components/TextArea';
import List from '../components/List';
import '../styles/Page.css';

export default function Weapons() {
    /*#########################################################################
    ## OPENING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/
    let PCSD = useContext(PCSContext);
    let Nav = useNavigate();
    let [ charIndex, setCharIndex ] = useState(-1);
    let [ wepList, setWepList ] = useState([]);
    let [ showModal, setShowModal ] = useState(false);
    let [ removeIndex, setRemoveIndex ] = useState(-1);
    
    function SetAPI(value) {
        PCSD.files[charIndex].data.weapons = value;
        PCSD.files[charIndex].saved = false;
    }

    useEffect(() => {
        let tempIndex = PCSD.getLoadedIndex();

        if (tempIndex == -1) {
            Nav("/");

            return;
        }

        if (!_.has(PCSD.files[tempIndex], "data.weapons")) {
            _.assign(PCSD.files[tempIndex].data, {
                weapons: [] 
            });
        }

        setCharIndex(tempIndex);

        /* ENTER PAGE SPECIFIC CODE HERE */
        setWepList(PCSD.files[tempIndex].data.weapons);
        /* ENTER PAGE SPECIFIC CODE HERE */
    }, []);
    /*#########################################################################
    ## CLOSING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/

    function AddWep() {
        let newWeps = [...wepList];
        newWeps.push({
            _id: ulid(),
            name: "New Weapon",
            hit: [],
            dmg: [],
            critical: "",
            range: "",
            type: "",
            ammo: "",
            info: ""
        });

        SetAPI(newWeps);
        setWepList(newWeps);
    }

    function RemoveWep() {
        let newWeps = [ ...wepList ];
        newWeps.splice(removeIndex,1);

        SetAPI(newWeps);
        setWepList(newWeps);
        setRemoveIndex(-1);
        setShowModal(false);
    }

    function ChangeValue(index, type, value) {
        let newWeps = [...wepList];
        newWeps[index][type] = value;

        setWepList(newWeps);
        SetAPI(newWeps);
    }

    function RenderWeps() {
        if (charIndex == -1)
            return (<p>Loading...</p>);

        if (wepList.length == 0)
            return (<p>No weapons have been added yet...</p>)
        
        return wepList.map((item, index) => {
            return (
                <Accordian key={`wep-${item._id}`} title={item.name}>
                    <div className="flex flex-row space-x-1">
                        <Text title="Name" id={`wep${index}name`} value={item.name} className="flex-grow" onChange={(retval)=>ChangeValue(index, "name", retval)} />
                        <Button color="error" className="bi-trash" onClick={()=>{setShowModal(true);setRemoveIndex(index);}} />
                    </div>
                    <div className="flex flex-row space-x-1">
                        <List title="To Hit" id={`wep${index}hit`} value={item.hit} className="flex-grow w-1/2" onChange={(retval)=>ChangeValue(index, "hit", retval)} />
                        <List title="Damage" id={`wep${index}dmg`} value={item.dmg} className="flex-grow w-1/2" onChange={(retval)=>ChangeValue(index, "dmg", retval)} />
                    </div>
                    <div className="flex flex-row space-x-1">
                        <Text title="Crit" id={`wep${index}crit`} value={item.critical} className="flex-grow w-1/2" onChange={(retval)=>ChangeValue(index, "critical", retval)} />
                        <Text title="Rng" id={`wep${index}rng`} value={item.range} className="flex-grow w-1/2" onChange={(retval)=>ChangeValue(index, "range", retval)} />
                    </div>
                    <div className="flex flex-row space-x-1">
                        <Text title="Type" id={`wep${index}type`} value={item.type} className="flex-grow w-1/2" onChange={(retval)=>ChangeValue(index, "type", retval)} />
                        <Text title="Ammo" id={`wep${index}ammo`} value={item.ammo} className="flex-grow w-1/2" onChange={(retval)=>ChangeValue(index, "ammo", retval)} />
                    </div>
                    <TextArea title="Notes" id={`wep${index}info`} value={item.info} onChange={(retval)=>ChangeValue(index, "info", retval)} />
                </Accordian>
            );
        });
    }

    function RenderRemoveModal() {
        if (showModal && removeIndex != -1) {
            return (
                <Modal className="flex flex-col" title="Confirm Remove?" onClose={()=>{setShowModal(false);setRemoveIndex(-1);}}>
                    <div className="mt-2 py-2 border-t border-black">
                        <p>Are you sure you wish to remove the weapon: <span className="font-bold">{PCSD.files[charIndex].data.weapons[removeIndex].name}</span>?</p>
                        <p>This action is permanent and can only be reverted by re-loading the character data.</p>
                    </div>
                    <div className="flex justify-center">
                        <Button color="error" onClick={RemoveWep}>Confirmed, remove!</Button>
                    </div>
                </Modal>
            );
        }
    }

    return (
        <>
            {RenderRemoveModal()}
            <h1>Weapons</h1>
            <div className="main-container">
                <Button color="primary" onClick={AddWep}>Add Weapon</Button>
            </div>
            <div className="main-container">
                {RenderWeps()}
            </div>
        </>
    );
}