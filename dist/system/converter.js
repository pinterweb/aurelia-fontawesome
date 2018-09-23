System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
    return {
        setters: [],
        execute: function () {
            exports_1("default", convert);
        }
    };
});
//# sourceMappingURL=converter.js.map