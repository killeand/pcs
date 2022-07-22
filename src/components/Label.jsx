import _ from 'lodash';
import '../styles/Text.css';

export default function Label({title, value, className, ...props}) {
    if (_.isNil(title)) title = "Text";
    if (_.isNil(value)) value = "";
    if (_.isNil(className)) className = "";

    return (
        <div className={`text-cont ${className}`}>
            <div className="text-label">{title}</div>
            <div className="text-input">{value}</div>
        </div>
    );
}