export function objectWithKey(key, value) {
    var _a;
    return (Array.isArray(value) && value.length > 0) ||
        (!Array.isArray(value) && value)
        ? (_a = {}, _a[key] = value, _a) : {};
}
