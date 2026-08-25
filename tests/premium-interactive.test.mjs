import assert from 'node:assert/strict';
import { BASE_PRODUCTS, ADDONS, calculateEstimate } from '../pricing-config.js';

assert.equal(BASE_PRODUCTS.website.price, 761.84);
assert.equal(BASE_PRODUCTS.store.price, 1274.04);
assert.equal(BASE_PRODUCTS.software.price, 2551.04);
assert.equal(BASE_PRODUCTS.mobile.price, 2039.03);
assert.equal(ADDONS.bilingual.price, 149);
assert.equal(ADDONS.crm.price, 349);

const estimate = calculateEstimate('website', ['bilingual', 'seoAudit', 'speed']);
assert.deepEqual(estimate, { base: 761.84, addons: 497, total: 1258.84 });

assert.equal(calculateEstimate('unknown', []).total, 0);
console.log('premium-interactive tests passed');
