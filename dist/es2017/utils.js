export function objectWithKey(key, value) {
    return (Array.isArray(value) && value.length > 0) ||
        (!Array.isArray(value) && value)
        ? { [key]: value }
        : {};
}
//# sourceMappingURL=utils.js.map