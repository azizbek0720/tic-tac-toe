"use strict";

const main = document.querySelector("main");
const intro = document.querySelector(".intro");
const cells = document.querySelectorAll(".cell");
const player1 = document.querySelector(".player-1 p");
const player2 = document.querySelector(".player-2 p");
const draw = document.querySelector(".draw p");
const choiceBtns = document.querySelectorAll(".btn");

console.log(choiceBtns);

const positions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let board = new Array(9).fill(NaN);
let isWinner = false;
let isDraw = false;
let currentPlayer = "X";

function handleChoiceBtnClick() {
  choiceBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let isX = btn.classList.contains("choice-x");
      currentPlayer = isX ? "X" : "O";

      setTimeout(() => {
        main.style.display = "block";
        intro.style.display = "none";
      }, 1500);
    });
  });
}

function clearGame() {
  setTimeout(() => {
    isWinner = false;
    board = new Array(9).fill(NaN);

    cells.forEach((cell) => {
      cell.classList.remove("winner");
      cell.textContent = "";
    });
  }, 1000);
}

function handleCellClick() {
  cells.forEach((cell, idx) => {
    cell.addEventListener("click", () => {
      if (!cell.textContent && !isWinner) {
        board[idx] = currentPlayer;
        cell.textContent = currentPlayer;

        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
      if (isWinner || checkDraw()) {
        clearGame();
      }
    });
  });
}

function checkWinner() {
  for (let [x, y, z] of positions) {
    if (board[x] === board[y] && board[y] === board[z]) {
      isWinner = true;
      [x, y, z].forEach((i) => cells[i].classList.add("winner"));

      if (currentPlayer === "X") {
        setTimeout(() => {
          player1.textContent = +player1.textContent + 1;
        }, 300);
      } else if (currentPlayer === "O") {
        setTimeout(() => {
          player2.textContent = +player2.textContent + 1;
        }, 300);
      }
    }
  }
}

function checkDraw() {
  if (board.every((elm) => elm)) {
    setTimeout(() => {
      draw.textContent = +draw.textContent + 1;
    }, 300);
    return true;
  }
}

function init() {
  handleChoiceBtnClick();
  handleCellClick();
}

init();
