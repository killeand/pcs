import React, { useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import _ from 'lodash';
import PCSContext from './PCSContext';
import IconicIcon from '../images/iconic';
import FileManager from '../pages/FileManager';

export default function Application() {
    let PCSD = useContext(PCSContext);

    console.log(PCSD)

    function ToggleNav() {
        let navbar = document.getElementsByTagName("nav")[0];

        if (navbar.classList.contains("hidden")) {
            navbar.classList.remove("hidden");
            navbar.classList.add("flex");
        }
        else {
            navbar.classList.remove("flex");
            navbar.classList.add("hidden");
        }
    }

    function RenderMenu() {
        let menu = [];

        menu.push(<Link key="menu0" className="bi-hdd" to="/"> File Manager</Link>);

        if (!_.isNil(PCSD.character)) {
            menu.push(<Link key="menu1" className="bi-journal-text" to="/details"> Character Details</Link>);
            menu.push(<Link key="menu2" className="bi-person-lines-fill" to="/ability-scores"> Ability Scores</Link>);
            menu.push(<Link key="menu3" className="bi-briefcase" to="/class-health"> Class and Health</Link>);
            menu.push(<Link key="menu4" className="bi-hospital" to="/saving-throws"> Saving Throws</Link>);
            menu.push(<Link key="menu5" className="bi-lightning" to="/offense"> Offensive Stats</Link>);
            menu.push(<Link key="menu6" className="bi-shield" to="/defense"> Defensive States</Link>);
            menu.push(<Link key="menu7" className="bi-sliders" to="/misc-stats"> Miscellaneous Stats</Link>);
            menu.push(<Link key="menu8" className="bi-tornado" to="/weapons"> Weapons</Link>);
            menu.push(<Link key="menu9" className="bi-robot" to="/armor"> Armor</Link>);
            menu.push(<Link key="menu10" className="bi-plus-slash-minus" to="/skills"> Skills</Link>);
            menu.push(<Link key="menu11" className="bi-coin" to="/exp-wealth"> EXP and Wealth</Link>);
            menu.push(<Link key="menu12" className="bi-cloud-haze2" to="/feats-abilities"> Feats and Abilities</Link>);
            menu.push(<Link key="menu13" className="bi-check2-square" to="/equipment"> Equipment</Link>);
            menu.push(<Link key="menu14" className="bi-book" to="/spellbook"> Spellbook</Link>);
            menu.push(<Link key="menu15" className="bi-body-text" to="/notes"> Notes</Link>);
        }

        return menu;
    }

    return (
        <HashRouter>
            <div className="flex flex-col md:flex-row flex-grow">
                <header className="p-0">
                    <div className="p-2 flex flex-row justify-between items-center bg-gradient-to-b from-yellow-800 to-white rounded-xl">
                        <img src={IconicIcon} className="rounded-full border border-black max-h-10 md:mx-auto" />
                        <div className="bi-list text-3xl inline md:hidden" onClick={ToggleNav} />
                    </div>
                    <nav className="md:flex flex-col hidden">
                        {RenderMenu()}
                    </nav>
                </header>
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<FileManager />} />
                        <Route path="/404" element={<p>Page not found</p>} />
                        <Route path="*" element={<Navigate to="/404" />} />
                    </Routes>
                </main>
            </div>
            <footer className="text-center">
                Pathfinder Character Sheet
            </footer>
        </HashRouter>
    );
}