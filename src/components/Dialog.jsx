import { BGCOLORS } from "../scripts/Utilities";

export default function Dialog({ className, innerClass, outerClass, color, title, children }) {
    return (
        <div className={`${className || ""} ${outerClass || ""} card card-compact border border-base-content shadow-md rounded-md`}>
            <div className={`card-title lg-title rounded-t-md ${BGCOLORS[color] || BGCOLORS.default}`}>{title || "Dialog"}</div>
            <div className={`${innerClass || ""} flex flex-col rounded-b-md -mt-1`}>
                {children}
            </div>
        </div>
    );
}