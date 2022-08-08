import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { v1 as uuid } from 'uuid';
import PCSContext from '../components/PCSContext';
import SkillRow from '../components/SkillRow';
import CSkillRow from '../components/CSkillRow';
import Label from '../components/Label';
import Button from '../components/Button';
import { PF_STATS_SHORT, PF_GETMOD, PF_SKILLS, PF_CUST_SKILLS } from '../scripts/Pathfinder';
import '../styles/Page.css';

export default function Skills() {
    /*#########################################################################
    ## OPENING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/
    let PCSD = useContext(PCSContext);
    let Nav = useNavigate();
    let [ charIndex, setCharIndex ] = useState(-1);
    let [ skills, setSkills ] = useState([]);
    let [ cSkills, setCSkills ] = useState([]);

    function SetAPI(path, custom, value) {
        let newObj = {};
        newObj[path] = value;

        if (custom)
            _.assign(PCSD.files[charIndex].data.custskills, newObj);
        else
            _.assign(PCSD.files[charIndex].data.skills, newObj);

        PCSD.files[charIndex].saved = false;
    }

    useEffect(() => {
        let tempIndex = PCSD.getLoadedIndex();

        if (tempIndex == -1) {
            Nav("/");

            return;
        }

        if (!_.has(PCSD.files[tempIndex], "data.skills")) {
            _.assign(PCSD.files[tempIndex].data, {
                skills: {
                    appr: [false,0,0],
                    acro: [false,0,0],
                    bluf: [false,0,0],
                    clim: [false,0,0],
                    dipl: [false,0,0],
                    disd: [false,0,0],
                    disg: [false,0,0],
                    esca: [false,0,0],
                    fly: [false,0,0],
                    hana: [false,0,0],
                    heal: [false,0,0],
                    inti: [false,0,0],
                    ling: [false,0,0],
                    perc: [false,0,0],
                    ride: [false,0,0],
                    senm: [false,0,0],
                    sleh: [false,0,0],
                    spel: [false,0,0],
                    stea: [false,0,0],
                    surv: [false,0,0],
                    swim: [false,0,0],
                    usmd: [false,0,0]
                }
            });
        }

        if (!_.has(PCSD.files[tempIndex], "data.custskills")) {
            _.assign(PCSD.files[tempIndex].data, {
                custskills: {
                    craf: [],
                    know: [],
                    perf: [],
                    prof: []
                }
            });
        }

        setCharIndex(tempIndex);

        /* ENTER PAGE SPECIFIC CODE HERE */
        let tempSkills = PCSD.files[tempIndex].data.skills;
        let tempCSkills = PCSD.files[tempIndex].data.custskills;
        let stateSkills = [];
        let stateCSkills = [];

        _.forEach(tempSkills, (item, key)=>{
            stateSkills.push([key, item]);
        });
        _.forEach(tempCSkills, (item, key)=>{
            stateCSkills.push([key, item]);
        });

        setSkills(stateSkills);
        setCSkills(stateCSkills);
        /* ENTER PAGE SPECIFIC CODE HERE */
    }, []);
    /*#########################################################################
    ## CLOSING COMMON PAGE BLOCK FOR API ACCESS
    #########################################################################*/

    function FindSkill(path) {
        for (let i = 0; i < skills.length; i++)
            if (skills[i][0]==path)
                return i;
    }

    function FindCSkill(path) {
        for (let i = 0; i < cSkills.length; i++)
            if (cSkills[i][0]==path)
                return i;
    }

    function AddCSkill(path) {
        let index = FindCSkill(path);
        let newCSkills = [...cSkills];

        newCSkills[index][1].push({
            _id: uuid(),
            name: "New Skill",
            stats: [false,0,0]
        });

        setCSkills(newCSkills);
        SetAPI(path, true, newCSkills[index][1]);
    }

    function RemoveCSkill(path, subindex) {
        let index = FindCSkill(path);
        let newCSkills = [...cSkills];

        newCSkills[index][1].splice(subindex, 1);

        setCSkills(newCSkills);
        SetAPI(path, true, newCSkills[index][1]);
    }

    function ChangeCSkill(path, subindex, value) {
        let index = FindCSkill(path);
        let newCSkills = [...cSkills];

        newCSkills[index][1][subindex] = {
            _id: newCSkills[index][1][subindex]._id,
            name: value[1],
            stats: [
                value[0],
                value[2],
                value[3]
            ]
        };

        setCSkills(newCSkills);
        SetAPI(path, true, newCSkills[index][1]);
    }

    let mods = [0,0,0,0,0,0];
    let ac_penalty = 0;
    let ttl_ranks = 0;
    let use_ranks = 0;

    if (charIndex != -1) {
        if (_.has(PCSD.files[charIndex].data, "stats")) {
            let stats = PCSD.files[charIndex].data.stats;
            mods.forEach((item, index)=>{mods[index]=PF_GETMOD(_.sum(_.get(stats, PF_STATS_SHORT[index])));});
        }

        if (_.has(PCSD.files[charIndex].data, "armors")) {
            PCSD.files[charIndex].data.armors.forEach((item) => {
                if (item.active) {
                    ac_penalty += item.penalty;
                }
            });
        }

        if (_.has(PCSD.files[charIndex].data, "classes")) {
            let classes = PCSD.files[charIndex].data.classes;

            classes.forEach((item)=>{
                let rpl = (item.skillnum + mods[3]);
                if (rpl < 1) rpl=1;
                ttl_ranks += (rpl*item.level) + item.favclass[1];
            });
        }

        skills.forEach((item)=>{
            use_ranks += item[1][1];
        });
        cSkills.forEach((item)=>{
            item[1].forEach((subitem)=>{
                use_ranks += subitem.stats[1];
            });
        });
    }

    function ChangeSkill(path, value) {
        let newSkills = [...skills];
        newSkills[FindSkill(path)][1] = [value[0],value[2],value[3]];

        setSkills(newSkills);
        SetAPI(path, false, newSkills[FindSkill(path)][1]);
    }

    function RenderSkills() {
        return PF_SKILLS.map((item)=>{
            let skillinfo = skills[FindSkill(item.k)][1];
            
            return <SkillRow key={item.k} title={item.v} id={item.k} value={[item.f,ac_penalty,item.s,mods[item.s],skillinfo[0],skillinfo[1],skillinfo[2]]} onChange={(retval)=>ChangeSkill(item.k, retval)} />
        });
    }

    function RenderSubCSkill(flags) {
        return cSkills[FindCSkill(flags.k)][1].map((item,index)=>{
            return <CSkillRow key={`${flags.k}-${item._id}`} title={item.name} id={`${flags.k}:${index}`} value={[flags.f,mods[flags.s],item.stats[0],item.stats[1],item.stats[2]]} className="pr-2" onChange={(retval)=>ChangeCSkill(flags.k,index,retval)} onDelete={()=>RemoveCSkill(flags.k,index)} />
        });
    }

    function RenderCSkills() {
        return PF_CUST_SKILLS.map((item)=>{
            return (
                <div key={item.k} className="rounded-md border-2 border-amber-300">
                    <div className="flex flex-row p-1 items-center">
                        <div className="font-bold flex-grow">{item.v} {((item.f&1)==1)?"*":""} {((item.f&2)==2)?<>&dagger;</>:""} ({PF_STATS_SHORT[item.s]})</div>
                        <Button color="green" className="text-xs bi-plus-square" onClick={()=>AddCSkill(item.k)} />
                    </div>
                    <div className="grid grid-cols-12 gap-1 text-xs bg-amber-300">
                        <div className="col-start-6 col-span-1 text-center">TTL</div>
                        <div className="col-span-2 text-center">Ranks</div>
                        <div className="col-span-1 text-center">Mod</div>
                        <div className="col-span-2 text-center">Misc</div>
                    </div>
                    {RenderSubCSkill(item)}
                </div>
            );
        });
    }

    if (charIndex == -1)
        return (<p>Loading...</p>);

    return (
        <>
            <h1>Skills</h1>
            <div className="main-container">
                <Label title="Total Ranks" value={ttl_ranks} />
                <Label title="Used Ranks" value={use_ranks} />
            </div>
            <div className="main-container space-y-0 rounded-md border-2 border-amber-300">
                <div className="grid grid-cols-12 gap-1 text-xs bg-amber-300 rounded-t-sm">
                    <div className="col-start-7 col-span-1 text-center">TTL</div>
                    <div className="col-span-2 text-center">Ranks</div>
                    <div className="col-span-1 text-center">Mod</div>
                    <div className="col-span-2 text-center">Misc</div>
                </div>
                {RenderSkills()}
            </div>
            <div className="main-container">
                {RenderCSkills()}
            </div>
            <div className="msg-container">
                <div><span className="font-bold">*</span>: Armor Check Penalty (subtracts {ac_penalty})</div>
                <div><span className="font-bold">&dagger;</span>: Cannot Use Untrained</div>
                <div><span className="font-bold">Total Skills</span>: Sum of((Class Skill # + INT Mod) * Class Level) + FC Skill Total (min 1 per level)</div>
                <div><span className="font-bold">Used Skills</span>: Sum of(Skill Ranks + Custom Skill Ranks)</div>
                <div><span className="font-bold">Total Points in Skill</span>: Ranks + Ability Mod + Misc + (If Class and Rank == 3) - (If STR or DEX == Armor Check Penalty)</div>
            </div>
            
        </>
    );
}