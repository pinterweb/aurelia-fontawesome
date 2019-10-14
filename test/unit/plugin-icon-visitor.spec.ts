import {
  FontAwesomeIconCustomElement,
  FontAwesomeIconCustomElementVisitor
} from 'resources/font-awesome-icon';
import {
  PluginIconVisitor
} from 'resources/plugin-icon-visitor';

describe('the icon plugin visitor', () => {
  let sut: PluginIconVisitor;
  let iconElement: FontAwesomeIconCustomElement;
  let visitors: jasmine.SpyObj<FontAwesomeIconCustomElementVisitor>[];

  beforeEach(() => {
    iconElement = {};
    visitors = [
      jasmine.createSpyObj('visitor', [ 'visit' ]),
      jasmine.createSpyObj('visitor', [ 'visit' ])
    ];
    sut = new PluginIconVisitor(visitors);
  });

  it('calls all visitors', () => {
    sut.visit(iconElement);

    expect(visitors[0].visit.calls.count()).toEqual(1);
    expect(visitors[0].visit.calls.argsFor(0)[0]).toBe(iconElement);
    expect(visitors[1].visit.calls.count()).toEqual(1);
    expect(visitors[1].visit.calls.argsFor(0)[0]).toBe(iconElement);
  });
});
