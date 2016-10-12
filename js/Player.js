function Player(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = 'res/player.png';

    this.deathImg = new Image();
    this.deathImg.src = 'res/player-explosion.png';
    this.dx = 0;
    this.dxSpeed = this.deathImg.width/5;
    this.dy = 0;
    this.dySpeed = this.deathImg.height/5;

    this.update = function () {
        var ctx = myGameArea.context;
        if (!end_game_state){
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
        if (end_game_state){
            ctx.drawImage(this.deathImg, this.dx , this.dy, this.deathImg.width/5, this.deathImg.height/5, this.x, this.y, this.width, this.height);
            this.animate();
        }
    };

    this.animate = function () {
        this.dx += this.dxSpeed;
        if (this.dx >= this.deathImg.width - this.deathImg.width/5 - 5){
            this.dy += this.dySpeed;
            this.dx = 0;
        }
        if (this.dx >= this.deathImg.width - this.deathImg.width/5*2 - 5 && this.dy >= this.deathImg.height - this.deathImg.height/5 - 5){
            this.dxSpeed = 0;
        }
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
    this.hit = function () {
        if (!end_game_state){
            myLives.currLives--;
        }
        // myScore.currScore -= 33;
    }
}
