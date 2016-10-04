function Player(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = 'res/player.png';
    this.img.onload = function () {
      myGameArea.context.drawImage(img, x, y, width, height);
    };
    this.update = function() {
        var ctx = myGameArea.context;
        //ctx.fillStyle = color;
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.img, this.x,this.y, this.width, this.height);
    };

    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}
