import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { ulid } from 'ulidx';
import PCSContext from '../components/application/PCSContext';
import Button from '../components/Button';
import Text from '../components/InputText';
import Number from '../components/InputNumber';
import Accordian from '../components/Accordian';
import Modal from '../components/Modal';
import TextArea from '../components/TextArea';
import { MODAL_TYPE } from '@/scripts/Utilities';
import '../styles/Page.css';

export default function Armors() {
    /*#########################################################################
    ## OPENING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/
    let PCSD = useContext(PCSContext);
    let Nav = useNavigate();
    let [charIndex, setCharIndex] = useState(-1);
    let [armList, setArmList] = useState([]);
    let [removeIndex, setRemoveIndex] = useState(-1);

    function SetAPI(value) {
        PCSD.files[charIndex].data.armors = value;
        PCSD.files[charIndex].saved = false;
    }

    useEffect(() => {
        let tempIndex = PCSD.getLoadedIndex();

        if (tempIndex == -1) {
            Nav('/');

            return;
        }

        if (!_.has(PCSD.files[tempIndex], 'data.armors')) {
            _.assign(PCSD.files[tempIndex].data, {
                armors: [],
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
            _id: ulid(),
            name: 'New Armor',
            active: false,
            ac: 0,
            maxdex: -1,
            penalty: 0,
            spellfail: 0,
            info: '',
        });

        SetAPI(newArms);
        setArmList(newArms);
    }

    function AskRemove(wepIndex) {
        setRemoveIndex(wepIndex);
        window.removearmor.showModal();
    }

    function RemoveArm(dialogValue) {
        if (dialogValue === 'ok') {
            let newArms = [...armList];
            newArms.splice(removeIndex, 1);

            SetAPI(newArms);
            setArmList(newArms);
            setRemoveIndex(-1);
        }
    }

    function ChangeValue(index, type, value) {
        let newArms = [...armList];
        newArms[index][type] = value;

        setArmList(newArms);
        SetAPI(newArms);
    }

    function RenderArms() {
        if (charIndex == -1) return <p>Loading...</p>;

        if (armList.length == 0) return <p>No armors have been added yet...</p>;

        return armList.map((item, index) => {
            return (
                <Accordian key={`arm-${item._id}`} title={item.name} titleElements={<Button color={item.active ? 'success' : 'error'} className={`pointer-events-auto ${item.active ? 'bi-check-square' : 'bi-square'}`} onClick={() => ChangeValue(index, 'active', !item.active)} />}>
                    <div className='flex flex-row space-x-1'>
                        <Text title='Name' id={`arm${index}name`} value={item.name} className='flex-grow' color='secondary' onChange={(retval) => ChangeValue(index, 'name', retval)} />
                        <Button color='error' className='bi-trash' onClick={() => AskRemove(index)} />
                    </div>
                    <div className='flex flex-row space-x-1'>
                        <Number title='AC' id={`arm${index}ac`} value={item.ac} min={0} className='w-1/2 flex-grow' color='secondary' onChange={(retval) => ChangeValue(index, 'ac', retval)} />
                        <Number title='Max Dex' id={`arm${index}max`} value={item.maxdex} min={-1} className='w-1/2 flex-grow' color='secondary' onChange={(retval) => ChangeValue(index, 'maxdex', retval)} />
                    </div>
                    <div className='flex flex-row space-x-1'>
                        <Number title='Penalty' id={`arm${index}pen`} value={item.penalty} min={0} className='w-1/2 flex-grow' color='secondary' onChange={(retval) => ChangeValue(index, 'penalty', retval)} />
                        <Number title='Spell Fail' id={`arm${index}fail`} value={item.spellfail} min={0} className='w-1/2 flex-grow' color='secondary' onChange={(retval) => ChangeValue(index, 'spellfail', retval)} />
                    </div>
                    <TextArea title='Notes' id={`arm${index}info`} value={item.info} color='secondary' onChange={(retval) => ChangeValue(index, 'info', retval)} />
                </Accordian>
            );
        });
    }

    return (
        <>
            <h1>Armors</h1>
            <div className='main-container'>
                <Button color='primary' onClick={AddArm}>
                    Add Armor
                </Button>
            </div>
            <div className='main-container'>{RenderArms()}</div>
            <div className='msg-container'>
                <div>
                    <span className='font-bold'>Max Dex:</span> If the armor has no max dex penalty, set the value to a negative value.
                </div>
                <div>
                    <span className='font-bold'>Note:</span> Before the armor piece becomes active on the defensive stats page, you must click on the button in the title.
                </div>
                <div>
                    <span className='font-bold'>Inactive:</span> <Button color='error' className='bi-square' /> <span className='font-bold'>Active:</span> <Button color='success' className='bi-check-square' />
                </div>
            </div>
            <Modal id='removearmor' title='Confirm Remove?' type={MODAL_TYPE.okcancel} onClose={(RetVal) => RemoveArm(RetVal)}>
                <p>Are you sure you wish to remove this armor?</p>
                <p>This action is permanent and can only be reverted by re-loading the character data.</p>
            </Modal>
        </>
    );
}
