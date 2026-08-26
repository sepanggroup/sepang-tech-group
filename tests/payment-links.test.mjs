import assert from 'node:assert/strict';
import { PAYMENT_LINKS } from '../pricing-config.js';

const expected = {
  landing: 'https://www.paypal.com/ncp/payment/FGNHSNGS24CNQ',
  ux: 'https://www.paypal.com/ncp/payment/VYPZPSE4EHZGN',
  seoAudit: 'https://www.paypal.com/ncp/payment/Z3KL2J2WMNGKU',
  analytics: 'https://www.paypal.com/ncp/payment/7BF7BT6SK9CNU',
  speed: 'https://www.paypal.com/ncp/payment/8BZX29ZAU7P88',
  migration: 'https://www.paypal.com/ncp/payment/CH98NKL4UBUYA',
  bilingual: 'https://www.paypal.com/ncp/payment/2LMKEWSEGGM9N',
  booking: 'https://www.paypal.com/ncp/payment/P9XK8ZXDGFHXQ',
  api: 'https://www.paypal.com/ncp/payment/WFNNLSK23L62L',
  crm: 'https://www.paypal.com/ncp/payment/URTAQQWG96V3G',
  brand: 'https://www.paypal.com/ncp/payment/JLW89W2SPCLZ8',
  maintenance: 'https://www.paypal.com/ncp/payment/NJVEMR2UHCXBN',
  security: 'https://www.paypal.com/ncp/payment/N9YMYSDNJPSCU',
  seoGrowth: 'https://www.paypal.com/ncp/payment/FBCZZZ3A8Y7EY',
  ai: 'https://www.paypal.com/ncp/payment/26ZTBVEDN6Y5N'
};

assert.deepEqual(PAYMENT_LINKS, expected);
console.log('payment links test passed');
