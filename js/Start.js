var myCharacter;
var myBackground;
var myNewBullet;
var myStartScreen;
var myNewEnemy;
var myScore;

var bullets = [];
var fire_bullet = false;
var pressedOnce = true;

var pressEnterOnce = true;
var closedStartMenu = false;

//AUDIO LOADER
var soundBackground1 = new Audio("res/BackgroundShort.opus"); //Main menu background
var soundBackground2 = new Audio("res/BackgroundLong.opus"); //Main game background
var bullet = new Audio("res/bullet.opus"); //Bullet shoot sound
var spawn = new Audio("res/spawn.opus"); //Enemy spawn sound
var kill = new Audio("res/kill.opus"); //Enemy kill sound


var enemies = [];

function startGame() {
    myGameArea.start();
    myBackground = new Background(480,640,0,0);
    myCharacter = new Player(48, 48, 200, 580);
    myStartScreen = new StartScreen(200,100, 140, 300);
    myScore = new Score(10,20, "20px Georgia");

    var bullet_interval = setInterval(function () {
        if (fire_bullet){
            myNewBullet = new Bullets(10,20,myCharacter.x + myCharacter.width/2 - 5 ,myCharacter.y);
            bullets.push(myNewBullet);
            pressedOnce = true;
            fire_bullet = false;

            //AUDIO
            bullet.play();
        }
    },369);

    var enemy_interval = setInterval(function () {
        if (closedStartMenu){
            myNewEnemy = new Enemy(29 + Math.random()*myGameArea.canvas.width - 29, -50, 50, 50, 20, 0.05, 1.5);
            enemies.push(myNewEnemy);

            //AUDIO
            spawn.play();
        }
    },2200);
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

    if(closedStartMenu)
    {
        //STOPS MENU BACKGROUND MUSIC
        soundBackground1.loop = false;
        soundBackground1.pause();

        //STARTS GAME BACKGROUND MUSIC
        soundBackground2.loop = true;
        soundBackground2.play();
    }
    else {
        //STARTS MENU BACKGROUND MUSIC
        soundBackground1.loop = true;
        soundBackground1.play(0);
    }


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
    if (!closedStartMenu){
        myStartScreen.onPressEnter();
        myStartScreen.update();

    }
    if (closedStartMenu){
        if (bullets.length > 0){
            for (var i = 0; i < bullets.length; i++){
                bullets[i].shootBullet();
                bullets[i].update();
                for (var j = 0; j < enemies.length; j++){
                        if (bullets[i].x >= enemies[j].x && bullets[i].x <= enemies[j].x + enemies[j].width && bullets[i].y <= enemies[j].y + enemies[j].height/2 && bullets[i].y >= enemies[j].y){
                            enemies.splice(j,1); //Removes enemy when bullet hits it
                            bullets.splice(i, 1);//Removes bullet when it hits
                            myScore.addScore();
                            if (i > 0){
                                i--;
                            }
                            if (j > 0){
                                j--;
                            }
                            kill.play();
                        }
                }
                if (bullets[i].y < -30){
                    bullets.splice(i, 1);
                    if (i > 0){
                        i--;
                    }

                }
            }
        }
        if (enemies.length > 0){
            for (var k = 0; k < enemies.length; k++){
                enemies[k].moveDownSin();
                enemies[k].update();
            }
        }
        //myNewEnemy.moveDown();
        //myNewEnemy.moveDownSin();
        //myNewEnemy.update();
        myCharacter.update();
        myScore.update();

    }
}