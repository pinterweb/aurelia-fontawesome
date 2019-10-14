import {
  AbstractElement
} from '@fortawesome/fontawesome-svg-core';

function convert(createElement: (tag: string) => Element, element: AbstractElement): Element {
  const children = (element.children || []).map(child => {
    if (typeof child === 'string') {
      return child;
    }

    return convert(createElement, child);
  });

  const $el = createElement(element.tag);

  if (element.attributes) {
    for (const attr of Object.keys(element.attributes)) {
       $el.setAttribute(attr, element.attributes[attr]);
    }
  }

  children.forEach(c => typeof(c) === 'string' ? $el.textContent = c : $el.appendChild(c));

  return $el;
}

export default convert;
