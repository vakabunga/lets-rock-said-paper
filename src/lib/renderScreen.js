function renderScreen(template) {
    app.innerHTML = browserTemplateEngine(template()).innerHTML;
}
