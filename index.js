window.application = {
  player: {
    gameUrl: 'https://skypro-rock-scissors-paper-backend.vercel.app/',
    login: undefined,
    token: undefined,
  },
  screensTemplates: {
    welcomeScreenTemplate: (template) => {
      app.innerHTML = browserTemplateEngine(template()).innerHTML;
    },
    lobbyScreenTemplate: () => {return {}},
    gameScreenTemplate: () => {return {}},
    spinnerScreenTemplate: () => {return {}},
    resultScreenTemplate: () => {return {}},
  },
  timers: [],
};