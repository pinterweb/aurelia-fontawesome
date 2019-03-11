var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DOM, LogManager, bindable, customElement, inlineView } from 'aurelia-framework';
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
    constructor($element) {
        this.$element = $element;
        /**
         * {@link https://fontawesome.com/how-to-use/on-the-web/styling/bordered-pulled-icons}
         */
        this.border = false;
        /**
         * Your own class name that will be added to the SVGElement
         */
        this.className = '';
        /**
         * {@link https://fontawesome.com/how-to-use/on-the-web/styling/fixed-width-icons}
         */
        this.fixedWidth = false;
        this.inverse = false;
        /**
         * {@link https://fontawesome.com/how-to-use/on-the-web/styling/icons-in-a-list}
         */
        this.listItem = false;
        /**
         * {@link https://fontawesome.com/how-to-use/on-the-web/styling/animating-icons}
         */
        this.pulse = false;
        /**
         * {@link https://fontawesome.com/how-to-use/on-the-web/styling/animating-icons}
         */
        this.spin = false;
        this.style = {};
        /**
         * {@link https://fontawesome.com/how-to-use/on-the-web/advanced/svg-symbols}
         */
        this.symbol = false;
        this.title = '';
        /**
         * {@link https://fontawesome.com/how-to-use/on-the-web/styling/power-transforms}
         */
        this.transform = '';
        this.logger = LogManager.getLogger('aurelia-fontawesome');
        this._iconhtml = '';
    }
    static inject() { return [Element]; }
    attached() {
        this.iconLookup = normalizeIconArgs(this.icon);
        if (this.iconLookup !== null) {
            this.renderIcon();
        }
        else {
            this.logger.error('Bound icon prop is either unsupported or null', this.icon);
        }
    }
    iconChanged() {
        this.attached();
    }
    propertyChanged() {
        this.renderIcon();
    }
    compile(abstract) {
        const $icon = convert(DOM.createElement.bind(DOM), abstract);
        this._iconhtml = $icon.outerHTML;
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
    renderIcon() {
        const classes = {
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
            [`fa-rotate-${this.rotation}`]: !!this.rotation,
            [`fa-stack-${this.stack}`]: !!this.stack
        };
        const classObj = objectWithKey('classes', [
            ...Object.keys(classes).filter(key => classes[key]),
            ...this.className.split(' ')
        ]);
        const otherIconParams = Object.assign({}, objectWithKey('mask', normalizeIconArgs(this.mask)), objectWithKey('transform', typeof this.transform === 'string'
            ? parse.transform(this.transform)
            : this.transform));
        const renderedIcon = icon(this.iconLookup, Object.assign({}, classObj, otherIconParams, { attributes: this.getOtherAttributes(), styles: this.style, symbol: this.symbol, title: this.title }));
        if (!renderedIcon) {
            this.logger.error('Could not find icon', this.iconLookup);
        }
        else {
            this.compile(renderedIcon.abstract[0]);
        }
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
__decorate([
    bindable
], FontAwesomeIconCustomElement.prototype, "stack", void 0);
FontAwesomeIconCustomElement = __decorate([
    customElement('font-awesome-icon'),
    inlineView(`<template>
    <div id="svg-holder" innerhtml.bind="_iconhtml"></div>
</template><tempate>`)
], FontAwesomeIconCustomElement);
export { FontAwesomeIconCustomElement };
//# sourceMappingURL=font-awesome-icon.js.map