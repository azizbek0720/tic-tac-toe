"use strict";

const board = document.querySelector(".game-board");
const player1 = document.querySelector(".player-1 p");
const player2 = document.querySelector(".player-2 p");
const draw = document.querySelector(".draw p");

let isActive = true;
const winnerPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let a = 0;

function changePlayer() {
  player1.classList.toggle("active");
  player2.classList.toggle("active");
}

function createCell() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");

    board.appendChild(cell);
  }
}

const items = [];

function handleCell() {
  [...board.children].forEach((cell, idx) => {
    cell.addEventListener("click", () => {
      if (isActive && !cell.textContent) {
        cell.textContent = "X";
        changePlayer();
        isActive = false;
        items.push(idx);

        checkWinner(items);
      } else if (!isActive && !cell.textContent) {
        cell.textContent = "O";
        changePlayer();
        isActive = true;
      }
    });
  });
}

function checkWinner(items) {
  for (const pos of winnerPosition) {
    for (const num of pos) {
      if (items.includes(num)) a++;
    }
  }
}

function init() {
  createCell();
  handleCell();
}

init();
