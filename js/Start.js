var myCharacter;
var myBackground;
var myNewBullet;
var myStartScreen;
var myNewEnemy;

var bullets = [];
var fire_bullet = false;
var pressedOnce = true;

var pressEnterOnce = true;
var closedStartMenu = false;

function startGame() {
    myGameArea.start();
    myBackground = new Background(480,640,0,0);
    myCharacter = new Player(48, 48, 200, 580);
    myStartScreen = new StartScreen(200,100, 140, 300);
    myNewEnemy = new Enemy(50,50, 130, -50);

    var bullet_interval = setInterval(function () {
        if (fire_bullet){
            myNewBullet = new Bullets(10,20,myCharacter.x + myCharacter.width/2 - 5 ,myCharacter.y);
            bullets.push(myNewBullet);
            pressedOnce = true;
            fire_bullet = false;
        }
    },390);
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
        });
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

function updateGameArea() {
    myGameArea.clear();
    if (closedStartMenu){

        myCharacter.speedX = 0;
        myCharacter.speedY = 0;


        if (myGameArea.keys && myGameArea.keys[37]) {
            myCharacter.speedX = -4;
        }
        if (myGameArea.keys && myGameArea.keys[39]) {
            myCharacter.speedX = 4;
        }
        if (myGameArea.keys && myGameArea.keys[38]) {
            myCharacter.speedY = -4;
        }
        if (myGameArea.keys && myGameArea.keys[40]) {
            myCharacter.speedY = 4;
        }
        if (myGameArea.keys && myGameArea.keys[32] && pressedOnce){
            fire_bullet = true;
            pressedOnce = false;
        }

        myCharacter.newPos();
    }


    myBackground.scroll();
    myBackground.update();
    myStartScreen.onPressEnter();
    if (!closedStartMenu){
        myStartScreen.update();
    }

    if (closedStartMenu){
        if (bullets.length > 0){
            for (var i = 0; i < bullets.length; i++){
                bullets[i].shootBullet();
                bullets[i].update();
                if (bullets[i].y < -30){
                    bullets.splice(i, 1);
                }
            }
        }

        myNewEnemy.moveDown();
        myNewEnemy.update();
        myCharacter.update();
    }
}
