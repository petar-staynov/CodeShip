var myCharacter;
var myBackground;
var myNewBullet;


var noObstacleLeft = true;
var noObstacleRight = true;
var noObstacleTop = true;
var noObstacleBottom = true;


var bullets = [];
var fire_bullet = true;
var pressedOnce = true;

function startGame() {
    myGameArea.start();
    myBackground = new Background(480,640,0,0);
    myCharacter = new Player(48, 48, 200, 580);

    var bullet_interval = setInterval(function () {
        if (fire_bullet){
            myNewBullet = new Bullets(10,20,myCharacter.x + myCharacter.width/2 - 5 ,myCharacter.y);
            bullets.push(myNewBullet);
            pressedOnce = true;
            fire_bullet = false;
        }
    },420);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 640;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        });
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};


function updateGameArea() {
    myGameArea.clear();

    noObstacleLeft = true;
    noObstacleRight = true;
    noObstacleTop = true;
    noObstacleBottom = true;

    myCharacter.speedX = 0;
    myCharacter.speedY = 0;


    if (myGameArea.keys && myGameArea.keys[37] && noObstacleLeft) {
        myCharacter.speedX = -4;
    }
    if (myGameArea.keys && myGameArea.keys[39] && noObstacleRight) {
        myCharacter.speedX = 4;
    }
    if (myGameArea.keys && myGameArea.keys[38] && noObstacleTop) {
        myCharacter.speedY = -4;
    }
    if (myGameArea.keys && myGameArea.keys[40] && noObstacleBottom) {
        myCharacter.speedY = 4;
    }
    if (myGameArea.keys && myGameArea.keys[32] && pressedOnce){
        fire_bullet = true;
        pressedOnce = false;
    }



    myCharacter.newPos();
    myBackground.scroll();


    myBackground.update();

    if (bullets.length > 0){
        for (var i = 0; i < bullets.length; i++){
            bullets[i].shootBullet();
            bullets[i].update();
            if (bullets[i].y < -30){
                bullets.splice(i, 1);
            }
        }
    }

    myCharacter.update();
}
