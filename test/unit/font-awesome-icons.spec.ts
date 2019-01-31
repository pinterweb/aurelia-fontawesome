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
  createSpyObj
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

  it('binds default properties', async done => {
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

  ['', '.bind'].forEach(bind => {
    it('uses a border', async done => {
      /* Arrange */
      component.inView(`<font-awesome-icon icon="coffee" border${bind}="true"></font-awesome-icon>`);

      /* Act */
      await component.create(bootstrap);
      const $svg = document.querySelector('svg') as Element;

      /* Assert */
      expect($svg.classList).toContain('fa-border');
      done();
    });
  });

  ['', '.bind'].forEach(bind => {
    it('uses a fixed width', async done => {
      /* Arrange */
      component.inView(`<font-awesome-icon icon="coffee" fixed-width${bind}="true"></font-awesome-icon>`);

      /* Act */
      await component.create(bootstrap);
      const $svg = document.querySelector('svg') as Element;

      /* Assert */
      expect($svg.classList).toContain('fa-fw');
      done();
    });
  });

  ['', '.bind'].forEach(bind => {
    it('uses a inverse', async done => {
      /* Arrange */
      component.inView(`<font-awesome-icon icon="coffee" inverse${bind}="true"></font-awesome-icon>`);

      /* Act */
      await component.create(bootstrap);
      const $svg = document.querySelector('svg') as Element;

      /* Assert */
      expect($svg.classList).toContain('fa-inverse');
      done();
    });
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

  ['', '.bind'].forEach(bind => {
    it('adds list item', async done => {
      /* Arrange */
      component.inView(`<font-awesome-icon icon="coffee" list-item${bind}="true"></font-awesome-icon>`);

      /* Act */
      await component.create(bootstrap);
      const $svg = document.querySelector('svg') as Element;

      /* Assert */
      expect($svg.classList).toContain('fa-li');
      done();
    });
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

  ['', '.bind'].forEach(bind => {
    it('uses pulse', async done => {
      /* Arrange */
      component.inView(`<font-awesome-icon icon="coffee" pulse${bind}="true"></font-awesome-icon>`);

      /* Act */
      await component.create(bootstrap);
      const $svg = document.querySelector('svg') as Element;

      /* Assert */
      expect($svg.classList).toContain('fa-pulse');
      done();
    });
  });

  [ 90, 180, 270, '90', '180', '270' ].forEach(rotation => {
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

  ['', '.bind'].forEach(bind => {
    it('uses spin', async done => {
      /* Arrange */
      component.inView(`<font-awesome-icon icon="coffee" spin${bind}="true"></font-awesome-icon>`);

      /* Act */
      await component.create(bootstrap);
      const $svg = document.querySelector('svg') as Element;

      /* Assert */
      expect($svg.classList).toContain('fa-spin');
      done();
    });
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
      const transform = { flipX: false, flipY: false, rotate: 15, size: 56, x: -4, y: 0 };
      component.inView(`<font-awesome-icon icon="coffee" transform.bind="transform">
        </font-awesome-icon>`).boundTo({ transform });

      /* Act */
      await component.create(bootstrap);
      const $svg = document.querySelector('svg') as Element;

      /* Assert */
      expect($svg.getAttribute('style')).toEqual('transform-origin: 0.375em 0.5em;');
      done();
    });
  });

  [ { prefix: 'fas', iconName: 'circle' },
    [ 'fas', 'circle' ],
    'circle'
  ].forEach(mask => {
    it('accepts a mask definition, string or array', async done => {
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

      /* Assert */
      expect(spy.mock.calls[0][1].symbol).toEqual(false);
      done();
    });

    it('creates a symbol', async done => {
      /* Arrange */
      component.inView('<font-awesome-icon icon.bind="faCoffee" symbol="coffee-icon"></font-awesome-icon>')
        .boundTo({ faCoffee });

      /* Act */
      await component.create(bootstrap);

      /* Assert */
      expect(spy.mock.calls[0][1].symbol).toEqual('coffee-icon');
      done();
    });
  });

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
});
