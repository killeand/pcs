import { useState } from 'react';
import Accordian from "../components/Accordian"
import Button from "../components/Button"
import CSkillRow from "../components/pathfinder/CSkillRow"
import Dialog from "../components/Dialog"
import Label from "../components/Label"
import List from "../components/List"
import Modal from "../components/Modal"
import MultiNumber from "../components/MultiNumber"
import Number from "../components/Number"
import Select from "../components/Select"
import SkillRow from "../components/pathfinder/SkillRow"
import Text from "../components/Text"
import TextArea from "../components/TextArea"
import { ulid } from 'ulidx';

export default function CompTest() {
    const valuestyles = {
        border: "1px solid red",
        padding: "0.5em"
    }

    const [butv, setButv] = useState("");
    const [lisv, setLisv] = useState(["Shirts","Pants","Bras"]);
    const [mnuv, setMnuv] = useState([9, 8, 7]);
    const [numv, setNumv] = useState(99);
    const [selv, setSelv] = useState(1);
    const [texv, setTexv] = useState("");
    const [teav, setTeav] = useState("");
    const SelStrings = ["Num 9", "Num 8", "Num 7"];

    return (
        <>
            <h1>Component Tests</h1>
            <div className="main-container">
                <Accordian />
                <Accordian title="accordian title" color="primary" titleElements={[<div key="blah1">Element 1</div>,<div key="blah2">Element 2</div>,<div key="blah3">Element 3</div>]} innerClass="bg-red-500" outerClass="w-1/2">inner contents</Accordian>
            </div>
            <div className="main-container">
                <div style={valuestyles}>{butv}</div>
                <Button />
                <Button className="bi-bootstrap" as="p" color="secondary" onClick={()=>setButv(ulid())}>Awesome Button</Button>
            </div>
            <div className="main-container">
                <Dialog />
                <Dialog color="accent" title="Dialog Box" innerClass="p-3 bg-blue-100" outerClass="w-1/3">New Dialog Box</Dialog>
            </div>
            <div className="main-container">
                <Label />
                <Label title="New Label" value="New label field" color="warning" innerClass="justify-center" outerClass="my-2" />
            </div>
            <div className="main-container">
                <div style={valuestyles}>{lisv.join(", ")}</div>
                <List />
                <List title="Laundry List" value={lisv} color="info" innerClass="w-2/6" outerClass="w-4/6" onChange={(retval) => setLisv(retval)} />
            </div>
            <div className="main-container">
                <Modal id="newmodal">Inner Modal Contents</Modal>
                <Modal id="newmodalalt" title="New Modal Dialog" color="error">Inner Modal Contents</Modal>
                <Button onClick={()=>window.newmodal.showModal()}>Show Modal</Button>
                <Button onClick={()=>window.newmodalalt.showModal()}>Show Modal Alt</Button>
            </div>
            <div className="main-container">
                <div style={valuestyles}>{mnuv.map((item,index)=>`Num ${index +1}: ${item}`).join(", ")}</div>
                <MultiNumber />
                <MultiNumber title={["Num 1","Num 2","Num 3"]} value={mnuv} min={[0,-5,0]} max={[20,20,20]} color="neutral" onChange={(retval)=>setMnuv(retval)} />
            </div>
            <div className="main-container">
                <div style={valuestyles}>{numv}</div>
                <Number />
                <Number title="New Number" value={numv} min={50} onChange={(retval)=>setNumv(retval)} />
            </div>
            <div className="main-container">
                <div style={valuestyles}>{SelStrings[selv]}</div>
                <Select items={SelStrings} />
                <Select title="Selection Box" value={selv} items={SelStrings} arrow="bi-list" onChange={(retval)=>setSelv(retval)} />
            </div>
            <div className="main-container">
                <div style={valuestyles}>{texv}</div>
                <Text />
                <Text title="Text Box" value={texv} placeholder="What?!" color="warning" onChange={(retval)=>setTexv(retval)} />
            </div>
            <div className="main-container">
                <div style={valuestyles}><pre>{teav}</pre></div>
                <TextArea />
                <TextArea title="Big Text Box" value={teav} placeholder="Something New?" color="info" onChange={(retval)=>setTeav(retval)} />
            </div>
        </>
    );
}