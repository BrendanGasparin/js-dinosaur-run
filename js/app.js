function main() {
    const dino = document.querySelector('.dino');
    const grid = document.querySelector('.grid');
    const alert = document.querySelector('#alert');
    let speed = 100;
    let position = 5;
    let gravity = 0.9;
    let isJumping = false;
    let isGameOver = false;

    generateObstacles();

    function control(e) {
        if (e.code === "Space") {
            if (!isJumping)
                jump();
        }
    }

    function gameOver() {
        isGameOver = true;

        // remove all children
        while (grid.firstChild) {
                grid.removeChild(grid.lastChild);
                alert.innerHTML = 'Game Over';
        }
        document.querySelector('#desert').style.animationPlayState = 'paused';
    }

    function generateObstacles() {
        const obstacle = document.createElement('div');
        let obstaclePosition = window.innerWidth;
        obstacle.classList.add('obstacle');
        grid.appendChild(obstacle);
        obstacle.style.left = obstaclePosition + 'px';

        let timerId = setInterval(function() {
            if (obstaclePosition < -60) {
                clearInterval(timerId);
                gameOver();
            }

            obstaclePosition -= 10;
            obstacle.style.left = obstaclePosition + 'px';
        }, speed); // milliseconds
    }
    
    function jump() {
        let count = 0;

        isJumping = true;

        let timerId = setInterval(function() {
            // Move down
            if (count === 10) {
                clearInterval(timerId);
                let downTimerId = setInterval(function() {
                    if (count === 0) {
                        clearInterval(downTimerId);
                        isJumping = false;
                    }
                    position -= 5;
                    count--;
                    position *= gravity;
                    if (position < 5)
                        position = 5;
                    dino.style.bottom = position + 'px';
                });
            }
            //move up
            position += 20;
            position *= gravity;    // slow down over time
            count++;
            dino.style.bottom = position + 'px';
        }, speed); // milliseconds
    }

    document.addEventListener('keyup', control);
}

document.addEventListener('DOMContentLoaded', main);