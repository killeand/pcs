import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { ulid } from "ulidx";
import PCSContext from "../components/application/PCSContext";
import Accordian from "../components/Accordian";
import Button from "../components/Button";
import Select from "../components/Select";
import Modal from "../components/Modal";
import Label from "../components/Label";
import MultiNumber from "../components/MultiNumber";
import List from "../components/List";
import { PF_GETMOD, PF_STATS_SHORT } from "../scripts/Pathfinder";
import { MODAL_TYPE } from "@/scripts/Utilities";

export default function Spellbook() {
    /*#########################################################################
    ## OPENING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/
    let PCSD = useContext(PCSContext);
    let Nav = useNavigate();
    let [charIndex, setCharIndex] = useState(-1);
    let [book, setBook] = useState([]);
    let [removeIndex, setRemoveIndex] = useState(-1);

    function SetAPI(value) {
        PCSD.files[charIndex].data.spellbook = value;
        PCSD.files[charIndex].saved = false;
    }

    useEffect(() => {
        let tempIndex = PCSD.getLoadedIndex();

        if (tempIndex == -1) {
            Nav("/");

            return;
        }

        if (!_.has(PCSD.files[tempIndex], "data.spellbook")) {
            _.assign(PCSD.files[tempIndex].data, {
                spellbook: [],
            });
        }

        setCharIndex(tempIndex);

        /* ENTER PAGE SPECIFIC CODE HERE */
        setBook(PCSD.files[tempIndex].data.spellbook);
        /* ENTER PAGE SPECIFIC CODE HERE */
    }, []);
    /*#########################################################################
    ## CLOSING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/

    let classlist = [];
    let stats = [0, 0, 0, 0, 0, 0];

    if (charIndex != -1) {
        if (_.has(PCSD.files[charIndex], "data.classes")) {
            PCSD.files[charIndex].data.classes.forEach((item) => {
                classlist.push({ _id: item._id, name: item.name, level: item.level });
            });
        }

        if (_.has(PCSD.files[charIndex].data, "stats")) {
            let data = PCSD.files[charIndex].data.stats;
            stats.forEach((item, index) => {
                stats[index] = _.sum(_.get(data, PF_STATS_SHORT[index]));
            });
        }
    }

    function FindClass(id) {
        for (let i = 0; i < classlist.length; i++) {
            if (classlist[i]._id == id) return i;
        }

        return 0;
    }

    function AddBook() {
        if (classlist.length != 0) {
            let newBooks = [...book];
            newBooks.push({
                _id: ulid(),
                class_id: "",
                score: 0,
                stats: [
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                ],
                book: [],
            });

            SetAPI(newBooks);
            setBook(newBooks);
        }
    }

    function AskRemove(bookIndex) {
        setRemoveIndex(bookIndex);
        window.removebook.showModal();
    }

    function RemoveBook(dialogValue) {
        if (dialogValue === "ok") {
            let newBooks = [...book];
            newBooks.splice(removeIndex, 1);

            SetAPI(newBooks);
            setBook(newBooks);
            setRemoveIndex(-1);
        }
    }

    function ChangeBook(index, path, value) {
        let newBooks = [...book];
        newBooks[index][path] = value;

        SetAPI(newBooks);
        setBook(newBooks);
    }

    function ChangeSpellSlots(index, ss_index, value) {
        let newSS = [...book[index].stats];
        newSS[ss_index] = value;

        ChangeBook(index, "stats", newSS);
    }

    function RenderBooks() {
        if (classlist.length == 0) return <p>In order to create a Spellbook, you need to have a class available. Please visit the Classes page and create a new spell casting class, then return to this page.</p>;

        return book.map((item, index) => {
            let classindex = FindClass(item.class_id);

            return (
                <Accordian key={item._id} title={`${classlist[classindex].name}'s Spellbook`} innerClass="flex flex-col p-1 gap-1">
                    <div className="flex flex-row space-x-1">
                        <Select title="Class" id={`sb-${item._id}-class`} value={classindex} items={classlist.map((cli) => cli.name)} outerClass="flex-grow" color="secondary" onChange={(retval) => ChangeBook(index, "class_id", classlist[retval]._id)} />
                        <Button color="error" className="bi-trash" onClick={() => AskRemove(index)} />
                    </div>
                    <div className="flex flex-row space-x-1">
                        <Select title="Stat" id={`sb-${item._id}-score`} value={item.score} items={["Intelligence", "Wisdom", "Charisma"]} outerClass="w-2/3" color="secondary" onChange={(retval) => ChangeBook(index, "score", retval)} />
                        <Label title="CL" value={classlist[classindex].level} color="secondary" outerClass="w-1/3" />
                    </div>
                    <Accordian title="Spell Slots" color="secondary" innerClass="flex flex-col p-1 gap-1">
                        {Array(10)
                            .fill(0)
                            .map((_, ss_index) => {
                                let mod = PF_GETMOD(stats[item.score + 3]);
                                let modcalc = Math.ceil(mod / 4) + (mod % 4 == 0 ? 1 : 0) - Math.ceil((ss_index - (mod % 4)) / 4);
                                if (ss_index == 0) modcalc = 0;
                                let dc = 10 + ss_index + mod;
                                let total = modcalc + item.stats[ss_index][0] + item.stats[ss_index][1];

                                if (stats[item.score + 3] < 10 + ss_index) {
                                    return <Label key={`${item._id}${ss_index}`} title={ss_index} value="Cannot cast spells of this level..." color="accent" />;
                                }

                                return (
                                    <Label
                                        key={`${item._id}${ss_index}`}
                                        title={ss_index}
                                        color="accent"
                                        outerClass="h-fit"
                                        innerClass="flex flex-row gap-1"
                                        value={
                                            <>
                                                <div className="flex flex-col divide-y divide-solid divide-black">
                                                    <p className="m-0 p-0 text-xs">DC</p>
                                                    <p className="m-0 p-0 text-center">{dc}</p>
                                                </div>
                                                <div className="flex flex-col divide-y divide-solid divide-black">
                                                    <p className="m-0 p-0 text-xs">Total</p>
                                                    <p className="m-0 p-0 text-center">{total}</p>
                                                </div>
                                                <div className="flex flex-col divide-y divide-solid divide-black">
                                                    <p className="m-0 p-0 text-xs">Mod</p>
                                                    <p className="m-0 p-0 text-center">{ss_index == 0 ? "-" : modcalc}</p>
                                                </div>
                                                <MultiNumber title={["Class", "Misc", "Known"]} id={`ss-${ss_index}`} value={book[index].stats[ss_index]} color="info" onChange={(retval) => ChangeSpellSlots(index, ss_index, retval)} />
                                            </>
                                        }
                                    />
                                );
                            })}
                    </Accordian>
                    <Accordian title="Distances" color="secondary">
                        <Label title="Long" value={400 + 40 * classlist[classindex].level} color="accent" />
                        <Label title="Medium" value={100 + 10 * classlist[classindex].level} color="accent" />
                        <Label title="Short" value={25 + 5 * Math.ceil(classlist[classindex].level / 2)} color="accent" />
                    </Accordian>
                    <List title="Spells" id={`sb-${item._id}-book`} value={item.book} color="secondary" onChange={(retval) => ChangeBook(index, "book", retval)} />
                </Accordian>
            );
        });
    }

    if (charIndex == -1) return <p>Loading...</p>;

    return (
        <>
            <h1>Spellbook</h1>
            <div className="main-container">
                <Button color="primary" onClick={AddBook}>
                    Add Spellbook
                </Button>
                {RenderBooks()}
            </div>
            <div className="msg-container">
                <div>
                    <span className="font-bold">Save DC</span>: 10 + Spell Level + Ability Mod
                </div>
                <div>
                    <span className="font-bold">Total Spells</span>: Can cast; Class Spells + Spell Mod Calc + Misc
                </div>
                <div>
                    <span className="font-bold">Spell Mod Calculation</span>: Mod = Ability Mod, Lv = Spell Level; (&lceil;Mod / 4&rceil; + (((Mod % 4) == 0) ? 1 : 0)) - &lceil;(Lv - (Mod % 4)) / 4&rceil;
                </div>
                <div>
                    <span className="font-bold">Distances</span>: Cl = Caster Level; Long = 400 + 40 * Cl, Medium = 100 + 10 * Cl, Short = 25 + 5 * &lceil;Cl / 2&rceil;
                </div>
            </div>
            <Modal id="removebook" title="Confirm Remove?" color="warning" type={MODAL_TYPE.okcancel} onClose={(RetVal) => RemoveBook(RetVal)}>
                <p>Are you sure you wish to remove this spellbook?</p>
                <p>This action is permanent and can only be reverted by re-loading the character data.</p>
            </Modal>
        </>
    );
}
