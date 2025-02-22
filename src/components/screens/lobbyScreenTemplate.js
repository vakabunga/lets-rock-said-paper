function lobbyScreenTemplate(playersList) {
    return {
        block: 'div',
        content: [
            {
                block: 'div',
                cls: ['app-background', 'app-background_game'],
                content: [
                    {
                        block: 'div',
                        cls: '',
                        content: [
                            {
                                block: 'h1',
                                cls: ['header', 'header_lobby'],
                                content: 'Welcome to the Lobby',
                            },
                            {
                                block: 'div',
                                cls: 'lobby',
                                content: [
                                    {
                                        block: 'img',
                                        cls: 'image',
                                        attrs: {
                                            src: './src/assets/images/lobby.png',
                                            alt: 'rock-paper-scissors',
                                        },
                                    },
                                    {
                                        block: 'div',
                                        cls: 'lobby-players',
                                        content: [
                                            {
                                                block: 'div',
                                                cls: '',
                                                content: [
                                                    {
                                                        block: 'p',
                                                        cls: 'title',
                                                        content: 'Players online:',
                                                    },
                                                    {
                                                        block: 'ul',
                                                        cls: 'players-list',
                                                        content: '',
                                                    },
                                                ],
                                            },
                                            {
                                                block: 'button',
                                                cls: ['button', 'button_size', 'start-game-button'],
                                                content: 'Play now!',
                                            },
                                            {
                                                block: 'button',
                                                cls: ['button', 'button_size', 'exit-button'],
                                                content: 'Quit',
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    };
}
