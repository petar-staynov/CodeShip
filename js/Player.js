function Player(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.lives = 5;
    this.img = new Image();
    this.img.src = 'res/player.png';
    this.update = function () {
        let ctx = myGameArea.context;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };

    this.newPos = function () {
        this.x += this.speedX;

        //Adds movement border for player ship
        if (this.x >= 480 - width) {
            this.x = 480 - width;
        }
        if (this.x <= 0) {
            this.x = 0;
        }

        this.y += this.speedY;

        //Adds movement border for player ship
        if (this.y >= 640 - height) {
            this.y = 640 - height;
        }
        if (this.y <= 0) {
            this.y = 0;
        }
    };
    this.die = function () {
        this.lives--;
        myScore.currScore -= 33;
    }
}
