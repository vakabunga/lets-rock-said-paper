function resultScreenTemplate(gameStatus, move) {
    return {
        block: 'div',
        content: [{
            block: 'div',
            cls: ['app-background', 'app-background_result'],
            content: [{
                block: 'div',
                cls: 'result-block',
                content: [{
                    block: 'div',
                    cls: ['header', 'header-result'],
                    content: gameStatus,
                }, {
                    block: 'img',
                    cls: 'image_win',
                    attrs: {
                        'src': `./src/assets/images/${move}-win.png`,
                        'alt': 'win',
                    },
                }, {
                    block: 'div',
                    cls: 'button-container',
                    content: [{
                        block: 'button',
                        cls: ['button', 'button__result', 'start-game-button'],
                        content: 'Play again?',
                    }, {
                        block: 'button',
                        cls: ['button', 'button__result', 'cancel-button'],
                        content: 'Lobby',
                    }],
                }],
            }],
        }],
    };
}
