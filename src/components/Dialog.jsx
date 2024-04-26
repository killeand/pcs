import { BGCOLORS, ZeroValue } from '@/scripts/Utilities';

export default function Dialog({ innerClass, outerClass, color, title, children }) {
    return (
        <div className={`card card-compact rounded-md border border-base-content shadow-md ${outerClass || ''}`}>
            <div className={`title_3 card-title rounded-t-md py-2 pl-3 ${BGCOLORS[color] || BGCOLORS.default}`}>{ZeroValue(title, 'Dialog')}</div>
            <div className={`-mt-1 flex flex-col rounded-b-md ${innerClass || ''}`}>{children}</div>
        </div>
    );
}
