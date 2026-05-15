let deck = [], playerCards = [], dealerCards = [], isGameOver = false;

const $ = id => document.getElementById(id);
const [playerCardsDiv, dealerCardsDiv, playerScoreDiv, dealerScoreDiv, resultDiv, startBtn, hitBtn, standBtn] =
    ["player-cards", "dealer-cards", "player-score", "dealer-score", "result", "start", "hit", "stand"].map($);

hitBtn.disabled = standBtn.disabled = true;
const suitMap = { "♠": "Spade", "♥": "Heart", "♦": "Diamond", "♣": "Club" };

const createDeck = () => {
    deck = [];
    const suits = ["♠", "♥", "♦", "♣"], values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    suits.forEach(suit => values.forEach((value, i) => deck.push({ value, suit, image: `./${suitMap[suit]}/${i}.png` })));
};

const shuffleDeck = () => {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
};

const getScore = cards => cards.reduce((score, card) =>
    score + (card.value === "A" ? 11 : ["J", "Q", "K"].includes(card.value) ? 10 : +card.value), 0);

const renderCards = (div, cards, showAll) => {
    div.innerHTML = cards.map((c, i) =>
        `<img src="${i === 0 || showAll ? c.image : './cards/background .png'}" class="card-img">`
    ).join('');
};

const renderGame = (showAll = false) => {
    renderCards(playerCardsDiv, playerCards, true);
    renderCards(dealerCardsDiv, dealerCards, showAll);
    playerScoreDiv.innerText = `ჩემი ქულა: ${getScore(playerCards)}`;
    dealerScoreDiv.innerText = `Dealer: ${getScore(showAll ? dealerCards : [dealerCards[0]])}`;
};

function startGame() {
    createDeck(); shuffleDeck();
    playerCards = [deck.pop(), deck.pop()];
    dealerCards = [deck.pop(), deck.pop()];
    isGameOver = false;
    resultDiv.innerText = resultDiv.className = "";
    hitBtn.disabled = standBtn.disabled = false;
    startBtn.innerText = "Restart Game";
    renderGame();
    if (getScore(playerCards) === 21) endGame("Blackjack! You Win!");
}

function hit() {
    if (isGameOver) return;
    playerCards.push(deck.pop());
    if (getScore(dealerCards) < 21) dealerCards.push(deck.pop());

    let p = getScore(playerCards), d = getScore(dealerCards);
    if (p > 21) endGame("Bust! You Lose.");
    else if (d > 21) endGame("Dealer Busts! You Win!");
    else renderGame();
}

function stand() {
    if (isGameOver) return;
    while (getScore(dealerCards) < 17) dealerCards.push(deck.pop());

    let p = getScore(playerCards), d = getScore(dealerCards);
    let msg = d > 21 || p > d ? "You Win!" : p < d ? "You Lose." : "Push! (Tie)";
    endGame(msg);
}

function endGame(msg) {
    isGameOver = hitBtn.disabled = standBtn.disabled = true;
    resultDiv.innerText = msg;
    resultDiv.className = msg.includes("Win") ? "win" : msg.includes("Lose") ? "lose" : "tie";
    renderGame(true);
}

startBtn.addEventListener("click", startGame);
hitBtn.addEventListener("click", hit);
standBtn.addEventListener("click", stand);