import { All } from "aurelia-framework";
import { FontAwesomeIconCustomElement } from "./font-awesome-icon";

export const IconVisitorInjectionKey = "FontAwesomeIconCustomElementVisitor";

type IconVisitor = import("./font-awesome-icon").FontAwesomeIconCustomElementVisitor;

export class PluginIconVisitor implements IconVisitor {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  static inject() {
    return [All.of(IconVisitorInjectionKey)];
  }

  constructor(private _visitors: IconVisitor[]) {}

  visit(iconElement: FontAwesomeIconCustomElement): void {
    for (const visitor of this._visitors) {
      visitor.visit(iconElement);
    }
  }
}
