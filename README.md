# Angular Version 9 Component-Based Forms

This is the code distribution for the Medium Article, _Component-Based Forms_ (url).

The current cubic Bezier library is illustrated via an interactive Angular 8 demo that uses PIXI 4 for dynamic drawing.  Four-point cubic Bezier interpolation is used for geometric constraints.  Instead of interpolating the Bezier curve at endpoints and using interior control points to influence the curve's shape, the cubic curve is forced to interpolate four points.  The interior control points are computed to enforce the interpolation constraints.

Points on the curve at equal increments of _t_ and _s_ may also be illustrated.  Drag one of the control points to see how the relationship between the two varies as a function of the geometric constraints.


Author:  Jim Armstrong - [The Algorithmist]

@algorithmist

theAlgorithmist [at] gmail [dot] com

Angular: 9.0.0

Angular CLI: 9.0.1

Typescript: 3.7.5

## Running the demo

This application illustrates front-end credit-card processing and includes a small set of Typescript libraries that may be used outside this demo in your production code.  These files are located in the _/src/app/shared/libs_ folder.

```
get-card-type.ts
in-enum.ts
is-length-valid.ts
is-valid-luhn.ts
```

This library is in turn driven by static credit-card data provided in the _/src/app/shared/cc-data_ folder.  You may copy and modify the data as necessary or arrange to have this data server-generated.

The application also shows how the same form logic may be applied to two different layouts, represented as 'example1' and 'example2'.  Switching between these examples is controlled by a single constant in the main app module, _/src/app/app.module.ts_.


```
import {
  AbstractControlOptions, 
  ReactiveFormsModule, 
  ValidatorFn
} from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule      } from '@angular/core';

import { AppComponent              } from './app.component';
import { App2Component             } from './app-2.component';
import { CreditCardComponent       } from './credit-card/credit-card.component';
import { CreditCardNumberDirective } from './shared/directives/credit-card-number.directive';
import { CreditCard2Component      } from './credit-card-2/credit-card-2.component';

const example: string = 'example1';

@NgModule({
  declarations: [
    AppComponent,
    App2Component,
    CreditCardComponent,
    CreditCardNumberDirective,
    CreditCard2Component,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: example === 'example1' ? [AppComponent] : [App2Component],
})
export class AppModule { }
```

Set the _example_ string to either _example1_ or _example2_.  Refer to the Medium article for more details on the internal workings of the credit-card component.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


License
----

Apache 2.0

**Free Software? Yeah, Homey plays that**

[//]: # (kudos http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[The Algorithmist]: <http://algorithmist.net>
