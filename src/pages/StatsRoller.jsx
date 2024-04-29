import { useState } from "react";
import Button from "../components/Button";
import Accordian from "../components/Accordian";
import Select from "../components/Select";
import Label from "../components/Label";
import { RandomNum } from "../scripts/Utilities";
import _ from "lodash";

export default function StatsRoller() {
    let [gen, setGen] = useState(-1);
    let [stats, setStats] = useState([0, 0, 0, 0, 0, 0]);
    let [points, setPoints] = useState(-1);

    let [poolpoints, setPoolpoints] = useState(6);
    let [poolttls, setPoolttls] = useState([3, 3, 3, 3, 3, 3]);

    let [pointtype, setPointtype] = useState(1);

    function ResetGen(val) {
        setGen(val);
        setStats([0, 0, 0, 0, 0, 0]);
        setPoints(-1);
        setPoolpoints(6);
        setPoolttls([3, 3, 3, 3, 3, 3]);
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
        } else {
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
        } else {
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
        let newstats = [0, 0, 0, 0, 0, 0];
        let typevals = [10, 15, 20, 25];

        if (gen == 0)
            newstats = newstats.map((v, i) => {
                let newDice = [RandomNum(1, 6), RandomNum(1, 6), RandomNum(1, 6), RandomNum(1, 6)];
                newDice.sort().reverse().pop();
                return _.sum(newDice);
            });
        if (gen == 1)
            newstats = newstats.map((v, i) => {
                let newDice = [RandomNum(1, 6), RandomNum(1, 6), RandomNum(1, 6)];
                return _.sum(newDice);
            });
        if (gen == 2)
            newstats = newstats.map((v, i) => {
                let newDice = [RandomNum(1, 6), RandomNum(1, 6)];
                return _.sum(newDice) + 6;
            });
        if (gen == 3)
            newstats = newstats.map((v, i) => {
                let newDice = [];
                for (let j = 0; j < poolttls[i]; j++) {
                    newDice.push(RandomNum(1, 6));
                }
                return _.sum(newDice);
            });
        if (gen == 4) newstats = [10, 10, 10, 10, 10, 10];

        newstats.sort((a, b) => a < b);

        setStats(newstats);
        if (gen != 4) setPoints(0);
        else setPoints(typevals[pointtype]);
    }

    function RenderPools() {
        if (gen == 3)
            return (
                <>
                    <Label title="Dice Pool" value={poolpoints} />
                    {poolttls.map((val, index) => {
                        return (
                            <div key={`pools-${index}`} className="flex flex-row space-x-1">
                                <Label title={index + 1} value={val} className="flex-grow" />
                                <Button color={poolpoints == 0 ? "disabled" : "success"} className="bi-caret-up-fill" onClick={() => PoolChange(true, index)} />
                                <Button color={val <= 3 ? "disabled" : "error"} className="bi-caret-down-fill" onClick={() => PoolChange(false, index)} />
                            </div>
                        );
                    })}
                </>
            );
    }

    function RenderPurchase() {
        if (gen == 4) return <Select title="Type" value={pointtype} items={["Low - 10", "Standard - 15", "High - 20", "Epic - 25"]} onChange={setPointtype} />;
    }

    function RenderGenerator() {
        if (gen == -1) return null;

        return (
            <fieldset className="flex flex-col space-y-1">
                <legend>Generator</legend>
                <div>
                    {gen == 0 ? "The standard form of statistics generation. Roll 4d6, and drop the lowest dice 6 times." : ""}
                    {gen == 1 ? "The classic form of statistics generation. Roll 3d6 6 times. Good luck!" : ""}
                    {gen == 2 ? "The heroic form of statistics generation. Roll 2d6 and add 6, 6 times." : ""}
                    {gen == 3 ? "The dice pool form of statistics generation. You get 24 d6's and assign them to 6 pools. The minimum amount in each stat must be 3." : ""}
                    {gen == 4 ? "The purchase form of statistics generation. Each stat starts at 10, and you get points to buy numbers. You can select what the pool amount begins with." : ""}
                </div>
                {RenderPools()}
                {RenderPurchase()}
                <Button color="red" onClick={Roll}>
                    Roll
                </Button>
            </fieldset>
        );
    }

    function RenderFinal() {
        if (points != -1)
            return (
                <fieldset className="space-y-1">
                    <legend>Final Points</legend>
                    <Label title="Points" value={points} />
                    {stats.map((val, index) => {
                        return (
                            <div key={`final-${index}`} className="flex flex-row space-x-1">
                                <Label title={index + 1} value={val} className="flex-grow" />
                                <Button color={points == 0 ? "disabled" : "success"} className="bi-caret-up-fill" onClick={() => PointChange(true, index)} />
                                <Button color={val <= 7 ? "disabled" : "error"} className="bi-caret-down-fill" onClick={() => PointChange(false, index)} />
                            </div>
                        );
                    })}
                </fieldset>
            );
    }

    return (
        <>
            <h2>Stats Roller</h2>
            <div className="main-container">
                <Accordian title="Generation Presets">
                    <div className="flex flex-col space-y-1 md:flex-row md:space-x-1 md:space-y-0">
                        <Button color="secondary" className="md:w-1/2" onClick={() => ResetGen(0)}>
                            Standard (4d6)
                        </Button>
                        <Button color="secondary" className="md:w-1/2" onClick={() => ResetGen(1)}>
                            Classic (3d6)
                        </Button>
                    </div>
                    <div className="flex flex-col space-y-1 md:flex-row md:space-x-1 md:space-y-0">
                        <Button color="secondary" className="md:w-1/2" onClick={() => ResetGen(2)}>
                            Heroic (2d6+6)
                        </Button>
                        <Button color="secondary" className="md:w-1/2" onClick={() => ResetGen(3)}>
                            Dice Pool (24d6 split)
                        </Button>
                    </div>
                    <div className="flex flex-col space-y-1 md:flex-row md:space-x-1 md:space-y-0">
                        <Button color="secondary" className="md:w-1/2" onClick={() => ResetGen(4)}>
                            Purchase
                        </Button>
                    </div>
                </Accordian>
                {RenderGenerator()}
                {RenderFinal()}
            </div>
        </>
    );
}
