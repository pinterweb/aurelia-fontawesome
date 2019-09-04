import {
  FrameworkConfiguration
} from 'aurelia-framework';
import {
  createSpyObj
} from './helpers'
import {
  configure
} from 'resources/index';

describe('aurelia setup', () => {
  it('registers the custom element in global resources', () => {
    const aurelia: jasmine.SpyObj<FrameworkConfiguration> = createSpyObj('config', FrameworkConfiguration.prototype);

    configure(aurelia);

    expect(aurelia.globalResources).toHaveBeenCalledWith([ './font-awesome-icon' ]);
    expect(aurelia.globalResources.calls.count()).toEqual(1);;
  });
});
