function main() {
    const dino = document.querySelector('.dino');
    const grid = document.querySelector('.grid');
    let position = 5;
    let gravity = 0.9;
    let isJumping = false;

    generateObstacles();

    function control(e) {
        if (e.code === "Space") {
            if (!isJumping)
                jump();
        }
    }

    function generateObstacles() {
        const obstacle = document.createElement('div');
        let obstaclePosition = 1000;
        obstacle.classList.add('obstacle');
        grid.appendChild(obstacle);
        obstacle.style.left = obstaclePosition + 'px';
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
        }, 20); // 20ms
    }

    document.addEventListener('keyup', control);
}

document.addEventListener('DOMContentLoaded', main);