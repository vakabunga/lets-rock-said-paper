function formTemplate() {
  return {
    block: 'div',
    content: [{
        block: 'h1',
        content: 'Добро пожаловать в игру'
      },
      {
        block: 'form',
        cls: 'app-form__submit',
        content: [{
            block: 'label',
            cls: 'app-form__label',
            attrs: {
              for: 'username'
            },
            content: 'Имя пользователя:'
          },
          {
            block: 'input',
            cls: 'app-form__input',
            attrs: {
              type: 'text',
              id: 'username',
              name: 'username',
              placeholder: 'Введите ваше имя',
              required: true
            }
          },
          {
            block: 'button',
            cls: 'app-form__button',
            attrs: {
              type: 'submit'
            },
            content: 'Войти'
        }]
    }],
  };
}

const elementForm = browserTemplateEngine(formTemplate());

document.addEventListener('DOMContentLoaded', () => {
  const appDiv = document.querySelector(".app");
  appDiv.innerHTML = elementForm.innerHTML;

  const appFormSubmit = document.querySelector('.app-form__submit');
  const appFormInput = document.querySelector('.app-form__input');
  const appFormButton = document.querySelector('.app-form__button');

  appFormSubmit.addEventListener('submit', (event) => {
    event.preventDefault();
    appFormButton.disabled = true;
    appFormInput.disabled = true;

    const login = appFormInput.value.trim();
    userLoginRequest(login);
    window.application.player.login = login;
  });
});

const gameUrl = window.application.player.gameUrl;

function errorHandler() {
  const errorTemplate = {
    block: 'div',
    content: [{
      block: 'h1',
      content: 'Ошибка'
    }, {
      block: 'p',
      content: 'Произошла ошибка. Попробуйте еще раз.'
    }],
  };

  const elementError = browserTemplateEngine(errorTemplate);
  const appDiv = document.querySelector(".app");
  appDiv.innerHTML = elementError.innerHTML;
}