let allMessages = [];

// Create floating hearts
function createFloatingHearts() {
    const heartBg = document.getElementById('heartBg');
    const hearts = ['💕', '💖', '💗', '💝', '💘', '💓', '💞', '💟', '❤️', '🌹', '👑', '✨'];
    
    for (let i = 0; i < 18; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 15 + 's';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heartBg.appendChild(heart);
    }
}

createFloatingHearts();

function repeatMessage() {
    // Get values from textboxes
    const message = document.getElementById('messageBox').value.trim();
    const count = parseInt(document.getElementById('numberBox').value);
    const outputDiv = document.getElementById('output');
    const copyAllBtn = document.getElementById('copyAllBtn');
    
    // Clear previous output
    outputDiv.innerHTML = '';
    allMessages = [];
    
    // Validation
    if (message === '') {
        outputDiv.innerHTML = '<p class="error-message">👑 Please enter a royal message!</p>';
        copyAllBtn.classList.remove('show');
        return;
    }
    
    if (isNaN(count) || count <= 0) {
        outputDiv.innerHTML = '<p class="error-message">👑 Please enter a valid number greater than 0!</p>';
        copyAllBtn.classList.remove('show');
        return;
    }

    if (count > 100) {
        outputDiv.innerHTML = '<p class="error-message">👑 Maximum 100 repetitions allowed!</p>';
        copyAllBtn.classList.remove('show');
        return;
    }
    
    // For loop to repeat the message
    for (let i = 1; i <= count; i++) {
        const messageElement = document.createElement('div');
        messageElement.className = 'output-item';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const badge = document.createElement('span');
        badge.className = 'number-badge';
        badge.textContent = i;
        
        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.textContent = message;
        
        messageContent.appendChild(badge);
        messageContent.appendChild(messageText);
        
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = 'Copy';
        copyBtn.onclick = function() {
            copyMessage(message, copyBtn);
        };
        
        messageElement.appendChild(messageContent);
        messageElement.appendChild(copyBtn);
        outputDiv.appendChild(messageElement);
        
        // Store message for copy all functionality
        allMessages.push(message);
        
        // Add slight delay for animation effect
        messageElement.style.animationDelay = `${i * 0.05}s`;
    }

    // Show copy all button
    copyAllBtn.classList.add('show');

    // Success message
    const successMsg = document.createElement('p');
    successMsg.className = 'success-info';
    successMsg.innerHTML = `👑 Successfully generated ${count} royal messages! 👑`;
    outputDiv.appendChild(successMsg);

    // Auto scroll to top of output
    outputDiv.scrollTop = 0;
}

function copyMessage(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        // Change button text temporarily
        const originalText = button.textContent;
        button.textContent = '✓ Copied';
        button.classList.add('copied');
        
        showToast('👑 Royal message copied!');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        showToast('❌ Failed to copy!');
    });
}

function copyAllMessages() {
    if (allMessages.length === 0) return;
    
    const allText = allMessages.join('\n');
    navigator.clipboard.writeText(allText).then(() => {
        const copyAllBtn = document.getElementById('copyAllBtn');
        const originalText = copyAllBtn.textContent;
        
        copyAllBtn.textContent = '✓ All Copied';
        copyAllBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        showToast(`👑 All ${allMessages.length} messages copied!`);
        
        setTimeout(() => {
            copyAllBtn.textContent = originalText;
            copyAllBtn.style.background = 'linear-gradient(135deg, #8a2be2 0%, #da70d6 100%)';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy all: ', err);
        showToast('❌ Failed to copy all!');
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Allow Enter key to trigger the button
document.getElementById('numberBox').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        repeatMessage();
    }
});

document.getElementById('messageBox').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        repeatMessage();
    }
});

// Input animations
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.style.transform = 'scale(1)';
    });
});
