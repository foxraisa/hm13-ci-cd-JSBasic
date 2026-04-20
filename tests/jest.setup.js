// tests/jest.setup.js
// ✅ Эмулируем мгновенное завершение CSS-анимаций в тестах

beforeAll(() => {
  const originalAddEventListener = EventTarget.prototype.addEventListener;
  
  EventTarget.prototype.addEventListener = function(type, listener, options) {
    // ✅ Если это анимация — выполняем слушатель НЕМЕДЛЕННО
    if (type === 'animationend') {
      // Создаём фейковое событие
      const fakeEvent = new Event('animationend');
      fakeEvent.animationName = 'fadeOut';
      
      // Вызываем слушатель синхронно
      listener.call(this, fakeEvent);
      return;
    }
    // Для остальных событий — стандартное поведение
    return originalAddEventListener.call(this, type, listener, options);
  };
});

afterEach(() => {
  jest.clearAllMocks();
});