import { BGCOLORS, BORDERCOLORS, ZeroValue } from '@/scripts/Utilities';

export default function Accordian({ title, titleElements, color, innerClass, outerClass, children }) {
    return (
        <div className={`collapse border ${outerClass || ''} ${BORDERCOLORS[color] || BORDERCOLORS.default}`}>
            <input type='checkbox' className='min-h-0' />
            <div className={`collapse-title flex min-h-0 flex-row items-center p-2 ${BGCOLORS[color] || BGCOLORS.default}`}>
                <div className={`title_3 bi-caret-right flex-grow`}>{ZeroValue(title, 'Accordian')}</div>
                <div className={`flex flex-row space-x-2 [&>div]:rounded-md [&>div]:border [&>div]:border-black [&>div]:bg-secondary [&>div]:px-1 [&>div]:text-secondary-content`}>{titleElements}</div>
            </div>
            <div className={`collapse-content bg-base-100 p-0 text-base-content ${innerClass || ''}`}>{children}</div>
        </div>
    );
}
