class Player {
    constructor(ctx) {
        this.ctx = ctx;

        this.width = 50;
        this.height = 48;
        this.x = this.ctx.canvas.width / 2;
        this.y = this.ctx.canvas.height - this.height;

        this.vx = 5;
        this.playerImg = new Image();
        this.playerImg.src = 'assets/images/player.png';
        this.playerImg.isReady = false;
        this.playerImg.onload = () => {
            this.playerImg.isReady = true;
            this.playerImg.width = this.width;
            this.playerImg.height = this.height;
        }

        this.bullets = [];
        this.keys = {}
        this.setShotInterval = 0;
    }
    draw() {
        if (this.playerImg.isReady) {
            this.ctx.drawImage(
                this.playerImg,
                this.x,
                this.y,
                this.playerImg.width,
                this.playerImg.height,
            )
        }
        this.bullets.forEach(bullet => bullet.draw());
        this.setShotInterval++;
    }

    onKeyEvent(event) {
        // Guardar el estado de las teclas en el objeto `keys`
        if (event.type === 'keydown') {
            this.keys[event.keyCode] = true;
        } else if (event.type === 'keyup') {
            this.keys[event.keyCode] = false;
        }
    }

    shoot() {
        if (this.setShotInterval>= 10) {
            const bullet = new Bullet(this.ctx, this.x + this.playerImg.width / 2, this.y - 10);
            bullet.shootAudio.play();
            this.bullets.push(bullet);
            this.setShotInterval = 0;    
        }
        
    }

    clear() {
        this.bullets = this.bullets.filter(bullet => bullet.y > 0)
    }

    move() {
        // Verificar las teclas actualmente activas y realizar acciones
        if (this.keys[ARROW_LEFT] && this.x >= 10) {
            this.x -= this.vx;
        }

        if (this.keys[ARROW_RIGHT] && this.x + this.width <= this.ctx.canvas.width - 10) {
            this.x += this.vx;
        }

        if (this.keys[SPACE] || this.keys[ARROW_UP]) {
            this.shoot();
        }

        // Mover las balas
        this.bullets.forEach(bullet => bullet.move());  
    }
}