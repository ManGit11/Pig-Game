"use strict";

//selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//starting condition
score0El.textContent = 0;
score1El.textContent = 0;

//dice png condition
diceEl.classList.add("hidden");

//player array
const scores = [0, 0];

let currentScore = 0;
let activePlayer = 0;
let playing = true; //declare the playing state

//a function specifically to switch player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

/*reset code 2
btnNew.addEventListener("click", function () {
  playing = true;
  document.getElementById("score--0").textContent = 0;
  document.getElementById("score--1").textContent = 0;
  scores[0] = 0;
  scores[1] = 0;
  document.getElementById("current--0").textContent = 0;
  document.getElementById("current--1").textContent = 0;
  currentScore = 0;
  diceEl.classList.add("hidden");

  if (activePlayer === 1) {
    activePlayer = 0;
    player1El.classList.remove("player--winner");
    player0El.classList.toggle("player--active");
    player1El.classList.remove("player--winner");
    player1El.classList.remove("player--active");
    diceEl.classList.add("hidden");
  } else {
    activePlayer = 0;
    player0El.classList.remove(`player--winner`);
    player0El.classList.add("player--active");
    diceEl.classList.add("hidden");
  }
});
*/

btnNew.addEventListener("click", function () {
  playing = true;
  document.getElementById("score--0").textContent = 0;
  document.getElementById("score--1").textContent = 0;
  scores[0] = 0;
  scores[1] = 0;
  document.getElementById("current--0").textContent = 0;
  document.getElementById("current--1").textContent = 0;
  currentScore = 0;
  diceEl.classList.add("hidden");

  if (activePlayer === 1) {
    activePlayer = 0;
    player1El.classList.remove("player--winner");
    player0El.classList.toggle("player--active");
    player1El.classList.remove("player--winner");
    player1El.classList.remove("player--active");
    diceEl.classList.add("hidden");
  } else {
    activePlayer = 0;
    player0El.classList.remove(`player--winner`);
    player0El.classList.add("player--active");
    diceEl.classList.add("hidden");
  }
});

//roll dice function
btnRoll.addEventListener("click", function () {
  if (playing) {
    //generate random dice number
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //display the dice based from the randomizer
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    //check dice roll
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //if dice actually is a value of 1 then switch player
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //adding current player score to the total score sum
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //condition if there is a winner when clicking hold
    //if clicking hold sum reach the winning value, then that player win
    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
      //else clicking hold sum didnt reach the winning value, switch player and the game continues
    } else {
      switchPlayer();
    }
  }
});
