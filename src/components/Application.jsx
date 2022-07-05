import React, { useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import PCSContext from './PCSContext';
import IconicIcon from '../images/iconic';

export default function Application() {
    let Test = useContext(PCSContext);

    useEffect(() => {
        Test.setTest(`Test v${Math.random()}`);
    }, []);

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

    return (
        <HashRouter>
            <div className="flex flex-col md:flex-row flex-grow">
                <header className="p-0">
                    <div className="p-2 flex flex-row justify-between items-center">
                        <img src={IconicIcon} className="rounded-full border border-black max-h-10 md:mx-auto" />
                        <div className="bi-list text-3xl inline md:hidden" onClick={ToggleNav} />
                    </div>
                    <nav className="md:flex flex-col hidden">
                        <Link to="/">Home Page</Link>
                        <Link to="/">Home Page</Link>
                        <Link to="/">Home Page</Link>
                        <Link to="/">Home Page</Link>
                        <Link to="/">Home Page</Link>
                        <Link to="/">Home Page</Link>
                        <Link to="/blah">Home Page</Link>
                    </nav>
                </header>
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<p>Home Page</p>} />
                        <Route path="/404" element={<p>Page not found</p>} />
                        <Route path="*" element={<Navigate to="/404" />} />
                    </Routes>
                </main>
            </div>
            <footer>

            </footer>
        </HashRouter>
    );
}