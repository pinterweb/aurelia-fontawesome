define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function convert(createElement, element) {
        var children = (element.children || []).map(function (child) {
            if (typeof child === 'string') {
                return child;
            }
            return convert(createElement, child);
        });
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
    exports.default = convert;
});
//# sourceMappingURL=converter.js.map