import { inject } from 'aurelia-framework';

@inject('defaultOptions')
export class App {
  message = 'Aurelia Font Awesome 5 Examples';
  icon = 'coffee'
  rotated = false;
  prefix = 'fas';

  constructor(private _options) {
  }

  attached() {
    this._options.prefix = 'far'
  }

  changeRotation() {
    this._options.rotation = !this._options.rotation ? 270 : 0;
    this.rotated = !this.rotated;
  }

  changePrefix() {
    this.prefix = !this.prefix ? 'fas' : null;
  }
}
