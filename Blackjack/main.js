
let deck = [];         
let playerCards = [];  
let compCards = [];  
const cardBack = "cards/background .png";


const pContainer = document.getElementById("player-cards");
const cContainer = document.getElementById("comp-cards");
const pScoreElement = document.getElementById("player-score");
const cScoreElement = document.getElementById("comp-score");
const msgElement = document.getElementById("game-message");

const btnStart = document.getElementById("btn-start");
const btnAdd = document.getElementById("btn-add");
const btnOpen = document.getElementById("btn-open");


// deck create
function createDeck() {
    deck = []; 
    const HDCS = ["Heart", "Diamond", "Club", "Spade"]; 
    
//==========================================================================================================================================
    
    //cycle-1
    for (let suit of HDCS) {
        
        // cycle-2
        // create 13 card in suit (0-12 )
        for (let i = 0; i <= 12; i++) {
            let cardValue = 0;
            let isAce = false;

            // checking card index and give value :
            if (i >= 0 && i <= 8) {
                // 0.png -- 8.png = numbers 2-10 (index + 2 value)
                cardValue = i + 2; 
            } else if (i >= 9 && i <= 11) {
                // 9, 10, 11 index is Jack, Queen, King = 10 value ;;
                cardValue = 10;
            } else if (i === 12) {
                //12 index = Ace ( value = 11)
                cardValue = 11;
                isAce = true; 
            }

            deck.push({
                value: cardValue,
                isAce: isAce,
                img: `${suit}/${i}.png` 
            });
        } 
        
    } 
}


// random card
function RandomCard() {
    const index = Math.floor(Math.random() * deck.length);
    return deck.splice(index, 1)[0]; //ამოაქ შემთხვევით კარტი და შლის დექიდან რომ აღარ გამეორდეს.
} 

//========scores operation =========
function calculateScore(cards) {
    let total = 0; 
    let aces = 0;  

    // caluculating scores
    for (let card of cards) {
        total += card.value;
        if (card.isAce) {
            aces++; // Tu tuzia raodenobis datvla.
        }
    }
    
    return total; 
}




// screen renderi and showing cards 
function render(showAll = false){
    //player card show
    pContainer.innerHTML = ""; 
    
    for (let card of playerCards) {
        pContainer.innerHTML += `<img src="${card.img}" class="h-full rounded-lg shadow-2xl">`;
    }
    //player score :
    pScoreElement.innerText = calculateScore(playerCards);

//=========================================================================================================================
    // computer card showw
    cContainer.innerHTML = ""; 

    if (compCards.length > 0) {
        if (!showAll) {
            cContainer.innerHTML += `<img src="${compCards[0].img}" class="h-full rounded-lg shadow-2xl">`;
            cContainer.innerHTML += `<img src="${cardBack}" class="h-full rounded-lg shadow-2xl">`;
            // computer card score :
            cScoreElement.innerText = compCards[0].value;
        } else {
            // after game ending - showing computer card
            for (let card of compCards) {
                cContainer.innerHTML += `<img src="${card.img}" class="h-full rounded-lg shadow-2xl">`;
            }
            // computer card score :
            cScoreElement.innerText = calculateScore(compCards);
        }
    }
}

//============================================================================================================================

// game ending and resultss
function finish(msg = "") {
    render(true); //showing hide card
    
    let playerFinal = calculateScore(playerCards); // player final score
    let compFinal = calculateScore(compCards);     // compt final score
    let result = msg;

    // score messages:
    if (!result){
        if (playerFinal > 21){
            result = "you lost";
        } else if(compFinal > 21){
            result = "you won";
        } else if(playerFinal > compFinal){
            result = "you won";
        } else if(playerFinal < compFinal){
            result = "you lost";
        } else{
            result = "draw";
        }
    }

    // message show on scren
    msgElement.innerText = result;
    msgElement.classList.remove("hidden"); 
    
    //start = restart
    btnStart.innerText = "RESTART";
    btnStart.classList.remove("hidden");
    btnAdd.classList.add("hidden");
    btnOpen.classList.add("hidden");
}



// Game start click
btnStart.onclick = () => {
    createDeck(); 
    playerCards = [RandomCard(), RandomCard()];
    compCards = [RandomCard(), RandomCard()];
    
    //hide last game msgs
    msgElement.innerText = "";
    msgElement.classList.add("hidden");
    
    btnStart.classList.add("hidden");
    btnAdd.classList.remove("hidden");
    btnOpen.classList.remove("hidden");
    
    // render = comp second card hiden
    render(false);
};


//====================================================================================================================================
 
// add card click
btnAdd.onclick = () => {
    playerCards.push(RandomCard()); // +1 random card
    render(false);

    let currentScore = calculateScore(playerCards); 
    // checking player's curr score and if its more than 21 player lost:
    if(currentScore > 21) {
        finish("you lost");
    }
};


//======================================================================================================================================

// Open card click and comp's turn
btnOpen.onclick = () => {
    // comp taking cards till its less then 17 :
    while (calculateScore(compCards) < 17) {
        compCards.push(RandomCard());
    }

    finish();
};