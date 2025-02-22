// проверка доступности сервера
function gamePing() {
    fetch(`${gameUrl}/ping`)
        .then((response) => response.json())
        .then((data) => {
        });
}

// отправка запроса с именем игрока на получение токена
function getPlayerToken(login) {
    fetch(`${gameUrl}/login?login=${login}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 'error') {
                throw new Error('error');
            } else {
                player.login = login;
                player.token = data.token;
                localStorage.setItem('token', player.token);
                localStorage.setItem('login', player.login);                
                getPlayerStatus(player.token);
            }
        })
        .catch((error) => {
            errorHandler(error);
        });
}

// отправка запроса на получение статуса игрока. Возвращает ошибку или статус игрока (лобби или игра)
function getPlayerStatus(token) {
    fetch(`${gameUrl}/player-status?token=${token}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 'error') {
                throw new Error('error');
            } else {
                statusHandler(data['player-status']);
            }
        })
        .catch((error) => {
            errorHandler(error);
        });
}

// отправка запроса на старт игры. Возвращает ошибку или статус игрока с id игры
function startGame(token) {
    fetch(`${gameUrl}/start?token=${token}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 'error') {
                throw new Error(data);
            } else {
                player.gameId = data['player-status'].game.id;
                localStorage.setItem('gameId', player.gameId);
            }
        })
        .catch((error) => {
            errorHandler(error);
        });
}

// отправка запроса статуса игры. Возвращает ошибку или ожидание соперника или хода игрока(соперника)
function getGameStatus(token, gameId) {
    fetch(`${gameUrl}/game-status?token=${token}&id=${gameId}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 'error') {
                throw new Error(data);
            } else {
                player.currentStatus = data['game-status'].status;
                statusHandler(data['game-status']);
            }
        })
        .catch((error) => {
            errorHandler(error);
        });
}

// отправка хода игрока. Возвращает ошибку или статус игры (ожидание, победа, поражение)
function sendGameMove(token, gameId, playerMove) {
    player.move = playerMove;
    fetch(`${gameUrl}/play?token=${token}&id=${gameId}&move=${playerMove}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 'error') {
                throw new Error(data.message);
            } else {
                statusHandler(data['game-status']);
            }
        })
        .catch((error) => {
            errorHandler(error);
        });
}

// отправка запроса на получение списка игроков. Возвращает список игроков онлайн
function getPlayersList() {
    fetch(`${gameUrl}/player-list`)
        .then((response) => response.json())
        .then((data) => {
            statusHandler(data.list);
        });
}
