import { inject } from 'aurelia-framework';

@inject('globalOptions')
export class App {
  message = 'Aurelia Font Awesome 5 Examples';
  icon = 'coffee'
  coffeeSpilled = false;

  constructor(private _options) {
  }

  spillGlobal() {
    this._options.rotation = !this._options.rotation ? 270 : 0;
    this.coffeeSpilled = !this.coffeeSpilled;
  }
}
