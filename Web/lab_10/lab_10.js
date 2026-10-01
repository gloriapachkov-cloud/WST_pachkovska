// Завдання 2
console.log('\n========== ЗАВДАННЯ 2 ==========\n');

// Блок 2.1:
// Очікуваний порядок: 1, 4, 3, 2
// Пояснення:
// 1 — синхронний код, виконується одразу
// 4 — синхронний код, виконується одразу після 1
// 3 — Promise.resolve().then() потрапляє до черги мікрозадач. Мікрозадачі виконуються одразу
//     після поточного синхронного коду, ще до того як Event Loop перейде до наступного "тіку".
// 2 — setTimeout з delay=0 потрапляє до черги макрозадач.Вона виконується лише після того,
//     як стек викликів порожній І всі мікрозадачі оброблено.

console.log('--- Блок 2.1 ---');
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');

// Блок 2.2:
// Очікуваний порядок: A, B, E, C, F, D
// Пояснення:
// A — синхронний     setTimeout_outer ставиться у macrotask queue
// B — синхронний     Promise_outer.then(E) ставиться у microtask queue
// синхронний стек завершено.
// E — мікрозадача виконується; в її тілі: Promise_inner.then(F) ставиться у microtask queue
// microtask queue не порожня.
// F — мікрозадача виконується
// microtask queue порожня; Event Loop бере наступну macrotask.
// C — тіло setTimeout_outer; в його тілі: setTimeout_inner ставиться у macrotask queue
// microtask queue порожня; Event Loop бере наступну macrotask.
// D — тіло setTimeout_inner

console.log('\n--- Блок 2.2 ---');
console.log('A');
setTimeout(() => {
  console.log('C');
  setTimeout(() => console.log('D'), 0);
}, 0);
console.log('B');
Promise.resolve()
  .then(() => {
    console.log('E');
    return Promise.resolve();
  })
  .then(() => console.log('F'));

// Чекаємо, поки всі мікро/макрозадачі Завдання 2 виконаються
setTimeout(() => {
  // Завдання 3
  console.log('\n========== ЗАВДАННЯ 3 ==========\n');

  /**
   * Завантажує дані про товар (імітація через setTimeout).
   * @param {number} id
   * @param {function} callback — викликається з (error, data)
   */
  function loadData(id, callback) {
    setTimeout(() => {
      const data = { id, name: 'Товар ' + id, price: id * 100 };
      callback(null, data);
    }, 1000);
  }

  /**
   * Обробляє дані товару (імітація через setTimeout).
   * @param {object} data
   * @param {function} callback — викликається з (error, data)
   */
  function processData(data, callback) {
    setTimeout(() => {
      const processed = { ...data, processed: true };
      callback(null, processed);
    }, 500);
  }

  /**
   * Зберігає дані товару (імітація через setTimeout).
   * @param {object} data
   * @param {function} callback — викликається з (error, data)
   */
  function saveData(data, callback) {
    setTimeout(() => {
      console.log('Завдання 3 Збережено: ' + data.name);
      callback(null, data);
    }, 500);
  }

  // ПРОБЛЕМА CALLBACK-ПІДХОДУ ("Колбек хел"):
  // Кожна наступна асинхронна операція вкладається всередину попередньої.
  // При великій кількості операцій код стає горизонтально розтягнутим (піраміда),
  // важкочитабельним, важко підтримуваним та важко тестованим.
  // Обробка помилок повторюється у кожному рівні вкладеності.

  console.log('Починаємо callback-ланцюжок...');
  loadData(1, (err, data) => {
    if (err) return console.error('Помилка завантаження:', err);
    processData(data, (err, processed) => {
      if (err) return console.error('Помилка обробки:', err);
      saveData(processed, (err) => {
        if (err) return console.error('Помилка збереження:', err);
        console.log('Завдання 3 Готово!');
        
        // Після Завдання 3 запускаємо Завдання 4
        setTimeout(() => {
          // Завдання 4
          console.log('\n========== ЗАВДАННЯ 4 ==========\n');

          /**
           * @param {number} id
           * @returns {Promise<object>}
           */
          function loadDataP(id) {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve({ id, name: 'Товар ' + id, price: id * 100 });
              }, 1000);
            });
          }

          /**
           * @param {object} data
           * @returns {Promise<object>}
           */
          function processDataP(data) {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve({ ...data, processed: true });
              }, 500);
            });
          }

          /**
           * @param {object} data
           * @returns {Promise<object>}
           */
          function saveDataP(data) {
            return new Promise((resolve) => {
              setTimeout(() => {
                console.log('Завдання 4 Збережено: ' + data.name);
                resolve(data);
              }, 500);
            });
          }

          loadDataP(1)
            .then((data) => processDataP(data))
            .then((processed) => saveDataP(processed))
            .then((saved) => {
              console.log('Завдання 4: товар оброблено:', saved);
              
              return Promise.all([loadDataP(1), loadDataP(2), loadDataP(3)]);
            })
            .then((items) => {
              console.log('Завдання 4 (Promise.all): завантажено товари:');
              items.forEach((item) => console.log(' -', item));
              
              // Після Завдання 4 запускаємо Завдання 5
              setTimeout(() => {
                // Завдання 5
                console.log('\n========== ЗАВДАННЯ 5 ==========\n');

                async function run() {
                  try {
                    const data = await loadDataP(1);
                    const processed = await processDataP(data);
                    const saved = await saveDataP(processed);
                    console.log('Завдання 5: товар оброблено:', saved);

                    const items = await Promise.all([loadDataP(1), loadDataP(2), loadDataP(3)]);
                    console.log('Завдання 5 (Promise.all): завантажено товари:');
                    items.forEach((item) => console.log(' -', item));
                    
                    // Після Завдання 5 запускаємо Завдання 6
                    setTimeout(() => {
                      // Завдання 6
                      console.log('\n========== ЗАВДАННЯ 6 ==========\n');

                      /**
                       * @param {function(): Promise} promiseFn — функція, що повертає Promise
                       * @param {number} retries — максимальна кількість спроб
                       * @returns {Promise}
                       */
                      function fetchWithRetry(promiseFn, retries) {
                        return new Promise((resolve, reject) => {
                          function attempt(attemptsLeft) {
                            promiseFn()
                              .then(resolve)
                              .catch((err) => {
                                console.log(`  Спроба невдала. Залишилось спроб: ${attemptsLeft - 1}`);
                                if (attemptsLeft <= 1) {
                                  reject(new Error(`Всі ${retries} спроб невдалі. Остання помилка: ${err.message}`));
                                } else {
                                  attempt(attemptsLeft - 1);
                                }
                              });
                          }
                          attempt(retries);
                        });
                      }

                      function unreliableFetch() {
                        return new Promise((resolve, reject) => {
                          setTimeout(() => {
                            if (Math.random() < 0.7) {
                              reject(new Error('Випадкова помилка мережі'));
                            } else {
                              resolve({ data: 'Успішна відповідь сервера', timestamp: Date.now() });
                            }
                          }, 200);
                        });
                      }

                      console.log('Запускаємо fetchWithRetry (максимум 5 спроб)...');
                      fetchWithRetry(unreliableFetch, 5)
                        .then((result) => console.log('Завдання 6: отримано результат:', result))
                        .catch((err) => console.error('Завдання 6: остаточна помилка після всіх спроб:', err.message));
                    }, 100);
                  } catch (err) {
                    console.error('Завдання 5: помилка:', err);
                  }
                }
                run();
              }, 100);
            })
            .catch((err) => console.error('Завдання 4: помилка:', err));
        }, 100);
      });
    });
  });
}, 100);

// ПОРІВНЯННЯ ТРЬОХ ПІДХОДІВ:
//
// 1. Callback:
//    Плюси: простота концепції, немає потреби у спеціальних ключових словах.
//    Мінуси: "callback hell" — глибока вкладеність, ручна обробка помилок у кожному
//    рівні, важко читати та підтримувати при більш ніж 2-3 операціях.
//
// 2. Promise (.then()):
//    Плюси: плоский ланцюжок замість пірамід, єдиний .catch() для всіх помилок,
//    легко паралелізувати (Promise.all).
//    Мінуси: все ще функціональний стиль з колбеками (хоч і плоскими), при
//    складних умовах ланцюжок може ускладнюватися.
//
// 3. async/await:
//    Плюси: максимальна читабельність — виглядає як синхронний код, звичайний
//    try/catch для помилок, легко налагоджувати (стек трейси зрозуміліші).
//    Мінуси: потрібна підтримка середовища; при необережному використанні
//    (await у циклі) можна випадково серіалізувати паралельні операції.
//
// Висновок: async/await є найчитабельнішим і рекомендованим підходом для
// більшості сучасного JavaScript коду