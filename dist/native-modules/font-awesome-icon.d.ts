import {
  ViewCompiler,
  ViewResources,
  ViewSlot,
  Container,
  OverrideContext
} from "aurelia-framework";
import { PluginIconVisitor } from "./plugin-icon-visitor";
declare type IconPrefix = import("@fortawesome/fontawesome-svg-core").IconPrefix;
declare type IconOptions = import("./index").IconOptions;
declare type FlipOption = import("./index").FlipOption;
declare type PullOption = import("./index").PullOption;
declare type RotationOption = import("./index").RotationOption;
declare type BoundIconArg = import("./index").BoundIconArg;
declare type SizeOption = import("./index").SizeOption;
declare type SymbolOption = import("./index").SymbolOption;
declare type TransformOption = import("./index").TransformOption;
declare type StackOption = import("./index").StackOption;
declare type BindingContext = Record<string, any>;
export interface FontAwesomeIconCustomElementVisitor {
  visit(iconElement: FontAwesomeIconCustomElement): any;
}
export declare class FontAwesomeIconCustomElement implements IconOptions {
  private $element;
  private _container;
  private _resources;
  private _compiler;
  private _slot;
  static inject: (
    | {
        new (): Element;
        prototype: Element;
      }
    | typeof Container
    | typeof ViewResources
    | typeof ViewSlot
    | typeof ViewCompiler
    | typeof PluginIconVisitor)[];
  border: boolean;
  className: string;
  fixedWidth: boolean;
  flip: FlipOption;
  icon: BoundIconArg;
  inverse: boolean;
  listItem: boolean;
  mask: BoundIconArg;
  pull: PullOption;
  pulse: boolean;
  rotation: RotationOption;
  size: SizeOption;
  spin: boolean;
  style: {
    [key: string]: string;
  };
  symbol: SymbolOption;
  title: string;
  transform: TransformOption;
  stack: StackOption;
  prefix: IconPrefix;
  private logger;
  private iconLookup;
  _iconhtml: string;
  _bindingContext: BindingContext;
  constructor(
    $element: Element,
    _container: Container,
    _resources: ViewResources,
    _compiler: ViewCompiler,
    _slot: ViewSlot,
    _visitor: FontAwesomeIconCustomElementVisitor
  );
  bind(bindingContext: BindingContext, _: OverrideContext): void;
  attached(): void;
  propertyChanged(prop: string): void;
  private getOtherAttributes;
  private renderIcon;
  unbind(): void;
  detached(): void;
  private createIcon;
}
export {};
