System.register(["aurelia-framework", "./font-awesome-icon"], function (exports_1, context_1) {
    "use strict";
    var aurelia_framework_1;
    var __moduleName = context_1 && context_1.id;
    function configure(aurelia) {
        aurelia.globalResources(aurelia_framework_1.PLATFORM.moduleName('./font-awesome-icon'));
    }
    exports_1("configure", configure);
    var exportedNames_1 = {
        "configure": true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (font_awesome_icon_1_1) {
                exportStar_1(font_awesome_icon_1_1);
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=aurelia-fontawesome.js.map