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
      } else (data.message === 'player is already in game') {
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

function gameScreenTemplate(token) {
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

function play(token, id) {
  fetch(`${application.gameUrl}/play?token=${token}&id=${id}&move=${move}`)
    .then((response) => {response.json()})
    .then(data => {
      const gameStatus = data['game-status'].status;
      
      if (gameStatus === "waiting-for-your-move") {
        window.application.renderScreen(gameScreenTemplate(token));
        //отрисовка экрана ничья, ожидаем ваш ход
      }
      if (gameStatus === "waiting-for-enemy-move") {
        window.application.renderScreen(spinnerScreenTemplate());
        //отрисовка экрана ждем экрана соперника
      }
      if (gameStatus === "lose") {
        window.application.renderScreen(resultScreenTemplate());
        //отрисовка экрана вы проиграли
      }
      if (gameStatus === "win") {
        window.application.renderScreen(resultScreenTemplate());
        //отрисовка экрана вы выиграли
      }
      if (gameStatus = 'error') {
        console.log(data.message)
      }
    }) 
    .catch((error) => {
      window.application.screensTemplates.errorHandler();
      console.error('Сетевая ошибка:', error);
    })
}