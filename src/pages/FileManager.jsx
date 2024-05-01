import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
import { ulid } from "ulidx";
import PCSContext from "@/components/application/PCSContext";
import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import Modal from "@/components/Modal";
import Accordian from "@/components/Accordian";
import { MODAL_TYPE } from "@/scripts/Utilities";
import UpgradeManager from "@/scripts/UpgradeManager";
import { toast } from "react-toastify";

const DataSystem = "65ef6852d749c5036a83f5cf";

export default function FileManager() {
    let PCSD = useContext(PCSContext);
    let [showClear, setShowClear] = useState([]);
    let [apikey, setApikey] = useState(localStorage.getItem("PCS-APIKEY"));
    let [apiblocker, setApiblocker] = useState(localStorage.getItem("PCS-APIKEY") == null);

    useEffect(() => {
        PCSD.setFiles([...PCSD.files]);
        setShowClear(new Array(PCSD.files.length).fill(false));
    }, []);

    function ToggleErase(index) {
        let newShow = [...showClear];
        newShow[index] = !newShow[index];

        setShowClear(newShow);
    }

    function SetAPIKey(newKey) {
        if (newKey === "") {
            localStorage.removeItem("PCS-APIKEY");
            setApikey(null);
            setApiblocker(true);
        } else if (newKey !== "close") {
            localStorage.setItem("PCS-APIKEY", newKey);
            setApikey(newKey);
            setApiblocker(false);
        }
    }

    function LoadAPI() {
        if (!apiblocker) {
            setApiblocker(true);

            fetch("https://cs-api-ten.vercel.app/api/data/" + DataSystem, {
                method: "get",
                headers: {
                    "X-API-Key": apikey,
                    "content-type": "application/json",
                },
            })
                .then((retval) => retval.json())
                .then((json) => {
                    let data = null;

                    try {
                        data = JSON.parse(json.data[0].csdata);
                    } catch (error) {
                        toast.error("Could not load the data as the response did not contain the required json");
                        setApiblocker(false);
                        return;
                    }

                    for (let i = 0; i < data.length; i++) {
                        if (!_.has(data[i], "title") || !_.has(data[i], "data")) {
                            toast.error("Could not load the data as the internal structure does not match the application");
                            return;
                        }

                        let upgraded = UpgradeManager.Upgrade(data[i]);
                        _.assign(data[i], { _id: ulid(), loaded: false, saved: !upgraded });

                        PCSD.setFiles([...PCSD.files, data[i]]);

                        let newShow = [...showClear];
                        newShow.push(false);
                        setShowClear(newShow);

                        toast.info(`${data[i].title} has been added!`);
                    }

                    setApiblocker(false);
                })
                .catch((error) => {
                    toast.error("Could not load from API " + error);
                    setApiblocker(false);
                });
        } else {
            toast.warning("Too many requests to the system will result in an error. Please wait for a notification that your character has been added.");
        }
    }

    function SaveAPI() {
        if (!apiblocker) {
            setApiblocker(true);

            fetch("https://cs-api-ten.vercel.app/api/data", {
                method: "post",
                headers: {
                    "X-API-Key": apikey,
                    "content-type": "text/plain",
                },
                body: {
                    system: DataSystem,
                    data: PCSD.files,
                },
            })
                .then((retval) => retval.json())
                .then((json) => {
                    console.log(json);

                    setApiblocker(false);
                })
                .catch((error) => {
                    toast.error("Could not save to API " + error);
                    setApiblocker(false);
                });
        } else {
            toast.warning("Too many requests to the system will result in an error. Please wait for a notification that your characters have been saved.");
        }
    }

    function NewCharacter(newCharName) {
        if (!_.isEmpty(newCharName) && newCharName !== "close") {
            let newFiles = [...PCSD.files];
            newFiles.push({
                _id: ulid(),
                title: newCharName,
                loaded: false,
                saved: false,
                data: {},
                version: UpgradeManager.CurrentVersion,
            });

            let newShow = [...showClear];
            newShow.push(false);

            PCSD.setFiles(newFiles);
            setShowClear(newShow);
        }
    }

    function LoadCharacter(e) {
        let files = e.target.files;

        for (let i = 0; i < files.length; i++) {
            if (files[i].type.match(/(json)+/gim)) {
                let FR = new FileReader();
                FR.addEventListener("loadend", (e) => {
                    let results = FR.result;
                    let data = null;

                    try {
                        data = JSON.parse(results);
                        if (!_.has(data, "title") || !_.has(data, "data")) throw "Invalid data format";

                        let upgraded = UpgradeManager.Upgrade(data);
                        _.assign(data, { _id: ulid(), loaded: false, saved: !upgraded });

                        PCSD.setFiles([...PCSD.files, data]);

                        let newShow = [...showClear];
                        newShow.push(false);
                        setShowClear(newShow);
                    } catch (error) {
                        toast.error("Could not load the file, it does not appear to be the JSON required.");
                    }
                });
                FR.readAsText(files[i]);
            }
        }
    }

    function ActivateCharacter(index) {
        if (!_.isNil(PCSD.files[index])) {
            let newFiles = PCSD.files.map((file, subindex) => {
                if (file.loaded) file.loaded = false;
                else file.loaded = index == subindex;
                return file;
            });

            PCSD.setFiles(newFiles);
        }
    }

    function SaveCharacter(index) {
        let SavedClass = { ...PCSD.files[index] };
        _.unset(SavedClass, "loaded");
        _.unset(SavedClass, "saved");
        _.unset(SavedClass, "_id");

        let db = document.createElement("a");
        db.href = `data:application/json;charset=utf8,${encodeURIComponent(JSON.stringify(SavedClass, null, "\t"))}`;
        db.download = `${SavedClass.title}.json`;
        db.style.display = "none";
        document.body.appendChild(db);
        db.click();
        document.body.removeChild(db);

        PCSD.files[index].saved = true;
        PCSD.setFiles([...PCSD.files]);
    }

    function RemoveCharacter(index) {
        let newFiles = [...PCSD.files];
        newFiles.splice(index, 1);
        PCSD.setFiles(newFiles);
    }

    function RenderDataItem(index, title, path) {
        if (_.has(PCSD.files[index].data, path))
            return (
                <div className="flex flex-row items-center space-x-3 p-1 last:rounded-b-md hover:bg-gradient-to-r hover:from-slate-300 hover:to-white">
                    <div className="flex-grow">{title}</div>
                    <Button color="error" className="bi-trash" onClick={() => ClearData(index, path)}>
                        {" "}
                        Clear
                    </Button>
                </div>
            );
    }

    function ClearData(index, path) {
        _.unset(PCSD.files[index].data, path);
    }

    function RenderCharacters() {
        if (PCSD.files.length == 0) {
            return <p>No characters have been loaded or created...</p>;
        }

        return PCSD.files.map((files, index) => {
            return (
                <div key={`character-${files._id}`} className="space-y-1 rounded-md border border-primary p-1">
                    <div className="flex flex-row items-center space-x-2">
                        <div className="flex-grow" onClick={() => console.info(PCSD.files[index])}>
                            {files.title}
                        </div>
                        <div className="flex flex-row space-x-1">
                            <Button color="primary" className="bi-eraser" onClick={() => ToggleErase(index)} />
                            <Button color={files.loaded ? "disabled" : "secondary"} className={`${files.loaded ? "bi-square-fill" : "bi-caret-right-fill"} pointer-events-auto`} onClick={() => ActivateCharacter(index)} />
                            <Button color={files.saved ? "disabled" : "success"} className="bi-save-fill pointer-events-auto" onClick={() => SaveCharacter(index)} />
                            <Button color="error" className="bi-trash" onClick={() => RemoveCharacter(index)} />
                        </div>
                    </div>
                    {showClear[index] && (
                        <Dialog title="Erase Data" color="error">
                            {RenderDataItem(index, "Character Details", "details")}
                            {RenderDataItem(index, "Ability Scores", "stats")}
                            {RenderDataItem(index, "Classes", "classes")}
                            {RenderDataItem(index, "Health", "health")}
                            {RenderDataItem(index, "Saving Throws", "saves")}
                            {RenderDataItem(index, "Offensive Stats", "offense")}
                            {RenderDataItem(index, "Defensive Stats", "defense")}
                            {RenderDataItem(index, "Miscellaneous Stats", "miscstats")}
                            {RenderDataItem(index, "Weapons", "weapons")}
                            {RenderDataItem(index, "Armor", "armors")}
                            {RenderDataItem(index, "Skills", "skills")}
                            {RenderDataItem(index, "Custom Skills", "custskills")}
                            {RenderDataItem(index, "Experience", "exp")}
                            {RenderDataItem(index, "Wealth", "wealth")}
                            {RenderDataItem(index, "Abilities", "abilities")}
                            {RenderDataItem(index, "Equipment", "equipment")}
                            {RenderDataItem(index, "Spellbook", "spellbook")}
                            {RenderDataItem(index, "Notes", "notes")}
                        </Dialog>
                    )}
                </div>
            );
        });
    }

    return (
        <>
            <h1>File Manager</h1>
            <div className="main-container">
                <div className="flex flex-col gap-1 md:flex-row">
                    <Button color="success" className="h-full" onClick={() => window.newchar.showModal()}>
                        New Character
                    </Button>
                    <div className="flex flex-grow flex-col gap-1">
                        <Button as="label" color="secondary" className="bi-floppy-fill">
                            <input type="file" className="hidden h-0" multiple accept=".json" onChange={LoadCharacter} />
                            Load from Disk
                        </Button>
                        <Button color="secondary" className="bi-globe" onClick={LoadAPI}>
                            Load from CS-API
                        </Button>
                        <Button color="secondary" className="bi-database-fill" onClick={SaveAPI}>
                            Save to CS-API
                        </Button>
                        <div className="flex flex-col justify-evenly gap-1 xl:flex-row">
                            <Button color="secondary" className="bi-question-lg flex-grow" onClick={() => window.csapi.showModal()}>
                                What is CS-API?
                            </Button>
                            <Button as="a" href="https://cs-api-ten.vercel.app/auth/register" target="_blank" color="secondary" className="bi-envelope-paper-heart-fill flex-grow">
                                Register
                            </Button>
                        </div>
                        <div className="flex flex-col justify-evenly gap-1 xl:flex-row">
                            <Button as="a" href="https://cs-api-ten.vercel.app/auth/signin" target="_blank" color="secondary" className="bi-shield-lock-fill flex-grow">
                                Sign In
                            </Button>
                            <Button color={apikey != null ? "info" : "secondary"} className="bi-key-fill flex-grow" onClick={() => window.apikey.showModal()}>
                                Enter API Key
                            </Button>
                        </div>
                    </div>
                </div>
                <Accordian title="Loaded Characters" titleElements={<div>{PCSD?.files?.length || 0}</div>} innerClass="flex flex-col p-1 gap-1">
                    {RenderCharacters()}
                </Accordian>
            </div>
            <div className="msg-container space-y-1">
                <div className="font-bold">
                    <Button color="primary" className="bi-eraser px-1 py-0.5 text-xs" /> - Clear Data
                </div>
                <div className="font-bold">
                    <Button color="disabled" className="bi-square-fill px-1 py-0.5 text-xs" /> - Disable Character &nbsp;
                    <Button color="secondary" className="bi-caret-right-fill px-1 py-0.5 text-xs" /> - Activate Character
                </div>
                <div className="font-bold">
                    <Button color="disabled" className="bi-save-fill px-1 py-0.5 text-xs" /> - Character Saved &nbsp;
                    <Button color="success" className="bi-save-fill px-1 py-0.5 text-xs" /> - Character NOT Saved
                </div>
                <div className="font-bold">
                    <Button color="error" className="bi-trash px-1 py-0.5 text-xs" /> - Remove Character
                </div>
                <div>
                    Characters will be stored upon any changes to the list from this page, or periodically every 10 seconds. Upon loading the page again, they should be reloaded. Please note that this store uses localstorage for the characters, so if you move this web application the localstorage will be reset. It is a known flaw with non-server based web applications. To prevent any major losses, make sure you <Button color="green" className="bi-save-fill px-1 py-0.5 text-xs text-white" /> save the characters listed.
                </div>
            </div>
            <Modal id="csapi" title="What is CS-API" type={MODAL_TYPE.ok}>
                <p>CS-API, or Character Sheet - Application Programming Interface, is a website designed for the offline series of character sheets (such as this).</p>
                <p>It allows you to sign up, generate an API Key, and use that key as a unique identifier for you. After that, the feature allows you to save and load characters between every device, or even &quot;offline&quot; and online.</p>
            </Modal>
            <Modal id="newchar" title="Create New Character" type={MODAL_TYPE.prompt} valueReset onClose={(RetVal) => NewCharacter(RetVal)}>
                <p>Please enter the name of your new Character:</p>
            </Modal>
            <Modal id="apikey" title="Enter API Key" type={MODAL_TYPE.prompt} value={apikey} onClose={(RetVal) => SetAPIKey(RetVal)}>
                <p>Please enter your API key generated on the CS-API website, leave blank to erase:</p>
            </Modal>
        </>
    );
}
