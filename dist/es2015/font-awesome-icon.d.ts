import { AbstractElement, IconDefinition, IconName, IconPrefix, Transform } from '@fortawesome/fontawesome-svg-core';
declare type BoundIconArg = IconDefinition | IconName | Array<IconName | IconPrefix>;
export declare class FontAwesomeIconCustomElement {
    private $element;
    static inject(): {
        new (): Element;
        prototype: Element;
    }[];
    /**
     * {@link https://fontawesome.com/how-to-use/on-the-web/styling/bordered-pulled-icons}
     */
    border: boolean;
    /**
     * Your own class name that will be added to the SVGElement
     */
    className: string;
    /**
     * {@link https://fontawesome.com/how-to-use/on-the-web/styling/fixed-width-icons}
     */
    fixedWidth: boolean;
    flip: 'horizontal' | 'vertical' | 'both';
    icon: BoundIconArg;
    inverse: boolean;
    /**
     * {@link https://fontawesome.com/how-to-use/on-the-web/styling/icons-in-a-list}
     */
    listItem: boolean;
    /**
     * {@link https://fontawesome.com/how-to-use/on-the-web/styling/masking}
     */
    mask?: BoundIconArg;
    pull: 'right' | 'left';
    /**
     * {@link https://fontawesome.com/how-to-use/on-the-web/styling/animating-icons}
     */
    pulse: boolean;
    /**
     * {@link https://fontawesome.com/how-to-use/on-the-web/styling/rotating-icons}
     */
    rotation?: 90 | 180 | 270;
    /**
     * {@link https://fontawesome.com/how-to-use/on-the-web/styling/sizing-icons}
     */
    size?: 'lg' | 'xs' | 'sm' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x';
    /**
     * {@link https://fontawesome.com/how-to-use/on-the-web/styling/animating-icons}
     */
    spin: boolean;
    style: any;
    /**
     * {@link https://fontawesome.com/how-to-use/on-the-web/advanced/svg-symbols}
     */
    symbol: boolean | string;
    title: string;
    /**
     * {@link https://fontawesome.com/how-to-use/on-the-web/styling/power-transforms}
     */
    transform: string | Transform;
    /**
     * {@link https://fontawesome.com/how-to-use/on-the-web/styling/stacking-icons}
     */
    stack?: '1x' | '2x';
    private logger;
    private iconLookup;
    _iconhtml: string;
    constructor($element: Element);
    attached(): void;
    iconChanged(): void;
    propertyChanged(): void;
    protected compile(abstract: AbstractElement): void;
    /**
     * Get all non aurelia and non bound attributes and pass it to the
     * font awesome svg element
     */
    private getOtherAttributes;
    private renderIcon;
}
export {};
