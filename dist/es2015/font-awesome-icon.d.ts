import { AbstractElement, IconDefinition, IconName, IconPrefix, Transform } from '@fortawesome/fontawesome-svg-core';
import { Container, OverrideContext, ViewCompiler, ViewResources } from 'aurelia-framework';
declare type BoundIconArg = IconDefinition | IconName | Array<IconName | IconPrefix>;
declare type PullArg = 'right' | 'left';
declare type RotationArg = 90 | 180 | 270;
declare type FlipArg = 'horizontal' | 'vertical' | 'both';
declare type SizeArg = 'lg' | 'xs' | 'sm' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x';
declare type StackArg = '1x' | '2x';
export declare class FontAwesomeIconCustomElement {
    private $element;
    private container;
    private viewCompiler;
    private resources;
    static inject(): ({
        new (): Element;
        prototype: Element;
    } | typeof Container | typeof ViewResources | typeof ViewCompiler)[];
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
    flip: FlipArg;
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
    pull: PullArg;
    /**
     * {@link https://fontawesome.com/how-to-use/on-the-web/styling/animating-icons}
     */
    pulse: boolean;
    /**
     * {@link https://fontawesome.com/how-to-use/on-the-web/styling/rotating-icons}
     */
    rotation?: RotationArg;
    /**
     * {@link https://fontawesome.com/how-to-use/on-the-web/styling/sizing-icons}
     */
    size?: SizeArg;
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
    stack?: StackArg;
    private bindingContext;
    private overrideContext;
    private classes;
    private slot;
    private logger;
    constructor($element: Element, container: Container, viewCompiler: ViewCompiler, resources: ViewResources);
    bind(bindingContext: any, overrideContext: OverrideContext): void;
    attached(): void;
    detached(): void;
    protected replaceIcon(): void;
    protected borderChanged(value?: boolean): void;
    protected flipChanged(value?: FlipArg): void;
    protected fixedWidthChanged(value?: boolean): void;
    protected inverseChanged(value?: boolean): void;
    protected listItemChanged(value?: boolean): void;
    protected pulseChanged(value?: boolean): void;
    protected spinChanged(value?: boolean): void;
    protected sizeChanged(newValue?: SizeArg, oldValue?: SizeArg): void;
    protected pullChanged(newValue?: PullArg, oldValue?: PullArg): void;
    protected rotationChanged(newValue?: RotationArg, oldValue?: RotationArg): void;
    protected stackChanged(newValue?: StackArg, oldValue?: StackArg): void;
    private cleanAndSetClass;
    protected compile(abstract: AbstractElement): void;
    /**
     * Get all non aurelia and non bound attributes and pass it to the
     * font awesome svg element
     */
    private getOtherAttributes;
}
export {};
