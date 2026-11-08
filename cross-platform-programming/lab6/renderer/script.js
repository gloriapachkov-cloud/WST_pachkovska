'use strict';
const $ = id => document.getElementById(id);
let current = null, data = { bookings: [], services: [], masters: [] }, authMode = 'login', filter = 'all';
const roleNames = { client: 'Клієнт', master: 'Майстер', admin: 'Адміністратор' };
function message(text, type = 'error', auth = false) { const e = $(auth ? 'authMessage' : 'message'); e.textContent = text; e.className = `message ${type}`; }
function node(tag, className, value) { const n = document.createElement(tag); if (className) n.className = className; if (value !== undefined) n.textContent = String(value); return n; }
function option(value, label) { const n = node('option', '', label); n.value = value; return n; }
function today() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function categories() { return [...new Set([...data.services.map(x => x.category), ...data.masters.map(x => x.category)])].sort(); }
function populate(select, values, placeholder) { const old = select.value; select.replaceChildren(); if (placeholder) select.append(option('', placeholder)); values.forEach(x => select.append(option(x.value, x.label))); if ([...select.options].some(x => x.value === old)) select.value = old; }
function updateCategories() {
  const cats = categories().map(c => ({ value: c, label: c }));
  populate($('category'), cats, 'Оберіть напрямок'); populate($('serviceCategory'), cats); populate($('masterCategory'), cats);
  updateServices();
}
function updateServices() {
  const category = $('category').value;
  populate($('service'), data.services.filter(s => s.category === category).map(s => ({ value: s.id, label: s.name })), 'Оберіть послугу');
  populate($('master'), data.masters.filter(m => m.category === category).map(m => ({ value: m.id, label: m.name })), 'Оберіть майстра');
  updatePrice();
}
function updatePrice() { const s = data.services.find(x => x.id === $('service').value); $('durationText').textContent = s ? `Тривалість: ${s.duration} хв` : 'Тривалість: —'; $('priceText').textContent = s ? `${s.price} ₴` : '— ₴'; }
function renderBookings() {
  const bookings = data.bookings;
  $('totalCount').textContent = bookings.length;
  $('activeCount').textContent = bookings.filter(x => !['Виконано','Скасовано'].includes(x.status)).length;
  $('completedCount').textContent = bookings.filter(x => x.status === 'Виконано').length;
  const visible = bookings.filter(x => filter === 'all' || (filter === 'completed' ? x.status === 'Виконано' : !['Виконано','Скасовано'].includes(x.status)));
  $('emptyState').hidden = visible.length > 0; $('notesList').replaceChildren();
  for (const b of visible) {
    const li = node('li', `booking ${b.status === 'Виконано' ? 'completed' : ''}`), head = node('div', 'booking-head');
    head.append(node('h3', 'booking-name', b.client), node('span', `status ${b.status === 'Виконано' ? 'completed' : ''}`, b.status)); li.append(head);
    li.append(node('p', '', b.service), node('p', '', `Майстер: ${b.master} · ${b.date.split('-').reverse().join('.')} · ${b.time}`));
    if (current.role !== 'client') li.append(node('p', '', `Телефон: ${b.phone}`));
    li.append(node('p', 'money', `${b.price} ₴ · ${b.duration} хв`));
    const actions = node('div', 'actions');
    if (current.role !== 'client') {
      for (const [status, label] of [['Підтверджено', 'Підтвердити'], ['Виконано', 'Виконано'], ['Скасовано', 'Скасувати']]) {
        if (b.status === status) continue;
        const btn = node('button', '', label); btn.type = 'button'; btn.addEventListener('click', () => run(async () => { await window.rebelle.changeStatus(b.id, status); await refresh(); message(`Статус: ${status}`, 'success'); })); actions.append(btn);
      }
    }
    if (current.role !== 'master') {
      const btn = node('button', 'delete-button', 'Видалити запис'); btn.type = 'button'; btn.addEventListener('click', () => { if (confirm(`Видалити запис клієнта ${b.client}?`)) run(async () => { await window.rebelle.deleteBooking(b.id); await refresh(); message('Запис видалено.', 'success'); }); }); actions.append(btn);
    }
    li.append(actions); $('notesList').append(li);
  }
}
function renderAdmin() {
  if (current.role !== 'admin') return;
  for (const [listId, values, del] of [['servicesAdmin', data.services, id => window.rebelle.deleteService(id)], ['mastersAdmin', data.masters, id => window.rebelle.deleteMaster(id)]]) {
    const list = $(listId); list.replaceChildren();
    for (const item of values) {
      const li = node('li', '', `${item.name} · ${item.category}${item.price ? ` · ${item.price} ₴` : ''}`);
      const btn = node('button', 'mini-delete', 'Видалити'); btn.type = 'button'; btn.addEventListener('click', () => { if (confirm(`Видалити «${item.name}»?`)) run(async () => { await del(item.id); await refresh(); message('Зміни збережено.', 'success'); }); }); li.append(btn); list.append(li);
    }
  }
}
async function refresh() { data = await window.rebelle.load(); updateCategories(); renderBookings(); renderAdmin(); }
async function run(fn, auth = false) { try { await fn(); } catch (e) { message(e.message || 'Помилка', 'error', auth); } }
function showApp(user) {
  current = user; $('authScreen').hidden = true; $('appScreen').hidden = false;
  $('sessionName').textContent = user.name; $('sessionRole').textContent = roleNames[user.role];
  $('bookingPanel').hidden = user.role === 'master'; $('adminPanel').hidden = user.role !== 'admin';
  $('clientNameWrap').hidden = user.role === 'client'; $('clientName').value = user.role === 'client' ? user.name : '';
  $('listTitle').textContent = user.role === 'client' ? 'Мої записи' : user.role === 'master' ? 'Мій розклад' : 'Розклад клієнтів';
}
function showLogin() { current = null; $('appScreen').hidden = true; $('authScreen').hidden = false; $('password').value = ''; message('', 'error', true); }
function setAuthMode(mode) {
  authMode = mode; $('registerNameWrap').hidden = mode !== 'register'; $('authTitle').textContent = mode === 'login' ? 'Вхід у систему' : 'Реєстрація клієнта'; $('authSubmit').textContent = mode === 'login' ? 'Увійти' : 'Створити акаунт';
  $('loginTab').classList.toggle('selected', mode === 'login'); $('registerTab').classList.toggle('selected', mode === 'register'); $('password').autocomplete = mode === 'login' ? 'current-password' : 'new-password'; message('', 'error', true);
}
$('loginTab').addEventListener('click', () => setAuthMode('login'));
$('registerTab').addEventListener('click', () => setAuthMode('register'));
$('authForm').addEventListener('submit', e => { e.preventDefault(); run(async () => {
  const credentials = { username: $('username').value, password: $('password').value, name: $('registerName').value };
  const user = authMode === 'login' ? await window.rebelle.login(credentials) : await window.rebelle.register(credentials);
  showApp(user); await refresh(); message('Вітаємо в RE:BELLE!', 'success');
}, true); });
$('logoutButton').addEventListener('click', () => run(async () => { await window.rebelle.logout(); showLogin(); }));
$('category').addEventListener('change', updateServices); $('service').addEventListener('change', updatePrice);
$('bookingForm').addEventListener('submit', e => { e.preventDefault(); run(async () => {
  await window.rebelle.addBooking({ client: $('clientName').value, phone: $('phone').value, serviceId: $('service').value, masterId: $('master').value, date: $('date').value, time: $('time').value });
  $('phone').value = ''; if (current.role === 'admin') $('clientName').value = ''; await refresh(); message('Запис успішно створено та збережено в notes.json.', 'success');
}); });
for (const b of document.querySelectorAll('[data-filter]')) b.addEventListener('click', () => { filter = b.dataset.filter; document.querySelectorAll('[data-filter]').forEach(x => x.classList.toggle('selected', x === b)); renderBookings(); });
$('serviceForm').addEventListener('submit', e => { e.preventDefault(); run(async () => { await window.rebelle.addService({ name: $('serviceName').value, category: $('serviceCategory').value, price: $('servicePrice').value, duration: $('serviceDuration').value }); $('serviceName').value = ''; await refresh(); message('Послугу додано.', 'success'); }); });
$('masterForm').addEventListener('submit', e => { e.preventDefault(); run(async () => { await window.rebelle.addMaster({ name: $('masterName').value, category: $('masterCategory').value }); $('masterName').value = ''; await refresh(); message('Майстра додано.', 'success'); }); });
$('date').min = today(); $('date').value = today();
for (let h = 9; h <= 19; h++) for (const m of [0,30]) $('time').append(option(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`, `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`));
setAuthMode('login');
