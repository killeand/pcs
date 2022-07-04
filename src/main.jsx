import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Application from './components/Application';
import { PCSContextProvider } from './components/PCSContext';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './main.css';

let WebsiteRoot = createRoot(document.getElementById('root'));
WebsiteRoot.render(
    <StrictMode>
        <PCSContextProvider>
            <Application />
        </PCSContextProvider>
    </StrictMode>
);