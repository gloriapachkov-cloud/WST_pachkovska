const test = require('node:test');
const assert = require('node:assert/strict');
const cjs = require('./index.cjs');
test('CommonJS and ESM expose identical core API', async () => {
  const esm = await import('./index.mjs');
  assert.deepEqual(Object.keys(esm).sort(), Object.keys(cjs).sort());
  const sample = {clientName:'Dasha',service:'Manicure',date:'2026-11-19'};
  assert.deepEqual(esm.validateBooking(sample), cjs.validateBooking(sample));
});
