var myCharacter;
var myFirstObstacle;


var noObstacleLeft = true;
var noObstacleRight = true;
var noObstacleTop = true;
var noObstacleBottom = true;
function startGame() {
    myGameArea.start();
    myCharacter = new Player(10, 20, "green", 130, 300);
    myFirstObstacle = new Obstacles(50,50, "brown", 135, 110);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 270;
        this.canvas.height = 480;
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
    myFirstObstacle.solid();
    if (myGameArea.keys && myGameArea.keys[37] && noObstacleLeft) {
        myCharacter.speedX = -2;
    }
    if (myGameArea.keys && myGameArea.keys[39] && noObstacleRight) {
        myCharacter.speedX = 2;
    }
    if (myGameArea.keys && myGameArea.keys[38] && noObstacleTop) {
        myCharacter.speedY = -2;
    }
    if (myGameArea.keys && myGameArea.keys[40] && noObstacleBottom) {
        myCharacter.speedY = 2;
    }
    myCharacter.newPos();
    myFirstObstacle.update();
    myCharacter.update();
}
