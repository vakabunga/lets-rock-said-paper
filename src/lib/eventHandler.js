function eventHandler() {
    if (app.querySelector('.form-submit')) {
        app.querySelector('.form-submit').addEventListener('submit', (event) => {
            event.preventDefault();
            const login = document.querySelector('.form-field_username');
            const button = document.querySelector('.button-submit');
            player.login = login.value;
            login.disabled = true;
            button.disabled = true;
            getPlayerToken(player.login);
        });
    }

    if (app.querySelector('.start-game-button')) {
        app.querySelector('.start-game-button').addEventListener('click', (event) => {
            event.preventDefault();
            const button = app.querySelector('.start-game-button');
            button.disabled = true;
            startGame(player.token);
            renderScreen(gameScreenTemplate());
            eventHandler();

            timers.forEach((timer) => {
                clearInterval(timer);
            });
            
            startGameInterval(() => getGameStatus(player.token, player.gameId));
        });
    }

    if (app.querySelector('.exit-button') || app.querySelector('.cancel-button')) {
        const buttonContainer = app.querySelector('.message-background')
            ? app.querySelector('.message-background')
            : app;
        const exitButton = buttonContainer.querySelector('.exit-button');
        const cancelButton = buttonContainer.querySelector('.cancel-button');
        exitButton.addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.clear();

            timers.forEach((timer) => {
                clearInterval(timer);
            });

            initialGame();
        });

        cancelButton.addEventListener('click', (event) => {
            event.preventDefault();

            timers.forEach((timer) => {
                clearInterval(timer);
            });

            data = {
                status: 'lobby',
            };

            statusHandler(data);
        });
    }

    if (app.querySelector('.move-container')) {
        const moveButtons = app.querySelector('.move-container');
        moveButtons.addEventListener('click', (event) => {
            const playerMove = event.target.dataset.move;
            sendGameMove(player.token, player.gameId, playerMove);
        });
    }

    if (app.querySelector('.play-again-button')) {
        data = {
            status: 'game',
        };

        statusHandler(data);
    }
}
