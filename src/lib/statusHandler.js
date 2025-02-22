function statusHandler(data) {
    if (data.status === 'lobby') {
        startGameInterval(getPlayersList);
        renderScreen(lobbyScreenTemplate());
        eventHandler();

        return;
    }

    if (Array.isArray(data)) {
        const playersList = createPlayersListBlock(data);
        const playersListContainer = document.querySelector('.players-list');
        playersListContainer.innerHTML = playersList.innerHTML;

        return;
    }

    if (data.status === 'game') {
        player.gameId = data.game.id;
        renderScreen(gameScreenTemplate());
        startGameInterval(() => getGameStatus(player.token, player.gameId));
        eventHandler();
    }

    if (data.status === 'waiting-for-start') {
        player.counter += 1;

        if (player.currentStatus === 'waiting-for-start' && player.counter > 1) {
            return;
        }

        renderBlock(waitingMessageBlockTemplate());
        eventHandler();
    }

    if (data.status === 'waiting-for-your-move') {
        const messageBackground = document.querySelector('.message-background');

        if (messageBackground) {
            messageBackground.remove();
            player.counter = 0;
        }

        const gameStatusNotification = document.querySelector('.game-status-notification');
        gameStatusNotification.textContent = 'Waiting for your move';
        player.enemy = data.enemy.login;
        enemyName = document.querySelector('.enemy');
        enemyName.textContent = player.enemy;
    }

    if (data.status === 'waiting-for-enemy-move') {
        const gameStatusNotification = document.querySelector('.game-status-notification');
        gameStatusNotification.textContent = `Waiting for ${player.enemy} move`;
    }

    if (data.status === 'win') {
        timers.forEach((timer) => {
            clearInterval(timer);
        });

        renderScreen(resultScreenTemplate('WIN', player.move));
        player.history.push({
            player: player.name,
            enemy: player.enemy,
            result: 'win',
        });
        eventHandler();
    }

    if (data.status === 'lose') {
        timers.forEach((timer) => {
            clearInterval(timer);
        });

        renderScreen(
            resultScreenTemplate(
                'DEFEAT',
                player.move === 'rock' ? 'paper' : player.move === 'paper' ? 'scissors' : 'rock'
            )
        );
        player.history.push({
            player: player.login,
            enemy: player.enemy,
            result: 'defeat',
        });
        eventHandler();
    }

    if (document.querySelector('.game-history')) {
        const gameHistory = document.querySelector('.game-history');
        const historyFragment = document.createElement('div');

        for (battle of player.history) {
            historyFragment.appendChild(createBattleHistoryBlock(battle));
        }
        gameHistory.innerHTML = historyFragment.innerHTML;
    }
}
