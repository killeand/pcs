import { useState } from "react";
import Accordian from "@/components/Accordian";
import Button from "@/components/Button";
import InputNumber from "@/components/InputNumber";
import Select from "@/components/Select";
import Label from "@/components/Label";
import { RandomNum } from "../scripts/Utilities";

export default function DiceRoller() {
    let [numdice, setNumdice] = useState(1);
    let [dicenum, setDicenum] = useState(5);
    let [customdie, setCustomdie] = useState(0);
    let [addttl, setAddttl] = useState(0);
    let [addeach, setAddeach] = useState(0);
    let [subttl, setSubttl] = useState(0);
    let [subeach, setSubeach] = useState(0);
    let [multtl, setMulttl] = useState(0);
    let [muleach, setMuleach] = useState(0);
    let [result, setResult] = useState(0);
    let [watcher, setWatcher] = useState("");
    let diceconv = [4, 6, 8, 10, 12, 20, 100, 0];

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

            if (dicenum != 7) out = RandomNum(1, diceconv[dicenum]);
            else out = RandomNum(1, customdie);

            final += out;

            if (muleach > 0) final *= muleach;
            if (addeach > 0) final += addeach;
            if (subeach > 0) final -= subeach;

            watch += `Roll (${i + 1}): ${out}${muleach > 0 ? ` x ${muleach}` : ""}${addeach > 0 ? ` + ${addeach}` : ""}${subeach > 0 ? ` - ${subeach}` : ""} (${final})\n`;
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
                        <Button color="secondary" onClick={() => SetPreset(1, 5)}>
                            1d20
                        </Button>
                        <Button color="secondary" onClick={() => SetPreset(3, 1)}>
                            3d6
                        </Button>
                        <Button color="secondary" onClick={() => SetPreset(4, 1)}>
                            4d6
                        </Button>
                        <Button color="secondary" onClick={() => SetPreset(5, 1)}>
                            5d6
                        </Button>
                        <Button color="secondary" onClick={() => SetPreset(1, 6)}>
                            1d100
                        </Button>
                    </div>
                </Accordian>
                <div className="flex flex-col space-y-1 md:flex-row md:space-x-1 md:space-y-0">
                    <InputNumber title="Num" value={numdice} min={1} outerClass="md:w-1/2" onChange={setNumdice} />
                    <Select title="Die" value={dicenum} items={[4, 6, 8, 10, 12, 20, 100, "Custom"]} outerClass="md:w-1/2" onChange={setDicenum} />
                </div>
                {dicenum == 7 ? (
                    <div className="flex flex-col space-y-1 md:flex-row md:space-x-1 md:space-y-0">
                        <InputNumber title="Custom" value={customdie} min={1} outerClass="md:w-1/2" onChange={setCustomdie} />
                    </div>
                ) : (
                    ""
                )}
                <Accordian title="Modifiers">
                    <fieldset className="flex flex-col space-y-1 md:flex-row md:space-x-1 md:space-y-0">
                        <legend>Addition</legend>
                        <InputNumber title="To Total" value={addttl} min={0} outerClass="md:w-1/2" onChange={setAddttl} />
                        <InputNumber title="To Each" value={addeach} min={0} outerClasse="md:w-1/2" onChange={setAddeach} />
                    </fieldset>
                    <fieldset className="flex flex-col space-y-1 md:flex-row md:space-x-1 md:space-y-0">
                        <legend>Subtract</legend>
                        <InputNumber title="To Total" value={subttl} min={0} outerClass="md:w-1/2" onChange={setSubttl} />
                        <InputNumber title="To Each" value={subeach} min={0} outerClass="md:w-1/2" onChange={setSubeach} />
                    </fieldset>
                    <fieldset className="flex flex-col space-y-1 md:flex-row md:space-x-1 md:space-y-0">
                        <legend>Multiply</legend>
                        <InputNumber title="To Total" value={multtl} min={0} outerClass="md:w-1/2" onChange={setMulttl} />
                        <InputNumber title="To Each" value={muleach} min={0} outerClass="md:w-1/2" onChange={setMuleach} />
                    </fieldset>
                </Accordian>
                <div className="flex flex-col space-y-1 md:flex-row md:space-x-1 md:space-y-0">
                    <Button color="success" className="md:w-1/2" onClick={Roll}>
                        Roll
                    </Button>
                    <Button color="error" className="md:w-1/2" onClick={Reset}>
                        Reset
                    </Button>
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
