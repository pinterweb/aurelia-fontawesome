"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convert(createElement, element) {
    var children = (element.children || []).map(convert.bind(null, createElement));
    if (typeof element === 'string') {
        return element;
    }
    else {
        var $el = createElement(element.tag);
        if (element.attributes) {
            for (var _i = 0, _a = Object.keys(element.attributes); _i < _a.length; _i++) {
                var attr = _a[_i];
                $el.setAttribute(attr, element.attributes[attr]);
            }
        }
        $el.innerHTML = children.map(function (child) { return child.outerHTML || child; }).join('');
        return $el;
    }
}
exports.default = convert;
//# sourceMappingURL=converter.js.map