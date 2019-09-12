import { Aurelia } from 'aurelia-framework'
import environment from './environment';
import {
  faCircle,
  faHome,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import './styles.css';

export function configure(aurelia: Aurelia) {
  const options = {
    spin: true
  };

  setInterval(() => options.spin = !options.spin, 5000);

  aurelia.use
    .standardConfiguration()
    // load the plugin ../src
    // The "resources" is mapped to "../src" in aurelia.json "paths"
    .feature('resources', {
      iconOptions: options,
      icons: [ faCircle, faHome, faSpinner ]
    });

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
