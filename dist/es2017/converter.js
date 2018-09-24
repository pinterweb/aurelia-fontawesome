function convert(createElement, element) {
    const children = (element.children || []).map(child => {
        if (typeof child === 'string') {
            return child;
        }
        return convert(createElement, child);
    });
    const $el = createElement(element.tag);
    if (element.attributes) {
        for (const attr of Object.keys(element.attributes)) {
            $el.setAttribute(attr, element.attributes[attr]);
        }
    }
    $el.innerHTML = children.map(child => child.outerHTML || child).join('');
    return $el;
}
export default convert;
//# sourceMappingURL=converter.js.map