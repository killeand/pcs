import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { ulid } from "ulidx";
import PCSContext from "../components/application/PCSContext";
import Button from "../components/Button";
import Text from "../components/InputText";
import Accordian from "../components/Accordian";
import Modal from "../components/Modal";
import TextArea from "../components/TextArea";
import { MODAL_TYPE } from "@/scripts/Utilities";

export default function Notes() {
    /*#########################################################################
    ## OPENING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/
    let PCSD = useContext(PCSContext);
    let Nav = useNavigate();
    let [charIndex, setCharIndex] = useState(-1);
    let [noteList, setNoteList] = useState([]);
    let [removeIndex, setRemoveIndex] = useState(-1);

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
                notes: [],
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
            _id: ulid(),
            name: "New Note",
            info: "",
        });

        SetAPI(newNotes);
        setNoteList(newNotes);
    }

    function AskRemove(noteIndex) {
        setRemoveIndex(noteIndex);
        window.removenote.showModal();
    }

    function RemoveNote(dialogValue) {
        if (dialogValue === "ok") {
            let newNotes = [...noteList];
            newNotes.splice(removeIndex, 1);

            SetAPI(newNotes);
            setNoteList(newNotes);
            setRemoveIndex(-1);
        }
    }

    function ChangeValue(index, type, value) {
        let newNotes = [...noteList];
        newNotes[index][type] = value;

        setNoteList(newNotes);
        SetAPI(newNotes);
    }

    function RenderNotes() {
        if (charIndex == -1) return <p>Loading...</p>;

        if (noteList.length == 0) return <p>No notes have been added yet...</p>;

        return noteList.map((item, index) => {
            return (
                <Accordian key={`note-${item._id}`} title={item.name} innerClass="flex flex-col p-1 gap-1">
                    <div className="flex flex-row space-x-1">
                        <Text title="Name" id={`note${index}name`} value={item.name} outerClass="flex-grow" color="secondary" onChange={(retval) => ChangeValue(index, "name", retval)} />
                        <Button color="error" className="bi-trash" onClick={() => AskRemove(index)} />
                    </div>
                    <TextArea title="Notes" id={`note${index}info`} value={item.info} color="secondary" onChange={(retval) => ChangeValue(index, "info", retval)} />
                </Accordian>
            );
        });
    }

    return (
        <>
            <h1>Notes</h1>
            <div className="main-container">
                <Button color="primary" onClick={AddNote}>
                    Add Note
                </Button>
            </div>
            <div className="main-container">{RenderNotes()}</div>
            <Modal id="removenote" title="Confirm Remove?" color="warning" type={MODAL_TYPE.okcancel} onClose={(RetVal) => RemoveNote(RetVal)}>
                <p>Are you sure you wish to remove this note?</p>
                <p>This action is permanent and can only be reverted by re-loading the character data.</p>
            </Modal>
        </>
    );
}
