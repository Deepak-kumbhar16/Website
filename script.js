// Valentine's Day Website JavaScript Code

// Function to show different screens based on user selection
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.style.display = 'none';
    });
    document.getElementById(screenId).style.display = 'block';
}

// Floating hearts effect
function createFloatingHearts() {
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 2 + 3 + 's';
        document.body.appendChild(heart);
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
}

// Sparkles effect
function createSparkles() {
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.animationDuration = Math.random() * 0.5 + 0.5 + 's';
        document.body.appendChild(sparkle);
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }, 200);
}

// Loading animation
function showLoading() {
    const loadingAnimation = document.getElementById('loading-animation');
    loadingAnimation.style.display = 'block';
}

function hideLoading() {
    const loadingAnimation = document.getElementById('loading-animation');
    loadingAnimation.style.display = 'none';
}

// Confetti effect
function createConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = Math.random() * 1 + 1 + 's';
        document.body.appendChild(confetti);
        setTimeout(() => {
            confetti.remove();
        }, 2000);
    }
}

// Message sending functionality
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageDisplay = document.getElementById('message-display');
    const message = messageInput.value;
    if (message) {
        messageDisplay.textContent = message;
        messageInput.value = '';
    }
}

// Event listeners for navigation
document.getElementById('nav-screen1').onclick = () => showScreen('screen1');
document.getElementById('nav-screen2').onclick = () => showScreen('screen2');
document.getElementById('nav-screen3').onclick = () => showScreen('screen3');
document.getElementById('nav-screen4').onclick = () => showScreen('screen4');

// Initialize functions
createFloatingHearts();
createSparkles();
showLoading();
setTimeout(() => {
    hideLoading();
    createConfetti();
}, 2000);