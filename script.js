// Screen navigation
let currentScreen = 1;

function goToScreen(screenNumber) {
    // Hide current screen
    document.getElementById(`screen${currentScreen}`).classList.remove('active');
    
    // Show new screen
    currentScreen = screenNumber;
    document.getElementById(`screen${currentScreen}`).classList.add('active');
    
    // Special handling for screen 4
    if (screenNumber === 4) {
        startLoadingAnimation();
    }
}

// Screen 2: NO button behavior
const noButton = document.getElementById('noButton');
const yesButton = document.querySelector('.yes-button');
const noTexts = [
    'NO',
    'Are you sure?',
    'Think again',
    'Wrong choice detected',
    'Really?',
    'Try YES instead',
    'Come on...',
    'You know you want to',
    'Last chance!'
];
let noTextIndex = 0;

if (noButton) {
    noButton.addEventListener('mouseenter', () => {
        // Move NO button to random position
        const container = noButton.parentElement;
        const containerRect = container.getBoundingClientRect();
        const buttonRect = noButton.getBoundingClientRect();
        
        const maxX = window.innerWidth - buttonRect.width - 40;
        const maxY = window.innerHeight - buttonRect.height - 40;
        
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        noButton.style.position = 'fixed';
        noButton.style.left = randomX + 'px';
        noButton.style.top = randomY + 'px';
        
        // Change text
        noTextIndex = (noTextIndex + 1) % noTexts.length;
        noButton.textContent = noTexts[noTextIndex];
        
        // Grow YES button
        yesButton.classList.add('grow');
        setTimeout(() => {
            yesButton.classList.remove('grow');
        }, 300);
    });
}

// Create floating hearts dynamically
function createFloatingHearts() {
    const screens = document.querySelectorAll('.hearts-bg');
    screens.forEach(screen => {
        for (let i = 0; i < 5; i++) {
            const heart = document.createElement('div');
            heart.textContent = ['💜', '💕', '💖', '💗'][Math.floor(Math.random() * 4)];
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.animation = `float ${Math.random() * 10 + 10}s infinite`;
            heart.style.animationDelay = Math.random() * 5 + 's';
            heart.style.opacity = '0.3';
            screen.appendChild(heart);
        }
    });
}

// Create sparkles dynamically
function createSparkles() {
    const sparklesContainer = document.querySelector('.sparkles');
    if (sparklesContainer) {
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.textContent = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.fontSize = (Math.random() * 15 + 15) + 'px';
            sparkle.style.animation = `sparkle ${Math.random() * 2 + 2}s infinite`;
            sparkle.style.animationDelay = Math.random() * 2 + 's';
            sparklesContainer.appendChild(sparkle);
        }
    }
}

// Screen 4: Loading animation
function startLoadingAnimation() {
    const loadingFill = document.getElementById('loadingFill');
    const loadingContainer = document.getElementById('loadingContainer');
    const scoreReveal = document.getElementById('scoreReveal');
    const messageContainer = document.getElementById('messageContainer');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 2;
        loadingFill.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingContainer.style.display = 'none';
                scoreReveal.classList.add('show');
                createConfetti();
                
                // Show message container after score
                setTimeout(() => {
                    messageContainer.classList.add('show');
                }, 1500);
            }, 500);
        }
    }, 30);
}

// Create confetti effect
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#ff69b4', '#00ff88', '#69b4ff', '#ffd700', '#ff6b6b'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.borderRadius = '50%';
        confetti.style.animation = \
        `confettiFall ${Math.random() * 3 + 2}s linear`;
        confettiContainer.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Add confetti fall animation
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Send message function
async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const sentConfirmation = document.getElementById('sentConfirmation');
    const message = messageInput.value.trim();
    
    if (!message) {
        alert('Please write a message first! 💜');
        return;
    }
    
    // Disable button during sending
    sendButton.disabled = true;
    sendButton.style.opacity = '0.6';
    
    try {
        // Send to your server
        const response = await fetch('YOUR_SERVER_ENDPOINT_HERE', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                from: 'Netrali',
                timestamp: new Date().toISOString()
            })
        });
        
        if (response.ok) {
            // Show confirmation
            sentConfirmation.classList.add('show');
            messageInput.value = '';
            
            // Hide confirmation after 3 seconds
            setTimeout(() => {
                sentConfirmation.classList.remove('show');
            }, 3000);
        } else {
            throw new Error('Failed to send');
        }
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Oops! Something went wrong. But your message is saved in my heart 💜');
    } finally {
        // Re-enable button
        sendButton.disabled = false;
        sendButton.style.opacity = '1';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    createSparkles();
});
