let deck = [];
let playerCards = [];
let dealerCards = [];

let playerScore = 0;
let dealerScore = 0;

const playerCardsDiv = document.getElementById("player-cards");
const dealerCardsDiv = document.getElementById("dealer-cards");

const playerScoreDiv = document.getElementById("player-score");
const dealerScoreDiv = document.getElementById("dealer-score");

const resultDiv = document.getElementById("result");

const startBtn = document.getElementById("start");
const hitBtn = document.getElementById("hit");
const standBtn = document.getElementById("stand");

function createDeck() {
  deck = [];

  let suits = ["♠", "♥", "♦", "♣"];
  let values = [
    "A", "2", "3", "4", "5",
    "6", "7", "8", "9", "10",
    "J", "Q", "K"
  ];

  for (let suit of suits) {
    for (let value of values) {
      deck.push({
        value: value,
        suit: suit
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

function getCardValue(card) {

  if (card.value === "A") {
    return 11;
  }

  if (
    card.value === "J" ||
    card.value === "Q" ||
    card.value === "K"
  ) {
    return 10;
  }

  return Number(card.value);
}









































