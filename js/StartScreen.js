function StartScreen(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = 'res/StartButton.png';

    var alpha = 1;
    var ctx = myGameArea.context;
    ctx.globalAlpha = 1;

    this.update = function() {
        ctx.drawImage(this.img, this.x,this.y, this.width, this.height);
    };

    this.onPressEnter = function () {
        if (myGameArea.keys && myGameArea.keys[13] && pressEnterOnce){


            //contex FADE OUT EFFECT ON START
            var counter = 0;
            var fade = setInterval(function () {

                ctx.globalAlpha -= 0.020;

                counter++;

                if(counter == 16) {
                    closedStartMenu = true;
                    ctx.globalAlpha = 1;
                    clearInterval(fade);
                }
            }, 100);
        }
    }
}
