/**
* @description Initialize page.
*/
function init() {
    displayStars(starsEle);
    displayDeck();

    restartEle.addEventListener("click", restartGame);
    modalCancelBtnEle.addEventListener("click", cancelClick);
    modalOkBtnEle.addEventListener("click", okClick);

    timer = setInterval(updateTimer, 1000);
}

/**
 * @description Cancel button event handler.
 */
function cancelClick(){
    // Hide modal window.
    modalEle.style.display = "none";
}

/**
 * @description Ok button event handler.
 */
function okClick(){
    // Hide modal window.
    modalEle.style.display = "none";
    restartGame();
}

/**
 * @description Displays the deck.
 */
function displayDeck() {
    buildDeck();
    shuffle(deck);
    buildCardList(deck);
}

/**
 * @description Builds the initial deck.
 */
function buildDeck() {
    // Add two of each card types to the deck.
    cardTypes.forEach(function (item) {
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
function buildCardList(shuffledDeck) {
    let id = 0;

    shuffledDeck.forEach(function (item) {
        id++;
        // Create elements.
        let liEle = document.createElement("li");
        let iEle = document.createElement("i");

        // Add ID to the card.
        liEle.id = `card${id}`;

        // Add classes to the elements.
        liEle.className = "card";
        iEle.className = `fa fa-${item}`;

        // Add elements to the DOM.
        deckEle.appendChild(liEle);
        liEle.appendChild(iEle);

        liEle.addEventListener("click", checkCards);
    });
}

/**
 * @description Checks if the current clicked cards match.
 * @param event The click event.
 */
function checkCards(event) {
    // Setup elements.
    let elements = getCardElements(event.target.nodeName, event);
    let cardEle = elements.cardElement;
    let iEle = elements.itemElement;

    // Check if card has already been clicked.
    if(matchEleByID(cardEle) !== null)
        return;

    // Increment counters.
    clickCount++;
    moveCount++;

    // Display card.
    cardEle.className += " open show";
    // Update moves.
    movesEle.innerText = moveCount;
    // Update stars displayed.
    displayStars(starsEle);

    // Add item to open card list on initial click.
    if (clickCount === 1) {
        openCards.push({
            ele: cardEle,
        });
    }
    else {
        let card = {
            ele: cardEle,
        };

        // Check if second clicked item is already in the list indicating a match.
        if (isCardMatch(card)) {
            openCards.push(card);

            // Get last two cards added to the open card list.
            let firstCard = openCards[openCards.length - 1];
            let secondCard = openCards[openCards.length - 2];

            // Update clases.
            firstCard.ele.className += " match";
            secondCard.ele.className += " match";
        }
        else {
            // No match remove card from open card list.
            let firstCard = openCards.pop();
            setTimeout(resetCards, 250, firstCard, card);
        }
    }

    // Only 2 cards can be selected per turn.
    if (clickCount === 2)
        clickCount = 0;

    // Check if user has won.
    if(openCards.length === 16)
        popupWinnerMsg();
}

/**
 * Gets the card elements depending on the element name passed in.
 * @param elementName The element name.
 * @param event The click event.
 * @returns The card elements.
 */
function getCardElements(elementName, event){
    let cardEle = null;
    let iEle = null;

    // Get card and item elements.
    if(elementName === "LI"){
        cardEle = event.target;
        iEle = event.target.childNodes[0];
    }
    else{
        cardEle = event.target.parentElement;
        iEle = event.target;
    }

    return{
        cardElement: cardEle,
        itemElement: iEle,
    }
}

/**
 * Checks if the card passed in has a match in the open card list.
 * @param card The card to check if a match exists.
 * @returns A boolean value indicating whether there was a match or not.
 */
function isCardMatch(card) {
    let isMatch = false;

    openCards.forEach(function (item) {
        let itemClass = item.ele.childNodes[0].className;
        let cardClass = card.ele.childNodes[0].className;

        if (itemClass === cardClass)
            isMatch = true;
    });

    return isMatch;
}

/**
 * Gets the matching element in the open card deck if it exists.
 * @param card The card to check if a match exists.
 * @returns The matching element.
 */
function matchEleByID(card) {
    let matchingEle = null;

    openCards.forEach(function (item) {
        let itemID = item.ele.id;
        let cardID = card.id;

        if (itemID === cardID)
            matchingEle = item.ele;
    });

    return matchingEle;
}

/**
 * @description Resets cards to the backside.
 * @param firstCard The first card to reset.
 * @param secondCard The second card to reset.
 */
function resetCards(firstCard, secondCard){
    firstCard.ele.className = "card";
    secondCard.ele.className = "card";
}

/**
 * @description Clears the deck element's HTML content before re-building the deck list.
 */
function clearDeck() {
    deckEle.innerHTML = "";
}

/**
 * @description Pops up modal window with winner message.
 */
function popupWinnerMsg()
{
    modalTimeEle.innerText = `${minuteCount} min ${secondCount % 60}`;
    modalMovesEle.innerText = `${moveCount}`;
    displayStars(modalStarsEle);

    clearInterval(timer);

    modalEle.style.display = "block";
}

/**
 * @description Displays stars on the score panel.
 */
function displayStars(starsElement) {
    let starNum = getStarCount();
    clearStars(starsElement);
    buildStarList(starNum, starsElement);
}

/**
 * @description Gets the number of stars to display on score panel.
 * @returns The number of stars to display.
 */
function getStarCount() {
    if (moveCount <= 16)
        return 3;
    else if (moveCount > 16 && moveCount <= 32)
        return 2;
    else
        return 1;
}

/**
 * @description Adds stars to the score panel.
 * @param starNum The number stars to add to the score panel.
 */
function buildStarList(starNum, starsElement) {
    for (let i = 1; i <= starNum; i++) {
        // Create elements.
        let liEle = document.createElement("li");
        let iEle = document.createElement("i");

        // Add classes to the item element.
        iEle.className = "fa fa-star";

        // Add elements to the DOM.
        starsElement.appendChild(liEle);
        liEle.appendChild(iEle);
    }
}

/**
 * @description Clears stars' element content before buidling the star list.
 */
function clearStars(starsElement) {
    starsElement.innerHTML = "";
}

/**
 * @description Updates the timer displayed on the page.
 */
function updateTimer()
{
    secondCount++;
    let seconds = 0;

    if(secondCount % 60 === 0)
        minuteCount++;
    else
        seconds = secondCount % 60;

    timerEle.innerText = `${minuteCount} min ${seconds} sec`;
}

/**
 * Restarts the game.
 */
function restartGame(){
    resetBoard();

    // Reset the timer.
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);

    // Update moves.
    moveCount = 0;
    movesEle.innerText = moveCount;

    // Update stars displayed.
    displayStars(starsEle);

    // Reset counters.
    clickCount = 0;
    secondCount = 0;
    minuteCount = 0;
}

/**
 * @description Resets board to initial state.
 */
function resetBoard(){
    clearDeck();
    shuffle(deck);
    buildCardList(deck);

    // Clear open card list.
    openCards = [];
}

// Elements.
const starsEle = document.getElementById("stars");
const deckEle = document.getElementById("deck");
const movesEle = document.getElementById("moves");
const scorePanelEle = document.getElementById("score-panel");
const restartEle = document.getElementById("restart");
const timerEle = document.getElementById("timer");
const modalEle = document.getElementById("modal");
const modalOkBtnEle = document.getElementById("btn-ok");
const modalCancelBtnEle = document.getElementById("btn-cancel");
const modalTimeEle = document.getElementById("modal-time");
const modalMovesEle = document.getElementById("modal-moves");
const modalStarsEle = document.getElementById("modal-stars");

// Counters.
let moveCount = 0;
let clickCount = 0;
let secondCount = 0;
let minuteCount = 0;

// Card arrays.
const cardTypes = [
    "diamond",
    "paper-plane-o",
    "anchor",
    "bolt",
    "cube",
    "leaf",
    "bicycle",
    "bomb"
];
const deck = [];
let openCards = [];

let timer;

init();