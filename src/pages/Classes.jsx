import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { ulid } from "ulidx";
import PCSContext from "../components/application/PCSContext";
import Button from "../components/Button";
import Label from "../components/Label";
import Text from "../components/InputText";
import Number from "../components/InputNumber";
import MultiNumber from "../components/MultiNumber";
import Accordian from "../components/Accordian";
import Modal from "../components/Modal";
import { MODAL_TYPE } from "@/scripts/Utilities";

export default function Classes() {
    /*#########################################################################
    ## OPENING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/
    let PCSD = useContext(PCSContext);
    let Nav = useNavigate();
    let [charIndex, setCharIndex] = useState(-1);
    let [classList, setClassList] = useState([]);
    let [removeIndex, setRemoveIndex] = useState(-1);

    function SetAPI(value) {
        PCSD.files[charIndex].data.classes = value;
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
                classes: [],
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
            _id: ulid(),
            name: "Untitled Class",
            level: 1,
            hd: 0,
            health: 0,
            bab: 0,
            skillnum: 0,
            favclass: [0, 0],
            saves: [0, 0, 0],
        });

        SetAPI(newClasses);
        setClassList(newClasses);
    }

    function AskRemove(classIndex) {
        setRemoveIndex(classIndex);
        window.removeclass.showModal();
    }

    function RemoveClass(dialogValue) {
        if (dialogValue === "ok") {
            let newClasses = [...classList];
            newClasses.splice(removeIndex, 1);

            SetAPI(newClasses);
            setClassList(newClasses);
            setRemoveIndex(-1);
        }

        setRemoveIndex(-1);
    }

    function CalculateLevels() {
        if (charIndex == -1) return 0;

        let total = 0;

        classList.forEach((item, index) => {
            total += item.level;
        });

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
        if (charIndex == -1) return <p>Loading...</p>;

        if (classList.length == 0) return <p>No classes have been added yet...</p>;

        return classList.map((item, index) => {
            return (
                <Accordian key={`class-${item._id}`} title={item.name} titleElements={<div>{item.level}</div>} innerClass="p-1 flex flex-col gap-1">
                    <div className="flex flex-row">
                        <Text title="Class Name" id={`class${index + 1}name`} value={item.name} outerClass="mr-1 flex-grow" color="secondary" onChange={(retval) => ChangeValue(index, 0, retval)} />
                        <Button color="error" className="bi-trash" onClick={() => AskRemove(index)} />
                    </div>
                    <Number title="Level" id={`class${index + 1}level`} value={item.level} min={1} max={20} color="secondary" onChange={(retval) => ChangeValue(index, 1, retval)} />
                    <MultiNumber title={["HD", "Health", "BAB", "Skill Num"]} id={`class${index + 1}bs`} value={[item.hd, item.health, item.bab, item.skillnum]} min={[0, 0, 0, 0]} max={[100, 5000, 20, 20]} color="secondary" onChange={(retval) => ChangeValue(index, 2, retval)} />
                    <MultiNumber title={["Fav Class Health", "Fav Class Skill"]} id={`class${index + 1}fc`} value={[item.favclass[0], item.favclass[1]]} min={[0, 0]} max={[20, 20]} color="secondary" onChange={(retval) => ChangeValue(index, 3, retval)} />
                    <MultiNumber title={["Fortitude", "Reflex", "Will"]} id={`class${index + 1}st`} value={[item.saves[0], item.saves[1], item.saves[2]]} min={[0, 0, 0]} max={[20, 20, 20]} color="secondary" onChange={(retval) => ChangeValue(index, 4, retval)} />
                </Accordian>
            );
        });
    }

    return (
        <>
            <h1>Classes</h1>
            <div className="main-container">
                <Button color="primary" onClick={AddClass}>
                    Add Class
                </Button>
                <Label title="Total Class Levels" value={CalculateLevels()} />
            </div>
            <div className="main-container">{RenderClasses()}</div>
            <Modal id="removeclass" title="Confirm Remove?" color="warning" type={MODAL_TYPE.okcancel} onClose={(RetVal) => RemoveClass(RetVal)}>
                <p>Are you sure you wish to remove this class?</p>
                <p>This action is permanent and can only be reverted by re-loading the character data.</p>
            </Modal>
        </>
    );
}
