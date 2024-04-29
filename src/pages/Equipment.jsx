import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { ulid } from "ulidx";
import PCSContext from "../components/application/PCSContext";
import Button from "../components/Button";
import Text from "../components/InputText";
import Number from "../components/InputNumber";
import Accordian from "../components/Accordian";
import Modal from "../components/Modal";
import TextArea from "../components/TextArea";
import Label from "../components/Label";
import { MODAL_TYPE } from "@/scripts/Utilities";

export default function Equipment() {
    /*#########################################################################
    ## OPENING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/
    let PCSD = useContext(PCSContext);
    let Nav = useNavigate();
    let [charIndex, setCharIndex] = useState(-1);
    let [quipList, setQuipList] = useState([]);
    let [removeIndex, setRemoveIndex] = useState(-1);

    function SetAPI(value) {
        PCSD.files[charIndex].data.equipment = value;
        PCSD.files[charIndex].saved = false;
    }

    useEffect(() => {
        let tempIndex = PCSD.getLoadedIndex();

        if (tempIndex == -1) {
            Nav("/");

            return;
        }

        if (!_.has(PCSD.files[tempIndex], "data.equipment")) {
            _.assign(PCSD.files[tempIndex].data, {
                equipment: [],
            });
        }

        setCharIndex(tempIndex);

        /* ENTER PAGE SPECIFIC CODE HERE */
        setQuipList(PCSD.files[tempIndex].data.equipment);
        /* ENTER PAGE SPECIFIC CODE HERE */
    }, []);
    /*#########################################################################
    ## CLOSING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/

    let total_weight = 0;

    quipList.forEach((item) => {
        total_weight += item.weight * item.num;
    });

    function AddQuip() {
        let newQuip = [...quipList];
        newQuip.push({
            _id: ulid(),
            name: "New Item",
            ref: "",
            num: 0,
            weight: 0,
            info: "",
        });

        SetAPI(newQuip);
        setQuipList(newQuip);
    }

    function AskRemove(quipIndex) {
        setRemoveIndex(quipIndex);
        window.removequip.showModal();
    }

    function RemoveQuip(dialogValue) {
        if (dialogValue === "ok") {
            let newQuip = [...quipList];
            newQuip.splice(removeIndex, 1);

            SetAPI(newQuip);
            setQuipList(newQuip);
            setRemoveIndex(-1);
        }
    }

    function ChangeValue(index, type, value) {
        let newQuip = [...quipList];
        newQuip[index][type] = value;

        setQuipList(newQuip);
        SetAPI(newQuip);
    }

    function RenderQuip() {
        if (charIndex == -1) return <p>Loading...</p>;

        if (quipList.length == 0) return <p>No items have been added yet...</p>;

        return quipList.map((item, index) => {
            return (
                <Accordian key={`class-${item._id}`} title={item.name} titleElements={<div>{item.num}</div>} innerClass="flex flex-col p-1 gap-1">
                    <div className="flex flex-row space-x-1">
                        <Text title="Name" id={`quip${index}name`} value={item.name} outerClass="flex-grow" color="secondary" onChange={(retval) => ChangeValue(index, "name", retval)} />
                        <Button color="error" className="bi-trash" onClick={() => AskRemove(index)} />
                    </div>
                    <Text title="Ref" id={`quip${index}ref`} value={item.ref} color="secondary" onChange={(retval) => ChangeValue(index, "ref", retval)} />
                    <div className="flex flex-col gap-1 md:flex-row">
                        <Number title="# of" id={`quip${index}num`} value={item.num} min={0} max={5000} outerClass="md:w-1/2 flex-grow" color="secondary" onChange={(retval) => ChangeValue(index, "num", retval)} />
                        <Number title="Weight" id={`quip${index}weight`} value={item.weight} min={0} max={10000} outerClass="md:w-1/2 flex-grow" color="secondary" onChange={(retval) => ChangeValue(index, "weight", retval)} />
                    </div>
                    <TextArea title="Notes" id={`quip${index}info`} value={item.info} color="secondary" onChange={(retval) => ChangeValue(index, "info", retval)} />
                </Accordian>
            );
        });
    }

    function RenderRemoveModal() {
        if (showModal && removeIndex != -1) {
            return (
                <Modal
                    className="flex flex-col"
                    title="Confirm Remove?"
                    onClose={() => {
                        setShowModal(false);
                        setRemoveIndex(-1);
                    }}>
                    <div className="mt-2 border-t border-black py-2">
                        <p>
                            Are you sure you wish to remove the item: <span className="font-bold">{PCSD.files[charIndex].data.equipment[removeIndex].name}</span>?
                        </p>
                        <p>This action is permanent and can only be reverted by re-loading the character data.</p>
                    </div>
                    <div className="flex justify-center">
                        <Button color="error" onClick={RemoveQuip}>
                            Confirmed, remove!
                        </Button>
                    </div>
                </Modal>
            );
        }
    }

    return (
        <>
            <h1>Equipment</h1>
            <div className="main-container">
                <Button color="primary" onClick={AddQuip}>
                    Add Item
                </Button>
                <Label title="Total Weight" value={total_weight} />
                {RenderQuip()}
            </div>
            <Modal id="removequip" title="Confirm Remove?" type={MODAL_TYPE.okcancel} onClose={(RetVal) => RemoveQuip(RetVal)}>
                <p>Are you sure you wish to remove this item?</p>
                <p>This action is permanent and can only be reverted by re-loading the character data.</p>
            </Modal>
        </>
    );
}
