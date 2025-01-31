class Enemy {
    constructor(ctx, x, y, vx, type) {
        this.ctx = ctx;
        this.type = type;
        this.width = 44;
        this.height = 32;
        this.x = x;
        this.y = y + this.height;
        this.vx = vx; // Velocidad de movimiento
        this.vy = 0;

        this.img = new Image();
        this.img.src = `assets/images/enemy${type}.png`; // Imagen según tipo de enemigo
        this.img.isReady = false;
        this.img.onload = () => {
            this.img.isReady = true;
        };

        this.deathSound = new Audio();
        this.deathSound.src = 'assets/audio/enemy-death.wav';
        this.deathSound.volume = 0.1;
    }

    draw() {
        if (this.img.isReady) {
            this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    move() {
        this.x += this.vx;
    }

    collideWith(el) {
        return (
            this.x < el.x + el.width &&
            this.x + this.width > el.x &&
            this.y < el.y + el.height &&
            this.y + this.height > el.y
        );
    }
    
}
