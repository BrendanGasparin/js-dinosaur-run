function main() {
    const dino = document.querySelector('.dino');
    const grid = document.querySelector('.grid');
    let position = 0;
    let gravity = 0.9;
    let isJumping = false;

    function control(e) {
        if (e.code === "Space") {
            jump();
        }
    }
    
    function jump() {
        let count = 0;

        isJumping = true;

        let timerId = setInterval(function() {
            // Move down
            if (count === 11) {
                clearInterval(timerId);
                let downTimerId = setInterval(function() {
                    if (count === 0) {
                        clearInterval(downTimerId);
                        isJumping = false;
                    }
                    position -= 5;
                    count--;
                    position *= gravity;
                    dino.style.bottom = position + 'px';
                });
            }
            //move up
            position += 22;
            position *= gravity;    // slow down over time
            count++;
            dino.style.bottom = position + 'px';
        }, 20); // 20ms
    }

    document.addEventListener('keyup', control);
}

document.addEventListener('DOMContentLoaded', main);