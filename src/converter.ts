import {
  AbstractElement
} from '@fortawesome/fontawesome-svg-core';

function convert(createElement: (tag: string) => HTMLElement, element: AbstractElement): HTMLElement | string {
  const children = (element.children || []).map(convert.bind(null, createElement)) as Array<HTMLElement | string>;

  if (typeof element === 'string') {
    return element;
  } else {
    const $el = createElement(element.tag);

    if (element.attributes) {
      for (const attr of Object.keys(element.attributes)) {
         $el.setAttribute(attr, element.attributes[attr]);
      }
    }

    $el.innerHTML = children.map(child => (child as HTMLElement).outerHTML || child).join('');

    return $el;
  }
}

export default convert;
