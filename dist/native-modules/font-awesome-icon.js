var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
import { DOM } from "aurelia-pal";
import {
  LogManager,
  customElement,
  bindable,
  ViewCompiler,
  ViewResources,
  ViewSlot,
  Container,
  noView
} from "aurelia-framework";
import { icon, parse } from "@fortawesome/fontawesome-svg-core";
import { objectWithKey } from "./utils";
import convert from "./converter";
import { PluginIconVisitor } from "./plugin-icon-visitor";
function normalizeIconArgs(icon, prefix) {
  if (icon == null) {
    return null;
  }
  if (typeof icon === "object" && icon.prefix && icon.iconName) {
    return icon;
  }
  if (Array.isArray(icon) && icon.length === 2) {
    return { prefix: icon[0], iconName: icon[1] };
  }
  if (typeof icon === "string") {
    return { prefix: prefix, iconName: icon };
  }
  return null;
}
var FontAwesomeIconCustomElement = (function() {
  function FontAwesomeIconCustomElement(
    $element,
    _container,
    _resources,
    _compiler,
    _slot,
    _visitor
  ) {
    this.$element = $element;
    this._container = _container;
    this._resources = _resources;
    this._compiler = _compiler;
    this._slot = _slot;
    this.logger = LogManager.getLogger("aurelia-fontawesome");
    this._iconhtml = "";
    _visitor.visit(this);
  }
  FontAwesomeIconCustomElement.prototype.bind = function(bindingContext, _) {
    this._bindingContext = bindingContext;
  };
  FontAwesomeIconCustomElement.prototype.attached = function() {
    this.createIcon();
  };
  FontAwesomeIconCustomElement.prototype.propertyChanged = function(prop) {
    if (prop === "icon" || prop === "prefix") {
      this.createIcon();
    } else {
      this.renderIcon();
    }
  };
  FontAwesomeIconCustomElement.prototype.getOtherAttributes = function() {
    var attrs = this.$element.attributes;
    var otherAttrs = {};
    var ignore = ["class", "style"];
    for (var i = attrs.length - 1; i >= 0; i--) {
      if (
        attrs[i].name.indexOf("au-") === -1 &&
        ignore.indexOf(attrs[i].name) === -1 &&
        attrs[i].name.indexOf(".") === -1 &&
        !(attrs[i].name in this)
      ) {
        otherAttrs[attrs[i].name] = attrs[i].value;
      }
    }
    return otherAttrs;
  };
  FontAwesomeIconCustomElement.prototype.renderIcon = function() {
    var _a;
    var classes =
      ((_a = {
        "fa-border": this.border,
        "fa-flip-horizontal":
          this.flip === "horizontal" || this.flip === "both",
        "fa-flip-vertical": this.flip === "vertical" || this.flip === "both",
        "fa-fw": this.fixedWidth,
        "fa-inverse": this.inverse,
        "fa-li": this.listItem,
        "fa-pulse": this.pulse,
        "fa-spin": this.spin
      }),
      (_a["fa-" + this.size] = !!this.size),
      (_a["fa-pull-" + this.pull] = !!this.pull),
      (_a["fa-rotate-" + this.rotation] = !!this.rotation),
      (_a["fa-stack-" + this.stack] = !!this.stack),
      _a);
    var classObj = objectWithKey(
      "classes",
      __spreadArrays(
        Object.keys(classes).filter(function(key) {
          return classes[key];
        }),
        this.className ? this.className.split(" ") : []
      )
    );
    var otherIconParams = __assign(
      __assign(
        {},
        objectWithKey("mask", normalizeIconArgs(this.mask, this.prefix))
      ),
      objectWithKey(
        "transform",
        typeof this.transform === "string"
          ? parse.transform(this.transform)
          : this.transform
      )
    );
    var renderedIcon = icon(
      this.iconLookup,
      __assign(__assign(__assign({}, classObj), otherIconParams), {
        attributes: this.getOtherAttributes(),
        styles: this.style,
        symbol: this.symbol,
        title: this.title
      })
    );
    if (!renderedIcon) {
      this.logger.error("Could not find icon", this.iconLookup);
    } else {
      var $icon = convert(
        DOM.createElement.bind(DOM),
        renderedIcon.abstract[0]
      );
      var factory = this._compiler.compile(
        "<template>" + $icon.outerHTML + "</template>",
        this._resources
      );
      var view = factory.create(this._container, this._bindingContext);
      this._slot.removeAll();
      this._slot.add(view);
    }
  };
  FontAwesomeIconCustomElement.prototype.unbind = function() {
    this._slot.unbind();
  };
  FontAwesomeIconCustomElement.prototype.detached = function() {
    this._slot.detached();
    this._slot.removeAll();
  };
  FontAwesomeIconCustomElement.prototype.createIcon = function() {
    this.iconLookup = normalizeIconArgs(this.icon, this.prefix);
    if (this.iconLookup !== null) {
      this.renderIcon();
    } else {
      this.logger.error(
        "Bound icon prop is either unsupported or null",
        this.icon
      );
    }
  };
  FontAwesomeIconCustomElement.inject = [
    Element,
    Container,
    ViewResources,
    ViewCompiler,
    ViewSlot,
    PluginIconVisitor
  ];
  __decorate(
    [bindable, __metadata("design:type", Boolean)],
    FontAwesomeIconCustomElement.prototype,
    "border",
    void 0
  );
  __decorate(
    [bindable, __metadata("design:type", String)],
    FontAwesomeIconCustomElement.prototype,
    "className",
    void 0
  );
  __decorate(
    [bindable, __metadata("design:type", Boolean)],
    FontAwesomeIconCustomElement.prototype,
    "fixedWidth",
    void 0
  );
  __decorate(
    [bindable, __metadata("design:type", String)],
    FontAwesomeIconCustomElement.prototype,
    "flip",
    void 0
  );
  __decorate(
    [bindable, __metadata("design:type", Object)],
    FontAwesomeIconCustomElement.prototype,
    "icon",
    void 0
  );
  __decorate(
    [bindable, __metadata("design:type", Boolean)],
    FontAwesomeIconCustomElement.prototype,
    "inverse",
    void 0
  );
  __decorate(
    [bindable, __metadata("design:type", Boolean)],
    FontAwesomeIconCustomElement.prototype,
    "listItem",
    void 0
  );
  __decorate(
    [bindable, __metadata("design:type", Object)],
    FontAwesomeIconCustomElement.prototype,
    "mask",
    void 0
  );
  __decorate(
    [bindable, __metadata("design:type", String)],
    FontAwesomeIconCustomElement.prototype,
    "pull",
    void 0
  );
  __decorate(
    [bindable, __metadata("design:type", Boolean)],
    FontAwesomeIconCustomElement.prototype,
    "pulse",
    void 0
  );
  __decorate(
    [bindable, __metadata("design:type", Number)],
    FontAwesomeIconCustomElement.prototype,
    "rotation",
    void 0
  );
  __decorate(
    [bindable, __metadata("design:type", String)],
    FontAwesomeIconCustomElement.prototype,
    "size",
    void 0
  );
  __decorate(
    [bindable, __metadata("design:type", Boolean)],
    FontAwesomeIconCustomElement.prototype,
    "spin",
    void 0
  );
  __decorate(
    [bindable, __metadata("design:type", Object)],
    FontAwesomeIconCustomElement.prototype,
    "style",
    void 0
  );
  __decorate(
    [bindable, __metadata("design:type", Object)],
    FontAwesomeIconCustomElement.prototype,
    "symbol",
    void 0
  );
  __decorate(
    [bindable, __metadata("design:type", String)],
    FontAwesomeIconCustomElement.prototype,
    "title",
    void 0
  );
  __decorate(
    [bindable, __metadata("design:type", Object)],
    FontAwesomeIconCustomElement.prototype,
    "transform",
    void 0
  );
  __decorate(
    [bindable, __metadata("design:type", String)],
    FontAwesomeIconCustomElement.prototype,
    "stack",
    void 0
  );
  __decorate(
    [bindable, __metadata("design:type", String)],
    FontAwesomeIconCustomElement.prototype,
    "prefix",
    void 0
  );
  FontAwesomeIconCustomElement = __decorate(
    [
      customElement("font-awesome-icon"),
      noView(),
      __metadata("design:paramtypes", [
        Element,
        Container,
        ViewResources,
        ViewCompiler,
        ViewSlot,
        Object
      ])
    ],
    FontAwesomeIconCustomElement
  );
  return FontAwesomeIconCustomElement;
})();
export { FontAwesomeIconCustomElement };
