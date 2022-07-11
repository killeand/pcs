import React, { useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import _ from 'lodash';
import PCSContext from './PCSContext';
import IconicIcon from '../images/iconic';
import FileManager from '../pages/FileManager';
import Details from '../pages/Details';

const CHAR_PAGES = [
    {url:"/details",icon:"bi-journal-text",name:"Character Details",component:(<Details />)},
    {url:"/ability-scores",icon:"bi-person-lines-fill",name:"Ability Scores",component:(<p>blah</p>)},
    {url:"/class-health",icon:"bi-briefcase",name:"Class and Health",component:(<p>blah</p>)},
    {url:"/saving-throws",icon:"bi-hospital",name:"Saving Throws",component:(<p>blah</p>)},
    {url:"/offense",icon:"bi-lightning",name:"Offensive Stats",component:(<p>blah</p>)},
    {url:"/defense",icon:"bi-shield",name:"Defensive Stats",component:(<p>blah</p>)},
    {url:"/misc-stats",icon:"bi-sliders",name:"Miscellaneous Stats",component:(<p>blah</p>)},
    {url:"/weapons",icon:"bi-tornado",name:"Weapons",component:(<p>blah</p>)},
    {url:"/armor",icon:"bi-robot",name:"Armor",component:(<p>blah</p>)},
    {url:"/skills",icon:"bi-plus-slash-minus",name:"Skills",component:(<p>blah</p>)},
    {url:"/exp-wealth",icon:"bi-coin",name:"EXP and Wealth",component:(<p>blah</p>)},
    {url:"/feats-abilities",icon:"bi-cloud-haze2",name:"Feats and Abilities",component:(<p>blah</p>)},
    {url:"/equipment",icon:"bi-check2-square",name:"Equipment",component:(<p>blah</p>)},
    {url:"/spellbook",icon:"bi-book",name:"Spellbook",component:(<p>blah</p>)},
    {url:"/notes",icon:"bi-body-text",name:"Notes",component:(<p>blah</p>)},
];

export default function Application() {
    let PCSD = useContext(PCSContext);

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

    function HideMobileNav() {
        let navbar = document.getElementsByTagName("nav")[0];

        if (navbar.classList.contains("flex")) {
            navbar.classList.remove("flex");
            navbar.classList.add("hidden");
        }
    }

    function RenderMenu() {
        let menu = [];
        menu.push(<Link key="menu0" className="bi-hdd" to="/" onClick={HideMobileNav}> File Manager</Link>);

        if (PCSD.getLoadedIndex() != -1) {
            CHAR_PAGES.forEach((item, i) => {
                menu.push(<Link key={`menu${i+1}`} className={item.icon} to={item.url} onClick={HideMobileNav}> {item.name}</Link>);
            });
        }

        return menu;
    }

    function RenderRoutes() {
        return CHAR_PAGES.map((item, i) => {
            return (<Route key={`CharRoute${i}`} path={item.url} element={item.component} />);
        });
    }

    return (
        <HashRouter>
            <div className="flex flex-col md:flex-row flex-grow">
                <header className="p-0 min-w-fit">
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
                        {RenderRoutes()}
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