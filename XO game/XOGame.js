"use strict";

//Elements
const XOContainer = document.querySelector(".xo_container");
const player1Info = document.querySelector(".player_1");
const player2Info = document.querySelector(".player_2");
const winningInfo = document.querySelector(".winning_info");
const newGameBtn = document.querySelector(".new_game_btn");
const XOFields = document.querySelectorAll(".xo_field");

const noWinnerMessage = "There is no winner :(, try again :) !";
const minWinningClicks = 5;
const maxWinningClicks = 9;
const XOValues = ["X", "O"];

let random,
  playerXOValues,
  activePlayer,
  winningClicked,
  winning,
  winningValues;

const randomizeXO = () => {
  random = Math.round(Math.random());
  playerXOValues = {
    1: XOValues[random],
    2: random === 0 ? XOValues[1] : XOValues[0],
  };

  player1Info.textContent = `Player 1: ${playerXOValues[1]}`;
  player2Info.textContent = `Player 2: ${playerXOValues[2]}`;
};

const initGame = () => {
  activePlayer = 1;
  winningClicked = 0;
  winning = false;

  winningValues = new Map([
    ["123", []],
    ["456", []],
    ["789", []],
    ["147", []],
    ["258", []],
    ["369", []],
    ["159", []],
    ["357", []],
  ]);

  randomizeXO();
};

initGame();

const XOGame = (e) => {
  if (e.target.classList.contains("xo_field")) {
    const clickedXO = e.target;

    if (clickedXO.textContent.length === 0) {
      winningClicked++;

      const activePlayerValue = playerXOValues[activePlayer];
      clickedXO.textContent = activePlayerValue;

      const XOField = clickedXO.dataset.field;

      logXOField(XOField, activePlayerValue);

      if (winningClicked >= minWinningClicks) {
        checkWinner(winningValues);
      }
      if (!winning && winningClicked === maxWinningClicks) {
        winningInfo.textContent = noWinnerMessage;
        newGameBtn.style.display = "inline";
      }
      toggleActivePlayer();
    }
  }
};

XOContainer.addEventListener("click", XOGame);

const logXOField = (XOField, activePlayerValue) => {
  for (let [winningValue, XOFields] of winningValues) {
    if (winningValue.includes(XOField)) {
      XOFields.push(activePlayerValue);
    }
  }
};

const checkWinner = (winningValues) => {
  for (let [winningValue, XOFields] of winningValues) {
    if (XOFields.length === 3 && new Set(XOFields).size === 1) {
      declareWinner(winningValue);
    }
  }
};

const toggleActivePlayer = () => {
  player1Info.classList.toggle("activePlayerColor");
  player2Info.classList.toggle("activePlayerColor");
  activePlayer = activePlayer === 1 ? 2 : 1;
};

const declareWinner = (winningValue) => {
  const winningFields = winningValue.split("");
  for (const winningField of winningFields) {
    document
      .querySelector(`[data-field="${winningField}"]`)
      .classList.add("strikeWinner");
  }

  winning = true;
  winningInfo.textContent = "Player " + activePlayer + " is winner!";
  newGameBtn.style.display = "inline";
  XOContainer.removeEventListener("click", XOGame);
};

const resetXOFields = () => {
  for (const XOField of XOFields) {
    XOField.textContent = "";
    XOField.classList.remove("strikeWinner");
  }
};

const newGame = () => {
  XOContainer.addEventListener("click", XOGame);
  resetXOFields();
  initGame();
  winningInfo.textContent = "";
  newGameBtn.style.display = "none";
  player1Info.classList.add("activePlayerColor");
  player2Info.classList.remove("activePlayerColor");
};

newGameBtn.addEventListener("click", newGame);
