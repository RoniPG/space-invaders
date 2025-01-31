class Score {
    constructor(ctx) {
        this.ctx = ctx;
        this.counter = 0;
        this.scores = [];
    }
    draw() {
        this.ctx.font = '35px Arcade Boxes';
        this.ctx.fillStyle = 'White';
        this.ctx.fillText(`Score:  ${this.counter}`, 10, 30)
    }

    updateScore(type){
        switch (type) {
            case 1:
                this.counter += 100;
                break;
            case 2:
                this.counter += 200;
                break;
            case 3:
                this.counter += 300;
                break;
            default:
                break;
        }
    }
}
