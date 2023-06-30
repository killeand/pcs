import '../styles/Text.css';

export default function Label({title, value, className}) {
    title = title || "Text";
    value = value || ((value == 0) ? 0 : "");
    className = className || "";

    return (
        <div className={`text-cont ${className}`}>
            <div className="text-label">{title}</div>
            <div className="text-input">{value}</div>
        </div>
    );
}