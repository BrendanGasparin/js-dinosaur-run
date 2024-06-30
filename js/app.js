function main() {
    const dino = document.querySelector('.dino');
    const grid = document.querySelector('.grid');
    const alert = document.querySelector('#alert');
    let randomTime = Math.random() * 3000 + 3000;
    let speed = 60;
    let position = 5;
    let gravity = 0.9;
    let isJumping = false;
    let isGameOver = false;
    let startScreen = true;

    document.addEventListener('keydown', control);
    grid.removeChild(dino);
    startMenu();

    // Detect space bar presses
    function control(e) {
        if (startScreen === true && e.code === 'Space') {
            startGame();
        }
        else if (e.code === 'Space') {
            if (!isJumping)
                jump();
        }
    }

    // Dinosaur has died - end the game
    function gameOver() {
        isGameOver = true;

        alert.innerHTML = 'Game Over';

        // remove all children
        while (grid.firstChild) {
                grid.removeChild(grid.lastChild);
        }
        document.querySelector('#desert').style.animationPlayState = 'paused';
    }

    // Generate obstacles and random intervals and move them to the left
    function generateObstacles() {
        if (isGameOver === false && startScreen === false) {
            const obstacle = document.createElement('div');
            const collisionDistance = 50;
            let obstaclePosition = window.innerWidth;
            obstacle.classList.add('obstacle');
            grid.appendChild(obstacle);
            obstacle.style.left = obstaclePosition + 'px';
    
            let timerId = setInterval(function() {
                // Collision detector
                if (obstaclePosition < collisionDistance && obstaclePosition > -collisionDistance && position < collisionDistance) {
                    clearInterval(timerId);
                    gameOver();
                }
    
                obstaclePosition -= 1;
                obstacle.style.left = obstaclePosition + 'px';
            }, speed / 10); // milliseconds
    
            // Set a timer to generate the next obstacle
            setTimeout(generateObstacles, randomTime);
            randomTime = Math.random() * 3000 + 3000;
        }
    }
   
    // Dinosaur jumping
    function jump() {
        isJumping = true;

        let timerId = setInterval(function() {
            // Move down
            if (position >= 120) {
                clearInterval(timerId);
                let downTimerId = setInterval(function() {
                    if (position <= 5) {
                        clearInterval(downTimerId);
                        isJumping = false;
                    }
                    position -= 5;
                    if (position < 5)
                        position = 5;
                    position *= gravity;
                    dino.style.bottom = position + 'px';
                }, speed);
            }
            //move up
            position += 20;
            position *= gravity;    // slow down over time
            dino.style.bottom = position + 'px';
        }, speed); // milliseconds
    }

    // Start running the game
    function startGame() {
        alert.innerHTML = '';
        document.querySelector('#desert').style.animationPlayState = 'running';
        grid.appendChild(dino);
        startScreen = false;
        generateObstacles();
    }

    // Display the start menu
    function startMenu() {
        alert.innerHTML = 'Press SPACE to Start';
        document.querySelector('#desert').style.animationPlayState = 'paused';
    }
}

document.addEventListener('DOMContentLoaded', main);