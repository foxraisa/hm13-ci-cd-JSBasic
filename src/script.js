// ✅ Конфигурация — все настройки в одном месте
const CONFIG = {
  MAX_PARAGRAPHS: 5,
  MAX_TEXT_LENGTH: 500,
  ERROR_TIMEOUT: 3000,
  COUNTER_WARNING_THRESHOLD: 4,
  SELECTORS: {
    INPUT: '#textInput',
    BUTTON: '#addButton',
    CONTAINER: '#paragraphsContainer',
    COUNTER: '#counter',
    ERROR: '#errorMessage'
  },
  CLASSES: {
    ERROR_VISIBLE: 'error--visible',
    COUNTER_WARNING: 'counter--warning',
    PARAGRAPH_ENTER: 'paragraph--enter',
    PARAGRAPH_EXIT: 'paragraph--exit'
  }
};

// ✅ Глобальный объект для тестирования + экспорты конфигурации
window.paragraphApp = {
  // 🎯 Экспортируем константы для тестов
  maxParagraphs: CONFIG.MAX_PARAGRAPHS,
  maxTextLength: CONFIG.MAX_TEXT_LENGTH,

  // Валидация и обновление состояния кнопки
  updateButton(textInput, addButton) {
    addButton.disabled = !textInput.value.trim();
  },

  // Показать ошибку с авто-скрытием
  showError(errorMessage, message) {
    errorMessage.textContent = message;
    errorMessage.classList.add(CONFIG.CLASSES.ERROR_VISIBLE);
    
    setTimeout(() => {
      errorMessage.classList.remove(CONFIG.CLASSES.ERROR_VISIBLE);
    }, CONFIG.ERROR_TIMEOUT);
  },

  // Обновление счётчика с визуальной индикацией
  updateCounter(paragraphsContainer, counterElement) {
    const count = paragraphsContainer.querySelectorAll('p[data-testid="paragraph"]').length;
    counterElement.textContent = count;
    
    counterElement.classList.toggle(
      CONFIG.CLASSES.COUNTER_WARNING,
      count >= CONFIG.COUNTER_WARNING_THRESHOLD
    );
    
    return count;
  },

  // Добавление параграфа с валидацией и лимитом
  addParagraph(textInput, addButton, paragraphsContainer, counterElement, errorMessage) {
    const text = textInput.value.trim();

    if (!text) {
      this.showError(errorMessage, 'Пожалуйста, введите текст');
      return false;
    }

    if (text.length > CONFIG.MAX_TEXT_LENGTH) {
      this.showError(errorMessage, `Текст слишком длинный. Максимум ${CONFIG.MAX_TEXT_LENGTH} символов`);
      return false;
    }

    const newParagraph = document.createElement('p');
    newParagraph.textContent = text;
    newParagraph.setAttribute('data-testid', 'paragraph');
    newParagraph.classList.add(CONFIG.CLASSES.PARAGRAPH_ENTER);
    
    paragraphsContainer.appendChild(newParagraph);

    // ✅ Снимок коллекции ПОСЛЕ добавления нового элемента
    const paragraphs = Array.from(
      paragraphsContainer.querySelectorAll('p[data-testid="paragraph"]')
    );

    // Удаляем самый ранний параграф при превышении лимита
    if (paragraphs.length > CONFIG.MAX_PARAGRAPHS) {
      const first = paragraphs[0]; // Самый старый элемент в коллекции
      first.classList.add(CONFIG.CLASSES.PARAGRAPH_EXIT);
      
      // ✅ Функция удаления с защитой от повторного вызова
      const removeParagraph = () => {
        // Проверяем, что элемент всё ещё в нужном контейнере
        if (first.parentNode === paragraphsContainer) {
          first.remove();
          this.updateCounter(paragraphsContainer, counterElement);
        }
      };
      
      // Слушаем окончание CSS-анимации (в тестах мокается как мгновенное)
      first.addEventListener('animationend', removeParagraph, { once: true });
    }

    // Сброс формы и обновление UI
    textInput.value = '';
    this.updateButton(textInput, addButton);
    this.updateCounter(paragraphsContainer, counterElement);
    
    return true;
  }
};

// ✅ Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  const elements = {
    textInput: document.querySelector(CONFIG.SELECTORS.INPUT),
    addButton: document.querySelector(CONFIG.SELECTORS.BUTTON),
    paragraphsContainer: document.querySelector(CONFIG.SELECTORS.CONTAINER),
    counterElement: document.querySelector(CONFIG.SELECTORS.COUNTER),
    errorMessage: document.querySelector(CONFIG.SELECTORS.ERROR)
  };

  const required = ['textInput', 'addButton', 'paragraphsContainer', 'counterElement'];
  const missing = required.filter(key => !elements[key]);
  
  if (missing.length) {
    console.error('❌ Не найдены элементы:', missing.join(', '));
    return;
  }

  elements.textInput.addEventListener('input', () => {
    window.paragraphApp.updateButton(elements.textInput, elements.addButton);
  });

  elements.textInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !elements.addButton.disabled) {
      window.paragraphApp.addParagraph(
        elements.textInput,
        elements.addButton,
        elements.paragraphsContainer,
        elements.counterElement,
        elements.errorMessage
      );
    }
  });

  elements.addButton.addEventListener('click', () => {
    window.paragraphApp.addParagraph(
      elements.textInput,
      elements.addButton,
      elements.paragraphsContainer,
      elements.counterElement,
      elements.errorMessage
    );
  });

  elements.textInput.focus();
  window.paragraphApp.updateCounter(elements.paragraphsContainer, elements.counterElement);
  
  console.log('✅ ParagraphApp initialised');
});