import { Aurelia } from 'aurelia-framework'
import environment from './environment';
import {
  faCircle,
  faHome,
  faSpinner,
  faCoffee,
  faMugHot,
  faThumbsUp as fasThumbsUp
} from '@fortawesome/free-solid-svg-icons';
import { fab  } from '@fortawesome/free-brands-svg-icons'
import { faThumbsUp  } from '@fortawesome/free-regular-svg-icons'

export function configure(aurelia: Aurelia) {
  const options = {
    rotation: 0,
    size: '2x'
  };

  aurelia.container.registerInstance('defaultOptions', options);

  aurelia.use
    .standardConfiguration()
    // load the plugin ../src
    // The "resources" is mapped to "../src" in aurelia.json "paths"
    .feature('resources', {
      iconOptions: options,
      icons: [ fab, faCircle, faHome, faSpinner, faCoffee, faMugHot, faThumbsUp, fasThumbsUp ]
    });

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
