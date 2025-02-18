welcomeScreenTemplate: () => {return {
    block: 'div',
    content: [{
        block: 'div',
        cls: ['app-background', 'app-background_title'],
        content: [{
            block: 'div',
            cls: 'title-container',
            content: [{
                block: 'h1',
                cls: 'title',
                content: 'Welcome to the RockPaperScissors game',
            }, {
                block: 'form',
                cls: 'form-field',
                content: [{
                    block: 'input',
                    cls: 'form-field_username',
                    attrs: {
                        'placeholder': 'enter your name',
                    },
                }, {
                    block: 'button',
                    cls: ['button', 'button_position'],
                    content: 'Login',
                }],
            }],
        }],
    }],
}}