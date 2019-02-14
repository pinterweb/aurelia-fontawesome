import {
  Container,
  DOM,
  Disposable,
  LogManager,
  OverrideContext,
  ViewCompiler,
  ViewResources,
  ViewSlot,
  bindable,
  createOverrideContext,
  customElement,
  noView
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

import convert from './converter';
import { objectWithKey } from './utils';

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
@noView()
export class FontAwesomeIconCustomElement {
  public static inject() { return [Element, Container, ViewCompiler, ViewResources]; }

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

  private bindingContext: any;
  private overrideContext: OverrideContext;
  private classes: any = {};
  private compiledIcon?: { $icon: Element } & Disposable;
  private logger = LogManager.getLogger('aurelia-fontawesome');

  public constructor(private $element: Element,
                     private container: Container,
                     private viewCompiler: ViewCompiler,
                     private resources: ViewResources) { }

  public bind(bindingContext: any, overrideContext: OverrideContext) {
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
      [`fa-rotate-${this.rotation}`]: !!this.rotation,
      [`fa-stack-${this.stack}`]: !!this.stack
    };
  }

  public attached() {
    this.compiledIcon = this.compileIcon();
  }

  public detached() {
    if (this.compiledIcon) {
      this.compiledIcon.dispose();
    }
  }

  protected propertyChanged(name: string, newValue: any, oldValue: any) {
    if (!this.compiledIcon) {
      // Icon is not yet compiled as attached() is not called
      return;
    }
    
    const nameof = (name: keyof FontAwesomeIconCustomElement) => name;
    const $icon = this.compiledIcon.$icon;

    switch (name) {
      case nameof('border'):
        this.replaceClass($icon, newValue && 'fa-border', oldValue && 'fa-border');
        break;
      case nameof('flip'):
        this.replaceClass($icon, (newValue === 'horizontal' || newValue === 'both') && 'fa-flip-horizontal', oldValue && 'fa-flip-horizontal');
        this.replaceClass($icon, (newValue === 'vertical' || newValue === 'both') && 'fa-flip-vertical', oldValue && 'fa-flip-vertical');
        break;
      case nameof('fixedWidth'):
        this.replaceClass($icon, newValue && 'fa-fw', oldValue && 'fa-fw');
        break;
      case nameof('inverse'):
        this.replaceClass($icon, newValue && 'fa-inverse', oldValue && 'fa-inverse');
        break;
      case nameof('listItem'):
        this.replaceClass($icon, newValue && 'fa-li', oldValue && 'fa-li');
        break;
      case nameof('pulse'):
        this.replaceClass($icon, newValue && 'fa-pulse', oldValue && 'fa-pulse');
        break;
      case nameof('spin'):
        this.replaceClass($icon, newValue && 'fa-spin', oldValue && 'fa-spin');
        break;
      case nameof('size'):
        this.replaceClass($icon, newValue && `fa-${newValue}`, oldValue && `fa-${oldValue}`);
        break;
      case nameof('pull'):
        this.replaceClass($icon, newValue && `fa-pull-${newValue}`, oldValue && `fa-pull-${oldValue}`);
        break;
      case nameof('rotation'):
        this.replaceClass($icon, newValue && `fa-pull-${newValue}`, oldValue && `fa-pull-${oldValue}`);
        break;
      case nameof('stack'):
        this.replaceClass($icon, newValue && `fa-stack-${newValue}`, oldValue && `fa-stack-${oldValue}`);
        break;
      default:
        this.compiledIcon.dispose();
        this.compiledIcon = this.compileIcon();
        break;
    }
  }

  private replaceClass(element: Element, newClass?: false | string, oldClass?: string) {
    if (oldClass && newClass !== oldClass && element.classList.contains(oldClass)) {
      element.classList.remove(oldClass);
    }

    if (newClass) {
      element.classList.add(newClass);
    }
  }
  
  private compileIcon() {
    const iconLookup = normalizeIconArgs(this.icon);

    if (iconLookup === null) {
      this.logger.error('Bound icon prop is either unsupported or null', this.icon);
      return;
    }

    const classes = objectWithKey('classes', [
      ...Object.keys(this.classes).filter(key => this.classes[key]),
      ...this.className.split(' ')
    ]);

    const transform = objectWithKey(
      'transform',
      typeof this.transform === 'string'
        ? parse.transform(this.transform)
        : this.transform
    );
    const mask = objectWithKey('mask', normalizeIconArgs(this.mask));

    const renderedIcon = icon(iconLookup, {
      ...classes,
      ...transform,
      ...mask,
      attributes: this.getOtherAttributes(),
      styles: this.style,
      symbol: this.symbol,
      title: this.title
    });

    if (!renderedIcon) {
      this.logger.error('Could not find icon', iconLookup);
      return;
    }

    const abstract = renderedIcon.abstract[0];

    const $icon = convert(DOM.createElement.bind(DOM), abstract);
    const template = `<template>${$icon.outerHTML}</template>`;
    const factory = this.viewCompiler.compile(template, this.resources);
    const view = factory.create(this.container, this.bindingContext);

    const slot = new ViewSlot(this.$element, true);
    slot.add(view);
    view.bind(this.bindingContext, this.overrideContext);

    return {
      $icon,
      dispose: () => {
        slot.remove(view);
        view.unbind();
      }
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
}
