let deck = [];
let playerCards = [];
let dealerCards = [];

let playerScore = 0;
let dealerScore = 0;
let isGameOver = false;

const playerCardsDiv = document.getElementById("player-cards");
const dealerCardsDiv = document.getElementById("dealer-cards");

const playerScoreDiv = document.getElementById("player-score");
const dealerScoreDiv = document.getElementById("dealer-score");

const resultDiv = document.getElementById("result");

const startBtn = document.getElementById("start");
const hitBtn = document.getElementById("hit");
const standBtn = document.getElementById("stand");

// Disable game buttons initially
hitBtn.disabled = true;
standBtn.disabled = true;

const suitMap = {
  "♠": "Spade",
  "♥": "Heart",
  "♦": "Diamond",
  "♣": "Club"
};

function createDeck() {
  deck = [];
  let suits = ["♠", "♥", "♦", "♣"];
  let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

  for (let suit of suits) {
    for (let i = 0; i < values.length; i++) {
      deck.push({
        value: values[i],
        suit: suit,
        image: `./${suitMap[suit]}/${i}.png`
      });
    }
  }
}

function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function getScore(cards) {
  let score = 0;

  for (let card of cards) {
    if (card.value === "A") {
      score += 11;
    } else if (["J", "Q", "K"].includes(card.value)) {
      score += 10;
    } else {
      score += Number(card.value);
    }
  }

  return score;
}

function renderGame(showAllDealerCards = false) {
  // Clear previous cards
  playerCardsDiv.innerHTML = "";
  dealerCardsDiv.innerHTML = "";

  // Render Player Cards
  playerCards.forEach(card => {
    const img = document.createElement("img");
    img.src = card.image;
    img.className = "card-img";
    playerCardsDiv.appendChild(img);
  });

  // Render Dealer Cards
  dealerCards.forEach((card, index) => {
    const img = document.createElement("img");
    if (index === 0 || showAllDealerCards) {
      img.src = card.image;
    } else {
      // Hidden card
      img.src = "./cards/background .png";
    }
    img.className = "card-img";
    dealerCardsDiv.appendChild(img);
  });

  playerScore = getScore(playerCards);
  playerScoreDiv.innerText = `ჩემი ქულა: ${playerScore}`;

  if (showAllDealerCards) {
    dealerScore = getScore(dealerCards);
    dealerScoreDiv.innerText = `Dealer: ${dealerScore}`;
  } else {
    // Show only the score of the first (visible) card
    let visibleScore = getScore([dealerCards[0]]);
    dealerScoreDiv.innerText = `Dealer: ${visibleScore}`;
  }
}

function startGame() {
  createDeck();
  shuffleDeck();

  playerCards = [deck.pop(), deck.pop()];
  dealerCards = [deck.pop(), deck.pop()];

  isGameOver = false;
  resultDiv.innerText = "";
  resultDiv.className = "";

  hitBtn.disabled = false;
  standBtn.disabled = false;
  startBtn.innerText = "Restart Game";

  renderGame();

  // Check for immediate Blackjack
  if (playerScore === 21) {
    endGame("Blackjack! You Win!");
  }
}

function hit() {
  if (isGameOver) return;

  // Player takes a card
  playerCards.push(deck.pop());

  // Dealer also takes a card if score < 21
  if (getScore(dealerCards) < 21) {
    dealerCards.push(deck.pop());
  }

  renderGame();

  let pScore = getScore(playerCards);
  let dScore = getScore(dealerCards);

  if (pScore > 21) {
    endGame("Bust! You Lose.");
  } else if (dScore > 21) {
    endGame("Dealer Busts! You Win!");
  }
}

function stand() {
  if (isGameOver) return;

  isGameOver = true;

  // Dealer AI: Hits until at least 17
  while (getScore(dealerCards) < 17) {
    dealerCards.push(deck.pop());
  }

  renderGame(true);

  let pScore = getScore(playerCards);
  let dScore = getScore(dealerCards);

  if (dScore > 21) {
    resultDiv.innerText = "Dealer Busts! You Win!";
    resultDiv.className = "win";
  } else if (pScore > dScore) {
    resultDiv.innerText = "You Win!";
    resultDiv.className = "win";
  } else if (pScore < dScore) {
    resultDiv.innerText = "You Lose.";
    resultDiv.className = "lose";
  } else {
    resultDiv.innerText = "Push! (Tie)";
    resultDiv.className = "tie";
  }

  hitBtn.disabled = true;
  standBtn.disabled = true;
}

function endGame(message) {
  isGameOver = true;
  resultDiv.innerText = message;
  if (message.includes("Win")) resultDiv.className = "win";
  else if (message.includes("Lose")) resultDiv.className = "lose";

  renderGame(true);
  hitBtn.disabled = true;
  standBtn.disabled = true;
}

startBtn.addEventListener("click", startGame);
hitBtn.addEventListener("click", hit);
standBtn.addEventListener("click", stand);
