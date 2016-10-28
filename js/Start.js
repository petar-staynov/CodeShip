let myCharacter;
let myBackground;
let myNewBullet;
let myStartScreen;
let pause_game_state;
let end_game_state = false;
let myNewEnemy;
let myScore;
let myLives;
let myDeathScreen;
let myNewExplosion;

let currAlphaStart = 1;

let bullets = [];
let enemyBullets = [];
let fire_bullet = false;
let pressedOnce = true;

let pressEnterOnce = false;
let closedStartMenu = false;

//AUDIO LOADER
let soundBackground1 = new Audio("res/BackgroundShort.opus"); //Main menu background
let soundBackground2 = new Audio("res/BackgroundLong.opus"); //Main game background
let bullet = new Audio("res/bullet.opus"); //Bullet shoot sound
let spawn = new Audio("res/spawn.opus"); //Enemy spawn sound
let kill = new Audio("res/kill.opus"); //Enemy kill sound
let playerHit = new Audio("res/playerHit.opus"); //Player hit sound
let playerDeath = new Audio("res/playerDeath.opus"); //Player death sound

let enemies = [];
let explosions = [];

function startGame() {
    myGameArea.start();
    myBackground = new Background(480, 640, 0, 0);
    myCharacter = new Player(48, 48, 200, 580);
    myStartScreen = new StartScreen(200, 100, 140, 300);
    myScore = new Score(20, 30, "20px Myriad");
    myLives = new Life(369, 30, "20px Myriad");
    myDeathScreen = new DeathScreen(200, 100, 140, 300, "25px Myriad");

    let bullet_interval = setInterval(function () {
        if (fire_bullet) {
            myNewBullet = new Bullets(10, 20, myCharacter.x + myCharacter.width / 2 - 5, myCharacter.y, 0);
            bullets.push(myNewBullet);
            pressedOnce = true;
            fire_bullet = false;

            //AUDIO
            bullet.play();
        }
    }, 450);

    let enemy_interval = setInterval(function () {
        if (closedStartMenu&&!end_game_state) {
            while (enemies.length < 5 + myScore.currScore / 1000){ //Dynamic difficulty based on score
                //x, y, width, height, sinRange, sinAngleSpeed, sinSpeed
                enemies.push(new Enemy(Math.random()
                    * (myGameArea.canvas.width - 100),
                    -50, 50, 50,
                    Math.random() * 10 + 5, //sinRange
                    Math.random() / 10 + 0.05, //sinAngleSpeed
                    Math.random() * 1.5 + 1)); //sinSpeed - enemy down speed

                //AUDIO
                spawn.play();
            }
        }
    }, 2000);

}

let myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
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
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

function updateGameArea() {
    myGameArea.clear();

    if (closedStartMenu) {
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


    if (closedStartMenu && !end_game_state) {
        myCharacter.speedX = 0;
        myCharacter.speedY = 0;


        if (myGameArea.keys && myGameArea.keys[37]) {  //left
            myCharacter.speedX = -7;
        }
        if (myGameArea.keys && myGameArea.keys[39]) { //right
            myCharacter.speedX = 7;
        }
        if (myGameArea.keys && myGameArea.keys[38]) { //up
            myCharacter.speedY = -4;
        }
        if (myGameArea.keys && myGameArea.keys[40]) { //down
            myCharacter.speedY = 6;
        }
        if (myGameArea.keys && myGameArea.keys[32] || myGameArea.keys[17] && pressedOnce) {
            fire_bullet = true;
            pressedOnce = false;
        }

        myCharacter.newPos();
    }
    myBackground.scroll();
    myBackground.update();
    if (!closedStartMenu) {
        myStartScreen.onPressEnter();
        if (pressEnterOnce){
            if (currAlphaStart <= 0.04){
                closedStartMenu = true;
                pressEnterOnce = false;
            }else{
                myGameArea.context.globalAlpha -= 0.02;
                currAlphaStart -= 0.02;
            }
            myGameArea.context.globalAlpha = currAlphaStart;
        }
        myStartScreen.update();
        myGameArea.context.globalAlpha = 1;

    }
    if (closedStartMenu&&!end_game_state) {
        if (bullets.length > 0) {
            for (let i = 0; i < bullets.length; i++) {
                bullets[i].moveBullet();
                bullets[i].update();
                if (bullets[i].checkOutWindowRange()) {
                    bullets.splice(i, 1);
                    break;
                }
                for (let j = 0; j < enemies.length ; j++) {
                    if (bullets[i].checkCollision(enemies[j])) {
                        bullets.splice(i, 1);//Removes bullet when it hits
                        enemies[j].stopAutomaticShoting();
                        myNewExplosion = new Explosion(48,48,enemies[j].x, enemies[j].y);
                        explosions.push(myNewExplosion);
                        enemies.splice(j, 1); //Removes enemy when bullet hits it
                        myScore.addScore();
                        kill.play();
                        break;
                    }
                }
            }
        }
        if (enemyBullets.length > 0) {
            for (let i = 0; i < enemyBullets.length; i++) {
                enemyBullets[i].moveBullet();
                enemyBullets[i].update();
                if (enemyBullets[i].checkOutWindowRange()) {
                    enemyBullets.splice(i, 1);
                    break;
                }
                if (enemyBullets[i].checkCollision(myCharacter)) {
                    myCharacter.hit();
                    enemyBullets.splice(i, 1);
                    playerHit.play();
                    break;
                }
            }
        }
        if (enemies.length > 0) {
            for (let k = 0; k < enemies.length; k++) {
                enemies[k].moveDownSin();
                enemies[k].update();
            }
        }
        //myNewEnemy.moveDown();
        //myNewEnemy.moveDownSin();
        //myNewEnemy.update();
        myCharacter.update();
        myScore.update();
        myLives.update();

        if(myLives.currLives==0){
            end_game_state=true;
            playerDeath.play();
        }

    }
    if (explosions.length > 0){
        for (let x = 0; x < explosions.length; x++){
            explosions[x].update();
        }
    }
    myCharacter.update();
    myDeathScreen.onPressEnter();
    myDeathScreen.update();
}