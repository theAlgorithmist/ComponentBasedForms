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
 * Alternate credit-card sub-group with different template and styles, but same logic.
 *
 * @author Jim Armstrong
 *
 * @version 1.0
 */
import { Component } from '@angular/core';

import { CreditCardComponent } from '../credit-card/credit-card.component';

@Component({
  selector: 'app-credit-card-2',

  templateUrl: './credit-card-2.component.html',

  styleUrls: ['./credit-card-2.component.scss']
})
export class CreditCard2Component extends CreditCardComponent
{
  constructor()
  {
    super();
  }
}
