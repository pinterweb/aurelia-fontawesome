"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
function configure(aurelia) {
    aurelia.globalResources(aurelia_framework_1.PLATFORM.moduleName('./font-awesome-icon'));
}
exports.configure = configure;
__export(require("./font-awesome-icon"));
//# sourceMappingURL=aurelia-fontawesome.js.map