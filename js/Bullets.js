function Bullets(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = 'res/bullet.png';
    this.update = function() {
        var ctx = myGameArea.context;
        ctx.drawImage(this.img, this.x,this.y, this.width, this.height);
    };

    this.shootBullet = function() {
        this.y -= 8;
    }
}
