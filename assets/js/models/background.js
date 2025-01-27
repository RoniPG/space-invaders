class Background {
    constructor(ctx) {
        this.ctx = ctx;
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;

        this.bgImg = new Image();
        this.bgImg.src = 'assets/images/space.png';
        this.bgImg.isReady = false;
        this.bgImg.onload = () => {
            this.bgImg.isReady =true;
            this.bgImg.width = this.width;
            this.bgImg.height = this.height;
        }
    }
    draw() {
        if (this.bgImg.isReady) {
            this.ctx.drawImage(
                this.bgImg,
                0,
                0,
                this.bgImg.width,
                this.bgImg.height,
            )
        }
    }
}