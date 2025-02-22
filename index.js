const app = document.querySelector('.app');
const gameUrl = 'https://skypro-rock-scissors-paper-backend.vercel.app';
const player = {
    login: undefined,
    token: undefined,
    gameId: undefined,
    currentStatus: undefined,
    enemy: undefined,
    counter: 0,
    move: undefined,
    history: [],
};
const timers = [];

function initialGame() {
    if (localStorage.token) {
        player.token = localStorage.token;
        player.login = localStorage.login;
        player.gameId = localStorage.gameId;
        try {
            getPlayerStatus(player.token);
        } catch (err) {
            errorHandler(err);
        }
    } else {
        renderScreen(welcomeScreenTemplate());
        eventHandler();
    }
}

function clearTimers() {
    timers.forEach((timer) => {
        clearInterval(timer);
    });
}

initialGame();
