function waitingMessageBlockTemplate(status = 'Waiting for the Enemy') {
    return {
        block: 'div',
        content: [
            {
                block: 'div',
                cls: 'message-background',
                content: [
                    {
                        block: 'div',
                        cls: 'message-container',
                        content: [
                            {
                                block: 'p',
                                cls: 'text-message',
                                content: status,
                            },
                            {
                                block: 'div',
                                cls: 'button-container',
                                content: [
                                    {
                                        block: 'button',
                                        cls: ['button', 'cancel-button'],
                                        content: 'Cancel',
                                    },
                                    {
                                        block: 'button',
                                        cls: ['button', 'exit-button'],
                                        content: 'Exit',
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
