function handleFormSubmit(status) {
  fetch(`${window.application.player.gameUrl}player-status?token=${window.application.player.status}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'ok' && data.message === 'pong') {
        return;
      }
    })
    .catch((error) => {
      window.application.screensTemplates.errorHandler();
      console.error('Сетевая ошибка:', error);
    });
}

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
        window.application.screensTemplates.gameScreenTemplate(token);
      } else if (playerStatus === 'error') {
        window.application.screensTemplates.errorHandler();
      }
    })
    .catch((error) => {
      console.error('Сетевая ошибка:', error);
    });
}

function getStart(token) {
  fetch(`${window.application.player.gameUrl}player-list?token=${token}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'ok') {
        let id = data.game.id; 
        window.application.player.id = id;
        play(id);
      } else if (data.message === `token doesn't exist`) {
        console.log('Нет игрока с таким токеном');
        window.application.checkPlayerStatus(token);
      } else if (data.message === 'player is already in game') {
        console.log('Игрок уже в игре, нельзя начать две игры одновременно');
        window.application.checkPlayerStatus(token);
      }
    })
    .catch((error) => {
      window.application.screensTemplates.errorHandler();
      console.error('Сетевая ошибка:', error);
    })
}

function getPlayerList(token) {
  fetch(`${window.application.player.gameUrl}player-list?token=${token}`)
    .then((response) => response.json())
    .then((data) => {
      const playerList = data['list'];
      const playerListLength = playerList.length;
      if (playerListLength > 1) {
        window.application.screensTemplates.lobbyScreenTemplate();
      }
    })
    .catch((error) => {
      window.application.screensTemplates.errorHandler();
      console.error('Сетевая ошибка:', error);
    });
}

function getGameStatus(token) {
  fetch(`${window.application.player.gameUrl}game-status?token=${token}`)
    .then((response) => response.json())
    .then((data) => {
      const gameStatus = data.game.status;

      if (gameStatus === 'waiting-for-start') {
        window.application.screensTemplates.gameScreenTemplate(token);

      } else if (gameStatus === 'waiting-for-your-move') {
        window.application.screensTemplates.gameScreenTemplate(token);

      } else if (gameStatus === 'waiting-for-enemy-move') {
        window.application.screensTemplates.gameScreenTemplate(token);
      }
      window.application.timers.push(setTimeout(() => gameScreenTemplate(token), 1000));
    })
    .catch((error) => {
      window.application.screensTemplates.errorHandler();
      console.error('Сетевая ошибка:', error);
    });
}

function play(move) {
  const token = application.player.token;
  const id = application['player-status'].game.id;

  const gameContent = document.querySelector('game-content');

  fetch(`${application.player.gameUrl}/play?token=${token}&id=${id}&move=${move}`)
      .then((response) => {response.json()})
      .then(data => {
          const gameStatus = data['game-status'].status;

          if (gameStatus === 'waiting-for-your-move') {
              gameContent.textContent = 'We have a draw. Waiting for your move...';
          }
          if (gameStatus === 'waiting-for-enemy-move') {
              gameContent.textContent = 'Waiting for enemy move...';
          }
          if (gameStatus === 'lose') {
              resultScreen(gameStatus, move);
          }
          if (gameStatus === 'win') {
              resultScreen(gameStatus, move);
          }
          if (gameStatus = 'error') {
              console.log(data.message)
          }
      }) 
      .catch((error) => {
          errorHandler(data);
      })
}

app.addEventListener('click', function (event) {
  if (event.target.hasAttribute('data-move')) {
      const move = event.target['data-move'];

      play(move);
  }
});

function errorHandler(data) {
  let errorMessage = data.message;
  let screen = '';

  window.application.renderScreen(application.screensTemplates.errorScreenTemplate);

  const errorButton = document.querySelector('.error-button');

  if (data.message === 'undefined' || data.message === `token doesn't exist`) {
      errorButton.textContent = 'Login again';
      screen = 'welcomeScreenTemplate';
  } else {
      errorButton.textContent = 'to Lobby';
      screen = 'lobbyScreenTemplate';
  }

  errorButton.addEventListener('click', function (event) {
      renderScreen(screen);
  });
}

function resultScreen (gameStatus, move) {
  renderScreen(resultScreenTemplate);

  const imageWin = document.querySelector('image_win');
  const titleResult = document.querySelector('header-result');

  if (gameStatus === 'win') {
      titleResult.textContent = 'You win!'
  }

  if (gameStatus === 'lose') {
      imageWin.classList.add('hidden');
      titleResult.textContent = 'You lose!'
  }
}
