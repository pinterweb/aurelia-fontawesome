import { FrameworkConfiguration } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';

export function configure(aurelia: FrameworkConfiguration) {
  aurelia.globalResources([
    PLATFORM.moduleName('./font-awesome-icon')
  ]);
}

export { FontAwesomeIconCustomElement } from './font-awesome-icon';
