
RE:BELLE — технологічне портфоліо
Beauty Studio · кросплатформний застосунок для онлайн-запису на послуги салону краси.

Технологічний стек і компетентності
Рівень	Технології	Лабораторні	Реалізація / код
Платформи	Web, мобільні ОС, Electron desktop	№1, №4–6	Web, Desktop; мобільна версія — лабораторна №5 в основному репозиторії
Клієнти	React, Vite, React Native, Expo, Electron, HTML/CSS/JS	№4–6	React, Electron
Спільне ядро	JavaScript, npm workspaces, @rebelle/core	№7–8	Core, [скрипт синхронізації](scripts/sync-core.mjs)
Сервер / API	Node.js, Express REST, Apollo GraphQL, JWT	№2–3	Окремі лабораторні реалізації, не інтегровані в цей monorepo
Зберігання	MongoDB/Mongoose, localStorage, файлова система	№2, №4, №6–8	Web, Desktop; MongoDB — окрема лабораторна №2


Мої сильні сторони проєкту
1. Спільна бізнес-логіка: @rebelle/core використовується React та Electron.
2. Дві робочі платформи: запис клієнта у вебзастосунку та Electron.
3. Платформні адаптери: локальне зберігання у браузері й файлове сховище на desktop.
4. Автоматичне тестування: 23 успішні тести, зокрема перевірка однакових API CommonJS та ESM.
Історія проєкту
Назва: RE:BELLE — Beauty Studio.

Проблема: клієнтам потрібен зручний запис на послуги салону, а працівникам — облік і керування записами.

Моя роль і внесок: проєктування інтерфейсів, реалізація React і Electron, моделювання бізнес-правил, підключення спільного ядра та перевірка тестами.

Чому цей стек: React дає компонентний вебінтерфейс; Expo дозволяє створювати мобільний прототип; Electron — desktop-клієнт на вебтехнологіях; Node.js — серверні API; @rebelle/core прибирає повторення правил.

Найскладніший кросплатформний виклик: різні модульні системи ESM/CommonJS та різні способи збереження даних. Рішення — єдине джерело ядра, синхронізація ESM-експортів і платформні адаптери.

Здобуті вміння: React/React Native, Electron, Node.js, REST/GraphQL, проєктування API, npm workspaces, тестування, Git/GitHub, відокремлення бізнес-логіки від інтерфейсу.
Запуск лабораторних №7–8
npm install
npm test
npm run start:web
npm run start:desktop
Демонстрація спільного правила: зміна MAX_CLIENT_LENGTH у packages/core/index.cjs з 80 на 40 обмежує довжину імені у React і Electron після синхронізації/перезапуску. Для реєстрації Electron використовується core.MAX_CLIENT_LENGTH.

Примітка: REST/GraphQL API та MongoDB створювалися в попередніх лабораторних; цей монорепозиторій не заявляє їх як інтегрований сервер поточної збірки.

GitHub: https://github.com/gloriapachkov-cloud/WST_pachkovska/tree/main/cross-platform-programming/lab7_8
