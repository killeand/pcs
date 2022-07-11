import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import PCSContext from '../components/PCSContext';
import '../styles/Details.css';

export default function Details() {
    let PCSD = useContext(PCSContext);
    let Nav = useNavigate();
    let [ charIndex, setCharIndex ] = useState(-1);
    let [ name, setName ] = useState("");
    let [ race, setRace ] = useState("");
    let [ size, setSize ] = useState(4);
    let [ gender, setGender ] = useState("");
    let [ height, setHeight ] = useState("");
    let [ weight, setWeight ] = useState("");
    let [ hair, setHair ] = useState("");
    let [ eyes, setEyes ] = useState("");
    let [ skin, setSkin ] = useState("");
    let [ age, setAge ] = useState("");
    let [ align, setAlign ] = useState("");
    let [ deity, setDeity ] = useState("");
    let [ home, setHome ] = useState("");
    let [ lang, setLang ] = useState([]);

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
        setName(PCSD.files[tempIndex].data.details.name);
        setRace(PCSD.files[tempIndex].data.details.race)
        setSize(PCSD.files[tempIndex].data.details.size)
        setGender(PCSD.files[tempIndex].data.details.gender)
        setHeight(PCSD.files[tempIndex].data.details.height)
        setWeight(PCSD.files[tempIndex].data.details.weight)
        setHair(PCSD.files[tempIndex].data.details.hair)
        setEyes(PCSD.files[tempIndex].data.details.eyes)
        setSkin(PCSD.files[tempIndex].data.details.skin)
        setAge(PCSD.files[tempIndex].data.details.age)
        setAlign(PCSD.files[tempIndex].data.details.alignment)
        setDeity(PCSD.files[tempIndex].data.details.deity)
        setHome(PCSD.files[tempIndex].data.details.homeland)
        setLang(PCSD.files[tempIndex].data.details.languages)
    }, []);

    function UpdateState(cbFunc, path, value) {
        cbFunc(value);
        let newObj = {};
        newObj[path] = value;
        _.assign(PCSD.files[charIndex].data.details, newObj);

        console.log(value);
    }

    function RenderSizes() {
        return ["Fine","Diminutive","Tiny","Small","Medium","Large","Huge","Gargantuan","Colossal"].map((value, index) => {
            return (<option key={`sizeopts${index}`} value={index}>{value}</option>);
        });
    }

    return (
        <>
            <h1>Character Details</h1>
            <div className="det-cont">
                <div className="det-row">
                    <label htmlFor="name" className="det-label">Name</label>
                    <input type="text" id="name" name="name" value={name} className="det-text" onChange={(e)=>UpdateState(setName, "name", e.target.value)} />
                </div>
                <div className="det-row">
                    <label htmlFor="race" className="det-label">Race</label>
                    <input type="text" id="race" name="race" value={race} className="det-text" onChange={(e)=>UpdateState(setRace, "race", e.target.value)} />
                </div>
                <div className="det-row">
                    <label htmlFor="size" className="det-label">Size</label>
                    <select id="size" name="size" className="det-text" value={size} onChange={(e)=>UpdateState(setSize, "size", e.target.selectedIndex)}>
                        {RenderSizes()}
                    </select>
                </div>
                <div className="det-row">
                    <label htmlFor="gender" className="det-label">Gender</label>
                    <input type="text" id="gender" name="gender" value={gender} className="det-text" onChange={(e)=>UpdateState(setGender, "gender", e.target.value)} />
                </div>
                <div className="det-row">
                    <label htmlFor="height" className="det-label">Height</label>
                    <input type="text" id="height" name="height" value={height} className="det-text" onChange={(e)=>UpdateState(setHeight, "height", e.target.value)} />
                </div>
                <div className="det-row">
                    <label htmlFor="weight" className="det-label">Weight</label>
                    <input type="text" id="weight" name="weight" value={weight} className="det-text" onChange={(e)=>UpdateState(setWeight, "weight", e.target.value)} />
                </div>
                <div className="det-row">
                    <label htmlFor="hair" className="det-label">Hair</label>
                    <input type="text" id="hair" name="hair" value={hair} className="det-text" onChange={(e)=>UpdateState(setHair, "hair", e.target.value)} />
                </div>
                <div className="det-row">
                    <label htmlFor="eyes" className="det-label">Eyes</label>
                    <input type="text" id="eyes" name="eyes" value={eyes} className="det-text" onChange={(e)=>UpdateState(setEyes, "eyes", e.target.value)} />
                </div>
                <div className="det-row">
                    <label htmlFor="skin" className="det-label">Skin</label>
                    <input type="text" id="skin" name="skin" value={skin} className="det-text" onChange={(e)=>UpdateState(setSkin, "skin", e.target.value)} />
                </div>
                <div className="det-row">
                    <label htmlFor="age" className="det-label">Age</label>
                    <input type="text" id="age" name="age" value={age} className="det-text" onChange={(e)=>UpdateState(setAge, "age", e.target.value)} />
                </div>
                <div className="det-row">
                    <label htmlFor="align" className="det-label">Alignment</label>
                    <input type="text" id="align" name="align" value={align} className="det-text" onChange={(e)=>UpdateState(setAlign, "alignment", e.target.value)} />
                </div>
                <div className="det-row">
                    <label htmlFor="deity" className="det-label">Deity</label>
                    <input type="text" id="deity" name="deity" value={deity} className="det-text" onChange={(e)=>UpdateState(setDeity, "deity", e.target.value)} />
                </div>
                <div className="det-row">
                    <label htmlFor="home" className="det-label">Homeland</label>
                    <input type="text" id="home" name="home" value={home} className="det-text" onChange={(e)=>UpdateState(setHome, "homeland", e.target.value)} />
                </div>
            </div>
            <div className="det-cont">
                <div className="det-lang-title">Languages</div>
                
            </div>
        </>
    );
}