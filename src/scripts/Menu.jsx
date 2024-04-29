import { Navigate } from "react-router-dom";
import FileManager from "@/pages/FileManager";
import Details from "@/pages/Details";
import Stats from "@/pages/Stats";
import Classes from "@/pages/Classes";
import Health from "@/pages/Health";
import Saves from "@/pages/Saves";
import Offensive from "@/pages/Offensive";
import Defensive from "@/pages/Defensive";
import Miscellaneous from "@/pages/Miscellaneous";
import Weapons from "@/pages/Weapons";
import Armors from "@/pages/Armors";
import Skills from "@/pages/Skills";
import ExpWealth from "@/pages/ExpWealth";
import Abilities from "@/pages/Abilities";
import Equipment from "@/pages/Equipment";
import Spellbook from "@/pages/Spellbook";
import Notes from "@/pages/Notes";
import Tools from "@/pages/Tools";
import DiceRoller from "@/pages/DiceRoller";
import StatsRoller from "@/pages/StatsRoller";
// import Components from "@/pages/tests/Components";
// import Typography from "@/pages/tests/Typography";

export const MAIN_MENU = [
    { route: "/", url: "/", icon: "bi-hdd", name: "File Manager", hidden: false, index: true, onactive: false, component: <FileManager /> },
    { route: "details", url: "/details", icon: "bi-journal-text", name: "Character Details", hidden: false, index: false, onactive: true, component: <Details /> },
    { route: "ability-scores", url: "/ability-scores", icon: "bi-person-lines-fill", name: "Ability Scores", hidden: false, index: false, onactive: true, component: <Stats /> },
    { route: "classes", url: "/classes", icon: "bi-briefcase", name: "Classes", hidden: false, index: false, onactive: true, component: <Classes /> },
    { route: "health", url: "/health", icon: "bi-plus-circle", name: "Health", hidden: false, index: false, onactive: true, component: <Health /> },
    { route: "saving-throws", url: "/saving-throws", icon: "bi-hospital", name: "Saving Throws", hidden: false, index: false, onactive: true, component: <Saves /> },
    { route: "offense", url: "/offense", icon: "bi-lightning", name: "Offensive Stats", hidden: false, index: false, onactive: true, component: <Offensive /> },
    { route: "defense", url: "/defense", icon: "bi-shield", name: "Defensive Stats", hidden: false, index: false, onactive: true, component: <Defensive /> },
    { route: "misc-stats", url: "/misc-stats", icon: "bi-sliders", name: "Miscellaneous Stats", hidden: false, index: false, onactive: true, component: <Miscellaneous /> },
    { route: "weapons", url: "/weapons", icon: "bi-tornado", name: "Weapons", hidden: false, index: false, onactive: true, component: <Weapons /> },
    { route: "armor", url: "/armor", icon: "bi-robot", name: "Armors", hidden: false, index: false, onactive: true, component: <Armors /> },
    { route: "skills", url: "/skills", icon: "bi-plus-slash-minus", name: "Skills", hidden: false, index: false, onactive: true, component: <Skills /> },
    { route: "exp-wealth", url: "/exp-wealth", icon: "bi-coin", name: "EXP and Wealth", hidden: false, index: false, onactive: true, component: <ExpWealth /> },
    { route: "feats-abilities", url: "/feats-abilities", icon: "bi-cloud-haze2", name: "Feats and Abilities", hidden: false, index: false, onactive: true, component: <Abilities /> },
    { route: "equipment", url: "/equipment", icon: "bi-check2-square", name: "Equipment", hidden: false, index: false, onactive: true, component: <Equipment /> },
    { route: "spellbook", url: "/spellbook", icon: "bi-book", name: "Spellbook", hidden: false, index: false, onactive: true, component: <Spellbook /> },
    { route: "notes", url: "/notes", icon: "bi-body-text", name: "Notes", hidden: false, index: false, onactive: true, component: <Notes /> },
    { route: "tools", url: "/tools", icon: "bi-tools", name: "Tools", hidden: false, index: false, onactive: false, component: <Tools /> },
    { route: "tools/dice", url: "/tools/dice", icon: null, name: null, hidden: true, index: false, onactive: false, component: <DiceRoller /> },
    { route: "tools/stats", url: "/tools/stats", icon: null, name: null, hidden: true, index: false, onactive: false, component: <StatsRoller /> },
    // { route: "components", url: "/components", icon: "bi-code", name: "Components", hidden: false, index: false, onactive: false, component: (<Components />) },
    // { route: "typography", url: "/typography", icon: "bi-fonts", name: "Typography", hidden: false, index: false, onactive: false, component: (<Typography />) },
    { route: "404", url: "/404", icon: null, name: null, hidden: true, index: false, onactive: false, component: <p>Page Not Found...</p> },
    { route: "*", url: null, icon: null, name: null, hidden: true, index: false, onactive: false, component: <Navigate to="/404" /> },
];
