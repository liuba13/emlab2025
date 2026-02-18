Покрокова інструкція запуску проєкту екологічного моніторингу
Передумови
Перед початком роботи переконайтеся, що у вас встановлено:
1. Node.js та npm
Завантажте з nodejs.org
Виберіть версію LTS (рекомендована)

Після встановлення перевірте:
bashnode --version
npm --version

2. MongoDB
Локальне встановлення
Завантажте з mongodb.com
Встановіть MongoDB Community Server

3. Git (опціонально)
Завантажте з git-scm.com

Крок 1: Створення проєкту

1.1 Створіть папку проєкту
bashmkdir eco-monitoring-api
cd eco-monitoring-api

1.2 Ініціалізуйте npm проєкт
bashnpm init -y

1.3 Створіть структуру папок
bashmkdir src
mkdir src/config
mkdir src/models
mkdir src/middleware
mkdir src/routes

Крок 2: Створення файлів
2.1 Створіть package.json
Замініть вміст файлу package.json:
json{
  "name": "eco-monitoring-api",
  "version": "1.0.0",
  "description": "API для екологічного моніторингу на основі SaveEcoBot",
  "main": "src/app.js",
  "type": "module",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "helmet": "^7.1.0",
    "joi": "^17.11.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.2",
    "jest": "^29.7.0",
    "supertest": "^6.3.3"
  }
}
2.2 Створіть .env файл

2.3 Створіть .gitignore
gitignore 
node_modules/
.env
*.log
.DS_Store
dist/
build/
coverage/

2.4 Створіть файли коду
Скопіюйте код з наданих файлів у відповідні файли:

src/config/database.js - конфігурація бази даних
src/models/Station.js - модель станції
src/models/Measurement.js - модель вимірювання
src/middleware/validation.js - валідація
src/middleware/error.js - обробка помилок
src/routes/stations.js - маршрути станцій
src/routes/measurements.js - маршрути вимірювань
src/routes/saveecobot.js - інтеграція з SaveEcoBot
src/app.js - головний файл

Крок 3: Встановлення залежностей
npm install node-fetch
npm install express mongoose cors dotenv helmet joi

Для розробки також встановіть:
npm install --save-dev nodemon

Крок 4: Запуск MongoDB
Якщо використовуєте локальний MongoDB:
Windows/macOS/Linux
mongod

Крок 5: Запуск проєкту
Для розробки (з автоматичним перезапуском):
npm run dev

Для продакшену:
npm start

Крок 6: Перевірка роботи
Відкрийте браузер та перейдіть на:

http://localhost:3000 - головна сторінка
http://localhost:3000/health - перевірка стану

Ви повинні побачити JSON відповідь з інформацією про API.

Крок 7: Тестування API
7.1 Перевірка стану системи
bashcurl http://localhost:3000/health
7.2 Отримання списку станцій
bashcurl http://localhost:3000/api/stations
7.3 Синхронізація з SaveEcoBot
bashcurl http://localhost:3000/api/saveecobot/sync
7.4 Отримання останніх вимірювань
bashcurl http://localhost:3000/api/measurements/latest

Крок 8: Використання Postman (рекомендується)
Завантажте Postman
Створіть нову колекцію
Додайте запити для тестування API:
Базовий URL: http://localhost:3000

Основні endpoint'и:
GET /health - стан системи
GET /api/stations - список станцій
GET /api/measurements/latest - останні вимірювання
GET /api/saveecobot/sync - синхронізація даних



Запуск проєкту
5.1 Запуск backend (якщо не запущений)
У першому терміналі:
bash
cd backend
npm run dev

5.2 Запуск frontend
У другому терміналі:
bash
cd frontend
npm start

Перевірка роботи
Відкрийте браузер і перейдіть на http://localhost:3001

#Про проєкт

  Розроблено для дисципліни Екологічний моніторинг [Кафедри ЦТЕ КПІ](https://dte.kpi.ua)
  
  Детальніше про навчання: https://dte.kpi.ua
