import { FontAwesomeIconCustomElement } from './font-awesome-icon';

type IconOptions = import('./index').IconOptions;
type IconVisitor = import('./font-awesome-icon').FontAwesomeIconCustomElementVisitor;

const defaultIconOptions: IconOptions = {
  border: false,
  className: '',
  fixedWidth: false,
  flip: null,
  icon: null,
  inverse: false,
  listItem: false,
  mask: null,
  pull: null,
  pulse: false,
  rotation: null,
  size: null,
  spin: false,
  style: {},
  symbol: null,
  title: '',
  transform: '',
  stack: null
}

export class IconConfigurationVisitor implements IconVisitor {
  _overrideOptions: Partial<IconOptions>

  constructor(private iconOptions: Partial<IconOptions>) {
    this._overrideOptions = iconOptions || {};
  }

  visit(iconElement: FontAwesomeIconCustomElement) {
    for (const key in defaultIconOptions) {
      const overrideValue = this._overrideOptions[key];

      iconElement[key] =
        (typeof(overrideValue) !== 'undefined' ? overrideValue : defaultIconOptions[key]);
    }
  }
}
