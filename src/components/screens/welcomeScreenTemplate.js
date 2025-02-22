function welcomeScreenTemplate() {
    return {
        block: 'div',
        content: [
            {
                block: 'div',
                cls: ['app-background', 'app-background_title', 'welcome-form'],
                content: [
                    {
                        block: 'div',
                        cls: 'title-container',
                        content: [
                            {
                                block: 'h1',
                                cls: 'title',
                                content: 'WELCOME to the  RockPaperScissors game',
                            },
                            {
                                block: 'form',
                                cls: ['form-field', 'form-submit'],
                                content: [
                                    {
                                        block: 'label',
                                        attrs: {
                                            for: 'name',
                                        },
                                        content: 'Enter your name, fighter',
                                    },
                                    {
                                        block: 'input',
                                        cls: 'form-field_username',
                                        attrs: {
                                            type: 'text',
                                            id: 'name',
                                            placeholder: 'enter your name',
                                            required: true,
                                        },
                                    },
                                    {
                                        block: 'button',
                                        cls: ['button', 'button-submit'],
                                        content: 'Login',
                                        attrs: {
                                            type: 'submit',
                                        },
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
