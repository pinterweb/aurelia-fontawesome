import 'aurelia-polyfills';
import {initialize} from 'aurelia-pal-browser';
initialize();

// Aurelia's waitFor defaults to 5000ms so let that error before
// jasmine throws a timeout error or else we will have timeout errors
// without seeing the actual error
beforeEach(() => jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000);

afterEach(() => jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000);
