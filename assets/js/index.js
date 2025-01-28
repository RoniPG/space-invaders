window.addEventListener('load', () => {
    const game = new Game('board');
    game.start();
    
    addEventListener('keydown', () => {
        game.onKeyEvent(event);
    });
    addEventListener('keyup', () => {
        game.onKeyEvent(event);
    });
})
