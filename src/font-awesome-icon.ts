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

  @bindable public border: boolean = false;
  @bindable public className: string = '';
  @bindable public fixedWidth: boolean = false;
  @bindable public flip: 'horizontal' | 'vertical' | 'both';
  @bindable public icon: BoundIconArg;
  @bindable public inverse: boolean = false;
  @bindable public listItem: boolean = false;
  @bindable public mask?: BoundIconArg;
  @bindable public pull: 'right' | 'left';
  @bindable public pulse: boolean = false;
  @bindable public rotation?: 90 | 180 | 270;
  @bindable public size?: 'lg' |'xs' |'sm' |'1x' |'2x' |'3x' |'4x' |'5x' |'6x' |'7x' |'8x' |'9x' |'10x';
  @bindable public spin: boolean = false;
  @bindable public style: any = {};
  @bindable public symbol: boolean | string = false;
  @bindable public title: string = '';
  @bindable public transform: string | Transform = '';

  public bindingContext: any;
  public overrideContext: OverrideContext;
  public classes: any = {};
  public slot: ViewSlot;

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
