export function isString(variable) {
    return typeof variable === "string";
}

export function isUrlString(variable) {
    return isString(variable) && variable.startsWith("http");
}
