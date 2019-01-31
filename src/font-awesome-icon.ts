import {
  Container,
  DOM,
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
  AbstractElement,
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
@noView()
export class FontAwesomeIconCustomElement {
  public static inject() { return [Element, Container, ViewCompiler, ViewResources]; }

  /**
   * {@link https://fontawesome.com/how-to-use/on-the-web/styling/bordered-pulled-icons}
   */
  @bindable public border: boolean | 'true' | 'false' = false;
  /**
   * Your own class name that will be added to the SVGElement
   */
  @bindable public className: string = '';
  /**
   * {@link https://fontawesome.com/how-to-use/on-the-web/styling/fixed-width-icons}
   */
  @bindable public fixedWidth: boolean | 'true' | 'false' = false;
  @bindable public flip: 'horizontal' | 'vertical' | 'both';
  @bindable public icon: BoundIconArg;
  @bindable public inverse: boolean | 'true' | 'false' = false;
  /**
   * {@link https://fontawesome.com/how-to-use/on-the-web/styling/icons-in-a-list}
   */
  @bindable public listItem: boolean | 'true' | 'false' = false;
  /**
   * {@link https://fontawesome.com/how-to-use/on-the-web/styling/masking}
   */
  @bindable public mask?: BoundIconArg;
  @bindable public pull: 'right' | 'left';
  /**
   * {@link https://fontawesome.com/how-to-use/on-the-web/styling/animating-icons}
   */
  @bindable public pulse: boolean | 'true' | 'false' = false;
  /**
   * {@link https://fontawesome.com/how-to-use/on-the-web/styling/rotating-icons}
   */
  @bindable public rotation?: 90 | 180 | 270 | '90' | '180' | '270';
  /**
   * {@link https://fontawesome.com/how-to-use/on-the-web/styling/sizing-icons}
   */
  @bindable public size?: 'lg' |'xs' |'sm' |'1x' |'2x' |'3x' |'4x' |'5x' |'6x' |'7x' |'8x' |'9x' |'10x';
  /**
   * {@link https://fontawesome.com/how-to-use/on-the-web/styling/animating-icons}
   */
  @bindable public spin: boolean | 'true' | 'false' = false;
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

  private bindingContext: any;
  private overrideContext: OverrideContext;
  private classes: any = {};
  private slot: ViewSlot;
  private logger = LogManager.getLogger('aurelia-fontawesome');

  public constructor(private $element: Element,
                     private container: Container,
                     private viewCompiler: ViewCompiler,
                     private resources: ViewResources) { }

  public bind(bindingContext: any, overrideContext: OverrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = createOverrideContext(bindingContext, overrideContext);

    this.classes = {
      'fa-border': this.border.toString() === 'true',
      'fa-flip-horizontal': this.flip === 'horizontal' || this.flip === 'both',
      'fa-flip-vertical': this.flip === 'vertical' || this.flip === 'both',
      'fa-fw': this.fixedWidth.toString() === 'true',
      'fa-inverse': this.inverse.toString() === 'true',
      'fa-li': this.listItem.toString() === 'true',
      'fa-pulse': this.pulse.toString() === 'true',
      'fa-spin': this.spin.toString() === 'true',
      [`fa-${this.size}`]: !!this.size,
      [`fa-pull-${this.pull}`]: !!this.pull,
      [`fa-rotate-${this.rotation}`]: !!this.rotation
    };
  }

  public attached() {
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
    } else {
      this.compile(renderedIcon.abstract[0]);
    }
  }

  public detached(): void {
    this.slot.detached();
    this.slot.unbind();
    this.slot.removeAll();
  }

  protected compile(abstract: AbstractElement): void {
    const $icon = convert(DOM.createElement.bind(DOM), abstract);
    const $template = DOM.createElement('template');
    $template.innerHTML = $icon.outerHTML;
    const factory = this.viewCompiler.compile($template, this.resources);
    const view = factory.create(this.container, this.bindingContext);

    this.slot.add(view);
    this.slot.bind(this.bindingContext, this.overrideContext);
    this.slot.attached();
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
