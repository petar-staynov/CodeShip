function Bullets(width, height, x, y, direction) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.direction = direction;    //directons 0,1,2,3  - up, left, down, right
    this.img.src = 'res/bullets.png';
    this.imX = function () {
        if (this.direction % 2 != 0)
            return 0;
        else
            return 23;
    };
    this.imgX = this.imX();
    this.imY = function () {
        if (this.direction % 2 != 0)
            return this.direction * 64 + 23;
        else
            return this.direction * 64;
    };
    this.imgY = this.imY();


    this.update = function () {
        var ctx = myGameArea.context;
        ctx.drawImage(this.img, this.imgX, this.imgY, 19, 64, this.x, this.y, this.width, this.height);
    };

    this.moveBullet = function () {
        switch (this.direction) {
            case 0:
                this.y -= 8;
                break;
            case 1:
                this.x -= 8;
                break;
            case 2:
                this.y += 8;
                break;
            case 3:
                this.x += 8;
                break;
        }
    };
    this.checkColison = function (obj) {
        if (this.x + this.width >= obj.x && this.x <= obj.x + obj.width && this.y <= obj.y + obj.height && this.y+obj.height >= obj.y)
            return true;
        else return false;
    };
}
