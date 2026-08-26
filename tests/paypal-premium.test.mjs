import assert from 'node:assert/strict';
import { ADDONS, BASE_PRODUCTS, calculateEstimate } from '../pricing-config.js';

const expectedPlans = {
  maintenance: 'P-98944406YX3977206NKHOKNA',
  security: 'P-4WD94670L61834622NKHOQHY',
  seoGrowth: 'P-7HJ962506S651103BNKHOSIQ',
  ai: 'P-7LF56748BL111320TNKHOUAQ'
};

for (const [key, planId] of Object.entries(expectedPlans)) {
  assert.equal(ADDONS[key].planId, planId);
  assert.equal(ADDONS[key].cadence, 'monthly');
}

const oneTime = calculateEstimate('website', ['landing', 'ux']);
assert.equal(oneTime.launchTotal, 1259.84);
assert.equal(oneTime.monthly, 0);
assert.equal(oneTime.total, 1259.84);

const mixed = calculateEstimate('website', ['landing', 'maintenance', 'security']);
assert.equal(mixed.launchTotal, 1110.84);
assert.equal(mixed.monthly, 118);
assert.equal(mixed.total, 1228.84);

assert.equal(BASE_PRODUCTS.website.price, 761.84);
assert.equal(BASE_PRODUCTS.store.price, 1274.04);
assert.equal(BASE_PRODUCTS.software.price, 2551.04);
assert.equal(BASE_PRODUCTS.mobile.price, 2039.03);

console.log('PayPal premium pricing and subscription plan tests passed');
