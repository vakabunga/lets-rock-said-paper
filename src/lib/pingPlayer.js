function pingPlayer() {
    if (player.token) {
        fetch(`${gameUrl}/player-status?token=${player.token}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'error') {
                    errorHandler(error);
                }
            });
    }
}

setInterval(pingPlayer, 119000);
