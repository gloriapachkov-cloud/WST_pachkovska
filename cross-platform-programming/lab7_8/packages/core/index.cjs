"use strict";
const MAX_CLIENT_LENGTH = 40;
const SERVICES = ['Hair Styling','Manicure','Facial Treatment','Makeup','Eyebrow Styling'];
const ERROR_EMPTY = 'Please fill in all fields.';
function clean(value, limit=MAX_CLIENT_LENGTH) { return typeof value === 'string' ? value.trim().slice(0,limit) : ''; }
function validDate(date) { if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return false; const d=new Date(date+'T12:00:00Z'); return !Number.isNaN(d.getTime()) && d.toISOString().slice(0,10)===date; }
function validTime(time) { return typeof time==='string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(time); }
function minutes(time) { if (!validTime(time)) return NaN; const [h,m]=time.split(':').map(Number); return h*60+m; }
function validateBooking(input, opts={}) {
 const clientName=clean(input?.clientName ?? input?.client);
 const service=clean(input?.service,100); const date=input?.date;
 if (!clientName || !service || !validDate(date)) return {ok:false,error:ERROR_EMPTY};
 if (typeof (input?.clientName ?? input?.client) !== 'string' || (input.clientName ?? input.client).trim().length>MAX_CLIENT_LENGTH) return {ok:false,error:`Client name must not exceed ${MAX_CLIENT_LENGTH} characters.`};
 if (opts.allowedServices && !opts.allowedServices.includes(service)) return {ok:false,error:'Unknown service.'};
 if (opts.requirePhone && !/^(\+380\d{9}|0\d{9})$/.test(clean(input?.phone,25).replace(/[\s()-]/g,''))) return {ok:false,error:'Enter a valid Ukrainian phone number.'};
 if (opts.requireTime && !validTime(input?.time)) return {ok:false,error:'Enter a valid time.'};
 return {ok:true,value:{clientName,service,date}};
}
function overlaps(bookings, proposed) {
 if (!validTime(proposed.time) || !Number.isFinite(proposed.duration)) return false;
 return bookings.some(b=>b.date===proposed.date && b.master===proposed.master && !['Скасовано','Виконано'].includes(b.status) && validTime(b.time) && minutes(proposed.time)<minutes(b.time)+Number(b.duration) && minutes(b.time)<minutes(proposed.time)+proposed.duration);
}
function sortBookings(items) { return [...items].sort((a,b)=>String(a.date).localeCompare(String(b.date)) || String(a.time||'').localeCompare(String(b.time||'')) || String(a.id).localeCompare(String(b.id))); }
function searchBookings(items, query) { const q=clean(query,200).toLocaleLowerCase(); return !q?[...items]:items.filter(b=>[b.clientName,b.client,b.service,b.master].some(v=>String(v||'').toLocaleLowerCase().includes(q))); }
function addBooking(items, booking) { return [...items,booking]; }
function removeBooking(items,id) { return items.filter(b=>b.id!==id); }
function toggleBooking(items,id) { return items.map(b=>b.id===id?{...b,completed:!b.completed}:b); }
module.exports={MAX_CLIENT_LENGTH,SERVICES,ERROR_EMPTY,clean,validDate,validTime,minutes,validateBooking,overlaps,sortBookings,searchBookings,addBooking,removeBooking,toggleBooking};
