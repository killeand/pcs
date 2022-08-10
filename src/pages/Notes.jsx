import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { v1 as uuid } from 'uuid';
import PCSContext from '../components/PCSContext';
import Button from '../components/Button';
import Text from '../components/Text';
import Accordian from '../components/Accordian';
import Modal from '../components/Modal';
import TextArea from '../components/TextArea';
import '../styles/Page.css';

export default function Notes() {
    /*#########################################################################
    ## OPENING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/
    let PCSD = useContext(PCSContext);
    let Nav = useNavigate();
    let [ charIndex, setCharIndex ] = useState(-1);
    let [ noteList, setNoteList ] = useState([]);
    let [ showModal, setShowModal ] = useState(false);
    let [ removeIndex, setRemoveIndex ] = useState(-1);
    
    function SetAPI(value) {
        PCSD.files[charIndex].data.notes = value;
        PCSD.files[charIndex].saved = false;
    }

    useEffect(() => {
        let tempIndex = PCSD.getLoadedIndex();

        if (tempIndex == -1) {
            Nav("/");

            return;
        }

        if (!_.has(PCSD.files[tempIndex], "data.notes")) {
            _.assign(PCSD.files[tempIndex].data, {
                notes: [] 
            });
        }

        setCharIndex(tempIndex);

        /* ENTER PAGE SPECIFIC CODE HERE */
        setNoteList(PCSD.files[tempIndex].data.notes);
        /* ENTER PAGE SPECIFIC CODE HERE */
    }, []);
    /*#########################################################################
    ## CLOSING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/

    function AddNote() {
        let newNotes = [...noteList];
        newNotes.push({
            _id: uuid(),
            name: "New Note",
            info: ""
        });

        SetAPI(newNotes);
        setNoteList(newNotes);
    }

    function RemoveNote() {
        let newNotes = [ ...noteList ];
        newNotes.splice(removeIndex,1);

        SetAPI(newNotes);
        setNoteList(newNotes);
        setRemoveIndex(-1);
        setShowModal(false);
    }

    function ChangeValue(index, type, value) {
        let newNotes = [...noteList];
        newNotes[index][type] = value;

        setNoteList(newNotes);
        SetAPI(newNotes);
    }

    function RenderNotes() {
        if (charIndex == -1)
            return (<p>Loading...</p>);

        if (noteList.length == 0)
            return (<p>No notes have been added yet...</p>)
        
        return noteList.map((item, index) => {
            return (
                <Accordian key={`note-${item._id}`} title={item.name}>
                    <div className="flex flex-row space-x-1">
                        <Text title="Name" id={`note${index}name`} value={item.name} className="flex-grow" onChange={(retval)=>ChangeValue(index, "name", retval)} />
                        <Button color="red" className="bi-trash" onClick={()=>{setShowModal(true);setRemoveIndex(index);}} />
                    </div>
                    <TextArea title="Notes" id={`note${index}info`} value={item.info} onChange={(retval)=>ChangeValue(index, "info", retval)} />
                </Accordian>
            );
        });
    }

    function RenderRemoveModal() {
        if (showModal && removeIndex != -1) {
            return (
                <Modal className="flex flex-col" title="Confirm Remove?" onClose={()=>{setShowModal(false);setRemoveIndex(-1);}}>
                    <div className="mt-2 py-2 border-t border-black">
                        <p>Are you sure you wish to remove the note: <span className="font-bold">{PCSD.files[charIndex].data.notes[removeIndex].name}</span>?</p>
                        <p>This action is permanent and can only be reverted by re-loading the character data.</p>
                    </div>
                    <div className="flex justify-center">
                        <Button color="red" onClick={RemoveNote}>Confirmed, remove!</Button>
                    </div>
                </Modal>
            );
        }
    }

    return (
        <>
            {RenderRemoveModal()}
            <h1>Notes</h1>
            <div className="main-container">
                <Button color="yellow" onClick={AddNote}>Add Note</Button>
            </div>
            <div className="main-container">
                {RenderNotes()}
            </div>
        </>
    );
}