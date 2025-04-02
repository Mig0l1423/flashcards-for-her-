// Biochemistry Flashcards Data
const flashcards = [
    { 
        question: "Importance of biochemistry in medicine?", 
        answer: "Helps diagnose, treat, and understand diseases at molecular level." 
    },
    { 
        question: "Role of water in the human body?", 
        answer: "Serves as solvent for biochemical reactions, transports nutrients, and regulates temperature." 
    },
    // Add all your flashcards here...
    { 
        question: "Clinical use of karyotyping?", 
        answer: "Detects chromosomal abnormalities like Down syndrome (trisomy 21)." 
    }
];

// DOM Elements
const flashcardElement = document.getElementById('flashcard');
const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const currentCardElement = document.getElementById('current-card');
const totalCardsElement = document.getElementById('total-cards');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const shuffleButton = document.getElementById('shuffle-btn');

// App State
let currentIndex = 0;
let shuffledCards = [...flashcards];

// Initialize
function init() {
    totalCardsElement.textContent = flashcards.length;
    updateCard();
    addEventListeners();
}

// Update card display
function updateCard() {
    questionElement.textContent = shuffledCards[currentIndex].question;
    answerElement.textContent = shuffledCards[currentIndex].answer;
    currentCardElement.textContent = currentIndex + 1;
    resetCardPosition();
}

// Event Listeners
function addEventListeners() {
    // Card flip
    flashcardElement.addEventListener('click', flipCard);
    
    // Navigation
    prevButton.addEventListener('click', showPreviousCard);
    nextButton.addEventListener('click', showNextCard);
    shuffleButton.addEventListener('click', shuffleCards);
    
    // Keyboard controls
    document.addEventListener('keydown', handleKeyPress);
}

// Card Actions
function flipCard() {
    flashcardElement.classList.toggle('flipped');
}

function resetCardPosition() {
    if (flashcardElement.classList.contains('flipped')) {
        flashcardElement.classList.remove('flipped');
    }
}

// Navigation
function showPreviousCard() {
    if (currentIndex > 0) {
        currentIndex--;
        updateCard();
    }
}

function showNextCard() {
    if (currentIndex < shuffledCards.length - 1) {
        currentIndex++;
        updateCard();
    }
}

function shuffleCards() {
    // Fisher-Yates shuffle algorithm
    for (let i = shuffledCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    currentIndex = 0;
    updateCard();
    animateShuffle();
}

// Animations
function animateShuffle() {
    flashcardElement.style.transform = 'rotateY(180deg) scale(0.95)';
    setTimeout(() => {
        flashcardElement.style.transform = 'rotateY(0deg) scale(1)';
    }, 300);
}

// Keyboard Controls
function handleKeyPress(e) {
    switch(e.key) {
        case 'ArrowLeft':
            showPreviousCard();
            break;
        case 'ArrowRight':
            showNextCard();
            break;
        case ' ':
            flipCard();
            e.preventDefault(); // Prevent page scroll
            break;
    }
}

// Initialize the app
init();