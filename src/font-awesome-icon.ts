import { DOM } from 'aurelia-pal';
import {
  LogManager,
  customElement,
  bindable,
  inlineView
} from 'aurelia-framework';
import {
  icon,
  parse
} from '@fortawesome/fontawesome-svg-core';
import { objectWithKey } from './utils';
import convert from './converter';
import { PluginIconVisitor } from './plugin-icon-visitor';

type IconDefinition = import('@fortawesome/fontawesome-svg-core').IconDefinition;
type IconLookup = import('@fortawesome/fontawesome-svg-core').IconLookup;
type IconPrefix = import('@fortawesome/fontawesome-svg-core').IconPrefix;
type IconName = import('@fortawesome/fontawesome-svg-core').IconName;

type IconOptions = import('./index').IconOptions;
type FlipOption = import('./index').FlipOption;
type PullOption = import('./index').PullOption;
type RotationOption = import('./index').RotationOption;
type BoundIconArg = import('./index').BoundIconArg;
type SizeOption = import('./index').SizeOption;
type SymbolOption = import('./index').SymbolOption;
type TransformOption = import('./index').TransformOption;
type StackOption = import('./index').StackOption;

export interface FontAwesomeIconCustomElementVisitor {
  visit(iconElement: FontAwesomeIconCustomElement);
}

function normalizeIconArgs(icon?: BoundIconArg, prefix?: IconPrefix): IconLookup | IconDefinition | null {
  if (icon == null) {
    return null;
  }

  if (typeof icon === 'object' && (icon as IconDefinition).prefix && (icon as IconDefinition).iconName) {
    return icon as IconDefinition;
  }

  if (Array.isArray(icon) && icon.length === 2) {
    return { prefix: (icon[0] as IconPrefix), iconName: (icon[1] as IconName) };
  }

  if (typeof icon === 'string') {
    return { prefix, iconName: icon };
  }

  return null;
}

@customElement('font-awesome-icon')
@inlineView(`<template innerhtml.bind="_iconhtml"></template>`)
export class FontAwesomeIconCustomElement implements IconOptions {
  public static inject() { return [Element, PluginIconVisitor ]; }

  @bindable public border: boolean;
  @bindable public className: string;
  @bindable public fixedWidth: boolean;
  @bindable public flip: FlipOption;
  @bindable public icon: BoundIconArg;
  @bindable public inverse: boolean;
  @bindable public listItem: boolean;
  @bindable public mask: BoundIconArg;
  @bindable public pull: PullOption;
  @bindable public pulse: boolean;
  @bindable public rotation: RotationOption;
  @bindable public size: SizeOption;
  @bindable public spin: boolean;
  @bindable public style: {[key: string]: string};
  @bindable public symbol: SymbolOption;
  @bindable public title;
  @bindable public transform: TransformOption;
  @bindable public stack: StackOption;
  @bindable public prefix: IconPrefix;

  private logger = LogManager.getLogger('aurelia-fontawesome');
  private iconLookup: any;
  _iconhtml: string = '';

  public constructor(private $element: Element, visitor: FontAwesomeIconCustomElementVisitor) {
    visitor.visit(this);
  }

  public bind() {
    this.createIcon();
  }

  public propertyChanged(prop: string) {
    if (prop === 'icon' || prop === 'prefix') {
      this.createIcon();
    } else {
      this.renderIcon();
    }
  }

  /**
   * Get all non aurelia and non bound attributes and pass it to the
   * font awesome svg element
   */
  private getOtherAttributes() {
    const attrs = this.$element.attributes;
    const otherAttrs: any = {};
    const ignore = [ 'class', 'style' ];

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

  private renderIcon() {
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
    const classObj =  objectWithKey('classes', [
      ...Object.keys(classes).filter(key => classes[key]),
      ...(this.className ? this.className.split(' ') : [])
    ]);
    const otherIconParams = {
      ...objectWithKey('mask', normalizeIconArgs(this.mask, this.prefix)),
      ...objectWithKey('transform',
        typeof this.transform === 'string'
          ? parse.transform(this.transform)
          : this.transform
      )
    }

    const renderedIcon = icon(this.iconLookup, {
      ...classObj,
      ...otherIconParams,
      attributes: this.getOtherAttributes(),
      styles: this.style,
      symbol: this.symbol,
      title: this.title
    });

    if (!renderedIcon) {
      this.logger.error('Could not find icon', this.iconLookup);
    } else {
      const $icon = convert(DOM.createElement.bind(DOM), renderedIcon.abstract[0]);
      this._iconhtml = $icon.outerHTML;
    }
  }

  private createIcon() {
    this.iconLookup = normalizeIconArgs(this.icon, this.prefix);

    if (this.iconLookup !== null) {
      this.renderIcon();
    } else {
      this.logger.error('Bound icon prop is either unsupported or null', this.icon);
    }
  }
}
