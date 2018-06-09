# memory-game
This project consists of a web page in which users can play the memory game. That is, a user flips a card, then flips another card to try and get the same type of card, the game is won when all matching cards have been found. The web page includes: a `scoring panel` to view the user score, a `game board` to play the actual game, a `game restart mechanism`,and `modal window` that pops up when the user has won.

The scoring panel displays: a `user a star rating` based on the number moves,the actual `move count`, and a `timer` showing how long it is taking them to win the game.

The game board consists of `16 cards`, that is 8 cards plus a matching card for each. When the first card is clicked, the card is flipped via JS; when the second card is clicked, the card is flipped and is checked to see if it matches the first clicked card. If a match occurs, both cards remain flipped and there color is changed to `green`; if the cards dont match, they are `flipped back over` and the user must try again.

Additionally, a restart mechanism is provided to allow the user to restart the game at any point in time.

When a user manages to match all the cards, a modal window is popped up showing the user's `final score` and `time`; the user can then choose whether to play again or not.

## Getting Started
These instructions will get you a copy of the project on your local machine for development and/or testing purposes.

### Prerequisites
To view to webpage properly the user will require a working `Internet Connection`.

### Installing
To get a copy of the project to work on locally, the user can either `download the zip` or `clone the repository`.

## Run the Project
In order to run the project after downloading it:
1) Navigate to the directory where project exists.
2) Right-click the HTML file.
3) Open with the desired browser.

## Built with
* `HTML5`
* `CSS3`
* `JavaScript`

## Authors
* Ricardo Rivera