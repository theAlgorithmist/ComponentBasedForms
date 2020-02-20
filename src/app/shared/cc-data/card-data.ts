/**
 * Credit card data for all supported card types (note that the MC data is old and does not consider that some new cards
 * issued in 2017 and beyond may have a BIN starting with 2)
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
import { CCTypes } from "../cc-types";

export interface CCData
{
  name: string;
  length: number;
  minLength?: number;
  maxLength?: number;
  cvvDigits: number;
  image: string;
  pattern: RegExp | null;
}

export const CreditCardData: Record<CCTypes, CCData> =
{
  amex: {
    name: 'American Express',
    length: 15,
    image: '/assets/cc-image/amex.png',
    cvvDigits: 4,
    pattern: /^3[47]/,
  },
  discover: {
    name: "Discover Card",
    length: 16,
    image: '/assets/cc-image/discover.png',
    cvvDigits: 3,
    pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
  },
  mastercard: {
    name: 'Master Card',
    length: 16,
    image: '/assets/cc-image/mastercard.png',
    cvvDigits: 3,
    pattern: /^5[1-5]/
  },
  visa: {
    name: 'Visa',
    length: 16,
    image: '/assets/cc-image/visa.png',
    cvvDigits: 3,
    pattern: /^4/,
  },
  unknown: {
    name: '',
    length: 0,
    image: '/assets/cc-image/unknown.png',
    cvvDigits: 0,
    pattern: null,
  }
};
