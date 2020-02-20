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
 * Is the length of a credit card number valid for the provided type?
 *
 * @param cardNumber Current card number without spaces
 *
 * @param cardTypeIdentifier: Card type such as {amex}, {mastercard}
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
import { CCTypes } from '../cc-types';
import {
  CCData,
  CreditCardData
}                  from '../cc-data/card-data';
import { inEnum  } from './in-enum';

export const isCCLengthValid = (cardNumber: string, cardTypeIdentifier: string): boolean =>
{
  if (!inEnum(cardTypeIdentifier, CCTypes)) {
    return false;
  }

  const data: Partial<CCData> = CreditCardData[cardTypeIdentifier];
  const digits: number        = cardNumber.length;

  if (data.minLength !== undefined && data.maxLength !== undefined) {
    return digits >= data.minLength && digits <= data.maxLength;
  }

  return digits === data.length;
};
