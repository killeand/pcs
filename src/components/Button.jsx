import React from 'react';

export default function Button({ className, as, color, ...props }) {
    const colorClasses = {
        primary: "from-primary to-primary-focus text-primary-content hover:from-secondary hover:to-secondary-focus hover:text-secondary-content",
        secondary: "from-secondary to-secondary-focus text-secondary-content hover:from-neutral hover:to-neutral-focus hover:text-neutral-content",
        success: "from-base-300 to-success text-success-content hover:from-success hover:to-base-300",
        error: "from-base-300 to-error text-error-content hover:from-error hover:to-base-300",
        disabled: "from-base-100 to-base-300 text-base-content",
        default: "from-primary to-primary-focus text-primary-content hover:from-secondary hover:to-secondary-focus hover:text-secondary-content"
    }

    let classes = `${className || ""} bg-gradient-to-br px-2 py-1 rounded-xl font-bold text-center ${colorClasses[color] || colorClasses.default}`;
    let Output = as || "button";

    return <Output className={classes} {...props} />
}