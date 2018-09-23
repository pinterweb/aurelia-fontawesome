import { AbstractElement } from '@fortawesome/fontawesome-svg-core';
declare function convert(createElement: (tag: string) => HTMLElement, element: AbstractElement): HTMLElement | string;
export default convert;
