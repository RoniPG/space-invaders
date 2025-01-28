class Game {
    constructor(canvasId, onGameEnd) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.ctx = this.canvas.getContext('2d');

        this.drawIntervalId = undefined;
        this.fps = 1000 / 60;

        this.background = new Background(this.ctx);
        this.enemy = new Enemy(this.ctx);
        this.player = new Player(this.ctx);

        this.setShotInterval = 0;
    }
    onKeyEvent(event) {
        this.player.onKeyEvent(event);
    }

    start() {
        if (!this.drawIntervalId) {
            this.drawIntervalId = setInterval(() => {
                this.clear();
                this.draw();
                this.move();
                this.setShotInterval++;
                if (this.setShotInterval >= 1000) {
                    this.stop();
                }
                // this.checkCollisions();
            }, this.fps);
        }
    }

    stop() {
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined;
    }

    restart() {
    }

    end() {
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.clear();
    }

    move() {
        this.player.move();
        this.enemy.move();
    }

    checkCollisions() {

    }

    checkScore() {
    }

    draw() {
        this.background.draw();
        this.player.draw();
        this.enemy.draw();
    }
}