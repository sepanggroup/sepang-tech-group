import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const index = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const en = readFileSync(new URL('../en.html', import.meta.url), 'utf8');
const config = readFileSync(new URL('../pricing-config.js', import.meta.url), 'utf8');
const app = readFileSync(new URL('../app.js', import.meta.url), 'utf8');

assert.match(index, /<html lang="bg">/);
assert.match(en, /<html lang="en">/);
assert.match(index, /<link rel="canonical" href="https:\/\/wagner-bg\.shop\//);
assert.match(en, /<link rel="canonical" href="https:\/\/wagner-bg\.shop\/en\.html">/);
assert.match(en, /<link rel="alternate" hreflang="bg" href="https:\/\/wagner-bg\.shop\/">/);
assert.match(en, /<link rel="alternate" hreflang="en" href="https:\/\/wagner-bg\.shop\/en\.html">/);

const enOrganization = en.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
assert.ok(enOrganization, 'EN Organization JSON-LD is present');
const enSchema = JSON.parse(enOrganization);
assert.equal(enSchema['@type'], 'Organization');
assert.equal(enSchema.url, 'https://wagner-bg.shop/');
assert.equal(enSchema.alternateName, 'SEPANG TECH GROUP');

assert.match(app, /import\('\.\/pricing-config\.js'\)/);
assert.match(en, /<script src="app\.js" defer><\/script>/);
assert.match(index, /<script src="app\.js" defer><\/script>/);

for (const [id, cadence] of [
  ['P-98944406YX3977206NKHOKNA', 'monthly'],
  ['P-4WD94670L61834622NKHOQHY', 'monthly'],
  ['P-7HJ962506S651103BNKHOSIQ', 'monthly'],
  ['P-7LF56748BL111320TNKHOUAQ', 'monthly']
]) {
  assert.match(config, new RegExp(id));
  assert.match(config, new RegExp(`planId: '${id}', cadence: '${cadence}'`));
}

assert.match(index, /href="en\.html"/);
assert.match(en, /href="index\.html"/);
assert.match(en, /href="privacy\.html"/);
assert.match(en, /href="terms\.html"/);
assert.match(en, /href="cookies\.html"/);
assert.match(en, /_next" value="https:\/\/wagner-bg\.shop\/thanks\.html"/);

assert.doesNotMatch(enOrganization, /"url":"https:\/\/wagner-bg\.shop\/en\.html"/);

console.log('final source integrity contract passed');
