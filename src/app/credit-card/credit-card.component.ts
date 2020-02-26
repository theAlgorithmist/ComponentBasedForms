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
 * A credit card sub-form component that creates, manages and returns a form group named {ccSubGroup}.  This
 * group contains a credit card number with form control name {ccNumber}, expiration month {expirationMonth},
 * expiration year {expirationYear}, and CVV {cvv}
 *
 * @author Jim Armstrong
 *
 * @version 1.0
 */
import {
  Component,
  Input,
  ViewChild,
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { CreditCardNumberDirective } from '../shared/directives/credit-card-number.directive';

// Credit-card number processing/validation
import { CreditCardData     } from '../shared/cc-data/card-data';
import { CREDIT_CARD_ERRORS } from '../shared/validators/card-validator';
import { CCTypes            } from '../shared/cc-types';

// Calendar-related data used to populate form controls
import {
  months,
  years
} from '../shared/cc-data/calendar-data';

export enum CCGroupComponents
{
  CREDIT_CARD_NUMBER = 'ccNumber',
  EXPIRATION_MONTH   = 'expirationMonth',
  EXPIRATION_YEAR    = 'expirationYear',
  CVV                = 'cvv',
}

export interface CCGroup
{
  ccSubGroup     : FormGroup;
  ccNumber       : FormControl;
  expirationMonth: FormControl;
  expirationYear : FormControl;
  cvv            : FormControl;
}

@Component({
  selector: 'app-credit-card',

  templateUrl: './credit-card.component.html',

  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent
{
  // Make visible to template
  public CreditCardErrors = CREDIT_CARD_ERRORS;
  public creditCardData   = CreditCardData;
  public monthData        = months;
  public yearData         = years;

  // The sub-form for which this component is responsible
  public ccSubGroup: FormGroup;

  // Various errors that may occur while typing/interacting with the sub-form
  public cardError: string;
  public expError: string;
  public cardType: string;

  /**
   * Placeholder text for the credit card field
   */
  @Input()
  public placeHolder: string;

  @Input()
  public showCardType: boolean;

  /**
   * Reference to the {CreditCardNumberDirective} that controls interactivity with the credit card number input
   */
  @ViewChild(CreditCardNumberDirective, {static: true})
  protected _creditCardNumberInput: CreditCardNumberDirective;

  // Current month and full year
  protected _curMonth: number;
  protected _curYear: number;

  // cache currently selected month/year
  protected _userSelectedMonth: number;
  protected _userSelectedYear: number;

  // references to form controls for quick property access/enable/disable
  protected _expirationMonth: FormControl;
  protected _expirationYear: FormControl;
  protected _cvv: FormControl;

  constructor()
  {
    this.cardError    = CREDIT_CARD_ERRORS.NONE;
    this.expError     = CREDIT_CARD_ERRORS.NONE;
    this.placeHolder  = 'Card Number';
    this.cardType     = CCTypes.UNKNOWN;
    this.showCardType = true;

    const theDate: Date     = new Date();
    this._curMonth          = theDate.getMonth();
    this._curYear           = theDate.getFullYear();
    this._userSelectedYear  = this._curYear;
    this._userSelectedMonth = this._curMonth;

    this._expirationMonth = new FormControl(months[this._curMonth].value, Validators.required);
    this._expirationYear  = new FormControl(this._userSelectedYear, Validators.required);
    this._cvv             = new FormControl('', Validators.required);

    // Suggestion: Make these a separate form group under the existing form group and enable/disable the entire group
    this._expirationMonth.disable();
    this._expirationYear.disable();
    this._cvv.disable();

    this.ccSubGroup = new FormGroup({
      ccNumber       : new FormControl('', Validators.required),
      expirationMonth: this._expirationMonth,
      expirationYear : this._expirationYear,
      cvv            : this._cvv,
    });
  }

  /**
   * Is the sub-form valid?
   */
  public get valid(): boolean
  {
    return this.isValidCardNumber && this.isValidExpDate && this.isValidCVV;
  }

  /**
   * Access the class(es) for the credit-card number {Input} based on current entry
   */
  public get ccnClass(): string
  {
    let className: string = 'form-control ';

    if (!this.ccNumberTouched)
    {
      // add pristine
      className += ' ng-pristine'
    }
    else
    {
      // could be valid or invalid
      className += this.isValidCardNumber ? ' ng-valid' : 'ng-invalid';
    }

    return className;
  }

  /**
   * Access the class(es) for the CVV {Input} based on overall sub-component state and current entry
   */
  public get cvvClass(): string
  {
    let className: string = 'form-control form-cvv';

    if (!this.cvvTouched)
    {
      // Add pristine
      className += ' ng-pristine'
    }
    else
    {
      // could be valid or invalid
      className += this.expError != CREDIT_CARD_ERRORS.NONE ? ' ng-invalid' : ' ng-valid';
    }

    return className;
  }

  /**
   * Access a direct reference to the sub-group
   */
  public get credtCardGroup(): FormGroup
  {
    return this.ccSubGroup;
  }

  /**
   * Has the credit-card number field been 'touched' or dirty?
   */
  public get ccNumberTouched(): boolean
  {
    return this.ccSubGroup.get('ccNumber').dirty;
  }

  /**
   * Has the CVV number field been 'touched' or dirty?
   */
  public get cvvTouched(): boolean
  {
    return this._cvv.dirty;
  }

  /**
   * Is the currently entered credit-card number valid?
   */
  public get isValidCardNumber(): boolean
  {
    return this.cardType !== CCTypes.UNKNOWN && this._creditCardNumberInput.length > 0 && this.cardError === CREDIT_CARD_ERRORS.NONE;
  }

  /**
   * Is the currently set expiration date (month and year) valid?
   */
  public get isValidExpDate(): boolean
  {
    // The year may be greater than the current year (any month is okay) or if equal to the current year, the month can not be less
    return this._userSelectedYear > this._curYear || (this._userSelectedMonth >= this._curMonth && this._curYear == this._userSelectedYear);
  }

  /**
   * Is the currently entered CVV valid?
   */
  public get isValidCVV(): boolean
  {
    return this.cvvTouched && this.expError === CREDIT_CARD_ERRORS.NONE;
  }

  /** @internal */
  public onCardNumber(cardNumber: string): void
  {
    if (cardNumber.length > 0 && this.cardError == CREDIT_CARD_ERRORS.NONE)
    {
      this._expirationMonth.enable();
      this._expirationYear.enable();
      this._cvv.enable();
    }

    // Suggestion: If enabled once and the user goes back to re-type a new card number, disable these controls again
  }

  /** @internal */
  public onCardType(type: CCTypes): void
  {
    if (type !== CCTypes.UNKNOWN) {
      this.cardType = type;
    }
  }

  /** @internal */
  public onCardError(evt: string): void
  {
    this.cardError = evt;
  }

  /** @internal */
  public onMonthSelected(evt: Event): void
  {
    this._userSelectedMonth = (evt.target as HTMLSelectElement).selectedIndex;

    this.expError = this._userSelectedMonth < this._curMonth && this._curYear == this._userSelectedYear
      ? CREDIT_CARD_ERRORS.INVALID_MONTH
      : CREDIT_CARD_ERRORS.NONE;
  }

  /** @internal */
  public onYearSelected(evt: Event): void
  {
    this._userSelectedYear = +this.yearData[(evt.target as HTMLSelectElement).selectedIndex];

    // newly selected year may override a previous invalid month
    this.expError = this._userSelectedMonth < this._curMonth && this._curYear == this._userSelectedYear
      ? CREDIT_CARD_ERRORS.INVALID_MONTH
      : CREDIT_CARD_ERRORS.NONE;
  }

  /** @internal */
  public onCVVChanged(evt: Event): void
  {
    const cvv: number = +(evt.target as HTMLInputElement).value;

    if (isNaN(cvv))
    {
      this.expError = CREDIT_CARD_ERRORS.INVALID_CCV;
      return;
    }

    const digits: number = cvv == 0 ? 0 : Math.floor(Math.log10(cvv)) + 1;

    // Check the CVV length vs required length for the current card
    if (this.cardType !== CCTypes.UNKNOWN)
    {
      this.expError = digits === CreditCardData[this.cardType].cvvDigits
        ? CREDIT_CARD_ERRORS.NONE
        : CREDIT_CARD_ERRORS.INVALID_CCV;
    }
    else
    {
      // Type a CVV without first providing a card number ... not cool ...
      this.expError = CREDIT_CARD_ERRORS.INVALID_CCV;
    }
  }
}
