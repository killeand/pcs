import React, { useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import _ from 'lodash';
import { themeChange } from 'theme-change';
import Button from '../Button';
import PCSContext from './PCSContext';
import IconicIcon from '../../images/iconic';
import FileManager from '../../pages/FileManager';
import Details from '../../pages/Details';
import Stats from '../../pages/Stats';
import Classes from '../../pages/Classes';
import Health from '../../pages/Health';
import Saves from '../../pages/Saves';
import Offensive from '../../pages/Offensive';
import Defensive from '../../pages/Defensive';
import Miscellaneous from '../../pages/Miscellaneous';
import Weapons from '../../pages/Weapons';
import Armors from '../../pages/Armors';
import Skills from '../../pages/Skills';
import ExpWealth from '../../pages/ExpWealth';
import Abilities from '../../pages/Abilities';
import Equipment from '../../pages/Equipment';
import Spellbook from '../../pages/Spellbook';
import Notes from '../../pages/Notes';
import Tools from '../../pages/Tools';
import Components from '@/pages/tests/Components';
import Typography from '@/pages/tests/Typography';

const CHAR_PAGES = [
    {url:"details",icon:"bi-journal-text",name:"Character Details",component:(<Details />)},
    {url:"ability-scores",icon:"bi-person-lines-fill",name:"Ability Scores",component:(<Stats />)},
    {url:"classes",icon:"bi-briefcase",name:"Classes",component:(<Classes />)},
    {url:"health",icon:"bi-plus-circle",name:"Health",component:(<Health />)},
    {url:"saving-throws",icon:"bi-hospital",name:"Saving Throws",component:(<Saves />)},
    {url:"offense",icon:"bi-lightning",name:"Offensive Stats",component:(<Offensive />)},
    {url:"defense",icon:"bi-shield",name:"Defensive Stats",component:(<Defensive />)},
    {url:"misc-stats",icon:"bi-sliders",name:"Miscellaneous Stats",component:(<Miscellaneous />)},
    {url:"weapons",icon:"bi-tornado",name:"Weapons",component:(<Weapons />)},
    {url:"armor",icon:"bi-robot",name:"Armors",component:(<Armors />)},
    {url:"skills",icon:"bi-plus-slash-minus",name:"Skills",component:(<Skills />)},
    {url:"exp-wealth",icon:"bi-coin",name:"EXP and Wealth",component:(<ExpWealth />)},
    {url:"feats-abilities",icon:"bi-cloud-haze2",name:"Feats and Abilities",component:(<Abilities />)},
    {url:"equipment",icon:"bi-check2-square",name:"Equipment",component:(<Equipment />)},
    {url:"spellbook",icon:"bi-book",name:"Spellbook",component:(<Spellbook />)},
    {url:"notes",icon:"bi-body-text",name:"Notes",component:(<Notes />)},
];

export default function Application() {
    let PCSD = useContext(PCSContext);
    let GoogleScopes = [
        encodeURIComponent("https://www.googleapis.com/auth/userinfo.email"),
        encodeURIComponent("https://www.googleapis.com/auth/userinfo.profile"),
        "openid",
        encodeURIComponent("https://www.googleapis.com/auth/drive.file")
    ];
    let GoogleLink = "https://accounts.google.com/o/oauth2/v2/auth?"
        + "client_id=850992449367-pmpcqbqueupfpvi34vt6se4mtmoo6ooq.apps.googleusercontent.com&"
        + "redirect_uri=" + encodeURIComponent("http://localhost:5173/") + "&"
        + "response_type=token&"
        + "scope=" + GoogleScopes.join(" ");
    
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("code") || urlParams.has("access_token")) {
        console.log("DATA", urlParams);
    }

    useEffect(() => themeChange(false), []);

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

        menu.push(<Link key={`menu${menu.length + 1}`} className="bi-tools" to="/tools" onClick={HideMobileNav}> Tools</Link>);
        menu.push(<Link key={`menu${menu.length + 2}`} className="bi-code" to="/components" onClick={HideMobileNav}> Components</Link>);
        menu.push(<Link key={`menu${menu.length + 3}`} className="bi-fonts" to="/typography" onClick={HideMobileNav}> Typography</Link>);
        menu.push(<a key={`menu${menu.length + 4}`} className="bi-google" href={GoogleLink} onClick={HideMobileNav}> Google Login</a>);

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
                    <div className="p-2 flex flex-row justify-between items-center bg-gradient-to-b from-primary to-base-100 rounded-xl md:rounded-b-none">
                        <img src={IconicIcon} className="rounded-full border border-primary max-h-10 md:mx-auto" />
                        <div className="bi-list text-3xl inline md:hidden" onClick={ToggleNav} />
                    </div>
                    <nav className="md:flex flex-col hidden">
                        {RenderMenu()}
                    </nav>
                </header>
                <main className="flex flex-col flex-grow">
                    <Routes>
                        <Route index element={<FileManager />} />
                        <Route path="tools/*" element={<Tools />} />
                        <Route path="components" element={<Components />} />
                        <Route path="typography" element={<Typography />} />
                        {RenderRoutes()}
                        <Route path="404" element={<p>Page not found</p>} />
                        <Route path="*" element={<Navigate to="/404" />} />
                    </Routes>
                </main>
            </div>
            <footer className="flex flex-col">
                <div className="font-bold text-center">Theme Changer</div>
                <div className="join join-vertical md:join-horizontal justify-center">
                    <Button data-set-theme="light" data-act-class="ACTIVECLASS" className="join-item">Light</Button>
                    <Button data-set-theme="dark" data-act-class="ACTIVECLASS" className="join-item">Dark</Button>
                    <Button data-set-theme="synthwave" data-act-class="ACTIVECLASS" className="join-item">Synthwave</Button>
                    <Button data-set-theme="forest" data-act-class="ACTIVECLASS" className="join-item">Forest</Button>
                    <Button data-set-theme="fantasy" data-act-class="ACTIVECLASS" className="join-item">Fantasy</Button>
                    <Button data-set-theme="winter" data-act-class="ACTIVECLASS" className="join-item">Winter</Button>
                </div>
            </footer>
        </HashRouter>
    );
}