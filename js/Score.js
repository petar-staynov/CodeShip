function Score(x, y, font) {
    this.x = x;
    this.y = y;
    this.currScore = 0;
    this.update = function() {
        let ctx = myGameArea.context;
        ctx.font = font;
        ctx.fillText("Score: " + this.currScore, this.x, this.y);
    };
    this.addScore = function () {
        this.currScore += 100;
    }
}
