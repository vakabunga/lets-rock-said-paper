window.application = {
  player: {
    gameUrl: 'https://skypro-rock-scissors-paper-backend.vercel.app/',
    login: undefined,
    token: undefined,
  },
  screensTemplates: {
    welcomeScreenTemplate: (template) => {
      app.innerHTML = browserTemplateEngine(template()).innerHTML;
    },
    lobbyScreenTemplate: () => {return {}},
    gameScreenTemplate: () => {return {}},
    spinnerScreenTemplate: () => {return {}},
    resultScreenTemplate: () => {return {}},
  },
  timers: [],
};

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

function browserTemplateEngine(block) {
  if ((block === undefined) || (block === null) || (block === false)) {
    return document.createTextNode('');
  }
  if ((typeof block === 'string') || (typeof block === 'number') || (block === true)) {
    return document.createTextNode(block);
  }
  if (Array.isArray(block)) {
    const fragment = document.createDocumentFragment();
    for (const item of block) {
      const itemElem = browserTemplateEngine(item);
      fragment.appendChild(itemElem);
    }
    return fragment;
  }
  const elem = document.createElement(block.block);

  elem.appendChild(browserTemplateEngine(block.content));
  if (block.cls) {
    const classes = [].concat(block.cls);
    elem.classList.add(...classes);
  }
  if (block.attrs) {
    for (const [key, value] of Object.entries(block.attrs)) {
      elem.setAttribute(key, value);
    }
  }
  return elem;
};

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

function userLoginRequest(login) {
  fetch(`${window.application.player.gameUrl}login?login=${encodeURIComponent(login)}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.status !== 'ok') {
        return;
      }
      let token = data.token; 
      window.application.player.token = token;
      checkPlayerStatus(token);
    })
    .catch((error) => {
      console.error('Сетевая ошибка:', error);
    })
}

function checkPlayerStatus(token) {
  fetch(`${window.application.player.gameUrl}player-status?token=${token}`)
    .then((response) => response.json())
    .then((data) => {
      const playerStatus = data['player-status'].status;
      if (playerStatus === 'lobby') {
        window.application.screensTemplates.lobbyScreenTemplate();
      } else if (playerStatus === 'game') {
        window.application.screensTemplates.gameScreenTemplate();
      }
  })
  .catch((error) => {
    console.error('Сетевая ошибка:', error);
  });
}

function gameScreenTemplate(token) {
  fetch(`${window.application.player.gameUrl}game-status?token=${token}`)
    .then((response) => response.json())
    .then((data) => {
      const gameStatus = data.game.status;

      if (gameStatus === 'waiting-for-start') {
        window.application.screensTemplates.gameScreenTemplate();

      } else if (gameStatus === 'waiting-for-your-move') {
        window.application.screensTemplates.gameScreenTemplate();

      } else if (gameStatus === 'waiting-for-enemy-move') {
        window.application.screensTemplates.gameScreenTemplate();
      }
      window.application.timers.push(setTimeout(() => gameScreenTemplate(token), 1000));
    })
    .catch((error) => {
      console.error('Сетевая ошибка:', error);
    });
}