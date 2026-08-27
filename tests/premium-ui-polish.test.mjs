import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../interactive.css', import.meta.url), 'utf8');

assert.match(css, /product-card:has\(\.paypal-subscription\)/);
assert.match(css, /estimate-breakdown/);
assert.match(css, /prefers-reduced-motion/);
assert.match(css, /focus-visible/);
assert.match(css, /product-actions/);

console.log('premium UI polish CSS contract passed');
