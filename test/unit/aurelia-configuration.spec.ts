import {
  FrameworkConfiguration
} from 'aurelia-framework';
import {
  createSpyObj
} from './helpers'
import {
  configure
} from '../../src/aurelia-fontawesome';

describe('aurelia setup', () => {
  it('registers the custom element in global resources', () => {
    const aurelia: FrameworkConfiguration = createSpyObj('config', FrameworkConfiguration.prototype);

    configure(aurelia);

    expect(aurelia.globalResources).toHaveBeenCalledWith('./font-awesome-icon');
    expect(aurelia.globalResources).toHaveBeenCalledTimes(1);
  });
});
