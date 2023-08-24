import { BTNCOLORS } from "../scripts/Utilities";

export default function Button({ className, as, color, ...props }) {
    let classes = `${className || ""} btn btn-sm px-2 py-1 rounded-xl font-bold text-center ${BTNCOLORS[color] || BTNCOLORS.default}`;
    let Output = as || "button";

    return <Output className={classes} {...props} />
}