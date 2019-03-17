import {
  DOM,
  LogManager,
  bindable,
  customElement,
  inlineView
} from 'aurelia-framework';
import {
  IconDefinition,
  IconLookup,
  IconName,
  IconPrefix,
  Transform,
  icon,
  parse
} from '@fortawesome/fontawesome-svg-core';
import { objectWithKey } from './utils';
import convert from './converter';

type BoundIconArg = IconDefinition | IconName | Array<IconName | IconPrefix>;

function normalizeIconArgs(icon?: BoundIconArg): IconLookup | IconDefinition | null {
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
    return { prefix: 'fas', iconName: icon };
  }

  return null;
}

@customElement('font-awesome-icon')
@inlineView(`<template innerhtml.bind="_iconhtml"></template>`)
export class FontAwesomeIconCustomElement {
  public static inject() { return [Element]; }

  /**
   * {@link https://fontawesome.com/how-to-use/on-the-web/styling/bordered-pulled-icons}
   */
  @bindable public border: boolean = false;
  /**
   * Your own class name that will be added to the SVGElement
   */
  @bindable public className: string = '';
  /**
   * {@link https://fontawesome.com/how-to-use/on-the-web/styling/fixed-width-icons}
   */
  @bindable public fixedWidth: boolean = false;
  @bindable public flip: 'horizontal' | 'vertical' | 'both';
  @bindable public icon: BoundIconArg;
  @bindable public inverse: boolean = false;
  /**
   * {@link https://fontawesome.com/how-to-use/on-the-web/styling/icons-in-a-list}
   */
  @bindable public listItem: boolean = false;
  /**
   * {@link https://fontawesome.com/how-to-use/on-the-web/styling/masking}
   */
  @bindable public mask?: BoundIconArg;
  @bindable public pull: 'right' | 'left';
  /**
   * {@link https://fontawesome.com/how-to-use/on-the-web/styling/animating-icons}
   */
  @bindable public pulse: boolean = false;
  /**
   * {@link https://fontawesome.com/how-to-use/on-the-web/styling/rotating-icons}
   */
  @bindable public rotation?: 90 | 180 | 270;
  /**
   * {@link https://fontawesome.com/how-to-use/on-the-web/styling/sizing-icons}
   */
  @bindable public size?: 'lg' |'xs' |'sm' |'1x' |'2x' |'3x' |'4x' |'5x' |'6x' |'7x' |'8x' |'9x' |'10x';
  /**
   * {@link https://fontawesome.com/how-to-use/on-the-web/styling/animating-icons}
   */
  @bindable public spin: boolean = false;
  @bindable public style: any = {};
  /**
   * {@link https://fontawesome.com/how-to-use/on-the-web/advanced/svg-symbols}
   */
  @bindable public symbol: boolean | string = false;
  @bindable public title: string = '';
  /**
   * {@link https://fontawesome.com/how-to-use/on-the-web/styling/power-transforms}
   */
  @bindable public transform: string | Transform = '';
  /**
   * {@link https://fontawesome.com/how-to-use/on-the-web/styling/stacking-icons}
   */
  @bindable public stack?: '1x' | '2x';

  private logger = LogManager.getLogger('aurelia-fontawesome');
  private iconLookup: any;
  _iconhtml: string = '';

  public constructor(private $element: Element) { }

  public bind() {
    this.createIcon();
  }

  public propertyChanged(prop: string) {
    if (prop === 'icon') {
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
      ...this.className.split(' ')
    ]);
    const otherIconParams = {
      ...objectWithKey('mask', normalizeIconArgs(this.mask)),
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
    this.iconLookup = normalizeIconArgs(this.icon);

    if (this.iconLookup !== null) {
      this.renderIcon();
    } else {
      this.logger.error('Bound icon prop is either unsupported or null', this.icon);
    }
  }
}
