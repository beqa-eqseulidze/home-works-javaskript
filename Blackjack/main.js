let deck = [];
let playerCards = [];
let compCards = [];
const cardBack = "cards/background .png";

function createDeck() {
    deck = [];
    const suits = ["Heart", "Diamond", "Club", "Spade"];
    
    for (let s of suits) {
        for (let i = 0; i <= 12; i++) {
            let cardValue = 0;
            let isAce = false;

            if (i >= 0 && i <= 8) {
                cardValue = i + 2; 
            } else if (i >= 9 && i <= 11) {
                cardValue = 10;
            } else if (i === 12) {
                cardValue = 11;
                isAce = true;
            }

            deck.push({
                value: cardValue,
                isAce: isAce,
                img: `${s}/${i}.png` 
            });
        }
    }
}

//==============================================================================================================================================
  
// random card GENERATION

function RandomCard() {
    const index = Math.floor(Math.random() * deck.length);
    return deck.splice(index, 1)[0];
}

//==============================================================================================================================================

//score calculatorr

function calculateScore(cards) {
    let total = 0;
    let aces = 0;

    for (let card of cards) {
        total += card.value;
        if (card.isAce) {
            aces++;
        }
    }

    while (total > 21 && aces > 0) {
        total -= 10;
        aces -= 1;
    }
    
    return total;
}

//============================================================================================================================================================

//render page

function render(showAll = false) {
    const pContainer = document.getElementById("player-cards");
    pContainer.innerHTML = ""; 
    
    for (let card of playerCards) {
        pContainer.innerHTML += `<img src="${card.img}" class="h-full rounded-lg shadow-2xl">`;
    }
    document.getElementById("player-score").innerText = calculateScore(playerCards);


    const cContainer = document.getElementById("comp-cards");
    cContainer.innerHTML = ""; 

    if (compCards.length > 0) {
        if (!showAll) {
            cContainer.innerHTML += `<img src="${compCards[0].img}" class="h-full rounded-lg shadow-2xl">`;
            cContainer.innerHTML += `<img src="${cardBack}" class="h-full rounded-lg shadow-2xl">`;
            document.getElementById("comp-score").innerText = compCards[0].value;
        } else {
            for (let card of compCards) {
                cContainer.innerHTML += `<img src="${card.img}" class="h-full rounded-lg shadow-2xl">`;
            }
            document.getElementById("comp-score").innerText = calculateScore(compCards);
        }
    }
}



//============================================================================================================================

//game starter 
document.getElementById("btn-start").onclick = () => {
    createDeck();
    
    playerCards = [RandomCard(), RandomCard()];
    compCards = [RandomCard(), RandomCard()];
    
    document.getElementById("game-message").innerText = "";
    document.getElementById("game-message").classList.add("hidden");
    
    document.getElementById("btn-start").classList.add("hidden");
    document.getElementById("btn-add").classList.remove("hidden");
    document.getElementById("btn-open").classList.remove("hidden");
    
    render(false);
};


//===========================================================================================================================

//add card
document.getElementById("btn-add").onclick = () => {
    playerCards.push(RandomCard());
    render(false);

    let currentScore = calculateScore(playerCards);
    if (currentScore > 21) {
        finish("you lost");
    }
};

//======================================================================================================================

//open card

document.getElementById("btn-open").onclick = () => {
    while (calculateScore(compCards) < 17) {
        compCards.push(RandomCard());
    }
    finish();
};


//====================================================================================================================

// game end

function finish(msg = "") {
    render(true);
    
    let playerFinal = calculateScore(playerCards);
    let compFinal = calculateScore(compCards);
    let result = msg;

    if (!result) {
        if (playerFinal > 21) {
            result = "you lost";
        } else if (compFinal > 21) {
            result = "you won";
        } else if (playerFinal > compFinal) {
            result = "you won";
        } else if (playerFinal < compFinal) {
            result = "you lost";
        } else {
            result = "draw";
        }
    }

//====================================================================================================================================================

    const msgElement = document.getElementById("game-message");
    msgElement.innerText = result;
    msgElement.classList.remove("hidden"); 
    
    document.getElementById("btn-start").innerText = "RESTART";
    document.getElementById("btn-start").classList.remove("hidden");
    document.getElementById("btn-add").classList.add("hidden");
    document.getElementById("btn-open").classList.add("hidden");
}