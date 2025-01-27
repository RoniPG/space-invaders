class Player {
    constructor(ctx) {
        this.ctx = ctx;

        this.width = 50;
        this.height = 48;
        this.x = this.ctx.canvas.width / 2;
        this.y = this.ctx.canvas.height - this.height;

        this.playerImg = new Image();
        this.playerImg.src = 'assets/images/player.png';
        this.playerImg.isReady = false;
        this.playerImg.onload = () => {
            this.playerImg.isReady = true;
            this.playerImg.width = this.width;
            this.playerImg.height = this.height;
        }
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
    }
}