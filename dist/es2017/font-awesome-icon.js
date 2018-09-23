var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Container, DOM, LogManager, ViewCompiler, ViewResources, ViewSlot, bindable, createOverrideContext, customElement, noView } from 'aurelia-framework';
import { icon, parse } from '@fortawesome/fontawesome-svg-core';
import { objectWithKey } from './utils';
import convert from './converter';
function normalizeIconArgs(icon) {
    if (icon == null) {
        return null;
    }
    if (typeof icon === 'object' && icon.prefix && icon.iconName) {
        return icon;
    }
    if (Array.isArray(icon) && icon.length === 2) {
        return { prefix: icon[0], iconName: icon[1] };
    }
    if (typeof icon === 'string') {
        return { prefix: 'fas', iconName: icon };
    }
    return null;
}
let FontAwesomeIconCustomElement = class FontAwesomeIconCustomElement {
    constructor($element, container, viewCompiler, resources) {
        this.$element = $element;
        this.container = container;
        this.viewCompiler = viewCompiler;
        this.resources = resources;
        this.border = false;
        this.className = '';
        this.fixedWidth = false;
        this.inverse = false;
        this.listItem = false;
        this.pulse = false;
        this.spin = false;
        this.style = {};
        this.symbol = false;
        this.title = '';
        this.transform = '';
        this.classes = {};
        this.logger = LogManager.getLogger('aurelia-fontawesome');
    }
    static inject() { return [Element, Container, ViewCompiler, ViewResources]; }
    bind(bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = createOverrideContext(bindingContext, overrideContext);
        this.classes = {
            'fa-border': this.border,
            'fa-flip-horizontal': this.flip === 'horizontal' || this.flip === 'both',
            'fa-flip-vertical': this.flip === 'vertical' || this.flip === 'both',
            'fa-fw': this.fixedWidth,
            'fa-inverse': this.inverse,
            'fa-li': this.listItem,
            'fa-pulse': this.pulse,
            'fa-spin': this.spin,
            [`fa-${this.size}`]: !!this.size,
            [`fa-pull-${this.pull}`]: !!this.pull,
            [`fa-rotate-${this.rotation}`]: !!this.rotation
        };
    }
    attached() {
        this.slot = new ViewSlot(this.$element, true);
        const iconLookup = normalizeIconArgs(this.icon);
        if (iconLookup === null) {
            this.logger.error('Bound icon prop is either unsupported or null', this.icon);
            return;
        }
        const classes = objectWithKey('classes', [
            ...Object.keys(this.classes).filter(key => this.classes[key]),
            ...this.className.split(' ')
        ]);
        const transform = objectWithKey('transform', typeof this.transform === 'string'
            ? parse.transform(this.transform)
            : this.transform);
        const mask = objectWithKey('mask', normalizeIconArgs(this.mask));
        const renderedIcon = icon(iconLookup, Object.assign({}, classes, transform, mask, { attributes: this.getOtherAttributes(), styles: this.style, symbol: this.symbol, title: this.title }));
        if (!renderedIcon) {
            this.logger.error('Could not find icon', iconLookup);
        }
        else {
            this.compile(renderedIcon.abstract[0]);
        }
    }
    detached() {
        this.slot.detached();
        this.slot.unbind();
        this.slot.removeAll();
    }
    compile(abstract) {
        // FIXME
        // 1. if i use PAL.DOM (current), PAL is not ready and and viewCompiler.compiler fails
        // 1. if i use PAL.DOM and run aurelia-pal-browser initialize() in the
        // configure method (./aurelia-font-awesome.ts) of this plugin i get
        // BindingLanguage must implement inspectAttribute() and viewcompiler.compile fails
        // 2. if i use document.createElement i get BindingLanguage must implement inspectAttribute()
        // and viewCompiler.compiler fails
        // 3. if i copy and paste this plugin code into an app, the fonts only show if
        // i use an html view with innerhtml.bind,but see #4
        // 4. using an actual font-awesome-icon-view and binding to innerhtml results in
        // Cannot determine default view strategy for object.
        // 5. tried adding/removing aurelia dependencies and reinstalling node_modules, did not work
        const $el = convert(DOM.createElement.bind(DOM), abstract);
        const factory = this.viewCompiler.compile($el, this.resources);
        const view = factory.create(this.container, this.bindingContext);
        this.slot.add(view);
        this.slot.bind(this.bindingContext, this.overrideContext);
        this.slot.attached();
    }
    /**
     * Get all non aurelia and non bound attributes and pass it to the
     * font awesome svg element
     */
    getOtherAttributes() {
        const attrs = this.$element.attributes;
        const otherAttrs = {};
        const ignore = ['class', 'style'];
        for (let i = attrs.length - 1; i >= 0; i--) {
            if (attrs[i].name.indexOf('au-') === -1 &&
                ignore.indexOf(attrs[i].name) === -1 &&
                attrs[i].name.indexOf('.') === -1 &&
                !(attrs[i].name in this)) {
                otherAttrs[attrs[i].name] = attrs[i].value;
            }
        }
        return otherAttrs;
    }
};
__decorate([
    bindable
], FontAwesomeIconCustomElement.prototype, "border", void 0);
__decorate([
    bindable
], FontAwesomeIconCustomElement.prototype, "className", void 0);
__decorate([
    bindable
], FontAwesomeIconCustomElement.prototype, "fixedWidth", void 0);
__decorate([
    bindable
], FontAwesomeIconCustomElement.prototype, "flip", void 0);
__decorate([
    bindable
], FontAwesomeIconCustomElement.prototype, "icon", void 0);
__decorate([
    bindable
], FontAwesomeIconCustomElement.prototype, "inverse", void 0);
__decorate([
    bindable
], FontAwesomeIconCustomElement.prototype, "listItem", void 0);
__decorate([
    bindable
], FontAwesomeIconCustomElement.prototype, "mask", void 0);
__decorate([
    bindable
], FontAwesomeIconCustomElement.prototype, "pull", void 0);
__decorate([
    bindable
], FontAwesomeIconCustomElement.prototype, "pulse", void 0);
__decorate([
    bindable
], FontAwesomeIconCustomElement.prototype, "rotation", void 0);
__decorate([
    bindable
], FontAwesomeIconCustomElement.prototype, "size", void 0);
__decorate([
    bindable
], FontAwesomeIconCustomElement.prototype, "spin", void 0);
__decorate([
    bindable
], FontAwesomeIconCustomElement.prototype, "style", void 0);
__decorate([
    bindable
], FontAwesomeIconCustomElement.prototype, "symbol", void 0);
__decorate([
    bindable
], FontAwesomeIconCustomElement.prototype, "title", void 0);
__decorate([
    bindable
], FontAwesomeIconCustomElement.prototype, "transform", void 0);
FontAwesomeIconCustomElement = __decorate([
    customElement('font-awesome-icon'),
    noView()
], FontAwesomeIconCustomElement);
export { FontAwesomeIconCustomElement };
//# sourceMappingURL=font-awesome-icon.js.map