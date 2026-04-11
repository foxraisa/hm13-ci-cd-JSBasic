// tests/app.test.js
import '../src/script.js';

// ✅ Включаем фейковые таймеры для контроля setTimeout
beforeAll(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
  document.body.innerHTML = '';
});

beforeEach(() => {
  document.body.innerHTML = `
    <div class="container">
      <input type="text" id="textInput" data-testid="input" placeholder="Введите текст...">
      <button id="addButton" data-testid="button" disabled>Добавить параграф</button>
      <div id="errorMessage" data-testid="error" class="error-message"></div>
      <div class="paragraphs-container" id="paragraphsContainer" data-testid="container">
        <p data-testid="paragraph">Первый параграф</p>
        <p data-testid="paragraph">Второй параграф</p>
      </div>
      <div class="counter">
        Параграфов: <span id="counter" data-testid="counter">2</span>
        <div class="limit-info">(максимум 5)</div>
      </div>
    </div>
  `;
});

test('кнопка активна при вводе текста', () => {
  const textInput = document.querySelector('[data-testid="input"]');
  const addButton = document.querySelector('[data-testid="button"]');
  
  expect(addButton.disabled).toBe(true);
  
  textInput.value = 'Новый текст';
  window.paragraphApp.updateButton(textInput, addButton);
  
  expect(addButton.disabled).toBe(false);
});

test('добавляет параграф при валидном вводе', () => {
  const textInput = document.querySelector('[data-testid="input"]');
  const addButton = document.querySelector('[data-testid="button"]');
  const container = document.querySelector('[data-testid="container"]');
  const counter = document.querySelector('[data-testid="counter"]');
  const error = document.querySelector('[data-testid="error"]');
  
  const initialCount = container.querySelectorAll('[data-testid="paragraph"]').length;
  
  textInput.value = 'Тестовый параграф';
  const result = window.paragraphApp.addParagraph(textInput, addButton, container, counter, error);
  
  expect(result).toBe(true);
  expect(container.querySelectorAll('[data-testid="paragraph"]')).toHaveLength(initialCount + 1);
  expect(container.lastElementChild.textContent).toBe('Тестовый параграф');
});

test('показывает ошибку при пустом вводе', () => {
  const textInput = document.querySelector('[data-testid="input"]');
  const addButton = document.querySelector('[data-testid="button"]');
  const container = document.querySelector('[data-testid="container"]');
  const counter = document.querySelector('[data-testid="counter"]');
  const error = document.querySelector('[data-testid="error"]');
  
  textInput.value = '   ';
  const result = window.paragraphApp.addParagraph(textInput, addButton, container, counter, error);
  
  expect(result).toBe(false);
  // ✅ Проверка через класс, а не инлайн-стиль
  expect(error.classList.contains('error--visible')).toBe(true);
  expect(error.textContent).toBe('Пожалуйста, введите текст');
});

test('счетчик обновляется корректно', () => {
  const container = document.querySelector('[data-testid="container"]');
  const counter = document.querySelector('[data-testid="counter"]');
  
  expect(counter.textContent).toBe('2');
  
  const count = window.paragraphApp.updateCounter(container, counter);
  
  expect(count).toBe(2);
  expect(counter.textContent).toBe('2');
});

test('не превышает лимит параграфов', () => {
  const textInput = document.querySelector('[data-testid="input"]');
  const addButton = document.querySelector('[data-testid="button"]');
  const container = document.querySelector('[data-testid="container"]');
  const counter = document.querySelector('[data-testid="counter"]');
  const error = document.querySelector('[data-testid="error"]');
  
  // Добавляем больше, чем лимит
  for (let i = 0; i < 10; i++) {
    textInput.value = `Параграф ${i + 3}`;
    window.paragraphApp.addParagraph(textInput, addButton, container, counter, error);
  }
  
  // ✅ Проматываем таймеры для завершения анимаций
  jest.runAllTimers();
  
  expect(container.querySelectorAll('[data-testid="paragraph"]')).toHaveLength(
    window.paragraphApp.maxParagraphs
  );
});

test('отклоняет текст длиннее 500 символов', () => {
  const textInput = document.querySelector('[data-testid="input"]');
  const addButton = document.querySelector('[data-testid="button"]');
  const container = document.querySelector('[data-testid="container"]');
  const counter = document.querySelector('[data-testid="counter"]');
  const error = document.querySelector('[data-testid="error"]');
  
  textInput.value = 'A'.repeat(600);
  const result = window.paragraphApp.addParagraph(textInput, addButton, container, counter, error);
  
  expect(result).toBe(false);
  expect(error.classList.contains('error--visible')).toBe(true);
  expect(error.textContent).toContain('слишком длинный');
});

test('очищает поле ввода после добавления', () => {
  const textInput = document.querySelector('[data-testid="input"]');
  const addButton = document.querySelector('[data-testid="button"]');
  const container = document.querySelector('[data-testid="container"]');
  const counter = document.querySelector('[data-testid="counter"]');
  const error = document.querySelector('[data-testid="error"]');
  
  textInput.value = 'Текст для проверки';
  window.paragraphApp.addParagraph(textInput, addButton, container, counter, error);
  
  expect(textInput.value).toBe('');
});