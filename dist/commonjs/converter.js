"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convert(createElement, element) {
  var children = (element.children || []).map(function(child) {
    if (typeof child === "string") {
      return child;
    }
    return convert(createElement, child);
  });
  var $el = createElement(element.tag);
  if (element.attributes) {
    for (
      var _i = 0, _a = Object.keys(element.attributes);
      _i < _a.length;
      _i++
    ) {
      var attr = _a[_i];
      $el.setAttribute(attr, element.attributes[attr]);
    }
  }
  children.forEach(function(c) {
    return typeof c === "string" ? ($el.textContent = c) : $el.appendChild(c);
  });
  return $el;
}
exports.default = convert;
