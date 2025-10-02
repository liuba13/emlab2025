module.exports = {
  presets: [
    "@babel/preset-env",
    ["@babel/preset-react", { runtime: "automatic" }]
  ]
};

// Коментарі до коду:
// Налаштування Babel для трансформації сучасного JavaScript та JSX.
// Використовуємо пресет @babel/preset-env для підтримки сучасних функцій JS.
// Використовуємо пресет @babel/preset-react з автоматичним runtime для роботи з React.