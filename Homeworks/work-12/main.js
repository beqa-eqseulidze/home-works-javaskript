// კარტების ცვეტები
const suits = ["Club", "Diamond", "Heart", "Spade"];
//კარტები
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

// თამაშის მონაცემები
let playerCards = [];
let computerCards = [];
let gameOver = false;

// რენდომ კარტის ამოღება
function getRandomCard() {
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomValue = values[Math.floor(Math.random() * values.length)];

    return {
        suit: randomSuit,
        value: randomValue
    };
}

// ქულების დათვლა
function calculateScore(cards) {
    let score = 0;
    let aceCount = 0;

    for (let card of cards) {
        const val = parseInt(card.value);
        // ტუზი
        if (val === 12) {
            score += 11;
            // aceCount++;
        }
        //10, ვალეტი, დამა, კაროლი. 
        else if (val >= 8) {
            score += 10;
        }
        //კარტები 2-დან 9-მდე
        else {
            score += val + 2;
        }
    }
    // ტუზის კორექტირება (11 → 1)
    // while (score > 21 && aceCount > 0) {
    //     score -= 10;
    //     aceCount--;
    // }

    return score;
}

// კარტების აჩეხვა
function renderCards() {
    playerCardsDiv.innerHTML = "";
    computerCardsDiv.innerHTML = "";

    // მოთამაშის კარტები
    playerCards.forEach(card => {
        const img = document.createElement("img");
        img.src = `cards/${card.suit}/${card.value}.png`;
        img.alt = `${card.suit} ${card.value}`;
        playerCardsDiv.appendChild(img);
    });

    // კომპიუტერის კარტები (პირველი კარტი დამალულია)
    computerCards.forEach((card, index) => {
        const img = document.createElement("img");

        if (!gameOver && index === 0) {
            img.src = "cards/background.png";   // დახურული კარტი
        } else {
            img.src = `cards/${card.suit}/${card.value}.png`;
        }

        img.alt = `${card.suit} ${card.value}`;
        computerCardsDiv.appendChild(img);
    });

    // ქულების განახლება იმის მიხედვით თუ რა კარტი აქვს მოთამაშეს
    playerScoreSpan.textContent = calculateScore(playerCards);

    if (gameOver) {
        computerScoreSpan.textContent = calculateScore(computerCards);
    } else {
        computerScoreSpan.textContent = "?";
    }
}
