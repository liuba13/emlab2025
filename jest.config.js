export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};

// Коментарі до коду:
// Налаштування Jest для тестування React-додатку.
// Вказуємо середовище тестування як jsdom для емуляції браузера.
// Використовуємо babel-jest для трансформації файлів .js, .jsx, .ts, .tsx.
// Налаштовуємо moduleNameMapper для ігнорування імпортів стилів під час тестування.
// Вказуємо файл setupFilesAfterEnv для додаткової конфігурації після налаштування середовища тестування.