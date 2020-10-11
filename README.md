# Social-network
## Описание
Социальная сеть. Содержит блоки:
1. Заголовок:
а) Логотип;
б) Поле поиска пользователей;
в) Кнопка авторизации: для авторизованного пользователя содежит имя пользователя и аватар, активирует всплывающее меню с пунктами: выйти, настройки; для неавторизованного пользователя - переход на форму авторизации.
2. Главная боковая панель навигации, содержит ссылка на страницы Мой профиль, Диалоги, Пользователи, Друзья, Настройки.
3. Главный контент. 
Для неавторизованного пользователя показывает форму авторизации: поля ввода почты, пароля (есть опция сделать пароль видимым), запомнит меня и кнопка подтверждения. Локальная валидация на необходимость заполнения, отсутствия строк, состоящих из пробельных символов и серверная на правильность авторизационных данных. При 10 неудачных попытках авторизации показывается каптча и поле для ввода числа. 
Для авторизованного пользователя показывает содержимое соответствующей пункту бокового меню страницы.

