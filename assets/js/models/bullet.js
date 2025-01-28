class Bullet {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vy = -10;
        this.bulletColor = 'red';
        this.width = 5;
        this.height = 20;
    }

    draw() {
        this.ctx.fillStyle = this.bulletColor;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move() {
        this.y += this.vy
    }

    collides(ob) {
        return this.y < ob.y + ob.height && this.height + this.y > ob.y;
    }
}