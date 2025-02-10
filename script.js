const app = document.querySelector('.app');

window.application = {
    player: {
        login: undefined,
        token: undefined,
    },
    gameUrl: 'https://skypro-rock-scissors-paper-backend.vercel.app',
    screensTemplates: {
        welcomeScreenTemplate: () => {return {}},
        lobbyScreenTemplate: () => {return {}},
        gameScreenTemplate: () => {return {
            block: 'div',
            cls: 'game-wrapper',
            content: [{
                block: 'div',
                cls: 'game__header',
                content: [{
                    block: 'h1',
                    cls: 'game__title',
                    content: 'Игра',
                }, {
                    block: 'div',
                    cls: 'game__subtitle',
                    content: 'Вы против *имясоперника*',
                }],
                block: 'div',
                cls: 'game__choose-move',
                content: [{
                    block: 'button',
                    cls: 'rock',
                    content: 'Камень',
                    attrs: {
                        'data-move': 'rock',
                    }
                }, {
                    block: 'button',
                    cls: 'paper',
                    content: 'Бумага',
                    attrs: {
                        'data-move': 'paper',
                    }
                }, {
                    block: 'button',
                    cls: 'scissors',
                    content: 'Ножницы',
                    attrs: {
                        'data-move': 'scissors',
                    }
                }],
            }],
        }},
        spinnerScreenTemplate: () => {return {}},
        resultScreenTemplate: () => {return {}},
    },
    renderScreen: function (template) {
        app.innerHTML = browserTemplateEngine(template()).innerHTML;
    },
    timers: [],
};

window.application.renderScreen(gameScreenTemplate());
    
function play() {
    const token = window.application.player.token;
    const id = window.application['player-status'].game.id;

    const gameUrl = 'https://skypro-rock-scissors-paper-backend.vercel.app';

    fetch(`${application.gameUrl}/play?token=${token}&id=${id}&move=${move}`)
        .then((response) => {response.json()})
        .then(data => {
            const gameStatus = data['game-status'].status;

            if (gameStatus === "waiting-for-your-move") {
                window.application.renderScreen(gameScreenTemplate());
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
            
        })
        .finally(() => {

        });
}

app.addEventListener('click', function (event) {
    if (event.target.hasAttribute('data-move')) {
        const move = event.target.className;

        play(move);
    }
})
