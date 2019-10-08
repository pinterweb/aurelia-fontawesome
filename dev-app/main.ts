import { Aurelia } from 'aurelia-framework'
import environment from './environment';
import {
  faCircle,
  faHome,
  faSpinner,
  faCoffee,
  faMugHot
} from '@fortawesome/free-solid-svg-icons';
import { fab  } from '@fortawesome/free-brands-svg-icons'
import './styles.css';

export function configure(aurelia: Aurelia) {
  const options = {
    rotation: 0
  };

  aurelia.container.registerInstance('globalOptions', options);

  aurelia.use
    .standardConfiguration()
    // load the plugin ../src
    // The "resources" is mapped to "../src" in aurelia.json "paths"
    .feature('resources', {
      iconOptions: options,
      icons: [ fab, faCircle, faHome, faSpinner, faCoffee, faMugHot ]
    });

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
