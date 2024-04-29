import { BGCOLORS, BORDERCOLORS, ZeroValue } from "../scripts/Utilities";

export default function Label({ title, value, color, innerClass, outerClass }) {
    return (
        <label className={`input input-sm input-bordered flex items-stretch px-0 ${BORDERCOLORS[color] || BORDERCOLORS.default} ${outerClass || ""}`}>
            <div className={`title_3 flex min-w-[20%] items-center justify-center rounded-l-md px-2 ${BGCOLORS[color] || BGCOLORS.default}`}>{ZeroValue(title, "Label")}</div>
            <div className={`flex grow items-center px-2 ${innerClass || ""}`}>{ZeroValue(value, "")}</div>
        </label>
    );
}
