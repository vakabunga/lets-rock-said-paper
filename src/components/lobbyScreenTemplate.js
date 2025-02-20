function lobbyScreenTemplate (playersList) {
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
                    cls: 'lobby-image-container',
                    content: [{
                        block: 'div',
                        cls: ['header', 'header_lobby'],
                        content: 'Lobby',
                    }, {
                        block: 'img',
                        cls: 'image',
                        attrs: {
                            'src': '/assets/images/lobby.png',
                            'alt': 'rock-paper-scissors',
                        },
                    }], 
                }, {
                    block: 'div',
                    cls: 'lobby-container',
                    content: [{
                        block: 'div',
                        cls: 'lobby-players',
                        content: [{
                            block: 'h1',
                            cls: 'title',
                            content: 'Welcome to the Lobby. There are players online:',
                        }, {
                            block: 'div',
                            cls: 'players-list',
                            content: renderScreen(playersList),
                        }, {
                            block: 'button',
                            cls: ['button', 'button_size'],
                            content: 'Play now!',
                        }],
                    }],
                }],
            }], 
        }],
    };
}
