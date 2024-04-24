import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import _ from 'lodash';
import Button from '../components/Button';
import Accordian from '../components/Accordian';
import Number from '../components/InputNumber';
import Select from '../components/Select';
import Label from '../components/Label';
import { RandomNum } from '../scripts/Utilities';
import '../styles/Page.css';

export default function Tools(props) {
    let Loc = useLocation();
    let CheckPath = (path) => (Loc.pathname == `/tools/${path}`);

    function RenderRoutes() {
        switch (true) {
            case CheckPath("dice"): return <DiceRoller />; break;
            case CheckPath("stats"): return <StatsRoller />; break;
            default: return (<p>Please select a tool from the buttons above...</p>);
        }
    }

    return (
        <>
            <h1>Tools</h1>
            <div className="base-size flex flex-row justify-evenly my-2">
                <Button as={Link} to="/tools/dice">Dice Roller</Button>
                <Button as={Link} to="/tools/stats">Stats Roller</Button>
            </div>
            {RenderRoutes()}
        </>
    );
}

function DiceRoller() {
    let [ numdice, setNumdice ] = useState(1);
    let [ dicenum, setDicenum ] = useState(5);
    let [ customdie, setCustomdie ] = useState(0);
    let [ addttl, setAddttl ] = useState(0);
    let [ addeach, setAddeach ] = useState(0);
    let [ subttl, setSubttl ] = useState(0);
    let [ subeach, setSubeach ] = useState(0);
    let [ multtl, setMulttl ] = useState(0);
    let [ muleach, setMuleach ] = useState(0);
    let [ result, setResult ] = useState(0);
    let [ watcher, setWatcher ] = useState("");
    let diceconv = [4,6,8,10,12,20,100,0];

    function SetPreset(num, die) {
        setNumdice(num);
        setDicenum(die);
    }

    function Reset() {
        setNumdice(1);
        setDicenum(5);
        setCustomdie(0);
        setAddttl(0);
        setAddeach(0);
        setSubttl(0);
        setSubeach(0);
        setMulttl(0);
        setMuleach(0);
        setResult(0);
        setWatcher("");
    }

    function Roll() {
        let final = 0;
        let watch = "";

        for (let i = 0; i < numdice; i++) {
            let out = 0;
            
            if (dicenum != 7) out = RandomNum(1,diceconv[dicenum]);
            else out = RandomNum(1,customdie);

            final += out;

            if (muleach > 0) final *= muleach;
            if (addeach > 0) final += addeach;
            if (subeach > 0) final -= subeach;
            
            watch += `Roll (${i+1}): ${out}${(muleach>0)?` x ${muleach}`:""}${(addeach>0)?` + ${addeach}`:""}${(subeach>0)?` - ${subeach}`:""} (${final})\n`;
        }

        if (multtl > 0) {
            final *= multtl;
            watch += `Multiply by ${multtl} (${final})\n`;
        }
        if (addttl > 0) {
            final += addttl;
            watch += `Add ${addttl} (${final})\n`;
        }
        if (subttl > 0) {
            final -= subttl;
            watch += `Subtract ${subttl} (${final})\n`;
        }

        setResult(final);
        setWatcher(watch);
    }

    return (
        <>
            <h2>Dice Roller</h2>
            <div className="main-container">
                <Accordian title="Presets">
                    <div className="flex justify-evenly">
                        <Button color="secondary" onClick={()=>SetPreset(1,5)}>1d20</Button>
                        <Button color="secondary" onClick={()=>SetPreset(3,1)}>3d6</Button>
                        <Button color="secondary" onClick={()=>SetPreset(4,1)}>4d6</Button>
                        <Button color="secondary" onClick={()=>SetPreset(5,1)}>5d6</Button>
                        <Button color="secondary" onClick={()=>SetPreset(1,6)}>1d100</Button>
                    </div>
                </Accordian>
                <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-1">
                    <Number title="Num" value={numdice} min={1} className="md:w-1/2" onChange={setNumdice} />
                    <Select title="Die" value={dicenum} items={[4,6,8,10,12,20,100,"Custom"]} className="md:w-1/2" onChange={setDicenum} />
                </div>
                {(dicenum==7)?(
                    <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-1">
                        <Number title="Custom" value={customdie} min={1} className="md:w-1/2" onChange={setCustomdie} />
                    </div>
                ):""}
                <Accordian title="Modifiers">
                    <fieldset className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-1">
                        <legend>Addition</legend>
                        <Number title="To Total" value={addttl} min={0} className="md:w-1/2" onChange={setAddttl} />
                        <Number title="To Each" value={addeach} min={0} className="md:w-1/2" onChange={setAddeach} />
                    </fieldset>
                    <fieldset className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-1">
                        <legend>Subtract</legend>
                        <Number title="To Total" value={subttl} min={0} className="md:w-1/2" onChange={setSubttl} />
                        <Number title="To Each" value={subeach} min={0} className="md:w-1/2" onChange={setSubeach} />
                    </fieldset>
                    <fieldset className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-1">
                        <legend>Multiply</legend>
                        <Number title="To Total" value={multtl} min={0} className="md:w-1/2" onChange={setMulttl} />
                        <Number title="To Each" value={muleach} min={0} className="md:w-1/2" onChange={setMuleach} />
                    </fieldset>
                </Accordian>
                <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-1">
                    <Button color="success" className="md:w-1/2" onClick={Roll}>Roll</Button>
                    <Button color="error" className="md:w-1/2" onClick={Reset}>Reset</Button>
                </div>
                <Label title="Result" value={result} />
                <fieldset>
                    <legend>Roll Watcher</legend>
                    <pre>{watcher}</pre>
                </fieldset>
            </div>
        </>
    );
}

function StatsRoller() {
    let [ gen, setGen ] = useState(-1);
    let [ stats, setStats ] = useState([0,0,0,0,0,0]);
    let [ points, setPoints ] = useState(-1);

    let [ poolpoints, setPoolpoints ] = useState(6);
    let [ poolttls, setPoolttls ] = useState([3,3,3,3,3,3]);

    let [ pointtype, setPointtype ] = useState(1);

    function ResetGen(val) {
        setGen(val);
        setStats([0,0,0,0,0,0]);
        setPoints(-1);
        setPoolpoints(6);
        setPoolttls([3,3,3,3,3,3]);
        setPointtype(1);
    }

    function PoolChange(direction, index) {
        let newpool = [...poolttls];
        let newpoints = poolpoints;
        
        if (direction) {
            if (poolpoints != 0) {
                newpool[index] += 1;
                newpoints -= 1;
            }
        }
        else {
            if (newpool[index] > 3) {
                newpool[index] -= 1;
                newpoints += 1;
            }
        }
        
        if (newpoints != poolpoints) {
            setPoolpoints(newpoints);
            setPoolttls(newpool);
        }
    }

    function PointChange(direction, index) {
        let newstats = [...stats];
        let newpoints = points;
        
        if (direction) {
            if (points != 0) {
                newstats[index] += 1;
                newpoints -= 1;
            }
        }
        else {
            if (newstats[index] > 7) {
                newstats[index] -= 1;
                newpoints += 1;
            }
        }
        
        if (newpoints != points) {
            setPoints(newpoints);
            setStats(newstats);
        }
    }

    function Roll() {
        let newstats = [0,0,0,0,0,0];
        let typevals = [10,15,20,25];

        if (gen==0) newstats = newstats.map((v,i)=>{
            let newDice = [RandomNum(1,6),RandomNum(1,6),RandomNum(1,6),RandomNum(1,6)];
            newDice.sort().reverse().pop();
            return _.sum(newDice);
        });
        if (gen==1) newstats = newstats.map((v,i)=>{
            let newDice = [RandomNum(1,6),RandomNum(1,6),RandomNum(1,6)];
            return _.sum(newDice);
        });
        if (gen==2) newstats = newstats.map((v,i)=>{
            let newDice = [RandomNum(1,6),RandomNum(1,6)];
            return _.sum(newDice) + 6;
        });
        if (gen==3) newstats = newstats.map((v,i)=>{
            let newDice = [];
            for (let j = 0; j < poolttls[i]; j++) {
                newDice.push(RandomNum(1,6));
            }
            return _.sum(newDice);
        });
        if (gen==4) newstats = [10,10,10,10,10,10];

        newstats.sort((a,b)=>(a<b));

        setStats(newstats);
        if (gen!=4) setPoints(0);
        else setPoints(typevals[pointtype]);
    }

    function RenderPools() {
        if (gen==3)
            return (
                <>
                    <Label title="Dice Pool" value={poolpoints} />
                    {poolttls.map((val,index)=>{
                        return (
                            <div key={`pools-${index}`} className="flex flex-row space-x-1">
                                <Label title={index+1} value={val} className="flex-grow" />
                                <Button color={(poolpoints==0)?"disabled":"success"} className="bi-caret-up-fill" onClick={()=>PoolChange(true,index)} />
                                <Button color={(val<=3)?"disabled":"error"} className="bi-caret-down-fill" onClick={()=>PoolChange(false,index)} />
                            </div>
                        );
                    })}
                    
                </>
            );
    }

    function RenderPurchase() {
        if (gen==4)
            return (<Select title="Type" value={pointtype} items={["Low - 10","Standard - 15","High - 20","Epic - 25"]} onChange={setPointtype} />);
    }

    function RenderGenerator() {
        if (gen == -1) return null;

        return (
            <fieldset className="flex flex-col space-y-1">
                <legend>Generator</legend>
                <div>
                    {(gen==0)?"The standard form of statistics generation. Roll 4d6, and drop the lowest dice 6 times.":""}
                    {(gen==1)?"The classic form of statistics generation. Roll 3d6 6 times. Good luck!":""}
                    {(gen==2)?"The heroic form of statistics generation. Roll 2d6 and add 6, 6 times.":""}
                    {(gen==3)?"The dice pool form of statistics generation. You get 24 d6's and assign them to 6 pools. The minimum amount in each stat must be 3.":""}
                    {(gen==4)?"The purchase form of statistics generation. Each stat starts at 10, and you get points to buy numbers. You can select what the pool amount begins with.":""}
                </div>
                {RenderPools()}
                {RenderPurchase()}
                <Button color="red" onClick={Roll}>Roll</Button>
            </fieldset>
        );
    }

    function RenderFinal() {
        if (points != -1)
            return (
                <fieldset className="space-y-1">
                    <legend>Final Points</legend>
                    <Label title="Points" value={points} />
                    {(stats.map((val,index)=>{
                        return (
                            <div key={`final-${index}`} className="flex flex-row space-x-1">
                                <Label title={index+1} value={val} className="flex-grow" />
                                <Button color={(points==0)?"disabled":"success"} className="bi-caret-up-fill" onClick={()=>PointChange(true,index)} />
                                <Button color={(val<=7)?"disabled":"error"} className="bi-caret-down-fill" onClick={()=>PointChange(false,index)} />
                            </div>
                        );
                    }))}
                </fieldset>
            );
    }

    return (
        <>
            <h2>Stats Roller</h2>
            <div className="main-container">
                <Accordian title="Generation Presets">
                    <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-1">
                        <Button color="secondary" className="md:w-1/2" onClick={()=>ResetGen(0)}>Standard (4d6)</Button>
                        <Button color="secondary" className="md:w-1/2" onClick={()=>ResetGen(1)}>Classic (3d6)</Button>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-1">
                        <Button color="secondary" className="md:w-1/2" onClick={()=>ResetGen(2)}>Heroic (2d6+6)</Button>
                        <Button color="secondary" className="md:w-1/2" onClick={()=>ResetGen(3)}>Dice Pool (24d6 split)</Button>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-1">
                        <Button color="secondary" className="md:w-1/2" onClick={()=>ResetGen(4)}>Purchase</Button>
                    </div>
                </Accordian>
                {RenderGenerator()}
                {RenderFinal()}
            </div>
        </>
    );
}