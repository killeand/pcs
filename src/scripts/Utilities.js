export function RandomNum(low, high) {
    return low + Math.floor(Math.random() * (high + 1 - low));
};

export const BTNCOLORS = {
    neutral: "btn-neutral",
    primary: "btn-primary",
    secondary: "btn-secondary",
    accent: "btn-accent",
    info: "btn-info",
    success: "btn-success",
    warning: "btn-warning",
    error: "btn-error",
    disabled: "btn-disabled",
    default: "btn-primary"
};

export const BGCOLORS = {
    neutral: "bg-neutral text-neutral-content",
    primary: "bg-primary text-primary-content",
    secondary: "bg-secondary text-secondary-content",
    accent: "bg-accent text-accent-content",
    info: "bg-info text-info-content",
    success: "bg-success text-success-content",
    warning: "bg-warning text-warning-content",
    error: "bg-error text-error-content",
    default: "bg-primary text-primary-content"
};

export const BORDERCOLORS = {
    neutral: "border-neutral",
    primary: "border-primary",
    secondary: "border-secondary",
    accent: "border-accent",
    info: "border-info",
    success: "border-success",
    warning: "border-warning",
    error: "border-error",
    default: "border-primary"
};