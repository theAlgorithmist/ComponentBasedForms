/**
 * Copyright 2020 Jim Armstrong (www.algorithmist.net)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Main App Component (example 1) for the credit-card sub-form demo
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  FormControl,
  FormGroup,
} from '@angular/forms';

import { CreditCardComponent } from './credit-card/credit-card.component';

import { CCGroupComponents } from './credit-card/credit-card.component';

@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',

  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{
  public paymentForm: FormGroup;             // Form group representing the entire payment form

  // Reference to the credit card component used to handle credit-card input and FE processing
  @ViewChild(CreditCardComponent, {static: true})
  public creditCardComponent;

  constructor()
  {
    // empty
  }

  public ngOnInit(): void
  {
    /*
       Todo - add validators and other processing for first/last name - add an address sub-group; this demo is
       only concerned with the credit-card sub-group
     */
    this.paymentForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      creditCard: this.creditCardComponent.ccSubGroup,
    });
  }

  /**
   * Execute on form submission
   */
  public onSubmit(): void
  {
    // Process the payment form and extract all the items
    const firstName = this.paymentForm.get('firstName');
    const lastName  = this.paymentForm.get('lastName');

    const ccGroup: FormGroup         = this.paymentForm.controls['creditCard'] as FormGroup;
    const cardNumberGroup: FormGroup = ccGroup.controls[CCGroupComponents.GROUP_NAME] as FormGroup;
    const cardNumber: string         = cardNumberGroup.controls[CCGroupComponents.CREDIT_CARD_NUMBER].value;
    const expMonth: string           = cardNumberGroup.controls[CCGroupComponents.EXPIRATION_MONTH].value;
    const expYear: string            = cardNumberGroup.controls[CCGroupComponents.EXPIRATION_YEAR].value;
    const cvv: string                = cardNumberGroup.controls[CCGroupComponents.CVV].value;

    console.log('First Name  :', firstName.value);
    console.log('Last Name   :', lastName.value);
    console.log('Card Number :', cardNumber);
    console.log('Exp. Month  :', expMonth);
    console.log('Exp. Year   :', expYear);
    console.log('CVV         :', cvv);
  }
}
