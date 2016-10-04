function Background(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.y2 = y - 638;
    this.img = new Image();
    this.img.src = 'res/background.png';
    this.img2 = new Image();
    this.img2.src = 'res/background.png';

    this.update = function() {
        var ctx = myGameArea.context;
        ctx.drawImage(this.img, this.x,this.y, this.width, this.height);
        ctx.drawImage(this.img2, this.x,this.y2, this.width, this.height);

    };

    this.scroll = function () {
        this.y += 3;
        this.y2 += 3;

        if (this.y > 638){
            this.y = -638;
        }
        if (this.y2 > 638){
            this.y2 = -638;
        }
    }
}
