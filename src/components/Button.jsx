import { BTN_SIZE, BTN_COLORS } from "@/scripts/Utilities";

export default function Button({ className, as, color, size, ...props }) {
    let classes = `${className || ""} btn ${BTN_SIZE[size] || BTN_SIZE.default} ${BTN_COLORS[color] || BTN_COLORS.default}`;
    let Output = as || "button";

    return <Output className={classes} {...props} />;
}
