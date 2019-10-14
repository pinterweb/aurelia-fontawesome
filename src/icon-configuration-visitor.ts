import {
  FontAwesomeIconCustomElement
} from './font-awesome-icon';
import {
  LogManager
} from 'aurelia-framework';

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
  stack: null,
  style: {},
  symbol: null,
  title: '',
  transform: '',
  prefix: 'fas'
}

export class IconConfigurationVisitor implements IconVisitor {
  _logger = LogManager.getLogger('aurelia-fontawesome');
  _overrideOptions: Partial<IconOptions>

  constructor(private iconOptions: Partial<IconOptions>) {
    this._overrideOptions = iconOptions || {};
  }

  visit(iconElement: FontAwesomeIconCustomElement) {
    if (!iconElement) {
      this._logger.error('IconConfigurationVisitor: icon could not be configured because ' +
                        'it was not passed into the `visit()` method');

    } else {
      for (const key in defaultIconOptions) {
        const overrideValue = this._overrideOptions[key];

        iconElement[key] =
          (typeof(overrideValue) !== 'undefined' ? overrideValue : defaultIconOptions[key]);
      }
    }
  }
}
