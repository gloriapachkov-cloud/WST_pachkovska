import React, { useMemo, useState } from 'react';
import { Chip, Button, Field, Card } from './components/UI';
import { styles } from './components/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookingItem from './components/BookingItem';
import Header from './components/Header';

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

const C = {
  bg: '#FBF7F5',
  white: '#FFFFFF',
  ink: '#44343D',
  muted: '#9F8792',
  rose: '#B67E91',
  pale: '#F4E5E8',
  line: '#EEDFE2',
  green: '#E4F0E6',
  greenInk: '#5D8068',
};

const categories = [
  {
    id: 'nails',
    title: 'Nail Studio',
    sub: 'Манікюр · педикюр',
    image:
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=900&q=80',
  },
  {
    id: 'hair',
    title: 'Hair Studio',
    sub: 'Стрижки · фарбування',
    image:
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&q=80',
  },
  {
    id: 'brows',
    title: 'Brow & Lash',
    sub: 'Брови · вії',
    image:
      'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=900&q=80',
  },
  {
    id: 'makeup',
    title: 'Makeup Studio',
    sub: 'Макіяж на будь-яку подію',
    image:
      'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=900&q=80',
  },
  {
    id: 'skin',
    title: 'Skin & Care',
    sub: 'Догляд за обличчям',
    image:
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80',
  },
];

const initialServices = [
  { id: 's1', category: 'nails', name: 'Манікюр без покриття', minutes: 60, price: 450, topPrice: 550 },
  { id: 's2', category: 'nails', name: 'Манікюр + гель-лак', minutes: 120, price: 750, topPrice: 950 },
  { id: 's3', category: 'nails', name: 'Нарощування нігтів', minutes: 180, price: 1100, topPrice: 1400 },
  { id: 's4', category: 'nails', name: 'Педикюр', minutes: 90, price: 850, topPrice: 1050 },
  { id: 's5', category: 'nails', name: 'Зняття покриття', minutes: 30, price: 200, topPrice: 250 },

  { id: 's6', category: 'hair', name: 'Жіноча стрижка', minutes: 60, price: 650, topPrice: 850 },
  { id: 's7', category: 'hair', name: 'Укладка волосся', minutes: 60, price: 600, topPrice: 800 },
  { id: 's8', category: 'hair', name: 'Фарбування волосся', minutes: 180, price: 2200, topPrice: 2800 },
  { id: 's9', category: 'hair', name: 'Відновлення волосся', minutes: 120, price: 1600, topPrice: 2000 },

  { id: 's10', category: 'brows', name: 'Корекція та фарбування брів', minutes: 60, price: 550, topPrice: 700 },
  { id: 's11', category: 'brows', name: 'Ламінування брів', minutes: 60, price: 750, topPrice: 950 },
  { id: 's12', category: 'brows', name: 'Ламінування вій', minutes: 75, price: 850, topPrice: 1050 },
  { id: 's13', category: 'brows', name: 'Нарощування вій', minutes: 150, price: 1200, topPrice: 1500 },

  { id: 's14', category: 'makeup', name: 'Денний макіяж', minutes: 60, price: 900, topPrice: 1200 },
  { id: 's15', category: 'makeup', name: 'Вечірній макіяж', minutes: 90, price: 1300, topPrice: 1700 },
  { id: 's16', category: 'makeup', name: 'Весільний макіяж', minutes: 120, price: 1800, topPrice: 2300 },

  { id: 's17', category: 'skin', name: 'Догляд за обличчям', minutes: 60, price: 950, topPrice: 1200 },
  { id: 's18', category: 'skin', name: 'Масаж обличчя', minutes: 45, price: 700, topPrice: 900 },
  { id: 's19', category: 'skin', name: 'Зволожувальна процедура', minutes: 75, price: 1100, topPrice: 1400 },
];

const masters = [
  { id: 'm1', name: 'Анна', level: 'Майстер', categories: ['nails'] },
  { id: 'm2', name: 'Марія', level: 'Топ-майстер', categories: ['nails', 'brows'] },
  { id: 'm3', name: 'Софія', level: 'Майстер', categories: ['nails', 'brows'] },
  { id: 'm4', name: 'Олена', level: 'Топ-майстер', categories: ['hair'] },
  { id: 'm5', name: 'Дарина', level: 'Майстер', categories: ['hair'] },
  { id: 'm6', name: 'Вікторія', level: 'Топ-майстер', categories: ['brows', 'makeup'] },
  { id: 'm7', name: 'Катерина', level: 'Майстер', categories: ['makeup'] },
  { id: 'm8', name: 'Ірина', level: 'Топ-майстер', categories: ['skin'] },
  { id: 'm9', name: 'Юлія', level: 'Майстер', categories: ['skin'] },
];

const slots = Array.from({ length: 21 }, (_, i) => {
  const n = 9 * 60 + i * 30;
  return `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`;
});

const pad = n => String(n).padStart(2, '0');

const localDate = d =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const toMinutes = t => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

const displayDate = d =>
  d ? d.split('-').reverse().join('.') : '';

const money = n => `${n} ₴`;

const formatPhone = value => {
  const digits = value.replace(/\D/g, '');

  if (/^380\d{9}$/.test(digits)) {
    return `+${digits}`;
  }

  if (/^0\d{9}$/.test(digits)) {
    return `+38${digits}`;
  }

  return null;
};



export default function App() {
  const [role, setRole] = useState('Клієнт');
  const [tab, setTab] = useState('Запис');

  const [services, setServices] = useState(initialServices);
  const [appointments, setAppointments] = useState([]);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [serviceId, setServiceId] = useState('s2');
  const [categoryId, setCategoryId] = useState('nails');
  const [masterId, setMasterId] = useState('m1');

  const [date, setDate] = useState(localDate(new Date()));
  const [time, setTime] = useState('');

  const [filterMasterId, setFilterMasterId] = useState('m1');

  const [editingServiceId, setEditingServiceId] = useState('s1');
  const [editPrice, setEditPrice] = useState('450');
  const [editTopPrice, setEditTopPrice] = useState('550');
  const [editMinutes, setEditMinutes] = useState('60');

  const selectedService =
    services.find(s => s.id === serviceId) || services[0];

  const eligibleMasters = masters.filter(m =>
    m.categories.includes(selectedService.category)
  );

  const selectedMaster =
    masters.find(m => m.id === masterId) || masters[0];

  const price =
    selectedMaster.level === 'Топ-майстер'
      ? selectedService.topPrice
      : selectedService.price;

  const available = useMemo(() => slots.filter(t => {
    const start = toMinutes(t);

    if (start + selectedService.minutes > 20 * 60) {
      return false;
    }

    if (date === localDate(new Date())) {
      const now = new Date();

      if (start <= now.getHours() * 60 + now.getMinutes()) {
        return false;
      }
    }

    return !appointments.some(a =>
      a.masterId === masterId &&
      a.date === date &&
      a.status !== 'Скасовано' &&
      start < toMinutes(a.time) + a.minutes &&
      toMinutes(a.time) < start + selectedService.minutes
    );
  }), [appointments, date, masterId, selectedService]);

  const changeService = id => {
    setServiceId(id);

    const srv = services.find(s => s.id === id);

    if (srv) {
      setCategoryId(srv.category);

      if (
        !masters
          .find(m => m.id === masterId)
          ?.categories.includes(srv.category)
      ) {
        setMasterId(
          masters.find(m =>
            m.categories.includes(srv.category)
          ).id
        );
      }
    }

    setTime('');
  };

  const changeCategory = id => {
    setCategoryId(id);

    const first = services.find(s => s.category === id);

    if (first) {
      changeService(first.id);
    }
  };

  const changeMaster = id => {
    setMasterId(id);
    setTime('');
  };

  const changeDate = d => {
    setDate(d);
    setTime('');
  };

  const book = () => {
    if (!name.trim()) {
      return Alert.alert(
        'Ім’я клієнта',
        'Будь ласка, введіть ваше ім’я.'
      );
    }

    const formattedPhone = formatPhone(phone);

    if (!formattedPhone) {
      return Alert.alert(
        'Некоректний номер телефону',
        'Введіть номер у форматі +380 XX XXX XX XX.'
      );
    }

    if (!time || !available.includes(time)) {
      return Alert.alert(
        'Оберіть час',
        'Виберіть вільний час для запису.'
      );
    }

    const entry = {
      id: `${Date.now()}-${Math.random()}`,
      name: name.trim(),
      phone: formattedPhone,
      serviceName: selectedService.name,
      masterId,
      masterName: selectedMaster.name,
      date,
      time,
      minutes: selectedService.minutes,
      price,
      status: 'Очікує',
    };

    setAppointments(prev => [...prev, entry]);

    setName('');
    setPhone('');
    setTime('');

    Alert.alert(
      'Запис успішно створено',
      `Ваш запис оформлено.\n\n` +
      `Послуга: ${entry.serviceName}\n` +
      `Майстер: ${entry.masterName}\n` +
      `Дата: ${displayDate(entry.date)}\n` +
      `Час: ${entry.time}\n` +
      `Телефон: ${entry.phone}\n` +
      `Вартість: ${money(entry.price)}`,
      [
        {
          text: 'Переглянути записи',
          onPress: () => setTab('Мої записи'),
        },
      ]
    );
  };

  const updateStatus = a => Alert.alert(
    'Статус запису',
    `${a.name} · ${a.serviceName}`,
    [
      { text: 'Назад', style: 'cancel' },
      {
        text: 'Підтвердити',
        onPress: () => setAppointments(p =>
          p.map(x =>
            x.id === a.id
              ? { ...x, status: 'Підтверджено' }
              : x
          )
        ),
      },
      {
        text: 'Виконано',
        onPress: () => setAppointments(p =>
          p.map(x =>
            x.id === a.id
              ? { ...x, status: 'Виконано' }
              : x
          )
        ),
      },
    ]
  );

  const cancel = a => Alert.alert(
    'Скасувати запис?',
    `${a.name} · ${displayDate(a.date)} ${a.time}`,
    [
      { text: 'Ні', style: 'cancel' },
      {
        text: 'Так, скасувати',
        style: 'destructive',
        onPress: () => setAppointments(p =>
          p.map(x =>
            x.id === a.id
              ? { ...x, status: 'Скасовано' }
              : x
          )
        ),
      },
    ]
  );

  const deleteBooking = a => Alert.alert(
    'Видалення запису',
    `Видалити запис клієнта ${a.name}?`,
    [
      { text: 'Ні', style: 'cancel' },
      {
        text: 'Видалити', style: 'destructive',
        onPress: () => {
          setAppointments(previous => previous.filter(item => item.id !== a.id));
          Alert.alert('Видалення', 'Запис видалено.');
        },
      },
    ]
  );

  const chosenService =
    services.find(s => s.id === editingServiceId) || services[0];

  const pickEditing = s => {
    setEditingServiceId(s.id);
    setEditPrice(String(s.price));
    setEditTopPrice(String(s.topPrice));
    setEditMinutes(String(s.minutes));
  };

  const saveService = () => {
    const p = Number(editPrice);
    const tp = Number(editTopPrice);
    const m = Number(editMinutes);

    if (
      !editPrice ||
      !editTopPrice ||
      !editMinutes ||
      !Number.isInteger(m) ||
      m < 15 ||
      m > 480 ||
      p < 0 ||
      tp < 0 ||
      !Number.isFinite(p) ||
      !Number.isFinite(tp)
    ) {
      return Alert.alert(
        'Перевірте дані',
        'Вкажіть коректні ціни та тривалість від 15 до 480 хв.'
      );
    }

    setServices(old =>
      old.map(s =>
        s.id === editingServiceId
          ? { ...s, price: p, topPrice: tp, minutes: m }
          : s
      )
    );

    setTime('');

    Alert.alert(
      'Збережено',
      'Параметри послуги оновлено.'
    );
  };

  const visible = appointments
    .filter(a =>
      role !== 'Майстер' || a.masterId === filterMasterId
    )
    .sort((a, b) =>
      (a.date + a.time).localeCompare(b.date + b.time)
    );

  const active = appointments.filter(
    a => a.status !== 'Скасовано'
  );

  const tabs =
    role === 'Клієнт'
      ? ['Запис', 'Послуги', 'Мої записи']
      : role === 'Майстер'
        ? ['Розклад', 'Послуги']
        : ['Розклад', 'Послуги', 'Керування'];

  const activeTab = tabs.includes(tab) ? tab : tabs[0];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: C.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={C.bg}
      />

      <FlatList
        data={(activeTab === 'Розклад' || activeTab === 'Мої записи') ? visible : []}
        keyExtractor={item => String(item.id)}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.page}
        renderItem={({ item }) => (
          <BookingItem
            appointment={item}
            role={role}
            onUpdateStatus={updateStatus}
            onCancel={cancel}
            onDelete={deleteBooking}
          />
        )}
        ListHeaderComponent={<>
        <Header />

        <Text style={styles.label}>РЕЖИМ ПЕРЕГЛЯДУ</Text>

        <View style={styles.wrap}>
          {['Клієнт', 'Майстер', 'Адміністратор'].map(r => (
            <Chip
              key={r}
              text={r}
              selected={role === r}
              onPress={() => {
                setRole(r);
                setTab(
                  r === 'Клієнт' ? 'Запис' : 'Розклад'
                );
              }}
            />
          ))}
        </View>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>
              {active.length}
            </Text>
            <Text style={styles.statLabel}>
              ЗАПИСІВ
            </Text>
          </View>

          <View style={styles.stat}>
            <Text style={styles.statValue}>
              {active.filter(
                a => a.status === 'Виконано'
              ).length}
            </Text>
            <Text style={styles.statLabel}>
              ВИКОНАНО
            </Text>
          </View>

          <View style={styles.stat}>
            <Text style={styles.statValue}>
              {active.filter(
                a => a.status !== 'Виконано'
              ).length}
            </Text>
            <Text style={styles.statLabel}>
              АКТИВНІ
            </Text>
          </View>
        </View>

        <View style={styles.wrap}>
          {tabs.map(t => (
            <Chip
              key={t}
              text={t}
              selected={activeTab === t}
              onPress={() => setTab(t)}
            />
          ))}
        </View>

        {activeTab === 'Запис' && (
          <Card>
            <Text style={styles.eyebrowLeft}>
              BOOK AN APPOINTMENT
            </Text>

            <Text style={styles.heading}>
              Новий запис
            </Text>

            <Field
              label="ІМ’Я КЛІЄНТА"
              value={name}
              onChangeText={setName}
              placeholder="Ваше ім’я"
            />

            <Field
              label="НОМЕР ТЕЛЕФОНУ"
              value={phone}
              onChangeText={setPhone}
              placeholder="+380 XX XXX XX XX"
              keyboardType="phone-pad"
              maxLength={19}
            />

            <Text style={styles.label}>
              НАПРЯМОК КРАСИ
            </Text>

            <View style={styles.categoryGrid}>
              {categories.map(c => (
                <TouchableOpacity
                  key={c.id}
                  activeOpacity={0.8}
                  onPress={() => changeCategory(c.id)}
                  style={[
                    styles.categoryTile,
                    categoryId === c.id &&
                      styles.categoryTileSelected,
                  ]}
                >
                  <Image
                    source={{ uri: c.image }}
                    style={styles.categoryImage}
                  />

                  <Text style={styles.categoryTileText}>
                    {c.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>
              ОБЕРІТЬ ПОСЛУГУ
            </Text>

            <View style={styles.wrap}>
              {services
                .filter(s => s.category === categoryId)
                .map(s => (
                  <Chip
                    key={s.id}
                    text={s.name}
                    selected={serviceId === s.id}
                    onPress={() => changeService(s.id)}
                  />
                ))}
            </View>

            <Text style={styles.label}>
              ОБЕРІТЬ МАЙСТРА
            </Text>

            <View style={styles.wrap}>
              {eligibleMasters.map(m => (
                <Chip
                  key={m.id}
                  text={`${m.name} · ${m.level}`}
                  selected={masterId === m.id}
                  onPress={() => changeMaster(m.id)}
                />
              ))}
            </View>

            <Text style={styles.label}>
              ДАТА (НАСТУПНІ 14 ДНІВ)
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 14 }}
            >
              {Array.from({ length: 14 }, (_, i) => {
                const d = new Date();
                d.setDate(d.getDate() + i);

                const key = localDate(d);

                return (
                  <View
                    key={key}
                    style={{ marginRight: 7 }}
                  >
                    <Chip
                      text={`${pad(d.getDate())}.${pad(d.getMonth() + 1)}`}
                      selected={date === key}
                      onPress={() => changeDate(key)}
                    />
                  </View>
                );
              })}
            </ScrollView>

            <Text style={styles.label}>
              ВІЛЬНИЙ ЧАС
            </Text>

            {available.length ? (
              <View style={styles.wrap}>
                {available.map(t => (
                  <Chip
                    key={t}
                    text={t}
                    selected={time === t}
                    onPress={() => setTime(t)}
                  />
                ))}
              </View>
            ) : (
              <Text style={styles.note}>
                На цей день немає вільного часу.
                Оберіть іншу дату або майстра.
              </Text>
            )}

            <View style={styles.summary}>
              <Text style={styles.summaryText}>
                Тривалість: {selectedService.minutes} хв
              </Text>

              <Text style={styles.summaryPrice}>
                {money(price)}
              </Text>
            </View>

            <Button
              title="Підтвердити запис"
              onPress={book}
            />
          </Card>
        )}

        {activeTab === 'Послуги' && (
          <>
            <Text style={styles.headingOutside}>
              Наші послуги
            </Text>

            {categories.map(c => (
              <View key={c.id}>
                <View style={styles.catalogHeader}>
                  <Image
                    source={{ uri: c.image }}
                    style={styles.catalogImage}
                  />

                  <View style={styles.catalogOverlay}>
                    <Text style={styles.catalogTitle}>
                      {c.title}
                    </Text>

                    <Text style={styles.catalogSub}>
                      {c.sub}
                    </Text>
                  </View>
                </View>

                {services
                  .filter(s => s.category === c.id)
                  .map(s => (
                    <View
                      key={s.id}
                      style={styles.catalogService}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={styles.serviceTitle}>
                          {s.name}
                        </Text>

                        <Text style={styles.note}>
                          {s.minutes} хв · Майстер{' '}
                          {money(s.price)}
                          {' · '}Топ {money(s.topPrice)}
                        </Text>
                      </View>

                      {role === 'Клієнт' && (
                        <TouchableOpacity
                          onPress={() => {
                            changeService(s.id);
                            setTab('Запис');
                          }}
                          style={styles.miniBook}
                        >
                          <Text style={styles.miniBookText}>
                            Обрати
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
              </View>
            ))}
          </>
        )}

        {(activeTab === 'Розклад' ||
          activeTab === 'Мої записи') && (
          <>
            <Text style={styles.headingOutside}>
              {activeTab === 'Мої записи'
                ? 'Мої записи'
                : 'Розклад клієнтів'}
            </Text>

            {role === 'Майстер' && (
              <>
                <Text style={styles.label}>
                  МАЙСТЕР
                </Text>

                <View style={styles.wrap}>
                  {masters.map(m => (
                    <Chip
                      key={m.id}
                      text={m.name}
                      selected={filterMasterId === m.id}
                      onPress={() =>
                        setFilterMasterId(m.id)
                      }
                    />
                  ))}
                </View>
              </>
            )}

            {visible.length === 0 && (
              <Card>
                <Text style={styles.empty}>✿</Text>
                <Text style={styles.emptyTitle}>Записів поки немає</Text>
                <Text style={styles.note}>Нові записи з’являться тут.</Text>
              </Card>
            )}
          </>
        )}

        {activeTab === 'Керування' && (
          <Card>
            <Text style={styles.heading}>
              Налаштування послуг
            </Text>

            <Text style={styles.note}>
              Оберіть послугу, змініть ціни та тривалість.
            </Text>

            <View style={styles.wrap}>
              {services.map(s => (
                <Chip
                  key={s.id}
                  text={s.name}
                  selected={editingServiceId === s.id}
                  onPress={() => pickEditing(s)}
                />
              ))}
            </View>

            <Text style={styles.serviceTitle}>
              {chosenService.name}
            </Text>

            <Field
              label="ЦІНА МАЙСТРА, ₴"
              value={editPrice}
              onChangeText={setEditPrice}
              keyboardType="numeric"
              placeholder={String(chosenService.price)}
            />

            <Field
              label="ЦІНА ТОП-МАЙСТРА, ₴"
              value={editTopPrice}
              onChangeText={setEditTopPrice}
              keyboardType="numeric"
              placeholder={String(chosenService.topPrice)}
            />

            <Field
              label="ТРИВАЛІСТЬ, ХВ"
              value={editMinutes}
              onChangeText={setEditMinutes}
              keyboardType="numeric"
              placeholder={String(chosenService.minutes)}
            />

            <Button
              title="Зберегти зміни"
              onPress={saveService}
            />
          </Card>
        )}

        </>}
        ListFooterComponent={
          <Text style={styles.footer}>RE:BELLE · BEAUTY STUDIO</Text>
        }
      />
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

