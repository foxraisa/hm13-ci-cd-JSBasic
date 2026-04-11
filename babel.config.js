module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // ✅ Целевое окружение: текущая версия Node.js (актуально LTS: 20.x/22.x)
        targets: { node: 'current' },
        
        // ✅ Не преобразуем модули, если Jest/Vite делает это сам
        modules: 'auto',
        
        // ✅ Добавляем только используемые полифилы (опционально, для продакшена)
        useBuiltIns: 'usage',
        corejs: 3
      }
    ]
  ]
};