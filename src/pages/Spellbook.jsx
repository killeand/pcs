import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { v1 as uuid } from 'uuid';
import PCSContext from '../components/PCSContext';
import Accordian from '../components/Accordian';
import Button from '../components/Button';
import Select from '../components/Select';
import Modal from '../components/Modal';
import Label from '../components/Label';
import MultiNumber from '../components/MultiNumber';
import List from '../components/List';
import { PF_GETMOD, PF_STATS_SHORT } from '../scripts/Pathfinder';
import '../styles/Page.css';

export default function Spellbook() {
    /*#########################################################################
    ## OPENING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/
    let PCSD = useContext(PCSContext);
    let Nav = useNavigate();
    let [ charIndex, setCharIndex ] = useState(-1);
    let [ book, setBook ] = useState([]);
    let [ showModal, setShowModal ] = useState(false);
    let [ removeIndex, setRemoveIndex ] = useState(-1);
    
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
                spellbook: []
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
    let stats = [0,0,0,0,0,0];

    if (charIndex != -1) {
        if (_.has(PCSD.files[charIndex], "data.classes")) {
            PCSD.files[charIndex].data.classes.forEach((item)=>{
                classlist.push({_id:item._id,name:item.name,level:item.level});
            })
        }

        if (_.has(PCSD.files[charIndex].data, "stats")) {
            let data = PCSD.files[charIndex].data.stats;
            stats.forEach((item, index)=>{stats[index]=_.sum(_.get(data, PF_STATS_SHORT[index]));});
        }
    }

    function FindClass(id) {
        for (let i = 0; i < classlist.length; i++) {
            if (classlist[i]._id == id)
                return i;
        }

        return 0;
    }

    function AddBook() {
        let newBooks = [...book];
        newBooks.push({
            _id: uuid(),
            class_id: "",
            score: 0,
            stats: [
                [0,0,0],
                [0,0,0],
                [0,0,0],
                [0,0,0],
                [0,0,0],
                [0,0,0],
                [0,0,0],
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ],
            book: []
        });

        SetAPI(newBooks);
        setBook(newBooks);
    }

    function RemoveBook() {
        let newBooks = [...book];
        newBooks.splice(removeIndex, 1);

        SetAPI(newBooks);
        setBook(newBooks);
        setRemoveIndex(-1);
        setShowModal(false);
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
        return book.map((item,index)=>{
            let classindex = FindClass(item.class_id);

            return (
                <Accordian key={item._id} title={`${classlist[classindex].name}'s Spellbook`}>
                    <div className="flex flex-row space-x-1">
                        <Select title="Class" id={`sb-${item._id}-class`} value={classindex} items={classlist.map((cli)=>cli.name)} className="flex-grow" onChange={(retval)=>ChangeBook(index, "class_id", classlist[retval]._id)} />
                        <Button color="red" className="bi-trash" onClick={()=>{setShowModal(true);setRemoveIndex(index);}} />
                    </div>
                    <div className="flex flex-row space-x-1">
                        <Select title="Stat" id={`sb-${item._id}-score`} value={item.score} items={["Intelligence","Wisdom","Charisma"]} className="w-2/3" onChange={(retval)=>ChangeBook(index, "score", retval)} />
                        <Label title="CL" value={classlist[classindex].level} className="w-1/3" />
                    </div>
                    <Accordian title="Spell Slots">
                        {Array(10).fill(0).map((_, ss_index)=>{
                            let mod = PF_GETMOD(stats[item.score + 3]);
                            let modcalc = (Math.ceil(mod / 4) + (((mod % 4) == 0)?1:0)) - Math.ceil((ss_index - (mod % 4)) / 4);
                            if (ss_index == 0) modcalc = 0;
                            let dc = 10 + ss_index + mod;
                            let total = modcalc + item.stats[ss_index][0] + item.stats[ss_index][1];

                            if (stats[item.score + 3] < (10+ss_index)) {
                                return (<Label key={`${item._id}${ss_index}`} title={ss_index} value="Cannot cast spells of this level..." />)
                            }

                            return (
                                <Label key={`${item._id}${ss_index}`} title={ss_index} value={
                                    <>
                                        <div className="flex flex-col divide-y divide-solid divide-black">
                                            <p className="text-xs m-0 p-0">DC</p>
                                            <p className="text-center m-0 p-0">{dc}</p>
                                        </div>
                                        <div className="flex flex-col divide-y divide-solid divide-black">
                                            <p className="text-xs m-0 p-0">Total</p>
                                            <p className="text-center m-0 p-0">{total}</p>
                                        </div>
                                        <div className="flex flex-col divide-y divide-solid divide-black">
                                            <p className="text-xs m-0 p-0">Mod</p>
                                            <p className="text-center m-0 p-0">{(ss_index==0)?"-":modcalc}</p>
                                        </div>
                                        <MultiNumber title={["Class","Misc","Known"]} id={`ss-${ss_index}`} value={book[index].stats[ss_index]} onChange={(retval)=>ChangeSpellSlots(index, ss_index, retval)} />
                                    </>
                                } className="h-14" />    
                            );
                        })}
                    </Accordian>
                    <Accordian title="Distances">
                        <Label title="Long" value={400 + (40 * classlist[classindex].level)} />
                        <Label title="Medium" value={100 + (10 * classlist[classindex].level)} />
                        <Label title="Short" value={25 + (5 * Math.ceil(classlist[classindex].level / 2))} />
                    </Accordian>
                    <List title="Spells" id={`sb-${item._id}-book`} value={item.book} onChange={(retval)=>ChangeBook(index,"book",retval)} />
                </Accordian>
            );
        })
    }

    function RenderRemoveModal() {
        if (showModal && removeIndex != -1) {
            return (
                <Modal className="flex flex-col space-y-1 p-1" title="Confirm Remove?" onClose={()=>{setShowModal(false);setRemoveIndex(-1);}}>
                    <div>
                        <p>Are you sure you wish to remove the spellbook: <span className="font-bold">{classlist[FindClass(book[removeIndex].class_id)].name}'s Spellbook</span>?</p>
                        <p>This action is permanent and can only be reverted by re-loading the character data.</p>
                    </div>
                    <div className="flex justify-center">
                        <Button color="red" onClick={RemoveBook}>Confirmed, remove!</Button>
                    </div>
                </Modal>
            );
        }
    }

    if (charIndex == -1)
        return (<p>Loading...</p>);

    return (
        <>
            {RenderRemoveModal()}
            <h1>Spellbook</h1>
            <div className="main-container">
                <Button color="yellow" onClick={AddBook}>Add Spellbook</Button>
                {RenderBooks()}
            </div>
            <div className="msg-container">
                <div><span className="font-bold">Save DC</span>: 10 + Spell Level + Ability Mod</div>
                <div><span className="font-bold">Total Spells</span>: Can cast; Class Spells + Spell Mod Calc + Misc</div>
                <div><span className="font-bold">Spell Mod Calculation</span>: Mod = Ability Mod, Lv = Spell Level; (&lceil;Mod / 4&rceil; + (((Mod % 4) == 0) ? 1 : 0)) - &lceil;(Lv - (Mod % 4)) / 4&rceil;</div>
                <div><span className="font-bold">Distances</span>: Cl = Caster Level; Long = 400 + 40 * Cl, Medium = 100 + 10 * Cl, Short = 25 + 5 * &lceil;Cl / 2&rceil;</div>
            </div>
        </>
    );
}