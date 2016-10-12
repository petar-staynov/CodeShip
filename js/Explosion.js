function Explosion(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    this.deathImg = new Image();
    this.deathImg.src = 'res/player-explosion.png';
    this.dx = 0;
    this.dxSpeed = this.deathImg.width/5;
    this.dy = 0;
    this.dySpeed = this.deathImg.height/5;

    this.update = function () {
        var ctx = myGameArea.context;
        ctx.drawImage(this.deathImg, this.dx , this.dy, this.deathImg.width/5, this.deathImg.height/5, this.x, this.y, this.width, this.height);
        this.animate();
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
}
