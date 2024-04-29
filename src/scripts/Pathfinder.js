export const PF_STATS = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
export const PF_STATS_SHORT = ["str", "dex", "con", "int", "wis", "chr"];
export const PF_GETMOD = (val) => Math.floor((val - 10) / 2);
export const PF_SIZES = ["Fine", "Diminutive", "Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan", "Colossal"];
export const PF_ALIGNMENTS = ["Unaligned", "Lawful Good", "Neutral Good", "Chaotic Good", "Lawful Neutral", "True Neutral", "Chaotic Neutral", "Lawful Evil", "Neutral Evil", "Chaotic Evil", "Its Complicated"];
export const PF_LANGUAGES = ["Abyssal", "Aklo", "Aquan", "Auran", "Celestal", "Common", "Draconic", "Druidic", "Dwarf", "Elf", "Giant", "Gnoll", "Gnome", "Goblin", "Halfling", "Ignan", "Infernal", "Orc", "Sign", "Sylvan", "Terran", "Undercommon"];
export const PF_SKILLS = [
    { k: "acro", v: "Acrobatics", s: 1, f: 1 },
    { k: "appr", v: "Appraise", s: 3, f: 0 },
    { k: "bluf", v: "Bluff", s: 5, f: 0 },
    { k: "clim", v: "Climb", s: 0, f: 1 },
    { k: "dipl", v: "Diplomacy", s: 5, f: 0 },
    { k: "disd", v: "Disable Device", s: 1, f: 3 },
    { k: "disg", v: "Disguise", s: 5, f: 0 },
    { k: "esca", v: "Escape Artist", s: 1, f: 1 },
    { k: "fly", v: "Fly", s: 1, f: 1 },
    { k: "hana", v: "Handle Animal", s: 5, f: 2 },
    { k: "heal", v: "Heal", s: 4, f: 0 },
    { k: "inti", v: "Intimidation", s: 5, f: 0 },
    { k: "ling", v: "Linguistics", s: 3, f: 0 },
    { k: "perc", v: "Perception", s: 4, f: 0 },
    { k: "ride", v: "Ride", s: 1, f: 1 },
    { k: "senm", v: "Sense Motive", s: 4, f: 0 },
    { k: "sleh", v: "Sleight of Hand", s: 1, f: 3 },
    { k: "spel", v: "Spellcraft", s: 3, f: 2 },
    { k: "stea", v: "Stealth", s: 1, f: 1 },
    { k: "surv", v: "Survival", s: 4, f: 0 },
    { k: "swim", v: "Swim", s: 0, f: 1 },
    { k: "usmd", v: "Use Magic Device", s: 5, f: 2 },
];
export const PF_CUST_SKILLS = [
    { k: "craf", v: "Craft", s: 3, f: 0 },
    { k: "know", v: "Knowledge", s: 3, f: 2 },
    { k: "perf", v: "Perform", s: 5, f: 0 },
    { k: "prof", v: "Profession", s: 4, f: 2 },
];
export const PF_EXP = [
    [0, 3000, 7500, 14000, 23000, 35000, 53000, 77000, 115000, 160000, 235000, 330000, 475000, 665000, 955000, 1350000, 1900000, 2700000, 3850000, 5350000],
    [0, 2000, 5000, 9000, 15000, 23000, 35000, 51000, 75000, 105000, 155000, 220000, 315000, 445000, 635000, 890000, 1300000, 1800000, 2550000, 3600000],
    [0, 1300, 3300, 6000, 10000, 15000, 23000, 34000, 50000, 71000, 105000, 145000, 210000, 295000, 425000, 600000, 850000, 1200000, 1700000, 2400000],
];
