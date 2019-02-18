import {
  PLATFORM
} from 'aurelia-framework';
import {
  bootstrap
} from 'aurelia-bootstrapper';
import {
  StageComponent,
  ComponentTester
} from 'aurelia-testing';
import {
  FontAwesomeIconCustomElement
} from '../../src/aurelia-fontawesome';
import {
  createSpyObj,
  toHyphenCase
} from './helpers';
import {
  faCoffee,
  faCircle
} from './icons';
import * as fontawesome from '@fortawesome/fontawesome-svg-core';
import * as logging from 'aurelia-logging';

fontawesome.library.add(faCoffee, faCircle);

describe('the font awesome icon custom element', () => {
  let component: ComponentTester<FontAwesomeIconCustomElement>;
  let logger: logging.Logger;

  beforeEach(() => {
    component = StageComponent
    .withResources(
      PLATFORM.moduleName('../../src/font-awesome-icon')
    );

    logger = createSpyObj('logger', logging.Logger.prototype);
  });

  afterEach(() => component.dispose());

  it('binds the default property values', async done => {
    /* Arrange */
    component.inView('<font-awesome-icon icon="coffee"></font-awesome-icon>');

    /* Act */
    await component.create(bootstrap);
    const $svg = document.querySelector('svg') as Element;

    /* Assert */
    expect($svg).toBeTruthy();
    expect($svg.classList).not.toContain('fa-border');
    expect($svg.classList).not.toContain('fa-fw');
    expect($svg.className).not.toContain('fa-flip');
    expect($svg.classList).not.toContain('fa-inverse');
    expect($svg.classList).not.toContain('fa-li');
    expect($svg.querySelector('clipPath')).toBeFalsy();
    expect($svg.className).not.toContain('fa-pull');
    expect($svg.classList).not.toContain('fa-pulse');
    expect($svg.className).not.toContain('fa-rotate-');
    expect($svg.className).not.toContain('fa-spin');
    expect($svg.className).not.toContain('fa-stack-');
    expect($svg.querySelector('title')).toBeFalsy();
    done();
  });

  [ { prefix: 'fas', iconName: 'coffee' },
    [ 'fas', 'coffee' ],
    'coffee'
  ].forEach(icon => {
    it('accepts an icon definition, string or array', async done => {
      /* Arrange */
      component.inView('<font-awesome-icon icon.bind="icon"></font-awesome-icon>')
      .boundTo({ icon });

      /* Act */
      await component.create(bootstrap);
      const $svg = document.querySelector('svg') as Element;

      /* Assert */
      expect($svg).toBeTruthy();
      expect($svg.classList).toContain('fa-coffee');
      expect($svg.getAttribute('aria-hidden')).toBeTruthy();
      expect($svg.getAttribute('data-icon')).toEqual('coffee');
      done();
    });
  });

  [ { icon: null, loggedObj: null },
    { icon: { prefix: 'fas' }, loggedObj: { prefix: 'fas' } },
    { icon: { iconName: 'coffee' }, loggedObj: { iconName: 'coffee' } },
    { icon: [ 'coffee' ], loggedObj: [ 'coffee' ] },
  ].forEach(rec => {
    it('logs an error with unsupported icon arg', async done => {
      /* Arrange */
      component.inView('<font-awesome-icon icon.bind="icon"></font-awesome-icon>')
      .boundTo({ icon: rec.icon });

      spyOn(logging, 'getLogger').and.returnValue(logger);

      /* Act */
      await component.create(bootstrap);

      /* Assert */
      expect(logging.getLogger).toHaveBeenCalledWith('aurelia-fontawesome');
      expect(logger.error).toHaveBeenCalledWith('Bound icon prop is either unsupported or null', rec.loggedObj);
      done();
    });
  });

  [ { prefix: 'fas', iconName: 'foo' },
    [ 'fas', 'foo' ],
    'foo'
  ].forEach(icon => {
    it('logs an error with missing icon', async done => {
      /* Arrange */
      component.inView(`<font-awesome-icon icon.bind="icon">
                       </font-awesome-icon>`).boundTo({ icon });

      spyOn(logging, 'getLogger').and.returnValue(logger);

      /* Act */
      await component.create(bootstrap);

      /* Assert */
      expect(logging.getLogger).toHaveBeenCalledWith('aurelia-fontawesome');
      expect(logger.error).toHaveBeenCalledWith(
        'Could not find icon',
        { prefix: 'fas', iconName: 'foo' });
      done();
    });
  });

  it('uses a border', async done => {
    /* Arrange */
    component.inView('<font-awesome-icon icon="coffee" border.bind="true"></font-awesome-icon>');

    /* Act */
    await component.create(bootstrap);
    const $svg = document.querySelector('svg') as Element;

    /* Assert */
    expect($svg.classList).toContain('fa-border');
    done();
  });

  it('uses a fixed width', async done => {
    /* Arrange */
    component.inView('<font-awesome-icon icon="coffee" fixed-width.bind="true"></font-awesome-icon>');

    /* Act */
    await component.create(bootstrap);
    const $svg = document.querySelector('svg') as Element;

    /* Assert */
    expect($svg.classList).toContain('fa-fw');
    done();
  });

  it('uses a inverse', async done => {
    /* Arrange */
    component.inView('<font-awesome-icon icon="coffee" inverse.bind="true"></font-awesome-icon>');

    /* Act */
    await component.create(bootstrap);
    const $svg = document.querySelector('svg') as Element;

    /* Assert */
    expect($svg.classList).toContain('fa-inverse');
    done();
  });

  describe('extra element data', () => {
    it('adds all classes', async done => {
      /* Arrange */
      component.inView(`<font-awesome-icon icon="coffee" class-name="foo bar"></font-awesome-icon>`);

      /* Act */
      await component.create(bootstrap);
      const $svg = document.querySelector('svg') as Element;

      /* Assert */
      expect($svg.classList).toContain('foo');
      expect($svg.classList).toContain('bar');
      done();
    });

    it('adds extra attributes', async done => {
      /* Arrange */
      component.inView(`<font-awesome-icon icon="coffee" rel="local"></font-awesome-icon>`);

      /* Act */
      await component.create(bootstrap);
      const $svg = document.querySelector('svg') as Element;

      /* Assert */
      expect($svg.getAttribute('rel')).toEqual('local');
      done();
    });
  });

  describe('using styles', () => {
    it('adds extra styles', async done => {
      /* Arrange */
      const style = { background: 'red' };
      component.inView(`<font-awesome-icon icon="coffee" style.bind="style">
         </font-awesome-icon>`).boundTo({ style });

      /* Act */
      await component.create(bootstrap);
      const $svg = document.querySelector('svg') as Element;

      /* Assert */
      expect($svg.getAttribute('style')).toEqual('background: red;');
      done();
    });

    it('changes the style when updated', async done => {
      /* Arrange */
      const context = {
        style: {  },
      };
      component.inView(`<font-awesome-icon icon="coffee" style.bind="style">
                       </font-awesome-icon>`).boundTo(context);

      await component.create(bootstrap);

      /* Act */
      context.style = {
        background: 'red'
      };
      const $svg = await component.waitForElement('svg[style]');

      /* Assert */
      expect($svg.getAttribute('style')).toEqual('background: red;');
      done();
    }, 6000);
  });

  describe('using flip', () => {
    [ { flip: 'horizontal', className: 'fa-flip-horizontal' },
      { flip: 'vertical', className: 'fa-flip-vertical' }
    ].forEach(rec => {
      it('adds horizontal OR vertical flip', async done => {
        /* Arrange */
        component.inView(`<font-awesome-icon icon="coffee" flip.bind="flip"></font-awesome-icon>`)
          .boundTo({ flip: rec.flip });

        /* Act */
        await component.create(bootstrap);
        const $svg = document.querySelector('svg') as Element;

        /* Assert */
        expect($svg.classList).toContain(rec.className);
        done();
      });
    });

    it('adds horizontal AND vertical flip', async done => {
      /* Arrange */
      component.inView(`<font-awesome-icon icon="coffee" flip="both"></font-awesome-icon>`);

      /* Act */
      await component.create(bootstrap);
      const $svg = document.querySelector('svg') as Element;

      /* Assert */
      expect($svg.classList).toContain('fa-flip-vertical');
      expect($svg.classList).toContain('fa-flip-horizontal');
      done();
    });
  });

  it('adds list item', async done => {
    /* Arrange */
    component.inView(`<font-awesome-icon icon="coffee" list-item.bind="true"></font-awesome-icon>`);

    /* Act */
    await component.create(bootstrap);
    const $svg = document.querySelector('svg') as Element;

    /* Assert */
    expect($svg.classList).toContain('fa-li');
    done();
  });

  [ 'right', 'left' ].forEach(pull => {
    it('uses pull', async done => {
      /* Arrange */
      component.inView(`<font-awesome-icon icon="coffee" pull.bind="pull"></font-awesome-icon>`)
        .boundTo({ pull });

      /* Act */
      await component.create(bootstrap);
      const $svg = document.querySelector('svg') as Element;

      /* Assert */
      expect($svg.classList).toContain('fa-pull-' + pull);
      done();
    });
  });

  it('uses pulse', async done => {
    /* Arrange */
    component.inView(`<font-awesome-icon icon="coffee" pulse.bind="true"></font-awesome-icon>`);

    /* Act */
    await component.create(bootstrap);
    const $svg = document.querySelector('svg') as Element;

    /* Assert */
    expect($svg.classList).toContain('fa-pulse');
    done();
  });

  [ '90', '180', '270' ].forEach(rotation => {
    it('uses rotation', async done => {
      /* Arrange */
      component.inView(`<font-awesome-icon icon="coffee" rotation.bind="rotation"></font-awesome-icon>`)
        .boundTo({ rotation });

      /* Act */
      await component.create(bootstrap);
      const $svg = document.querySelector('svg') as Element;

      /* Assert */
      expect($svg.classList).toContain('fa-rotate-' + rotation);
      done();
    });
  });

  it('uses spin', async done => {
    /* Arrange */
    component.inView(`<font-awesome-icon icon="coffee" spin.bind="true"></font-awesome-icon>`);

    /* Act */
    await component.create(bootstrap);
    const $svg = document.querySelector('svg') as Element;

    /* Assert */
    expect($svg.classList).toContain('fa-spin');
    done();
  });

  [ 'lg', 'xs', 'sm', '1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x' ].forEach(size => {
    it('uses size', async done => {
      /* Arrange */
      component.inView(`<font-awesome-icon icon="coffee" size.bind="size"></font-awesome-icon>`)
        .boundTo({ size });

      /* Act */
      await component.create(bootstrap);
      const $svg = document.querySelector('svg') as Element;

      /* Assert */
      expect($svg.classList).toContain('fa-' + size);
      done();
    });
  });

  describe('using transform', () => {
    const transformObj = {
      flipX: false,
      flipY: false,
      rotate: 15,
      size: 56,
      x: -4,
      y: 0
    };

    it('uses a string', async done => {
      /* Arrange */
      component.inView(`<font-awesome-icon icon="coffee" transform="grow-40 left-4 rotate-15">
        </font-awesome-icon>`);

      /* Act */
      await component.create(bootstrap);
      const $svg = document.querySelector('svg') as Element;

      /* Assert */
      expect($svg.getAttribute('style')).toEqual('transform-origin: 0.375em 0.5em;');
      done();
    });

    it('uses an object', async done => {
      /* Arrange */
      const transform = transformObj;
      component.inView(`<font-awesome-icon icon="coffee" transform.bind="transform">
        </font-awesome-icon>`).boundTo({ transform });

      /* Act */
      await component.create(bootstrap);
      const $svg = document.querySelector('svg') as Element;

      /* Assert */
      expect($svg.getAttribute('style')).toEqual('transform-origin: 0.375em 0.5em;');
      done();
    });

    it('updates when the property changes', async done => {
      /* Arrange */
      const context = {
        transform: null as any
      }
      component.inView(`<font-awesome-icon icon="coffee" transform.bind="transform">
        </font-awesome-icon>`).boundTo(context);

      await component.create(bootstrap);

      /* Act */
      context.transform = transformObj;

      const $svg = await component.waitForElement('svg[style]');

      /* Assert */
      expect($svg.getAttribute('style')).toEqual('transform-origin: 0.375em 0.5em;');
      done();
    });
  });

  describe('using mask', () => {
    const maskArgs = [
      { prefix: 'fas', iconName: 'circle' },
      [ 'fas', 'circle' ]
    ];

    maskArgs.forEach(mask => {
      it('works with a string or array', async done => {
        /* Arrange */
        component.inView('<font-awesome-icon icon="coffee" mask.bind="mask"></font-awesome-icon>')
          .boundTo({ mask });

        /* Act */
        await component.create(bootstrap);
        const $svg = document.querySelector('svg') as Element;
        const $clipPath = $svg.querySelector('clipPath') as Element;

        /* Assert */
        expect($clipPath).toBeTruthy();
        done();
      });
    });

    maskArgs.forEach(mask => {
      it('changes on property update', async done => {
        /* Arrange */
        const context = {
          mask: null as any
        };
        component.inView(`<font-awesome-icon icon="coffee" mask.bind="mask">
                         </font-awesome-icon>`).boundTo(context);

        await component.create(bootstrap);
        const $svg = document.querySelector('svg') as Element;
        const $clipPathBefore = $svg.querySelector('clipPath') as Element;
        expect($clipPathBefore).toBeFalsy();

        /* Act */
        context.mask = mask

        const $clipPathAfter = await component.waitForElement('clipPath') as Element;

        /* Assert */
        expect($clipPathAfter).toBeTruthy();
        done();
      });
    });
  });

  [ '1x', '2x' ].forEach(stack => {
    it('stacks', async done => {
      /* Arrange */
      component.inView(`<font-awesome-icon icon="coffee" stack.bind="stack"></font-awesome-icon>`)
        .boundTo({ stack });

      /* Act */
      await component.create(bootstrap);
      const $svg = document.querySelector('svg') as Element;

      /* Assert */
      expect($svg.classList).toContain('fa-stack-' + stack);
      done();
    });
  });

  describe('symbol', () => {
    const spy = jest.spyOn(fontawesome, 'icon');

    afterEach(() => {
      spy.mockClear();
    });

    it('will not create a symbol', async done => {
      /* Arrange */
      component.inView('<font-awesome-icon icon.bind="faCoffee"></font-awesome-icon>')
        .boundTo({ faCoffee });

      /* Act */
      await component.create(bootstrap);
      const $symbol = document.querySelector('symbol') as Element;

      /* Assert */
      expect($symbol).toEqual(null);
      expect(spy.mock.calls[0][1].symbol).toEqual(false);
      done();
    });

    it('creates a symbol', async done => {
      /* Arrange */
      component.inView(`<font-awesome-icon icon.bind="faCoffee" symbol="coffee-icon">
                       </font-awesome-icon>`).boundTo({ faCoffee });

      /* Act */
      await component.create(bootstrap);
      const $symbol = await component.waitForElement('symbol') as Element;

      /* Assert */
      expect($symbol.id).toEqual('coffee-icon');
      done();
    }, 6000);

    it('creates a symbol when the property changes', async done => {
      const context: any = { }

      /* Arrange */
      component.inView(`<font-awesome-icon icon="coffee" symbol.bind="symbol">
                       </font-awesome-icon>`).boundTo(context);

      await component.create(bootstrap);

      /* Act */
      context.symbol = 'coffee-icon';

      const $symbol = await component.waitForElement('symbol') as Element;

      /* Assert */
      expect($symbol.id).toEqual('coffee-icon');
      done();
    });
  });

  describe('the title property', () => {
    it('adds a title element', async done => {
      /* Arrange */
      component.inView('<font-awesome-icon icon="coffee" title="foobar"></font-awesome-icon>');

      /* Act */
      await component.create(bootstrap);
      const $svg = document.querySelector('svg') as Element;

      expect($svg.children[0].tagName).toEqual('title');
      expect($svg.children[0].textContent).toEqual('foobar');
      done();
    });

    it('changes the title name when the prop changes', async done => {
      /* Arrange */
      const context = {
        title: ''
      }
      component.inView(`<font-awesome-icon icon="coffee" title.bind="title">
                       </font-awesome-icon>`).boundTo(context);

      /* Act */
      await component.create(bootstrap);

      context.title = 'bar';

      const $title = await component.waitForElement('title');

      expect($title).not.toEqual(null);
      expect($title.textContent).toEqual('bar');
      done();
    });
  });

  [{ prop: 'border', val: true, className: 'fa-border' },
   { prop: 'fixedWidth', val: true, className: 'fa-fw' },
   { prop: 'flip', val: 'horizontal', className: 'fa-flip-horizontal' },
   { prop: 'flip', val: 'vertical', className: 'fa-flip-vertical' },
   { prop: 'flip', val: 'both', className: 'fa-flip-horizontal' },
   { prop: 'flip', val: 'both', className: 'fa-flip-vertical' },
   { prop: 'inverse', val: true, className: 'fa-inverse' },
   { prop: 'listItem', val: true, className: 'fa-li' },
   { prop: 'pull', val: 'right', className: 'fa-pull-right' },
   { prop: 'pull', val: 'left', className: 'fa-pull-left' },
   { prop: 'pulse', val: true, className: 'fa-pulse' },
   { prop: 'rotation', val: 90, className: 'fa-rotate-90' },
   { prop: 'rotation', val: 180, className: 'fa-rotate-180' },
   { prop: 'rotation', val: 270, className: 'fa-rotate-270' },
   { prop: 'size', val: 'lg', className: 'fa-lg' },
   { prop: 'spin', val: true, className: 'fa-spin' },
   { prop: 'stack', val: '1x', className: 'fa-stack-1x' }
  ].forEach(rec => {
    it('recompiles when any bindable property changes', async done => {
      /* Arrange */
      const context = {
        [rec.prop]: null
      };
      component
        .inView(`<font-awesome-icon icon="coffee"
                ${toHyphenCase(rec.prop)}.bind="${rec.prop}"></font-awesome-icon>`)
        .boundTo(context);

      await component.create(bootstrap);
      const $beforePropChange = document.querySelector('svg') as Element;

      /* Act */
      context[rec.prop] = rec.val as any;

      expect($beforePropChange.classList).not.toContain(rec.className);

      const $afterPropChange = await component.waitForElement(`.${rec.className}`);

      expect($afterPropChange.classList).toContain(rec.className);
      done();
    }, 6000);
  });

  it('recompiles when the icon when it changes', async done => {
    /* Arrange */
    const context = {
      icon: 'coffee'
    };
    component
      .inView('<font-awesome-icon icon.bind="icon"></font-awesome-icon>')
      .boundTo(context);

    await component.create(bootstrap);

    /* Act */
    context.icon = 'circle';

    const $afterPropChange = await component.waitForElement('.fa-circle');

    expect($afterPropChange.classList).toContain('fa-circle');
    expect(document.querySelectorAll('font-awesome-icon').length).toEqual(1);
    done();
  }, 6000);

  it('only creates one icon', async done => {
    /* Arrange */
    const context = {
      icon: 'coffee'
    };
    component
      .inView('<font-awesome-icon icon.bind="icon"></font-awesome-icon>')
      .boundTo(context);
    await component.create(bootstrap);

    /* Act */
    context.icon = 'circle';

    await component.waitForElement('.fa-circle');
    const $icons = document.querySelectorAll('svg');
    /* Assert */
    expect($icons.length).toEqual(1);
    done();
  });
});
