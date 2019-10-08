import {
  FontAwesomeIconCustomElement
} from 'resources/font-awesome-icon';
import {
  IconConfigurationVisitor
} from 'resources/icon-configuration-visitor';
import {
  createSpyObj
} from './helpers';
import * as logging from 'aurelia-logging';

describe('the icon configuration visitor', () => {
  let sut: IconConfigurationVisitor;
  let iconElement: FontAwesomeIconCustomElement;
  let logger: any;
  let getLogger: jasmine.Spy;

  beforeEach(() => {
    iconElement = {};
    logger = createSpyObj('logger', logging.Logger.prototype);
    getLogger = spyOn(logging, 'getLogger').and.returnValue(logger);
  });

  [
    null,
    undefined
  ].forEach(icon => {
    it('logs an error when the icon is missing', () => {
      sut = new IconConfigurationVisitor({})

      sut.visit(icon);

      expect(logger.error.calls.count()).toEqual(1);
      expect(getLogger).toHaveBeenCalledWith('aurelia-fontawesome');
      expect(logger.error.calls.argsFor(0)[0]).toEqual(
        'IconConfigurationVisitor: icon could not be configured because ' +
        'it was not passed into the `visit()` method');
    });
  });

  [
    null,
    undefined,
    {}
  ].forEach(iconOptions => {
    it('uses all defaults when no outside icon options are used', () => {
      sut = new IconConfigurationVisitor(iconOptions)

      sut.visit(iconElement);

      expect(iconElement.border).toEqual(false);
      expect(iconElement.className).toEqual('');
      expect(iconElement.fixedWidth).toEqual(false);
      expect(iconElement.flip).toEqual(null);
      expect(iconElement.icon).toEqual(null);
      expect(iconElement.inverse).toEqual(false);
      expect(iconElement.listItem).toEqual(false);
      expect(iconElement.mask).toEqual(null);
      expect(iconElement.pull).toEqual(null);
      expect(iconElement.pulse).toEqual(false);
      expect(iconElement.rotation).toEqual(null);
      expect(iconElement.size).toEqual(null);
      expect(iconElement.spin).toEqual(false);
      expect(iconElement.stack).toEqual(null);
      expect(iconElement.style).toEqual({});
      expect(iconElement.symbol).toEqual(null);
      expect(iconElement.title).toEqual('');
      expect(iconElement.transform).toEqual('');
    });
  });

  it('overrides all the defaults when the outside icon option has a value', () => {
    let iconOptions = {
      border: true,
      className: 'class',
      fixedWidth: true,
      flip: 'flip',
      icon: 'icon',
      inverse: true,
      listItem: true,
      mask: 'mask',
      pull: 'pull',
      pulse: true,
      rotation: 'rotation',
      size: 'size',
      spin: true,
      stack: 'stack',
      style: { foo: 'bar' },
      symbol: 'symb',
      title: 'title',
      transform: 'transform'
    }
    sut = new IconConfigurationVisitor(iconOptions)

    sut.visit(iconElement);

    expect(iconElement.border).toEqual(true);
    expect(iconElement.className).toEqual('class');
    expect(iconElement.fixedWidth).toEqual(true);
    expect(iconElement.flip).toEqual('flip');
    expect(iconElement.icon).toEqual('icon');
    expect(iconElement.inverse).toEqual(true);
    expect(iconElement.listItem).toEqual(true);
    expect(iconElement.mask).toEqual('mask');
    expect(iconElement.pull).toEqual('pull');
    expect(iconElement.pulse).toEqual(true);
    expect(iconElement.rotation).toEqual('rotation');
    expect(iconElement.size).toEqual('size');
    expect(iconElement.spin).toEqual(true);
    expect(iconElement.stack).toEqual('stack');
    expect(iconElement.style).toEqual({ foo: 'bar' });
    expect(iconElement.symbol).toEqual('symb');
    expect(iconElement.title).toEqual('title');
    expect(iconElement.transform).toEqual('transform');
  });
});
