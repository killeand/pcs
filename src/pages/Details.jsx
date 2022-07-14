import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import PCSContext from '../components/PCSContext';
import TextRow from '../components/TextRow';
import SelectRow from '../components/SelectRow';
import '../styles/Details.css';

const CHAR_SIZES = ["Fine","Diminutive","Tiny","Small","Medium","Large","Huge","Gargantuan","Colossal"];
const CHAR_ALIGNMENTS = ["Unaligned","Lawful Good","Neutral Good","Chaotic Good","Lawful Neutral","True Neutral","Chaotic Neutral","Lawful Evil","Neutral Evil","Chaotic Evil","Its Complicated"];
const CHAR_LANGUAGES = ["Abyssal","Aklo","Aquan","Auran","Celestal","Common","Draconic","Druidic","Dwarf","Elf","Giant","Gnoll","Gnome","Goblin","Halfling","Ignan","Infernal","Orc","Sign","Sign (Drow)","Sylvan","Terran","Undercommon"];

export default function Details() {
    let PCSD = useContext(PCSContext);
    let Nav = useNavigate();
    let [ charIndex, setCharIndex ] = useState(-1);

    useEffect(() => {
        let tempIndex = PCSD.getLoadedIndex();

        if (tempIndex == -1) {
            Nav("/");

            return;
        }

        if (!_.has(PCSD.files[tempIndex], "data.details")) {
            _.assign(PCSD.files[tempIndex].data, {
                details: {
                    name: "",
                    race: "",
                    size: 4,
                    gender: "",
                    height: "",
                    weight: "",
                    hair: "",
                    eyes: "",
                    skin: "",
                    age: "",
                    alignment: "",
                    deity: "",
                    homeland: "",
                    languages: []
                }
            });
        }

        setCharIndex(tempIndex);
    }, []);

    function GetInfo(path) {
        return _.get(PCSD.files[charIndex].data.details, path);
    }

    function UpdateState(path, value) {
        let newObj = {};
        newObj[path] = value;
        _.assign(PCSD.files[charIndex].data.details, newObj);
        PCSD.files[charIndex].saved = false;
    }

    function RenderFields() {
        if (charIndex == -1) {
            return (<p>Loading</p>);
        }
        else {
            return (
                <>
                    <TextRow title="Name" id="name" value={GetInfo("name")} onChange={(retval)=>UpdateState("name", retval)} />
                    <TextRow title="Race" id="race" value={GetInfo("race")} onChange={(retval)=>UpdateState("race", retval)} />
                    <SelectRow title="Size" id="size" index={GetInfo("size")} arrow="bi-aspect-ratio" values={CHAR_SIZES} onChange={(retval)=>UpdateState("size", retval)} />
                    <TextRow title="Gender" id="gender" value={GetInfo("gender")} onChange={(retval)=>UpdateState("gender", retval)} />
                    <TextRow title="Height" id="height" value={GetInfo("height")} onChange={(retval)=>UpdateState("height", retval)} />
                    <TextRow title="Weight" id="weight" value={GetInfo("weight")} onChange={(retval)=>UpdateState("weight", retval)} />
                    <TextRow title="Hair" id="hair" value={GetInfo("hair")} onChange={(retval)=>UpdateState("hair", retval)} />
                    <TextRow title="Eyes" id="eyes" value={GetInfo("eyes")} onChange={(retval)=>UpdateState("eyes", retval)} />
                    <TextRow title="Skin" id="skin" value={GetInfo("skin")} onChange={(retval)=>UpdateState("skin", retval)} />
                    <TextRow title="Age" id="age" value={GetInfo("age")} onChange={(retval)=>UpdateState("age", retval)} />
                    <SelectRow title="Alignment" id="alignment" arrow="bi-text-indent-left" index={GetInfo("alignment")} values={CHAR_ALIGNMENTS} onChange={(retval)=>UpdateState("alignment", retval)} />
                    <TextRow title="Deity" id="deity" value={GetInfo("deity")} onChange={(retval)=>UpdateState("deity", retval)} />
                    <TextRow title="Homeland" id="homeland" value={GetInfo("homeland")} onChange={(retval)=>UpdateState("homeland", retval)} />
                </>
            );
        }
    }

    function RenderLanguages() {
        return CHAR_LANGUAGES.map((lang, index) => {
            return (
                <label key={`langopt${index}`} htmlFor={`lang${index}`}>
                    <input type="checkbox" id={`lang${index}`} name={`lang${index}`} value={lang} />
                    {lang}
                </label>
            );
        });
    }

    return (
        <>
            <h1>Character Details</h1>
            <div className="det-cont">
                {RenderFields()}
            </div>
            <div className="det-lang-cont">
                <div className="det-lang-title">Languages</div>
                <div className="det-lang-group">
                    {RenderLanguages()}
                </div>
            </div>
        </>
    );
}