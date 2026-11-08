'use strict';
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const fs = require('node:fs');
const crypto = require('node:crypto');

const demoUsers = [
  { username: 'admin', password: 'Admin2026!', name: 'Адміністратор RE:BELLE', role: 'admin' },
  { username: 'master', password: 'Master2026!', name: 'Катерина', role: 'master' }
];
const initialServices = [
  { id: 'n1', category: 'Nail Studio', name: 'Манікюр з покриттям', price: 850, duration: 90 },
  { id: 'n2', category: 'Nail Studio', name: 'Манікюр без покриття', price: 500, duration: 45 },
  { id: 'n3', category: 'Nail Studio', name: 'Педикюр', price: 950, duration: 90 },
  { id: 'h1', category: 'Hair Studio', name: 'Жіноча стрижка', price: 850, duration: 60 },
  { id: 'h2', category: 'Hair Studio', name: 'Укладання волосся', price: 700, duration: 60 },
  { id: 'h3', category: 'Hair Studio', name: 'Фарбування волосся', price: 1900, duration: 120 },
  { id: 'm1', category: 'Makeup Studio', name: 'Денний макіяж', price: 900, duration: 60 },
  { id: 'm2', category: 'Makeup Studio', name: 'Вечірній макіяж', price: 1200, duration: 90 },
  { id: 'b1', category: 'Brows & Lashes', name: 'Корекція брів', price: 450, duration: 30 },
  { id: 'b2', category: 'Brows & Lashes', name: 'Ламінування вій', price: 900, duration: 60 },
  { id: 's1', category: 'Skin & Care', name: 'Догляд за обличчям', price: 950, duration: 60 }
];
const initialMasters = [
  { id: 'ma1', name: 'Катерина', category: 'Makeup Studio' },
  { id: 'ma2', name: 'Вікторія', category: 'Makeup Studio' },
  { id: 'ma3', name: 'Анна', category: 'Nail Studio' },
  { id: 'ma4', name: 'Олена', category: 'Hair Studio' },
  { id: 'ma5', name: 'Юлія', category: 'Skin & Care' },
  { id: 'ma6', name: 'Настя', category: 'Brows & Lashes' }
];
let session = null;
function file(name) { return path.join(app.getPath('userData'), name); }
function read(name, fallback) {
  try { const data = JSON.parse(fs.readFileSync(file(name), 'utf8')); return data; }
  catch (e) { if (e.code === 'ENOENT') return structuredClone(fallback); throw new Error(`Помилка читання ${name}: ${e.message}`); }
}
function write(name, data) {
  const target = file(name); fs.mkdirSync(path.dirname(target), { recursive: true });
  const tmp = `${target}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), { encoding: 'utf8', mode: 0o600 });
  fs.renameSync(tmp, target);
}
function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  return { salt, hash: crypto.scryptSync(password, salt, 64).toString('hex') };
}
function verify(password, user) {
  const computed = Buffer.from(hashPassword(password, user.salt).hash, 'hex');
  const stored = Buffer.from(user.hash, 'hex');
  return computed.length === stored.length && crypto.timingSafeEqual(computed, stored);
}
function init() {
  if (!fs.existsSync(file('users.json'))) write('users.json', demoUsers.map(({ password, ...u }) => ({ ...u, ...hashPassword(password) })));
  if (!fs.existsSync(file('services.json'))) write('services.json', initialServices);
  if (!fs.existsSync(file('masters.json'))) write('masters.json', initialMasters);
  if (!fs.existsSync(file('notes.json'))) write('notes.json', []);
}
function requireSession(roles) {
  if (!session) throw new Error('Спочатку увійдіть у систему.');
  if (roles && !roles.includes(session.role)) throw new Error('Недостатньо прав доступу.');
  return session;
}
function clean(value, limit = 100) { return typeof value === 'string' ? value.trim().slice(0, limit) : ''; }
function minutes(t) { const [h, m] = t.split(':').map(Number); return h * 60 + m; }
function publicUser(u) { return { username: u.username, name: u.name, role: u.role }; }
function loadBookings() { const items = read('notes.json', []); return Array.isArray(items) ? items : []; }
function allowedBookings() {
  const s = requireSession(); const items = loadBookings();
  return s.role === 'admin' ? items : s.role === 'master' ? items.filter(n => n.master === s.name) : items.filter(n => n.owner === s.username);
}
function createWindow() {
  const win = new BrowserWindow({ width: 1200, height: 850, minWidth: 790, minHeight: 620, title: 'RE:BELLE Desktop', backgroundColor: '#fbf7f6', webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false, sandbox: true } });
  win.loadFile(path.join(__dirname, 'renderer', 'index.html'));
  win.on('closed', () => { session = null; });
}
app.whenReady().then(() => {
  init();
  ipcMain.handle('auth:login', (_e, data) => {
    const username = clean(data?.username, 40).toLowerCase();
    const password = data?.password;
    if (typeof password !== 'string') throw new Error('Невірний логін або пароль.');
    const u = read('users.json', []).find(x => x.username === username);
    if (!u || !verify(password, u)) throw new Error('Невірний логін або пароль.');
    session = publicUser(u); return session;
  });
  ipcMain.handle('auth:register', (_e, data) => {
    const username = clean(data?.username, 40).toLowerCase();
    const name = clean(data?.name, 80);
    const password = data?.password;
    if (!/^[a-z0-9_.-]{3,40}$/.test(username) || name.length < 2 || typeof password !== 'string' || password.length < 8 || password.length > 128) throw new Error('Логін: 3–40 латинських символів/цифр; ім’я: від 2 символів; пароль: від 8 символів.');
    const users = read('users.json', []);
    if (users.some(u => u.username === username)) throw new Error('Цей логін уже зайнятий.');
    const user = { username, name, role: 'client', ...hashPassword(password) };
    write('users.json', [...users, user]); session = publicUser(user); return session;
  });
  ipcMain.handle('auth:logout', () => { session = null; return true; });
  ipcMain.handle('data:load', () => ({ session: requireSession(), bookings: allowedBookings(), services: read('services.json', []), masters: read('masters.json', []) }));
  ipcMain.handle('booking:add', (_e, input) => {
    const s = requireSession(['client', 'admin']);
    const client = s.role === 'client' ? s.name : clean(input?.client, 80);
    const phone = clean(input?.phone, 25).replace(/[\s()-]/g, '');
    const date = clean(input?.date, 10), time = clean(input?.time, 5);
    const service = read('services.json', []).find(x => x.id === input?.serviceId);
    const master = read('masters.json', []).find(x => x.id === input?.masterId);
    if (!client || !/^(\+380\d{9}|0\d{9})$/.test(phone) || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time) || !service || !master || master.category !== service.category) throw new Error('Перевірте ім’я, телефон, послугу, майстра, дату та час.');
    const today = new Date(); const local = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
    if (date < local || !Number.isFinite(Date.parse(`${date}T${time}:00`)) || minutes(time) < 540 || minutes(time) + service.duration > 1200) throw new Error('Оберіть коректну майбутню дату і час у межах 09:00–20:00.');
    const bookings = loadBookings();
    if (bookings.some(b => b.date === date && b.master === master.name && !['Скасовано','Виконано'].includes(b.status) && minutes(time) < minutes(b.time) + b.duration && minutes(b.time) < minutes(time) + service.duration)) throw new Error('Цей час у майстра вже зайнятий.');
    const booking = { id: crypto.randomUUID(), owner: s.username, client, phone, service: service.name, category: service.category, master: master.name, date, time, price: service.price, duration: service.duration, status: 'Очікує' };
    write('notes.json', [...bookings, booking]); return booking;
  });
  ipcMain.handle('booking:status', (_e, id, status) => {
    const s = requireSession(['master', 'admin']);
    if (!['Очікує','Підтверджено','Виконано','Скасовано'].includes(status)) throw new Error('Некоректний статус.');
    const bookings = loadBookings(); const b = bookings.find(x => x.id === id);
    if (!b || (s.role === 'master' && b.master !== s.name)) throw new Error('Запис недоступний.');
    b.status = status; write('notes.json', bookings); return true;
  });
  ipcMain.handle('booking:delete', (_e, id) => {
    const s = requireSession(); const bookings = loadBookings(); const b = bookings.find(x => x.id === id);
    if (!b || (s.role === 'client' && b.owner !== s.username) || s.role === 'master') throw new Error('Немає дозволу видалити цей запис.');
    write('notes.json', bookings.filter(x => x.id !== id)); return true;
  });
  ipcMain.handle('service:add', (_e, input) => {
    requireSession(['admin']);
    const name = clean(input?.name, 80), category = clean(input?.category, 40);
    const price = Number(input?.price), duration = Number(input?.duration);
    if (name.length < 2 || !category || !Number.isInteger(price) || price < 1 || price > 100000 || !Number.isInteger(duration) || duration < 15 || duration > 480) throw new Error('Некоректні параметри послуги.');
    const services = read('services.json', []); services.push({ id: crypto.randomUUID(), name, category, price, duration }); write('services.json', services); return true;
  });
  ipcMain.handle('service:delete', (_e, id) => { requireSession(['admin']); const services = read('services.json', []); write('services.json', services.filter(x => x.id !== id)); return true; });
  ipcMain.handle('master:add', (_e, input) => {
    requireSession(['admin']); const name = clean(input?.name, 80), category = clean(input?.category, 40);
    if (name.length < 2 || !category) throw new Error('Вкажіть ім’я та напрямок майстра.');
    const masters = read('masters.json', []); if (masters.some(x => x.name.toLowerCase() === name.toLowerCase())) throw new Error('Майстер з таким ім’ям уже існує.');
    masters.push({ id: crypto.randomUUID(), name, category }); write('masters.json', masters); return true;
  });
  ipcMain.handle('master:delete', (_e, id) => { requireSession(['admin']); const masters = read('masters.json', []); write('masters.json', masters.filter(x => x.id !== id)); return true; });
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
