function Life(x, y, font) {
    this.x = x;
    this.y = y;
    this.currLives = 5;
    this.update = function() {
        let ctx = myGameArea.context;
        ctx.font = font;
        ctx.fillText("Lives: " + this.currLives, this.x, this.y);
    };
    //LIFE MECHANICS IS DONE IN Player.js
    // this.addLife = function () {
    //     this.currLives++;
    // }
    // this.takeLife = function () {
    //     this.currLives--;
    // }
}
