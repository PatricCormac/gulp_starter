# gulp_starter

# Особенности

- gulp-less (для уменьшения времени и упрощения написания css стилей)
- gulp-imagemin (для сжатия изображений)
- настроен browser-sync (для запуска проекта на локальном сервере с панелью администратора)
- gulp-autoprefixer (для кроссбраузерной поддержки css3)
- gulp-uglify (для сжатия js файлов)
- gulp-concat (для объединения файлов)

# Установка

- установите [NodeJS](https://nodejs.org/en/)
- клонируйте сборку: git clone https://github.com/PatricCormac/gulp_starter.git
- установите gulp глобально: npm i -g gulp
- перейдите в склонированную сборку: cd gulp_starter
- скачайте и установите необходимые зависимости: npm i
- чтобы начать работу, введите команду: gulp

Далее у вас должен запуститься локальный сервер, открывающий проект в браузере, а также при сохранении изменений в файлах обновляется состояние страницы. Это подтверждает нормальную работу сборки.

# Структура файлов

    gulp-starter
    ├── src
    │   ├── images
    │   ├── js
    │   ├── less
    │   └── index.html
    ├── dist
    │   ├── images
    │   ├── js
    │   ├── css
    │   └── index.html
    ├── gulpfile.js
    ├── package.json
    └── .gitignore

- src ── рабочая папка
  - images ── изображения до сжатия
  - js ── .js файлы до сжатия и объединения
  - less ── файлы стилей с расширением .less, объединяемые и компилируемые в style.css
    - components ── для отдельных файлов .less, которые можно подключить в главный файл (style.less)
    - style.less ── общий файл стилей, в который подключаются остальные (@import "./components/block.less")
  - index.html ── файл с версткой
- dist ── папка с готовым проектом
  - images ── сжатые изображения
  - js ── стандартно содержит один файл script.js, в котором объединен и сжат код всех js файлов из src/js
  - css ── стандартно содержит один файл style.css, в котором объединены скомпилированные стили всех less файлов из src/less
  - index.html ── финальная верстка
- gulpfile.js ── конфигурационный файл для gulp, содержит настройки всех подключенных плагинов
- package.json ── содержит информацию о проекте, в том числе информацию об установленных плагинах
- .gitignore ── файл с перечнем директорий запрещенных для отслеживания Git'ом

# Обратная связь

Пожалуйста обязательно сообщайте о [багах](https://github.com/PatricCormac/gulp_starter/issues), а также буду благодарен за звёздочку в правом верхнем углу
