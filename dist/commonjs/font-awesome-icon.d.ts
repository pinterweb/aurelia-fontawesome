import { IconDefinition, IconName, IconPrefix, Transform } from '@fortawesome/fontawesome-svg-core';
declare type BoundIconArg = IconDefinition | IconName | Array<IconName | IconPrefix>;
export declare class FontAwesomeIconCustomElement {
    private $element;
    static inject(): {
        new (): Element;
        prototype: Element;
    }[];
    border: boolean;
    className: string;
    fixedWidth: boolean;
    flip: 'horizontal' | 'vertical' | 'both';
    icon: BoundIconArg;
    inverse: boolean;
    listItem: boolean;
    mask?: BoundIconArg;
    pull: 'right' | 'left';
    pulse: boolean;
    rotation?: 90 | 180 | 270;
    size?: 'lg' | 'xs' | 'sm' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x';
    spin: boolean;
    style: any;
    symbol: boolean | string;
    title: string;
    transform: string | Transform;
    stack?: '1x' | '2x';
    private logger;
    private iconLookup;
    _iconhtml: string;
    constructor($element: Element);
    bind(): void;
    propertyChanged(prop: string): void;
    private getOtherAttributes;
    private renderIcon;
    private createIcon;
}
export {};
