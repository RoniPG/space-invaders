window.addEventListener('load', () => {
    const scores = JSON.parse(localStorage.getItem('highScores')) || [];

    const buttons = {
        start: document.getElementById('start-btn'),
        howto: document.getElementById('howto-btn'),
        restart: document.getElementById('restart-btn'),
        menu: document.getElementById('menu-btn'),
        resume: document.getElementById('resume-btn'),
        exit: document.getElementById('exit-btn'),
        back: document.getElementById('back-btn'),
        score: document.getElementById('maxscore-btn'),
        scoreBack: document.getElementById('scoreback-btn'),
        save: document.getElementById('save-btn'),

    };
    const screens = {
        menu: document.getElementById('menu-screen'),
        game: document.getElementById('game-screen'),
        gameover: document.getElementById('gameover-screen'),
        pause: document.getElementById('pause-screen'),
        howto: document.getElementById('howto-screen'),
        score: document.getElementById('maxscore-screen'),
        save: document.getElementById('name-screen'),
    };

    buttons.start.addEventListener('click', () => {
        screens.menu.classList.add('hidden');
        screens.game.classList.remove('hidden');
        game.start();
    });

    buttons.howto.addEventListener('click', () => {
        screens.menu.classList.add('hidden');
        screens.howto.classList.remove('hidden');

    });
    buttons.score.addEventListener('click', () => {
        screens.menu.classList.add('hidden');
        screens.score.classList.remove('hidden');
        const scoreList = document.getElementById('score-list');
        scoreList.innerHTML = ""; // Limpiar la tabla antes de agregar nuevas filas

        scores.slice(0, 10).forEach((entry, index) => {
        
            const row = document.createElement("tr");

            const rankCell = document.createElement("td");
            rankCell.textContent = index + 1;
            row.appendChild(rankCell);

            const nameCell = document.createElement("td");
            nameCell.textContent = entry.name;
            nameCell.classList.add('sub-title')
            row.appendChild(nameCell);

            const scoreCell = document.createElement("td");
            scoreCell.textContent = entry.score;
            row.appendChild(scoreCell);

            scoreList.appendChild(row);
        });
    });

    buttons.back.addEventListener('click', () => {
        screens.howto.classList.add('hidden');
        screens.menu.classList.remove('hidden');
    });

    buttons.scoreBack.addEventListener('click', () => {
        screens.score.classList.add('hidden');
        screens.menu.classList.remove('hidden');
    });

    buttons.restart.addEventListener('click', () => {
        screens.gameover.classList.add('hidden');
        screens.game.classList.remove('hidden');
        game.restart();
    });

    buttons.menu.addEventListener('click', () => {
        screens.gameover.classList.add('hidden');
        screens.menu.classList.remove('hidden');
    });

    buttons.resume.addEventListener('click', () => {
        screens.pause.classList.add('hidden');
        screens.game.classList.remove('hidden');
        game.start();
    });

    buttons.exit.addEventListener('click', () => {
        screens.pause.classList.add('hidden');
        screens.menu.classList.remove('hidden');
        game.end();
    });

    buttons.save.addEventListener('click', () => {
        screens.save.classList.add('hidden');
        screens.gameover.classList.remove('hidden');
        const name = document.getElementById('player-name').value.trim();
        if (!name) game.end();
        else {
            const newScore = { name, score: game.score.counter }
            scores.push(newScore);
            scores.sort((a, b) => b.score - a.score);
            localStorage.setItem('highScores', JSON.stringify(scores));
            document.getElementById('player-name').value = "" //reseteamos el nombre
            game.end();
        }
    });

    const game = new Game('board', buttons, screens);

    addEventListener('keydown', () => {
        game.onKeyEvent(event);
    });

    addEventListener('keyup', () => {
        game.onKeyEvent(event);
    });

})
