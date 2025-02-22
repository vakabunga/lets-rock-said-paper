function gameScreenTemplate() {
    return {
        block: 'div',
        content: [
            {
                block: 'div',
                cls: ['app-background', 'app-background_game'],
                content: [
                    {
                        block: 'div',
                        cls: ['header', 'header_lobby'],
                        content: 'Fight!',
                    },
                    {
                        block: 'div',
                        cls: 'lobby',
                        content: [
                            {
                                block: 'div',
                                cls: 'move-container',
                                content: [
                                    {
                                        block: 'img',
                                        cls: ['images', 'move-button'],
                                        attrs: {
                                            src: './src/assets/images/rock.png',
                                            alt: 'rock',
                                            'data-move': 'rock',
                                        },
                                    },
                                    {
                                        block: 'img',
                                        cls: ['images', 'move-button'],
                                        attrs: {
                                            src: './src/assets/images/paper.png',
                                            alt: 'paper',
                                            'data-move': 'paper',
                                        },
                                    },
                                    {
                                        block: 'img',
                                        cls: ['images', 'move-button'],
                                        attrs: {
                                            src: './src/assets/images/scissors.png',
                                            alt: 'scissors',
                                            'data-move': 'scissors',
                                        },
                                    },
                                ],
                            },
                            {
                                block: 'aside',
                                cls: ['lobby-players', 'game-content'],
                                content: [
                                    {
                                        block: 'div',
                                        cls: '',
                                        content: [
                                            {
                                                block: 'p',
                                                cls: ['lobby-players', 'contenders'],
                                                content: [
                                                    {
                                                        block: 'span',
                                                        content:`${player.login} VS `,
                                                    },
                                                    {
                                                        block: 'span',
                                                        cls: 'enemy',
                                                        content:`...`,
                                                    }
                                                ],
                                            },
                                            {
                                                block: 'div',
                                                cls: ['lobby-players', 'contenders', 'game-status-notification'],
                                                content: 'status requested',
                                            },
                                            {
                                                block: 'div',
                                                cls: ['lobby-players', 'contenders', 'game-history'],
                                                content: '',
                                            },
                                        ],
                                    },
                                    {
                                        block: 'div',
                                        cls: 'button-container',
                                        content: [
                                            {
                                                block: 'button',
                                                cls: ['button', 'button_size', 'cancel-button'],
                                                content: 'Lobby',
                                            },
                                            {
                                                block: 'button',
                                                cls: ['button', 'button_size', 'exit-button'],
                                                content: 'Exit',
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
