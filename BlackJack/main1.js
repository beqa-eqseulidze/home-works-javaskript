// თამაშის გლობალური ცვლადები: დასტა, მოთამაშის/დილერის კარტები და თამაშის სტატუსი
let deck = [], playerCards = [], dealerCards = [], isGameOver = false;

// მოკლე ფუნქცია DOM ელემენტის ID-ით მარტივად ამოსაღებად
const $ = id => document.getElementById(id);

// ერთ ხაზზე ვიღებთ ყველა საჭირო HTML ელემენტს (ღილაკებს, სექციებს) მასივის დახმარებით
const [playerCardsDiv, dealerCardsDiv, playerScoreDiv, dealerScoreDiv, resultDiv, startBtn, hitBtn, standBtn] =
    ["player-cards", "dealer-cards", "player-score", "dealer-score", "result", "start", "hit", "stand"].map($);

// თამაშის დაწყებამდე ვთიშავთ "Hit" და "Stand" ღილაკებს
hitBtn.disabled = standBtn.disabled = true;

// მასტების სიმბოლოების შესაბამისობა საქაღალდეების ინგლისურ სახელებთან (სურათებისთვის)
const suitMap = { "♠": "Spade", "♥": "Heart", "♦": "Diamond", "♣": "Club" };

// ახალი 52-კარტიანი დასტის გენერირება სურათების ლინკებით
const createDeck = () => {
    deck = [];
    const suits = ["♠", "♥", "♦", "♣"], values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    // თითოეულ მასტზე და მნიშვნელობაზე ციკლით ვქმნით კარტის ობიექტს და ვაგდებთ დასტაში
    suits.forEach(suit => values.forEach((value, i) => deck.push({ value, suit, image: `./${suitMap[suit]}/${i}.png` })));
};

// Fisher-Yates ალგორითმი: დასტაში კარტების შემთხვევითი არევა
const shuffleDeck = () => {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; // ადგილების გაცვლა
    }
};

// კარტების საერთო ქულის დათვლა (A = 11, J/Q/K = 10, სხვები ნომინალით)
const getScore = cards => cards.reduce((score, card) =>
    score + (card.value === "A" ? 11 : ["J", "Q", "K"].includes(card.value) ? 10 : +card.value), 0);

// კონკრეტული მოთამაშის კარტების HTML-ში ასახვა (დილერის პირველი კარტი ჩანს, სხვა დამოკიდებულია showAll-ზე)
const renderCards = (div, cards, showAll) => {
    div.innerHTML = cards.map((c, i) =>
        `<img src="${i === 0 || showAll ? c.image : './cards/background .png'}" class="card-img">`
    ).join('');
};

// მთლიანი თამაშის ვიზუალის და ქულების განახლება ეკრანზე
const renderGame = (showAll = false) => {
    renderCards(playerCardsDiv, playerCards, true); // მოთამაშის კარტები სრულად ჩანს
    renderCards(dealerCardsDiv, dealerCards, showAll); // დილერის კარტები (ჩანს/მალულია)
    playerScoreDiv.innerText = `ჩემი ქულა: ${getScore(playerCards)}`;
    // დილერის ქულა: თუ დამალულია, აჩვენებს მხოლოდ 1 კარტის ქულას
    dealerScoreDiv.innerText = `Dealer: ${getScore(showAll ? dealerCards : [dealerCards[0]])}`;
};

// თამაშის დაწყების ფუნქცია (ახალი დასტა, არევა, 2-2 კარტის დარიგება)
function startGame() {
    createDeck(); shuffleDeck();
    playerCards = [deck.pop(), deck.pop()]; // მოთამაშეს 2 კარტი
    dealerCards = [deck.pop(), deck.pop()]; // დილერს 2 კარტი
    isGameOver = false;
    resultDiv.innerText = resultDiv.className = ""; // შედეგების გასუფთავება
    hitBtn.disabled = standBtn.disabled = false;    // ღილაკების ჩართვა
    startBtn.innerText = "Restart Game";
    renderGame();
    // თუ მოთამაშეს დასაწყისშივე 21 ჰყავს, მომენტალურად იგებს
    if (getScore(playerCards) === 21) endGame("Blackjack! You Win!");
}

// მოთამაშის მიერ კარტის დამატება (Hit)
function hit() {
    if (isGameOver) return;
    playerCards.push(deck.pop()); // მოთამაშე იღებს კარტს
    // ორიგინალი ლოგიკა: დილერიც ავტომატურად იმატებს, თუ 21-ზე ნაკლები აქვს
    if (getScore(dealerCards) < 21) dealerCards.push(deck.pop());

    let p = getScore(playerCards), d = getScore(dealerCards);
    // გადამოწმება: ხომ არ გადააჭარბა ვინმემ 21-ს (Bust)
    if (p > 21) endGame("Bust! You Lose.");
    else if (d > 21) endGame("Dealer Busts! You Win!");
    else renderGame(); // თუ თამაში გრძელდება, ვანახლებთ ეკრანს
}

// მოთამაშის გაჩერება (Stand) - დილერის AI-ს გააქტიურება
function stand() {
    if (isGameOver) return;
    // დილერი იმატებს კარტს მანამ, სანამ მინიმუმ 17 ქულას არ დააგროვებს
    while (getScore(dealerCards) < 17) dealerCards.push(deck.pop());

    let p = getScore(playerCards), d = getScore(dealerCards);
    // გამარჯვებულის გამოვლენის ლოგიკა
    let msg = d > 21 || p > d ? "You Win!" : p < d ? "You Lose." : "Push! (Tie)";
    endGame(msg);
}

// თამაშის დასრულების ფუნქცია (ღილაკების გათიშვა, შედეგის სტილი და დილერის კარტების გახსნა)
function endGame(msg) {
    isGameOver = hitBtn.disabled = standBtn.disabled = true;
    resultDiv.innerText = msg;
    // CSS კლასის მინიჭება ფერებისთვის (win / lose / tie)
    resultDiv.className = msg.includes("Win") ? "win" : msg.includes("Lose") ? "lose" : "tie";
    renderGame(true); // დილერის კარტების ბოლომდე ჩვენება
}

// ივენთების მიბმა შესაბამის ღილაკებზე კლიკების დასაჭერად
startBtn.addEventListener("click", startGame);
hitBtn.addEventListener("click", hit);
standBtn.addEventListener("click", stand);