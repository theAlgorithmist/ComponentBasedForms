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
 * Full validation of a credit card number based on a fixed number of supported card types
 *
 * @param control FormControl A single form control containing the currently-typed credit card number
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
import {
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

import { isCCLengthValid } from '../libs/is-length-valid';
import { getCardType     } from '../libs/get-card-type';
import { isValidLuhn     } from '../libs/is-valid-luhn';
import { CCTypes         } from '../cc-types';

export enum CREDIT_CARD_ERRORS
{
  INVALID_LENGTH   = 'invalid_length',
  UNSUPPORTED_CARD = 'unsupported card',
  INVALID_NUMBER   = 'invalid_number',
  INVALID_MONTH    = 'invalid_month',
  INVALID_CCV      = 'invalid_ccv',
  NONE             = 'none',
}
export const creditCardValidator: ValidatorFn = (control: FormControl): ValidationErrors | null =>
{
  if (control === undefined || control == null) {
    return {invalid_length: true};
  }

  const cardNumber: string = control.value;
  const cardType: CCTypes = getCardType(cardNumber);

  if (cardType === CCTypes.UNKNOWN) {
    return {unsupported_card: true};
  }

  if (!isCCLengthValid(cardNumber, cardType)) {
    return {invalid_length: true};
  }

  if (!isValidLuhn(cardNumber))
  {
    return {invalid_number: true};
  }

  return null;
};
