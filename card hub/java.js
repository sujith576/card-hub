let cards = [];
let sum = 0;
let hasBlackjack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-le");
let sumEl = document.getElementById("sum-El");
let cardsContainer = document.querySelector(".cards-container");


function getRandomCard() {
    const value = Math.floor(Math.random() * 13) + 1;
    const suits = ['♥', '♦', '♠', '♣'];
    const suit = suits[Math.floor(Math.random() * 4)];
    
    return {
        value: value > 10 ? 10 : value === 1 ? 11 : value,
        display: value === 1 ? 'A' : value > 10 ? ['J', 'Q', 'K'][value - 11] : value,
        suit: suit,
        color: (suit === '♥' || suit === '♦') ? 'red' : 'black'
    };
}

function startNewGame() {
    cards = [getRandomCard(), getRandomCard()];
    sum = cards.reduce((acc, card) => acc + card.value, 0);
    isAlive = true;
    hasBlackjack = false;
    document.getElementById("newcard-btn").disabled = false;
    updateGame();
}

function updateGame() {
    // Clear previous cards
    cardsContainer.innerHTML = '';
    
    // Create new card elements
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = `card ${card.color === 'red' ? 'red' : 'black'}`;
        cardElement.textContent = card.display;
        cardElement.dataset.suit = card.suit;
        if (index === cards.length - 1) {
            cardElement.classList.add('new-card');
        }
        cardsContainer.appendChild(cardElement);
    });

    sumEl.textContent = `Total: ${sum}`;

    if (sum <= 20) {
        message = "Draw another card?";
    } else if (sum === 21) {
        message = "Blackjack! You win! 🎉";
        hasBlackjack = true;
        isAlive = false;
    } else {
        message = "Bust! Game over 💥";
        isAlive = false;
    }

    messageEl.textContent = message;
    document.getElementById("newcard-btn").disabled = !isAlive;
}

function newCard() {
    if (!isAlive) return;
    
    const newCard = getRandomCard();
    cards.push(newCard);
    sum += newCard.value;
    
    // Handle Ace conversion from 11 to 1 if bust
    if (sum > 21) {
        const aceIndex = cards.findIndex(card => card.value === 11);
        if (aceIndex > -1) {
            cards[aceIndex].value = 1;
            sum -= 10;
        }
    }

    updateGame();
}

