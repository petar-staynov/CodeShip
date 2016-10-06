function Enemy(x, y, width, height, sinRange, sinAngleSpeed, sinSpeed) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = 'res/enemy.png';
    this.lives = 10;
// let the square move "around" this y value
    this.x_fix = this.x;
// let the square this pixels up and down the fixed y value
    this.range = sinRange;
// we will calculate the sin-values from the angle variable
// since the Math.sin function is working in radiants
// we must increase the angle value in small steps -> anglespeed
// the bigger the anglespeed value is, the wider the sine gets
    this.angle = 0;
    this.anglespeed = sinAngleSpeed;
// speed of the movement
// initially 1, means it increases the x value
// if you would set it to 0, the object would move up and down
// at the same spot
    this.speed = sinSpeed;

    this.update = function() {
        var ctx = myGameArea.context;
        ctx.drawImage(this.img, this.x,this.y, this.width, this.height);
    };

    this.moveDown = function () {
        this.y += 2;
    };
    this.moveDownSin = function () {
        // clear
        // comment this clear function to see the plot of the sine movement

        this.y += this.speed;

        // increase value for sin calculation
        this.angle += this.anglespeed;

        // always add to a fixed value
        // multiply with range, sine only delivers values between -1 and 1
        this.x = this.x_fix + Math.sin(this.angle) * this.range;

        // if you would increase or decrease the range value,
        // then the movement would "swing up" or "swing down"
        // range += 0.10;

        // if the square leaves the canvas on the right side,
        // bring it back to the left side
        if(this.y >640) {
            this.y = -50;
            this.x = myCharacter.x;
            this.x_fix = myCharacter.x;
            // reset the range - if it has been manipulated
            //this.range = 20;
        }

    };
}

