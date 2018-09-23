import { Container, OverrideContext, ViewCompiler, ViewResources, ViewSlot } from 'aurelia-framework';
import { AbstractElement, IconDefinition, IconName, IconPrefix, Transform } from '@fortawesome/fontawesome-svg-core';
declare type BoundIconArg = IconDefinition | IconName | Array<IconName | IconPrefix>;
export declare class FontAwesomeIconCustomElement {
    private $element;
    private container;
    private viewCompiler;
    private resources;
    static inject(): ({
        new (): Element;
        prototype: Element;
    } | typeof Container | typeof ViewResources | typeof ViewCompiler)[];
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
    bindingContext: any;
    overrideContext: OverrideContext;
    classes: any;
    slot: ViewSlot;
    private logger;
    constructor($element: Element, container: Container, viewCompiler: ViewCompiler, resources: ViewResources);
    bind(bindingContext: any, overrideContext: OverrideContext): void;
    attached(): void;
    detached(): void;
    protected compile(abstract: AbstractElement): void;
    /**
     * Get all non aurelia and non bound attributes and pass it to the
     * font awesome svg element
     */
    private getOtherAttributes;
}
export {};
