import { inject } from "aurelia-framework";

@inject("defaultOptions")
export class App {
  message = "Aurelia Font Awesome 5 Examples";
  icon = "coffee";
  rotated = false;
  prefix = "fas";

  constructor(private _options) {}

  attached(): void {
    this._options.prefix = "far";
  }

  changeRotation(): void {
    this._options.rotation = !this._options.rotation ? 270 : 0;
    this.rotated = !this.rotated;
  }

  changePrefix(): void {
    this.prefix = !this.prefix ? "fas" : null;
  }
}
