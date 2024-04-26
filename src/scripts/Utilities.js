export function RandomNum(low, high) {
    return low + Math.floor(Math.random() * (high + 1 - low));
}

export function ZeroValue(input, altinput = '') {
    return input === 0 ? '0' : input || altinput;
}

export const BTN_COLORS = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    neutral: 'btn-neutral',
    accent: 'btn-accent',
    info: 'btn-info',
    success: 'btn-success',
    warning: 'btn-warning',
    error: 'btn-error',
    default: 'btn-primary',
};

export const BTN_SIZE = {
    lg: 'btn-lg',
    md: '',
    sm: 'btn-sm',
    xs: 'btn-xs',
    default: 'btn-sm',
};

export const BGCOLORS = {
    neutral: 'bg-neutral text-neutral-content',
    primary: 'bg-primary text-primary-content',
    secondary: 'bg-secondary text-secondary-content',
    accent: 'bg-accent text-accent-content',
    info: 'bg-info text-info-content',
    success: 'bg-success text-success-content',
    warning: 'bg-warning text-warning-content',
    error: 'bg-error text-error-content',
    default: 'bg-primary text-primary-content',
};

export const BORDERCOLORS = {
    neutral: 'border-neutral',
    primary: 'border-primary',
    secondary: 'border-secondary',
    accent: 'border-accent',
    info: 'border-info',
    success: 'border-success',
    warning: 'border-warning',
    error: 'border-error',
    default: 'border-primary',
};

export const MODAL_TYPE = {
    ok: 0,
    okcancel: 1,
    yesno: 2,
    prompt: 3,
};
