function errorHandler(error) {
    if (error.message === 'error') {
        localStorage.removeItem('token');
        renderScreen(welcomeScreenTemplate());
    }
}
