function errorScreenTemplate(errorMessage) {
    return {
        block: 'div',
        content: [{
            block: 'div',
            cls: ['app-background', 'app-background_title'],
            content: [{
                block: 'div',
                cls: 'title-container',
                content: [{
                    block: 'div',
                    cls: 'form-field',
                    content: errorMessage,
                }, {
                    block: 'button',
                    cls: ['error_button', 'button', 'button_position'],
                    content: '',
                }]
            }],
        }],
    };
}
