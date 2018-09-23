import {
  PLATFORM,
  FrameworkConfiguration
} from 'aurelia-framework';

export function configure(aurelia: FrameworkConfiguration) {
  aurelia.globalResources(PLATFORM.moduleName('./font-awesome-icon'));
}

export * from './font-awesome-icon';
