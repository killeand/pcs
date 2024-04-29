import React from "react";
import { createRoot } from "react-dom/client";
import Application from "./components/application/Application";
import { PCSContextProvider } from "./components/application/PCSContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/styles/globals.css";
import "@/styles/typography.css";

let WebsiteRoot = createRoot(document.getElementById("root"));
WebsiteRoot.render(
    <PCSContextProvider>
        <Application />
    </PCSContextProvider>
);
