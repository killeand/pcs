import { BGCOLORS, BORDERCOLORS, ZeroValue } from '../scripts/Utilities';

export default function Label({title, value, color, innerClass, outerClass}) {
    return (
        <label className={`input input-sm input-bordered flex items-stretch px-0 ${BORDERCOLORS[color] || BORDERCOLORS.default} ${outerClass || ""}`}>
            <div className={`title_3 min-w-[20%] rounded-l-md flex items-center justify-center pl-2 ${BGCOLORS[color] || BGCOLORS.default}`}>{ZeroValue(title, "Label")}</div>
            <div className={`grow flex items-center px-2 ${innerClass || ""}`}>{ZeroValue(value, "")}</div>
        </label>
    );
}