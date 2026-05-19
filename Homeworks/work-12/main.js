// კარტების ცვეტები
const suits = ["Club", "Diamond", "Heart", "Spade"];
// კარტების მონაცემები
const values = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

// DOM ელემენტები
const startBtn = document.getElementById("startBtn");
const hitBtn = document.getElementById("hitBtn");
const standBtn = document.getElementById("standBtn");

const playerCardsDiv = document.getElementById("playerCards");
const computerCardsDiv = document.getElementById("computerCards");

const playerScoreSpan = document.getElementById("playerScore");
const computerScoreSpan = document.getElementById("computerScore");
const resultText = document.getElementById("result");

// თამაშის მონაცემები და მდგომარეობა
let playerCards = [];
let computerCards = [];
let usedCards = new Set(); // გამოყენებული კარტებზე თვალყურის დევნა
let gameOver = false;

// რენდომ კარტის ამოღება + არ განმეორდეს
function getRandomCard() {
    let card;
    let key;
    do {
        const randomSuit = suits[Math.floor(Math.random() * suits.length)];
        const randomValue = values[Math.floor(Math.random() * values.length)];
        card = { suit: randomSuit, value: randomValue };
        key = `${card.suit}-${card.value}`;
    } while (usedCards.has(key));

    usedCards.add(key);
    return card;
}

// ქულების გამოთვლა
function calculateScore(cards) {
    let score = 0;

    for (let card of cards) {
        const val = parseInt(card.value);
        // ტუზი
        if (val === 12) {
            score += 11;
        }
        // 10, ვალეტი, დამა, კაროლი.
        else if (val >= 8) {
            score += 10;
        }
        // კარტები 2-9
        else {
            score += val + 2;
        }
    }
    return score;
}

// ========================= რენდერ ფუნქციები =========================
// მოთამაშის კარტების რენდერი
function renderPlayerCards() {
    playerCards.forEach(card => {
        const img = document.createElement("img");
        img.src = `cards/${card.suit}/${card.value}.png`;
        img.alt = `${card.suit} ${card.value}`;
        img.className = "card w-24 h-36 object-contain shadow-2xl rounded-xl border border-yellow-400/30 hover:scale-105 transition-transform";
        playerCardsDiv.appendChild(img);
    });
}

// კომპიუტერის კარტების რენდერი
function renderComputerCards() {
    computerCards.forEach((card, index) => {
        const img = document.createElement("img");

        if (!gameOver && index === 0) {
            img.src = "cards/background.png";   // დახურული კარტი
        } else {
            img.src = `cards/${card.suit}/${card.value}.png`;
        }

        img.alt = `${card.suit} ${card.value}`;
        img.className = "card w-24 h-36 object-contain shadow-2xl rounded-xl border border-yellow-400/30 hover:scale-105 transition-transform";
        computerCardsDiv.appendChild(img);
    });
}

// ძირითადი renderCards ფუნქცია
function renderCards() {
    playerCardsDiv.innerHTML = "";
    computerCardsDiv.innerHTML = "";

    renderPlayerCards();
    renderComputerCards();

    // ქულების განახლება
    playerScoreSpan.textContent = calculateScore(playerCards);

    if (gameOver) {
        computerScoreSpan.textContent = calculateScore(computerCards);
    } else {
        const visibleComputerCards = computerCards.slice(1);
        const visibleScore = calculateScore(visibleComputerCards);
        computerScoreSpan.textContent = visibleScore;
    }
}

// თამაშის დაწყება
function startGame() {
    resultText.textContent = "";
    resultText.className = "";

    gameOver = false;
    playerCards = [];
    computerCards = [];
    // ყველა კარტი თავიდან ხელმისაწვდომია
    usedCards.clear();

    playerCards.push(getRandomCard(), getRandomCard());
    computerCards.push(getRandomCard(), getRandomCard());

    renderCards();

    hitBtn.disabled = false;
    standBtn.disabled = false;
}

// კარტის დამატება მარტო მოთამაშესთვის
function hitCard() {
    if (gameOver) return;

    playerCards.push(getRandomCard());
    renderCards();

    if (calculateScore(playerCards) > 21) {
        endGame();
    }
}

// თამაშის დასასრული
function endGame() {
    hitBtn.disabled = true;
    standBtn.disabled = true;
    gameOver = true;

    renderCards();

    const playerScore = calculateScore(playerCards);
    const computerScore = calculateScore(computerCards);

    if (playerScore > 21) {
        resultText.textContent = "შენ წააგე ❌";
        resultText.className = "text-red-500 text-4xl font-bold";
    } else if (computerScore > 21 || playerScore > computerScore) {
        resultText.textContent = "შენ მოიგე ✅";
        resultText.className = "text-emerald-400 text-4xl font-bold";
    } else if (computerScore > playerScore) {
        resultText.textContent = "კომპიუტერმა მოიგო ❌";
        resultText.className = "text-red-500 text-4xl font-bold";
    } else {
        resultText.textContent = "ფრე 🤝";
        resultText.className = "text-yellow-400 text-4xl font-bold";
    }
}

// ღილაკების მოვლენები
startBtn.addEventListener("click", startGame);
hitBtn.addEventListener("click", hitCard);
standBtn.addEventListener("click", endGame);