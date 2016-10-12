function DeathScreen(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = 'res/gameOver.jpg';

    this.pressEnterOnce = false;
    this.alpha = 0;
    var ctx = myGameArea.context;
    ctx.globalAlpha = 0;

    this.update = function() {
        myGameArea.context.globalAlpha = this.alpha;
        if (end_game_state){
            this.fadeIn();
        }else{
            this.fadeOut();
        }
        ctx.drawImage(this.img, this.x,this.y, this.width, this.height);
        myGameArea.context.globalAlpha = 1;
    };
    this.fadeIn = function () {
        if (this.alpha < 0.97){
            this.alpha += 0.02;
        }
    };
    this.fadeOut = function () {
        if (this.alpha >= 0.02){
            this.alpha -= 0.02;
        }else{
            this.alpha = 0;
        }
    };

    this.onPressEnter = function () {
        if (myGameArea.keys && myGameArea.keys[13] && end_game_state){
            this.pressEnterOnce = true;
        }
        if (this.pressEnterOnce){
            end_game_state = false;
            myLives.currLives = 5;
            this.pressEnterOnce = false;
        }
    }
}
