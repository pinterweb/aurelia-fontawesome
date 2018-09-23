function convert(createElement, element) {
    const children = (element.children || []).map(convert.bind(null, createElement));
    if (typeof element === 'string') {
        return element;
    }
    else {
        const $el = createElement(element.tag);
        if (element.attributes) {
            for (const attr of Object.keys(element.attributes)) {
                $el.setAttribute(attr, element.attributes[attr]);
            }
        }
        $el.innerHTML = children.map(child => child.outerHTML || child).join('');
        return $el;
    }
}
export default convert;
//# sourceMappingURL=converter.js.map