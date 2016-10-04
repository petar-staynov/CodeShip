function MainMenu() {
    var canvas,
        surface,
        currentScreen;
    var gameStarted = true;

    var mouse; // simple helper for capturing the mouse's state

    function beginLoop() {
        var frameId = 0;
        var lastFrame = Date.now();

        function loop() {
            var thisFrame = Date.now();

            var elapsed = thisFrame - lastFrame;

            frameId = window.requestAnimationFrame(loop);

            currentScreen.update(elapsed);
            currentScreen.draw(surface);

            lastFrame = thisFrame;
        }

        loop();
    }


    canvas = document.querySelector('canvas#menu');
    canvas.setAttribute('width', 480);
    canvas.setAttribute('height', 640);

    surface = canvas.getContext('2d');

    mouse = (function (target) {
        var isButtonDown = false;

        target.addEventListener('mousedown', function () {
            isButtonDown = true;
        });
        target.addEventListener('mouseup', function () {
            isButtonDown = false;
        });

        return {
            isButtonDown: function () {
                return isButtonDown;
            }
        };
    }(document));

// define the start screen
    currentScreen = (function (input) {

        var hue = 0;
        var transitioning = false;
        var wasButtonDown = false;
        var title = 'CodeShip';

        function centerText(ctx, text, y) {
            var measurement = ctx.measureText(text);
            var x = (ctx.canvas.width - measurement.width) / 2;
            ctx.fillText(text, x, y);
        }

        function draw(ctx, elapsed) {

            var y = ctx.canvas.height / 2;
            var color = '#8dbdd8';

            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.fillStyle = '#4390bc';
            ctx.font = '48px monospace';
            centerText(ctx, title, y);

            ctx.fillStyle = color;
            ctx.font = '24px monospace';
            centerText(ctx, 'click to start', y + 30);
        }

        function update() {
            var isButtonDown = input.isButtonDown();
            var mouseJustClicked = !isButtonDown && wasButtonDown;

            if (mouseJustClicked && !transitioning) {
                transitioning = true;
                startGame();
                gameStarted = true;
            }

            wasButtonDown = isButtonDown;
        }

        return {
            draw: draw,
            update: update
        };
    }(mouse));
    beginLoop();
}
