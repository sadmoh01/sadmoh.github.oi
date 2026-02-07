// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all elements we need
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const celebration = document.getElementById('celebration');
    const loveLetterBtn = document.getElementById('loveLetterBtn');
    const loveLetterModal = document.getElementById('loveLetterModal');
    const closeModal = document.querySelector('.close');
    const musicBtn = document.getElementById('musicBtn');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const heartsContainer = document.querySelector('.hearts-container');
    
    let isMusicPlaying = false;
    
    // ==============================
    // SIMPLE MUSIC PLAYER
    // ==============================
    
    // Fix music button click
    musicBtn.addEventListener('click', function() {
        if (isMusicPlaying) {
            // Pause music
            backgroundMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-play"></i> Play The Weeknd';
            musicBtn.style.background = 'linear-gradient(135deg, #8a2be2, #4b0082)';
        } else {
            // Play music
            backgroundMusic.play().then(() => {
                musicBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
                musicBtn.style.background = '#ff4d6d';
            }).catch(error => {
                console.log("Need user interaction first");
                musicBtn.innerHTML = '<i class="fas fa-play"></i> Click to Play';
            });
        }
        isMusicPlaying = !isMusicPlaying;
    });
    
    // Auto-play after any click on page
    document.addEventListener('click', function autoPlayMusic() {
        if (!isMusicPlaying) {
            backgroundMusic.play().then(() => {
                isMusicPlaying = true;
                musicBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
                musicBtn.style.background = '#ff4d6d';
            });
        }
        // Remove listener after first click
        document.removeEventListener('click', autoPlayMusic);
    });
    
    // Update song info display
    const nowPlaying = document.getElementById('nowPlaying');
    if (nowPlaying) {
        nowPlaying.innerHTML = `
            <strong>The Weeknd</strong><br>
            <small>House of Balloons / Glass Table Girls</small>
        `;
    }
    
    // Style music button for The Weeknd
    musicBtn.style.background = 'linear-gradient(135deg, #8a2be2, #4b0082)';
    musicBtn.style.border = '2px solid #9370db';
    musicBtn.innerHTML = '<i class="fas fa-play"></i> Play The Weeknd';
    
    // ==============================
    // REST OF YOUR EXISTING CODE
    // ==============================
    
    // Create floating hearts in background
    function createHearts() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createHeart();
            }, i * 300);
        }
        
        // Keep creating hearts periodically
        setInterval(createHeart, 1000);
    }
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.opacity = '0.7';
        heart.style.zIndex = '1';
        heart.style.pointerEvents = 'none';
        heart.style.animation = `floatUp ${Math.random() * 3 + 5}s linear forwards`;
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }
    
    // Add CSS for heart animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.7;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Yes button click handler
    yesBtn.addEventListener('click', function() {
        // Show celebration message
        celebration.classList.remove('hidden');
        
        // Create fireworks effect
        createFireworks();
        
        // Hide the original buttons
        yesBtn.style.display = 'none';
        noBtn.style.display = 'none';
        
        // Add romantic message
        const romanticMessages = [
            "I knew you'd say yes! 💖",
            "This is the best day ever! 🌟",
            "My heart is bursting with joy! 💕",
            "You've made me so happy! 😊"
        ];
        
        const randomMessage = romanticMessages[Math.floor(Math.random() * romanticMessages.length)];
        const messageElement = document.createElement('p');
        messageElement.className = 'romantic-message';
        messageElement.textContent = randomMessage;
        messageElement.style.fontSize = '1.5rem';
        messageElement.style.color = '#ff4d6d';
        messageElement.style.marginTop = '20px';
        messageElement.style.animation = 'fadeIn 1s ease';
        
        celebration.appendChild(messageElement);
        
        // Play celebration sound
        playCelebrationSound();
    });
    
    // No button hover effect (moves away)
    noBtn.addEventListener('mouseover', function() {
        const container = document.querySelector('.buttons');
        const containerRect = container.getBoundingClientRect();
        const buttonRect = noBtn.getBoundingClientRect();
        
        // Calculate new position that keeps button within container
        const maxX = containerRect.width - buttonRect.width;
        const maxY = containerRect.height - buttonRect.height;
        
        // Generate random position
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        // Move the button
        noBtn.style.position = 'absolute';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        
        // Change button text sometimes
        const funnyMessages = [
            "Are you sure? 😢",
            "Try again! 💔",
            "Maybe? 🥺",
            "Click Yes instead! 😉"
        ];
        
        if (Math.random() > 0.7) {
            noBtn.innerHTML = `<i class="fas fa-times"></i> ${funnyMessages[Math.floor(Math.random() * funnyMessages.length)]}`;
        }
    });
    
    // No button click handler
    noBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create sad effect
        const sadMessage = document.createElement('div');
        sadMessage.className = 'sad-message';
        sadMessage.innerHTML = `
            <p style="color: #ff4d6d; font-size: 1.2rem; margin-top: 20px;">
                💔 Please give me a chance! My heart can't take it!
            </p>
        `;
        sadMessage.style.animation = 'fadeIn 0.5s ease';
        
        // Remove any existing sad message
        const existingMessage = document.querySelector('.sad-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        document.querySelector('.buttons').appendChild(sadMessage);
        
        // Make Yes button bigger
        yesBtn.style.transform = 'scale(1.2)';
        yesBtn.style.transition = 'transform 0.3s ease';
        
        // Remove sad message after 3 seconds
        setTimeout(() => {
            sadMessage.remove();
            yesBtn.style.transform = 'scale(1)';
        }, 3000);
    });
    
    // Love letter button handler
    loveLetterBtn.addEventListener('click', function() {
        loveLetterModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
    
    // Close modal handlers
    closeModal.addEventListener('click', function() {
        loveLetterModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === loveLetterModal) {
            loveLetterModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Create fireworks effect
    function createFireworks() {
        const fireworks = document.querySelector('.fireworks');
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createFirework(fireworks);
            }, i * 200);
        }
    }
    
    function createFirework(container) {
        const colors = ['#ff4d6d', '#ff8fa3', '#ffccd5', '#ffd166', '#ff9a76'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        const firework = document.createElement('div');
        firework.style.position = 'absolute';
        firework.style.left = Math.random() * 100 + '%';
        firework.style.top = '50%';
        firework.style.width = '5px';
        firework.style.height = '5px';
        firework.style.background = color;
        firework.style.borderRadius = '50%';
        firework.style.boxShadow = `0 0 10px ${color}`;
        firework.style.animation = `explode 0.8s ease-out forwards`;
        
        container.appendChild(firework);
        
        // Add explosion effect
        setTimeout(() => {
            for (let i = 0; i < 12; i++) {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.left = firework.style.left;
                particle.style.top = firework.style.top;
                particle.style.width = '3px';
                particle.style.height = '3px';
                particle.style.background = color;
                particle.style.borderRadius = '50%';
                particle.style.animation = `particleMove 1s ease-out forwards`;
                particle.style.setProperty('--angle', (i * 30) + 'deg');
                
                container.appendChild(particle);
                setTimeout(() => particle.remove(), 1000);
            }
            firework.remove();
        }, 400);
    }
    
    // Add CSS for fireworks
    const fireworksStyle = document.createElement('style');
    fireworksStyle.textContent = `
        @keyframes explode {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(0); opacity: 0; }
        }
        
        @keyframes particleMove {
            0% {
                transform: translate(0, 0) scale(1);
                opacity: 1;
            }
            100% {
                transform: 
                    translate(
                        calc(cos(var(--angle)) * 50px),
                        calc(sin(var(--angle)) * 50px)
                    ) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(fireworksStyle);
    
    // Celebration sound effect
    function playCelebrationSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create a simple celebration sound
        try {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.log("Audio context not supported");
        }
    }
    
    // Add a personal touch
    function personalizeMessage() {
        // Change this to her name
        const herName = "Fatima";
        
        // Update messages with her name
        const messages = document.querySelectorAll('.message');
        if (messages.length > 0) {
            messages[0].textContent = `Just ${herName},`;
        }
        
        // Update title
        document.title = `For ${herName} - Will You Be My Valentine?`;
        
        // Add The Weeknd XO badge
        const xoBadge = document.createElement('div');
        xoBadge.innerHTML = 'XO 💜';
        xoBadge.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            color: #8a2be2;
            font-family: 'Poppins', sans-serif;
            font-weight: bold;
            font-size: 1.8rem;
            opacity: 0.7;
            z-index: 1000;
            pointer-events: none;
        `;
        document.body.appendChild(xoBadge);
    }
    
    // Initialize everything
    function init() {
        createHearts();
        personalizeMessage();
        
        // Welcome message
        console.log("%c💖 For Fatima 💖", 
            "color: #ff4d6d; font-size: 20px; font-weight: bold;");
        console.log("%cHouse of Balloons loaded! XO 💜", 
            "color: #8a2be2; font-size: 16px;");
    }
    
    // Start the application
    init();
});// Test if audio loads
setTimeout(function() {
    console.log("Audio source:", backgroundMusic.src);
    console.log("Audio ready state:", backgroundMusic.readyState);
    console.log("Audio error:", backgroundMusic.error);
}, 1000);