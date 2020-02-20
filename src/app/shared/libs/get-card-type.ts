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
 * Determine the credit card type based on the currently input card number
 *
 * @param cardNumber Currently typed-in credit card number
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
import { CCTypes } from '../cc-types';

import {
  CCData,
  CreditCardData
} from '../cc-data/card-data';

export const getCardType = (cardNumber: string): CCTypes =>
{
  // remove spaces/dashes from card number
  const creditCardNumber: string = cardNumber.replace(/[ -]/g, '');

  // loop over types and test each pattern
  const types: Array<string> = Object.keys(CCTypes as object);
  const n: number            = types.length;

  let i: number;
  let data: CCData;
  let pattern: RegExp;
  let type: string;

  for (i = 0; i < n; ++i)
  {
    type    = CCTypes[types[i]];
    data    = CreditCardData[type];
    pattern = data.pattern;

    if (pattern !== null && creditCardNumber.match(pattern)) {
      return type as CCTypes;
    }
  }

  return CCTypes.UNKNOWN;
};
