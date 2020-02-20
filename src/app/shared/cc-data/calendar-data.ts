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
 * Calendar-related data for form populating select boxes
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
export interface MonthValues
{
  name: string;
  value: string;
}

export const months: Array<MonthValues> = [
  {
    name: 'Jan-1',
    value: '1',
  },
  {
    name: 'Feb-2',
    value: '2',
  },
  {
    name: 'Mar-3',
    value: '3',
  },
  {
    name: 'Apr-4',
    value: '4',
  },
  {
    name: 'May-5',
    value: '5',
  },
  {
    name: 'Jun-6',
    value: '6',
  },
  {
    name: 'Jul-7',
    value: '7',
  },
  {
    name: 'Aug-8',
    value: '8',
  },
  {
    name: 'Sep-9',
    value: '9',
  },
  {
    name: 'Oct-10',
    value: '10',
  },
  {
    name: 'Nov-11',
    value: '11',
  },
  {
    name: 'Dec-12',
    value: '12',
  }
];

export const years: Array<string> = ['2020', '2021', '2022', '2023', '2024'];
