import { Aurelia } from 'aurelia-framework'
import environment from './environment';
import {
  library
} from '@fortawesome/fontawesome-svg-core';
import {
  faCircle,
  faHome,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import './styles.css';

library.add(
  faCircle,
  faHome,
  faSpinner
);

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    // load the plugin ../src
    // The "resources" is mapped to "../src" in aurelia.json "paths"
    .feature('resources');

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
