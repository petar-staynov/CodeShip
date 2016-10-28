function StartScreen(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = 'res/StartButton.png';

    let alpha = 1;
    let ctx = myGameArea.context;
    ctx.globalAlpha = 1;

    this.update = function() {
        ctx.drawImage(this.img, this.x,this.y, this.width, this.height);
    };

    this.onPressEnter = function () {
        if (myGameArea.keys && myGameArea.keys[13]){
            pressEnterOnce = true;
        }
    }
}
