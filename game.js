// Initialized variables
let is_game_running = false;
let score = 0;
let countdown;
let time_limit = 30; // Set the timer to 30 seconds
let timer_display;

// Declared variables
let end;
let start;
let boundaries;
let status_display;
let reset;
let collectibles;

// Event Listener to load the page and initialize elements
document.addEventListener("DOMContentLoaded", loadPage);

// Function to display the current score
function displayScore(message) {
    if (message != "") {
        status_display.innerHTML = message + "<br/>" + "Your Score is: " + score;
    }
}

// Function to stop the timer and handle the game over scenario
function gameOver() {
    if (is_game_running) {
        for (let i = 0; i < boundaries.length; i++) {
            boundaries[i].style.backgroundColor = "rgb(243, 159, 159)";
        }
        if (score > 0) score = score - 1;
        displayScore("Game Over!");
        is_game_running = false;
        stopTimer();
    }
}

// Function to start the game, reset elements, and begin the countdown
function startGame() {
    displayScore("");
    is_game_running = true;
    for (let i = 0; i < boundaries.length; i++) {
        boundaries[i].style.backgroundColor = "#eeeeee";
    }
    startTimer();
}

// Function to handle the game-winning scenario
function endGame() {
    if (is_game_running) {
        for (let i = 0; i < boundaries.length; i++) {
            boundaries[i].style.backgroundColor = "rgb(113 225 141)";
        }
        score = score + 5;
        displayScore("You Won!");
        is_game_running = false;
        stopTimer();
    }
}

// Function to load the page and initialize all necessary elements
function loadPage() {
    end = document.getElementById("end");
    start = document.getElementById("start");
    boundaries = document.getElementsByClassName("boundary");
    status_display = document.getElementById("status");
    timer_display = document.getElementById("timer");
    collectibles = document.getElementsByClassName("collectible");

    end.addEventListener("mouseover", endGame);
    start.addEventListener("click", startGame);
    for (let i = 0; i < boundaries.length; i++) {
        boundaries[i].addEventListener("mouseover", gameOver);
    }

    // Add event listeners for collectible items (coins)
    for (let i = 0; i < collectibles.length; i++) {
        collectibles[i].addEventListener("mouseover", collectItem);
    }
    
    // Reset button event
    document.getElementById("reset").addEventListener("click", resetGame);
}

// Function to reset the game
function resetGame() {
    score = 0;
    is_game_running = false;
    displayScore("Game Reset!");
    for (let i = 0; i < boundaries.length; i++) {
        boundaries[i].style.backgroundColor = "#eeeeee";
    }
    stopTimer();
    timer_display.textContent = "Time Left: 30s"; // Reset the timer display

    // Reset the collectibles (make them visible again)
    for (let i = 0; i < collectibles.length; i++) {
        collectibles[i].style.display = "block";
    }
}

// Function to start the countdown timer
function startTimer() {
    let timeRemaining = time_limit;
    countdown = setInterval(() => {
        timer_display.textContent = `Time Left: ${timeRemaining}s`; // Update the timer display
        if (timeRemaining <= 0) {
            clearInterval(countdown);
            gameOver(); // End the game when time reaches 0
        }
        timeRemaining--;
    }, 1000);
}

// Function to stop the countdown timer
function stopTimer() {
    clearInterval(countdown);
    timer_display.textContent = ""; // Clear the timer display when stopped
}

// Function to handle item collection (coins)
function collectItem(event) {
    if (is_game_running) {
        let collectible = event.target;
        collectible.style.display = "none"; // Hide the collectible after it's collected
        score += 2; // Add points for collecting an item (e.g., 2 points for each coin)
        displayScore("Item Collected!"); // Optionally, show a message when an item is collected
    }
}
