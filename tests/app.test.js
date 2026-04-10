/**
 * Простые тесты для приложения параграфов
 */

// Перед каждым тестом создаем чистую страницу
beforeEach(() => {
  // Создаем HTML структуру как в реальной странице
  document.body.innerHTML = `
    <div class="container">
      <input type="text" id="textInput" placeholder="Введите текст...">
      <button id="addButton" disabled>Добавить параграф</button>
      <div id="errorMessage" class="error-message" style="display: none;"></div>
      <div class="paragraphs-container" id="paragraphsContainer">
        <p>Первый параграф</p>
        <p>Второй параграф</p>
      </div>
      <div class="counter">
        Параграфов: <span id="counter">2</span>
        <div class="limit-info">(максимум 5)</div>
      </div>
    </div>
  `;
});

// Тест 1: Проверяем обновление кнопки
test('кнопка должна быть активна когда есть текст', () => {
  const textInput = document.getElementById('textInput');
  const addButton = document.getElementById('addButton');
  
  // Проверяем что кнопка изначально неактивна
  expect(addButton.disabled).toBe(true);
  
  // Вводим текст
  textInput.value = 'Новый текст';
  
  // Обновляем состояние кнопки
  window.paragraphApp.updateButton(textInput, addButton);
  
  // Теперь кнопка должна быть активна
  expect(addButton.disabled).toBe(false);
});

// Тест 2: Проверяем добавление параграфа
test('добавляет новый параграф при правильном вводе', () => {
  const textInput = document.getElementById('textInput');
  const addButton = document.getElementById('addButton');
  const paragraphsContainer = document.getElementById('paragraphsContainer');
  const counterElement = document.getElementById('counter');
  const errorMessage = document.getElementById('errorMessage');
  
  // Запоминаем начальное количество параграфов
  const initialCount = paragraphsContainer.children.length;
  
  // Вводим текст и добавляем параграф
  textInput.value = 'Тестовый параграф';
  const result = window.paragraphApp.addParagraph(textInput, addButton, paragraphsContainer, counterElement, errorMessage);
  
  // Проверяем что параграф добавился успешно
  expect(result).toBe(true);
  expect(paragraphsContainer.children.length).toBe(initialCount + 1);
  expect(paragraphsContainer.lastChild.textContent).toBe('Тестовый параграф');
});

// Тест 3: Проверяем обработку пустого ввода
test('показывает ошибку при пустом вводе', () => {
  const textInput = document.getElementById('textInput');
  const addButton = document.getElementById('addButton');
  const paragraphsContainer = document.getElementById('paragraphsContainer');
  const counterElement = document.getElementById('counter');
  const errorMessage = document.getElementById('errorMessage');
  
  // Пытаемся добавить пустой текст
  textInput.value = '   '; // Только пробелы
  const result = window.paragraphApp.addParagraph(textInput, addButton, paragraphsContainer, counterElement, errorMessage);
  
  // Проверяем что параграф не добавился и показана ошибка
  expect(result).toBe(false);
  expect(errorMessage.style.display).toBe('block');
  expect(errorMessage.textContent).toBe('Пожалуйста, введите текст');
});

// Тест 4: Проверяем обновление счетчика
test('счетчик обновляется при добавлении параграфа', () => {
  const paragraphsContainer = document.getElementById('paragraphsContainer');
  const counterElement = document.getElementById('counter');
  
  // Проверяем начальное значение
  expect(counterElement.textContent).toBe('2');
  
  // Обновляем счетчик
  const count = window.paragraphApp.updateCounter(paragraphsContainer, counterElement);
  
  // Проверяем что счетчик показывает правильное количество
  expect(count).toBe(2);
  expect(counterElement.textContent).toBe('2');
});

// Тест 5: Проверяем ограничение на максимальное количество параграфов
test('не позволяет иметь больше 5 параграфов', () => {
  const textInput = document.getElementById('textInput');
  const addButton = document.getElementById('addButton');
  const paragraphsContainer = document.getElementById('paragraphsContainer');
  const counterElement = document.getElementById('counter');
  const errorMessage = document.getElementById('errorMessage');
  
  // Добавляем параграфы до превышения лимита
  for (let i = 0; i < 10; i++) {
    textInput.value = `Параграф ${i + 3}`;
    window.paragraphApp.addParagraph(textInput, addButton, paragraphsContainer, counterElement, errorMessage);
  }
  
  // Проверяем что параграфов не больше максимума
  expect(paragraphsContainer.children.length).toBeLessThanOrEqual(window.paragraphApp.maxParagraphs);
});

// Тест 6: Проверяем обработку длинного текста
test('показывает ошибку при слишком длинном тексте', () => {
  const textInput = document.getElementById('textInput');
  const addButton = document.getElementById('addButton');
  const paragraphsContainer = document.getElementById('paragraphsContainer');
  const counterElement = document.getElementById('counter');
  const errorMessage = document.getElementById('errorMessage');
  
  // Создаем слишком длинный текст
  const longText = 'A'.repeat(600);
  textInput.value = longText;
  
  const result = window.paragraphApp.addParagraph(textInput, addButton, paragraphsContainer, counterElement, errorMessage);
  
  // Проверяем что параграф не добавился и показана ошибка
  expect(result).toBe(false);
  expect(errorMessage.style.display).toBe('block');
  expect(errorMessage.textContent).toContain('слишком длинный');
});

// Тест 7: Проверяем очистку поля ввода
test('очищает поле ввода после добавления параграфа', () => {
  const textInput = document.getElementById('textInput');
  const addButton = document.getElementById('addButton');
  const paragraphsContainer = document.getElementById('paragraphsContainer');
  const counterElement = document.getElementById('counter');
  const errorMessage = document.getElementById('errorMessage');
  
  // Вводим текст и добавляем параграф
  textInput.value = 'Текст для проверки';
  window.paragraphApp.addParagraph(textInput, addButton, paragraphsContainer, counterElement, errorMessage);
  
  // Проверяем что поле ввода очистилось
  expect(textInput.value).toBe('');
});

console.log('Все тесты загружены! Запустите: npm test');