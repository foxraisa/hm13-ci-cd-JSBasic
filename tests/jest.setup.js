// tests/jest.setup.js
// ✅ Эмулируем мгновенное завершение CSS-анимаций в тестах
beforeAll(() => {
  // Мокаем addEventListener, чтобы сразу триггерить animationend
  const originalAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type, listener, options) {
    if (type === 'animationend') {
      // Вызываем слушатель немедленно в тестах
      const wrapped = (event) => {
        event = event || { animationName: 'fadeOut' };
        listener.call(this, event);
      };
      return originalAddEventListener.call(this, type, wrapped, options);
    }
    return originalAddEventListener.call(this, type, listener, options);
  };
});

// ✅ Очищаем моки после каждого теста
afterEach(() => {
  jest.clearAllMocks();
});