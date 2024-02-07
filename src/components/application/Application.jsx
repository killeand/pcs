import React, { useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import _ from 'lodash';
import { themeChange } from 'theme-change';
import Button from '../Button';
import PCSContext from './PCSContext';
import IconicIcon from '../../images/iconic';
import { MAIN_MENU } from '@/scripts/Menu';

export default function Application() {
    let PCSD = useContext(PCSContext);

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
        let isActive = (PCSD.getLoadedIndex() != -1);

        return MAIN_MENU.map(menuItem => ((!menuItem.onactive || (menuItem.onactive && isActive)) && !menuItem.hidden) ? (
                <Link key={`menu-${menuItem.url}`} className={menuItem.icon} to={menuItem.url} onClick={HideMobileNav}> {menuItem.name}</Link>
            ):null
        );
        // menu.push(<Link key="menu0" className="bi-hdd" to="/" onClick={HideMobileNav}> File Manager</Link>);

        // if (PCSD.getLoadedIndex() != -1) {
        //     CHAR_PAGES.forEach((item, i) => {
        //         menu.push(<Link key={`menu${i+1}`} className={item.icon} to={item.url} onClick={HideMobileNav}> {item.name}</Link>);
        //     });
        // }

        // menu.push(<Link key={`menu${menu.length + 1}`} className="bi-tools" to="/tools" onClick={HideMobileNav}> Tools</Link>);
        // menu.push(<Link key={`menu${menu.length + 2}`} className="bi-code" to="/components" onClick={HideMobileNav}> Components</Link>);
        // menu.push(<Link key={`menu${menu.length + 3}`} className="bi-fonts" to="/typography" onClick={HideMobileNav}> Typography</Link>);
        // menu.push(<a key={`menu${menu.length + 4}`} className="bi-google" href={GoogleLink} onClick={HideMobileNav}> Google Login</a>);

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
                        {MAIN_MENU.map(menuItem => {
                            let addIndex = (menuItem.index) ? { index: true } : {};

                            return (
                                <Route key={`route-${menuItem.url}`} {...addIndex} path={menuItem.url} element={menuItem.component} />
                            );
                        })}
                        {/* <Route index element={<FileManager />} />
                        <Route path="tools/*" element={<Tools />} />
                        <Route path="components" element={<Components />} />
                        <Route path="typography" element={<Typography />} />
                        {RenderRoutes()}
                        <Route path="404" element={<p>Page not found</p>} />
                        <Route path="*" element={<Navigate to="/404" />} /> */}
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