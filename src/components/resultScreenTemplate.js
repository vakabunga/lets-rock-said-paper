resultScreenTemplate: (gameStatus, move) => {return {
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
                content: '',
            }, {
                block: 'img',
                cls: 'image_win',
                attrs: {
                    'src': `/images/${move}-win.png`,
                    'alt': 'win',
                },
            }, {
                block: 'div',
                cls: 'button-container',
                content: [{
                    block: 'button',
                    cls: ['button', 'button__result'],
                    content: 'Play again?',
                }, {
                    block: 'button',
                    cls: ['button', 'button__result'],
                    content: 'to Lobby',
                }],
            }],
        }],
    }],
}}
