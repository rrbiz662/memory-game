 /*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 /**
 * @description Initializes the web page.
 */
function init(){
    displayStars();
    displayDeck();
}

/**
 * @description Displays the deck.
 */
function displayDeck(){
    buildDeck();
    shuffle(deck);
    buildCardList(deck);
}

/**
 * @description Builds the initial deck.
 */
function buildDeck(){
    // Add two of each card types to the deck.
    cardTypes.forEach(function(item, index, array){
        deck.push(item);
        deck.push(item);
    });
}

/**
 * @description Shuffles the deck.
 * @param array The deck array to shuffle.
 */
function shuffle(array) {
    // Shuffle function from http://stackoverflow.com/a/2450976
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
}

/**
 * @description Adds cards to the deck list.
 * @param shuffledDeck The deck to build the list elements from.
 */
function buildCardList(shuffledDeck){
    shuffledDeck.forEach(function(item, index, array){
        // Create elements.
        let liEle = document.createElement("li");
        let iEle = document.createElement("i");

        // Add classes to the elements.
        liEle.className = "card open show";
        iEle.className = `fa fa-${item}`;

        // Add elements to the DOM.
        deckEle.appendChild(liEle);
        liEle.appendChild(iEle);

        iEle.addEventListener("click", checkCards);
    });
}

function checkCards(event){
    clickCount++;
    event.target.parentElement.className += " open show"
    alert(clickCount);
    console.log(event.target.className);
}

/**
 * @description Gets the number of stars to display on score panel.
 * @returns The number of stars to display.
 */
function getStarCount(){
    if(moveCount <= 16)
        return 3;
    else if(moveCount > 16 && moveCount <= 32)
        return 2;
    else
        return 1;
}

/**
 * @description Adds stars to the score panel.
 * @param starNum The number stars to add to the score panel.
 */
function buildStarList(starNum){
    for (let i = 1; i <= starNum; i++) {
        // Create elements.
        let liEle = document.createElement("li");
        let iEle = document.createElement("i");

        // Add classes to the item element.
        iEle.className = "fa fa-star";

        // Add elements to the DOM.
        starsEle.appendChild(liEle);
        liEle.appendChild(iEle);
    }
}

/**
 * @description Displays stars on the score panel.
 */
function displayStars(){
    let starNum = getStarCount();
    buildStarList(starNum);
}

 let starsEle = document.getElementById("stars");
 let deckEle = document.getElementById("deck");
 let movesEle = document.getElementById("moves");
 let scorePanelEle = document.getElementById("score-panel");
 let restartEle = document.getElementById("restart");
 let moveCount = 0;
 let clickCount = 0;
 let starCount = 3;
 let cardTypes = [
     "diamond",
     "paper-plane-o",
     "anchor",
     "bolt",
     "cube",
     "leaf",
     "bicycle",
     "bomb"
 ];
 let deck = [];

 init();

