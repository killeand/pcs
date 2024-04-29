import React, { useEffect, useState, useContext } from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import _ from "lodash";
import PCSContext from "./PCSContext";
import IconicIcon from "../../images/iconic";
import { MAIN_MENU } from "@/scripts/Menu";

export default function Application() {
    let PCSD = useContext(PCSContext);
    const [theme, setTheme] = useState("fantasy");

    useEffect(() => {
        if (localStorage.getItem("PCS-THEME")) setTheme(localStorage.getItem("PCS-THEME"));
    }, []);

    function ToggleNav() {
        let navbar = document.getElementsByTagName("nav")[0];

        if (navbar.classList.contains("hidden")) {
            navbar.classList.remove("hidden");
            navbar.classList.add("flex");
        } else {
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

    function SelectTheme(e) {
        const val = e.target.value;
        localStorage.setItem("PCS-THEME", val);
        setTheme(val);
    }

    function RenderMenu() {
        let isActive = PCSD.getLoadedIndex() != -1;

        return MAIN_MENU.map((menuItem) =>
            (!menuItem.onactive || (menuItem.onactive && isActive)) && !menuItem.hidden ? (
                <Link key={`menu-${menuItem.url}`} className={menuItem.icon} to={menuItem.url} onClick={HideMobileNav}>
                    {" "}
                    {menuItem.name}
                </Link>
            ) : null
        );
    }

    return (
        <HashRouter>
            <div className="flex flex-grow flex-col md:flex-row">
                <header className="min-w-fit p-0">
                    <div className="flex flex-row items-center justify-between rounded-xl bg-gradient-to-b from-primary to-base-100 p-2 md:rounded-b-none">
                        <img src={IconicIcon} className="max-h-10 rounded-full border border-primary md:mx-auto" />
                        <div className="bi-list inline text-3xl md:hidden" onClick={ToggleNav} />
                    </div>
                    <nav className="hidden flex-col md:flex">{RenderMenu()}</nav>
                </header>
                <main className="flex flex-grow flex-col">
                    <Routes>
                        {MAIN_MENU.map((menuItem) => {
                            let addIndex = menuItem.index ? { index: true } : {};

                            return <Route key={`route-${menuItem.url}`} {...addIndex} path={menuItem.url} element={menuItem.component} />;
                        })}
                    </Routes>
                </main>
            </div>
            <footer className="flex flex-col">
                <div className="text-center font-bold">Theme Changer</div>
                <div className="join join-vertical justify-center md:join-horizontal">
                    <input type="radio" name="theme-buttons" className="theme-controller btn join-item" value="light" checked={theme == "light"} aria-label="Light" onChange={SelectTheme} />
                    <input type="radio" name="theme-buttons" className="theme-controller btn join-item" value="dark" checked={theme == "dark"} aria-label="Dark" onChange={SelectTheme} />
                    <input type="radio" name="theme-buttons" className="theme-controller btn join-item" value="synthwave" checked={theme == "synthwave"} aria-label="Synthwave" onChange={SelectTheme} />
                    <input type="radio" name="theme-buttons" className="theme-controller btn join-item" value="forest" checked={theme == "forest"} aria-label="Forest" onChange={SelectTheme} />
                    <input type="radio" name="theme-buttons" className="theme-controller btn join-item" value="fantasy" checked={theme == "fantasy"} aria-label="Fantasy" onChange={SelectTheme} />
                    <input type="radio" name="theme-buttons" className="theme-controller btn join-item" value="winter" checked={theme == "winter"} aria-label="Winter" onChange={SelectTheme} />
                </div>
            </footer>
        </HashRouter>
    );
}
