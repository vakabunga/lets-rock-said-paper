function createBattleHistoryBlock(battle) {
    const roundHistory = document.createElement('li');
    roundHistory.textContent = `${battle.player} ${battle.result} ${battle.enemy}`;

    return roundHistory;
}
