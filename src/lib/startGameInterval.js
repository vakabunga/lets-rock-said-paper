function startGameInterval(callback) {
    const timerId = setInterval(callback, 1000);
    timers.push(timerId);
}
