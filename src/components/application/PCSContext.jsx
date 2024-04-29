import React, { useState, useEffect, useRef } from "react";
import UpgradeManager from "../../scripts/UpgradeManager";
import _ from "lodash";

const PCSContext = React.createContext(null);

export function PCSContextProvider(props) {
    let saveRef = useRef([]);
    let [files, setFiles] = useState([]);
    let [saveTimer, setSaveTimer] = useState(null);

    useEffect(() => {
        if (!_.isNil(localStorage.getItem("PCSGlobalStore"))) {
            let loadedStore = JSON.parse(localStorage.getItem("PCSGlobalStore"));

            loadedStore.forEach((file) => {
                if (UpgradeManager.Upgrade(file)) {
                    file.saved = false;
                }
            });

            setFiles(loadedStore);
            saveRef.current = loadedStore;
        }

        if (_.isNil(saveTimer))
            setSaveTimer(
                setInterval(() => {
                    if (_.isEmpty(saveRef.current))
                        if (!_.isNil(localStorage.getItem("PCSGlobalStore"))) {
                            localStorage.removeItem("PCSGlobalStore");
                        } else localStorage.setItem("PCSGlobalStore", JSON.stringify(saveRef.current));
                }, 10 * 1000)
            );

        return () => clearInterval(saveTimer);
    }, []);

    useEffect(() => {
        if (!_.isEmpty(files)) {
            localStorage.setItem("PCSGlobalStore", JSON.stringify(files));
            saveRef.current = [...files];
        } else {
            localStorage.removeItem("PCSGlobalStore");
        }
    }, [files]);

    function getLoadedIndex() {
        for (let i = 0; i < files.length; i++) {
            if (files[i].loaded) return i;
        }

        return -1;
    }

    return <PCSContext.Provider value={{ files, setFiles, getLoadedIndex }}>{props.children}</PCSContext.Provider>;
}

export default PCSContext;
