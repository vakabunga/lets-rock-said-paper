function gameScreenTemplate (login, enemyName, gameStatus) {
    return {
        block: 'div',
        content: [{
            block: 'div',
            cls: ['app-background', 'app-background_game'],
            content: [{
                block: 'div',
                cls: 'lobby',
                content: [{
                    block: 'div',
                    content: [{
                        block: 'div',
                        cls: ['header', 'header_lobby'],
                        content: 'Play',
                    }, {
                        block: 'div',
                        cls: 'game-container',
                        content: [{
                            block: 'img',
                            cls: ['image-rock', 'game-button'],
                            attrs: {
                                'src': 'assets/images/rock.png',
                                'alt': 'rock',
                                'data-move': 'rock',
                            }, 
                            }, { 
                            block: 'div',
                            content: [{
                                block: 'img',
                                cls: ['images', 'game-button'],
                                attrs: {
                                    'src': 'assets/images/paper.png',
                                    'alt': 'paper',
                                    'data-move': 'paper',
                                },
                            }, {
                                block: 'img',
                                cls: ['images', 'game-button'],
                                attrs: {
                                    'src': 'assets/images/scissors.png',
                                    'alt': 'scissors',
                                    'data-move': 'scissors',
                                },
                            }],
                        }],
                    }],
                }, {
                    block: 'div',
                    cls: 'lobby-container',
                    content: [{
                        block: 'div',
                        cls: ['lobby-players', 'players'],
                        content: `${login} vs ${enemyName}:`,
                    }, {
                        block: 'div',
                        cls: ['lobby-players', 'game-content'],
                        content: 'всякое об игре:', //на основании gameStatus пишет статус игры (сделайте ход/ждите хода противника)
                    }, {
                        block: 'button',
                        cls: ['button', 'button_size'],
                        content: 'to Lobby',
                    }],
                }],
            }], 
        }],
    };
}
