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