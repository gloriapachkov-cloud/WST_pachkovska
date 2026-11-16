const test=require('node:test');const assert=require('node:assert/strict');const core=require('@rebelle/core');
test('shared core can be loaded',()=>assert.equal(typeof core.validateBooking,'function'));
test('shared add and remove are consistent',()=>{const a=core.addBooking([],{id:'x'});assert.deepEqual(core.removeBooking(a,'x'),[])});
test('search bookings',()=>assert.equal(core.searchBookings([{service:'Manicure'}],'mani').length,1));
