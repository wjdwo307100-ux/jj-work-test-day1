document.addEventListener('DOMContentLoaded', () => {
    initLotto();
    initNavigation();
    initTheme();
    initGame();
    initAuth();
});

// --- Lotto Logic ---
function initLotto() {
    const btn = document.getElementById('generate-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }

        const numberElements = document.querySelectorAll('.number');
        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

        sortedNumbers.forEach((number, index) => {
            const numDiv = numberElements[index];
            numDiv.textContent = number;
            numDiv.style.backgroundColor = getLottoColor(number);
            numDiv.style.color = 'white';
        });
    });
}

function getLottoColor(number) {
    if (number <= 10) return '#f44336'; // Red
    if (number <= 20) return '#ff9800'; // Orange
    if (number <= 30) return '#ffc107'; // Amber
    if (number <= 40) return '#4caf50'; // Green
    return '#2196f3'; // Blue
}

// --- Navigation Logic ---
function initNavigation() {
    const navBtns = document.querySelectorAll('.nav-links .nav-btn[data-target]');
    const sections = document.querySelectorAll('.content-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons
            navBtns.forEach(b => b.classList.remove('active')); // Assuming you might add an active style later
            // Hide all sections
            sections.forEach(s => s.classList.remove('active'));
            
            // Activate clicked
            // btn.classList.add('active'); 
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// --- Theme Logic ---
function initTheme() {
    const toggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        toggleBtn.textContent = '☀️';
    }

    toggleBtn.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            toggleBtn.textContent = '🌙';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            toggleBtn.textContent = '☀️';
        }
    });
}

// --- Mini Game Logic (Rock Paper Scissors) ---
function initGame() {
    const choices = ['rock', 'paper', 'scissors'];
    const buttons = document.querySelectorAll('.rps-btn');
    const resultDisplay = document.getElementById('game-result');
    const playerScoreSpan = document.getElementById('player-score');
    const cpuScoreSpan = document.getElementById('cpu-score');
    const resetBtn = document.getElementById('reset-game-btn');

    let playerScore = 0;
    let cpuScore = 0;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const playerChoice = btn.getAttribute('data-choice');
            const cpuChoice = choices[Math.floor(Math.random() * 3)];
            
            const winner = determineWinner(playerChoice, cpuChoice);
            
            let message = '';
            if (winner === 'draw') {
                message = `Draw! Both chose ${emoji(playerChoice)}.`;
            } else if (winner === 'player') {
                playerScore++;
                message = `You Win! ${emoji(playerChoice)} beats ${emoji(cpuChoice)}.`;
            } else {
                cpuScore++;
                message = `You Lose! ${emoji(cpuChoice)} beats ${emoji(playerChoice)}.`;
            }

            resultDisplay.textContent = message;
            playerScoreSpan.textContent = playerScore;
            cpuScoreSpan.textContent = cpuScore;
        });
    });

    resetBtn.addEventListener('click', () => {
        playerScore = 0;
        cpuScore = 0;
        playerScoreSpan.textContent = '0';
        cpuScoreSpan.textContent = '0';
        resultDisplay.textContent = 'Choose your weapon!';
    });
}

function determineWinner(p, c) {
    if (p === c) return 'draw';
    if ((p === 'rock' && c === 'scissors') ||
        (p === 'paper' && c === 'rock') ||
        (p === 'scissors' && c === 'paper')) {
        return 'player';
    }
    return 'cpu';
}

function emoji(choice) {
    return { 'rock': '✊', 'paper': '✋', 'scissors': '✌️' }[choice];
}

// --- Auth Logic (Mock) ---
function initAuth() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    checkLoginStatus();

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        // Mock check
        localStorage.setItem('currentUser', username);
        closeModal('login-modal');
        checkLoginStatus();
        alert(`Welcome back, ${username}!`);
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('signup-username').value;
        // Mock save
        localStorage.setItem('currentUser', username);
        closeModal('signup-modal');
        checkLoginStatus();
        alert(`Account created! Welcome, ${username}!`);
    });
}

function checkLoginStatus() {
    const user = localStorage.getItem('currentUser');
    const authSection = document.getElementById('auth-section');

    if (user) {
        authSection.innerHTML = `
            <span>Hi, <b>${user}</b></span>
            <button onclick="logout()">Logout</button>
        `;
    } else {
        authSection.innerHTML = `
            <button onclick="showModal('login-modal')">Login</button>
            <button class="primary" onclick="showModal('signup-modal')">Sign Up</button>
        `;
    }
}

// Global functions for HTML onclick attributes
window.showModal = function(id) {
    document.getElementById(id).classList.add('show');
}

window.closeModal = function(id) {
    document.getElementById(id).classList.remove('show');
}

window.logout = function() {
    localStorage.removeItem('currentUser');
    checkLoginStatus();
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('show');
    }
}