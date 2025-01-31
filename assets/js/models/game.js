class Game {
    constructor(canvasId, buttons, screens) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.ctx = this.canvas.getContext('2d');

        this.drawIntervalId = undefined;
        this.fps = 1000 / 60;

        this.background = new Background(this.ctx);
        this.player = new Player(this.ctx); // El jugador sigue siendo una sola instancia
        this.score = new Score(this.ctx);

        this.enemies = []; // Lista para manejar múltiples enemigos

        this.buttons = buttons;
        this.screens = screens;
        this.level = 0;

    }

    onKeyEvent(event) {
        this.player.onKeyEvent(event);

        if (event.keyCode === PAUSE || event.keyCode === ESC) {
            this.stop();
            this.screens.game.classList.add('hidden');
            this.screens.pause.classList.remove('hidden');
        }
    }

    start() {
        if (!this.drawIntervalId) {
            this.drawIntervalId = setInterval(() => {
                this.clear();
                this.draw();
                this.move();

                // Comprobar colisiones en cada frame
                this.checkCollisions();

            }, this.fps);
        }
    }

    stop() {
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined;
    }

    restart() {
        this.enemies = []; // Reinicia los enemigos
        this.createEnemies(); // Vuelve a generarlos
        this.player = new Player(this.ctx); // Reinicia al jugador
        this.start(); // Comienza de nuevo
    }

    save() {
        this.screens.game.classList.add('hidden');
        this.screens.save.classList.remove('hidden');
    }
    end() {
        this.level = 1;
        this.score.counter = 0;
        this.restart();
        this.stop();
        this.screens.game.classList.add('hidden');
        this.screens.gameover.classList.remove('hidden');
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.clear(); // Limpia las balas que salieron de la pantalla
    }

    move() {
        this.player.move(); // Mueve al jugador
        this.moveEnemies();
    }

    checkCollisions() {
        // Colisiones entre balas del jugador y enemigos
        this.player.bullets = this.player.bullets.filter((bullet) => {
            let hitEnemy = false;
            this.enemies = this.enemies.flat().filter(enemy => {
                if (enemy.collideWith(bullet)) {
                    enemy.deathSound.play();
                    this.score.updateScore(enemy.type);
                    hitEnemy = true;  // Marcar la bala como impactada
                    return false; // Eliminar el enemigo
                }
                return true; // Mantener el enemigo
            });

            return !hitEnemy; // Si la bala impactó, la eliminamos
        });

        // Colisiones entre el jugador y los enemigos o entre el enemigo y el suelo
        if (this.hasEnemyReachedPlayer() || this.hasEnemyReachedFloor()) {
            this.save();
        }

        //Subir de nivel
        if (this.enemies.length === 0) {
            this.nextLevel();
        }
    }

    createEnemies() {
        const enemyRows = 1 + this.level; // Más filas en cada nivel
        const enemyCols = 2 + this.level;

        for (let row = 0; row < enemyRows; row++) {
            this.enemies[row] = [];
            for (let col = 0; col < enemyCols; col++) {
                this.enemies[row].push(new Enemy(
                    this.ctx, 
                    col * 50, 
                    row * 35, 
                    this.level / 2,
                    Math.ceil(Math.random() * 3)
                ));
            }
        }
        
    }

    draw() {
        this.background.draw(); // Dibuja el fondo
        this.player.draw(); // Dibuja al jugador
        this.enemies.flat().forEach(enemy => enemy.draw()); // Dibuja cada enemigo
        this.score.draw();
        this.showLevel();
    }

    moveEnemies() {
        const rightmostEnemy = this.findRightmostEnemy();
        const leftmostEnemy = this.findLeftmostEnemy();

        this.enemies.flat().forEach(enemy => enemy.move());

        if (rightmostEnemy && leftmostEnemy) {
            if (rightmostEnemy.x + rightmostEnemy.width >= this.canvas.width || leftmostEnemy.x <= 0) {
                this.enemies.flat().forEach(enemy => enemy.vx *= -1); // Bajar una fila
                this.enemies.flat().forEach(enemy => enemy.y += 35); // Bajar una fila
            }
        }
    }
    // Encuentra el enemigo más a la derecha
    findRightmostEnemy() {
        let rightmostEnemy = null;
        let maxX = -Infinity;

        this.enemies.flat().forEach((enemy) => {
            if (enemy.x > maxX) {
                maxX = enemy.x;
                rightmostEnemy = enemy;
            }
        });

        return rightmostEnemy;
    }
    // Encuentra el enemigo más a la izquierda
    findLeftmostEnemy() {
        let leftmostEnemy = null;
        let minX = Infinity;

        this.enemies.flat().forEach((enemy) => {
            if (enemy.x < minX) {
                minX = enemy.x;
                leftmostEnemy = enemy;
            }
        });

        return leftmostEnemy;
    }
    hasEnemyReachedPlayer() {
        return this.enemies.flat().some(enemy => enemy.collideWith(this.player));
    }
    hasEnemyReachedFloor() {
       return this.enemies.flat().some(enemy => enemy.y + enemy.height >= this.canvas.height)
    }

    nextLevel() {
        this.level++;
        this.enemies.flat().forEach(enemy => enemy.vx += this.level)
        this.createEnemies();
    }
    showLevel () {
        this.ctx.font = '35px Arcade Boxes';
        this.ctx.fillStyle = 'White';
        this.ctx.fillText(`Level:  ${this.level}`, 475, 30)
    }
}
