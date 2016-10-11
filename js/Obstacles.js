function Obstacles(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        let ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    };
    this.solid = function () {
        if (myCharacter.x <= this.x + this.width && myCharacter.y + myCharacter.height > this.y && myCharacter.y  < this.y + this.height && myCharacter.x > this.x + 8){
            noObstacleLeft = false;
        }
        else if (myCharacter.x + myCharacter.width >= this.x && myCharacter.y + myCharacter.height > this.y && myCharacter.y  < this.y + this.height && myCharacter.x < this.x + this.width - 8){
            noObstacleRight = false;
        }
        else if (myCharacter.y <= this.y + this.height && myCharacter.x + myCharacter.width > this.x && myCharacter.x < this.x + this.width && myCharacter.y > this.y + 8){
            noObstacleTop = false;
        }
        else if (myCharacter.y + myCharacter.height >= this.y && myCharacter.x + myCharacter.width > this.x && myCharacter.x < this.x + this.width && myCharacter.y  < this.y + this.height - 8){
            noObstacleBottom = false;
        }
    };
}
