function createPlayersListBlock(list) {
    const playersList = document.createElement('ul');

    list.forEach(({ login }) => {
        const li = document.createElement('li');
        li.textContent = login;
        playersList.appendChild(li);
    });

    return playersList;
}
