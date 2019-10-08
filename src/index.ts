import { FrameworkConfiguration, LogManager } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
import { library } from '@fortawesome/fontawesome-svg-core';
import { IconConfigurationVisitor } from './icon-configuration-visitor';
import { IconVisitorInjectionKey, PluginIconVisitor } from './plugin-icon-visitor';

type IconDefinition = import('@fortawesome/fontawesome-svg-core').IconDefinition;
type IconPack = import('@fortawesome/fontawesome-svg-core').IconPack;
type IconName = import('@fortawesome/fontawesome-svg-core').IconName;
type IconPrefix = import('@fortawesome/fontawesome-svg-core').IconPrefix;
type Transform = import('@fortawesome/fontawesome-svg-core').Transform

export type FlipOption = 'horizontal' | 'vertical' | 'both';
export type PullOption = 'right' | 'left';
export type RotationOption = 0 | 90 | 180 | 270;
export type BoundIconArg = IconDefinition |  IconName | Array<IconName | IconPrefix>;
export type SizeOption = 'lg' |'xs' |'sm' |'1x' |'2x' |'3x' |'4x' |'5x' |'6x' |'7x' |'8x' |'9x' |'10x';
export type SymbolOption = boolean | string;
export type TransformOption = Transform | string;
export type StackOption = '1x' | '2x';

export interface FontAwesomePluginOptions {
  iconOptions: Partial<IconOptions>;
  icons: (IconDefinition | IconPack)[];
}

/**
 * Visit {@link https://fontawesome.com} for more information on this options
 */
export interface IconOptions {
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
  style: {[key: string]: string};
  symbol: SymbolOption;
  title: string;
  transform: TransformOption;
  stack?: StackOption;
}

type IconOptionsType = IconOptions;

export function configure(aurelia: FrameworkConfiguration, options: any | Partial<FontAwesomePluginOptions>) {
  aurelia.globalResources([
    PLATFORM.moduleName('./font-awesome-icon')
  ]);

  if (options && options.icons && options.icons.length !== 0) {
    library.add(...options.icons);
  } else {
    LogManager
      .getLogger('aurelia-fontawesome')
      .warn('No icons loaded. You must use "Explicit Loading" or call use ' +
            '`library.add()` on the font awesome Library interface');
  }

  aurelia.container.registerSingleton(PluginIconVisitor, PluginIconVisitor)

  if (options && options.iconOptions) {
    aurelia.container.registerInstance(
      IconVisitorInjectionKey,
      new IconConfigurationVisitor(options.iconOptions)
    );
  }
}
