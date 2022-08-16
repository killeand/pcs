export function RandomNum(low, high) {
    return low + Math.floor(Math.random() * (high + 1 - low));
}