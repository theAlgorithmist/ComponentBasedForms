/**
 * Derived from code bearing the following copyright notice
 *
 * Copyright 2016 Jim Armstrong (www.algorithmist.net)
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
 * Is the supplied credit card number typed in by a user a valid Luhn number?
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
export const isValidLuhn = (cardNumber: string): boolean =>
{
  // Classic Luhn validation ... there's really nothing new under the sun
  const ccNumbers:Array<number> = cardNumber.split('').reverse().map( (val: string): number => +val );
  const len: number             = ccNumbers.length;

  let n: number   = 0;
  let sum: number = 0;
  let j: number   = 0;

  let digit: number;
  while (j < len)
  {
    digit = ccNumbers[n];
    digit = +digit;

    if (n % 2)
    {
      digit *= 2;

      sum += (digit < 10) ? digit : digit - 9;
    }
    else
    {
      sum += digit;
    }

    n = ++j;
  }

  return sum % 10 === 0;
};
